/*jslint node: true */
'use strict';

var _ = require('underscore');
var jdsSync = require('../subsystems/jdsSync/jdsSync');
var cache = require('memory-cache');

module.exports = function(req, res, next) {
    var config = req.app.config;

    req.logger.info('calling synchronize() interceptor');

    if ('interceptors' in config && 'synchronize' in config.interceptors && config.interceptors.synchronize.disabled) {
        req.logger.warn('synchronize disabled');
        return next();
    }

    var pid = req.param('pid');

    if (!pid) {
        req.logger.debug('no pid, skip sync');
        return next();
    }

    var syncConfig = _.clone(config.jdsSync.syncPatientLoad);
    if(req.get('Authorization') !== undefined) {
        syncConfig.headers = {
            Authorization: req.get('Authorization')
        };
    }

    // Make sure the users logged in site is synced first
    var prioritySite = [];
    if((req.session.user || {}).site) {
        prioritySite.push(req.session.user.site);
    }

    var cacheKey = 'synchronize-interceptor' + pid;
    var cachedItem = cache.get(cacheKey);
    if(cachedItem) {
        req.logger.debug('synchronize interceptor: successful response cached for pid %s', pid);
        return next();
    }

    jdsSync._doLoad(jdsSync._syncStatusResultProcessor, syncConfig, pid, false, 'userSelect', prioritySite, null, req, res, next,  function(err, result) {
        req.logger.debug('start syncLoad callback');
        if (err) {
            if (err === 404){
                req.logger.debug('404 syncLoad');
                var resultData = '';
                if (result && result.data){
                    resultData =  result.data;
                }
                res.send(404, resultData);
            }
            else {
                req.logger.error('Error connecting to sync subsystem:');
                req.logger.error(err);
                res.send(500, 'There was an error processing your request. The error has been logged.');
            }
        } else if(!result) {
            req.logger.error('Empty response from sync subsystem');
            res.send(500, 'There was an error processing your request. The error has been logged.');
        } else if(!('data' in result) || result.status === 500) {
            req.logger.debug('Error response from sync subsystem:');
            req.logger.error(result);
            cache.put(cacheKey, true, 10 * 60 * 1000);
            next();
            //next();
            //req.logger.debug(result.data.items);
            //res.send(500, 'There was an error processing your request. The error has been logged.');
        } else if (result.status === 404) {
            req.logger.debug('404 syncLoad');
            res.send(result.status, result.data);
        } else {
            // relying on result.data.items to always have 1 element
            // @TODO Fix this logic here with new VX-Sync 2.0
            var responseShouldBeCached = true;
            req.logger.trace(result);
            // var responseShouldBeCached = _.every(result.data.items[0].syncStatusByVistaSystemId, function(site) {
            //     return site.syncComplete;
            // });
            if(responseShouldBeCached) {
                req.logger.debug('synchronize interceptor: caching syncLoad response');
                cache.put(cacheKey, true, 10 * 60 * 1000);
            } else {
                req.logger.debug('synchronize interceptor: not caching syncLoad response');
            }
            req.logger.debug('syncLoad - continue');
            next();
        }
    });
};
