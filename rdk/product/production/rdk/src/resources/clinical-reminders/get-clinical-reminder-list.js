'use strict';

var rdk = require('../../core/rdk');
var VistaJS = require('../../VistaJS/VistaJS');
var getVistaRpcConfiguration = require('../../utils/rpc-config').getVistaRpcConfiguration;
var nullchecker = rdk.utils.nullchecker;
var filemanDateUtil = require('../../utils/fileman-date-converter');
var jds = require('../../subsystems/jds/jds-subsystem');

var errorMessage = 'There was an error processing your request. The error has been logged.';
var errorVistaJSCallback = 'VistaJS RPC callback error: ';

module.exports = getClinicalReminderList;
module.exports._getClinicalReminderList = getClinicalReminderList;
module.exports.parameters = {
    get: {
        pid: {
            required: true,
            description: 'patient id'
        }
    }
};
module.exports.apiDocs = {
    spec: {
        summary: '',
        notes: '',
        parameters: [
            rdk.docs.commonParams.pid
        ],
        responseMessages: []
    }
};

/**
* Retrieves a list of clinical reminders for a specific patient DFN. Uses the
* site id that is stored in the user session.
*
* @param {Object} req - The default Express request that contains the
                        URL parameters needed to retrieve a list of clinical
                        reminders.
* @param {Object} res - The default Express response that will contain a list
                        of clinical reminders.
* @param {function} next - The middleware to be executed after this
                        function has finished executing.
*/
function getClinicalReminderList(req, res, next) {
    req.logger.info('retrieve clinical reminder list resource GET called');

    var dfn = req.interceptorResults.patientIdentifiers.dfn;

    if (nullchecker.isNullish(dfn)) {
        return next();
    }

    req.audit.patientId = req.interceptorResults.patientIdentifiers.siteDfn;

        req.logger.debug('DFN: ' + dfn);

        VistaJS.callRpc(req.logger, getVistaRpcConfiguration(req.app.config, req.session.user.site), 'ORQQPX REMINDERS LIST', [VistaJS.RpcParameter.literal(dfn)], function(error, result) {
            if (error) {
                req.logger.error(errorVistaJSCallback + error);
                res.status(rdk.httpstatus.internal_server_error).rdkSend(errorMessage);
            } else {
                req.logger.info('Successfully retrieved clinical reminder list from VistA.');

                var reminders = result.split('\r\n');
                var reminder = '';
                var items = [];
                for (var i = 0, end = reminders.length - 1; i < end; i++) {
                    reminder = reminders[i].split('^');
                    if (reminder) {
                        var item = {};
                        item.reminderId = reminder[0];
                        item.title = reminder[1];
                        var dueDateStr = reminder[2];
                        if (!dueDateStr) {
                            item.dueDate = '';
                        } else if (dueDateStr === 'DUE NOW') {
                            item.dueDate = filemanDateUtil.getVprDateTime(filemanDateUtil.getFilemanDateTime(new Date()));
                        } else {
                            item.dueDate = filemanDateUtil.getVprDateTime(dueDateStr);
                        }
                        var doneDateStr = reminder[3];
                        if (!doneDateStr) {
                            item.doneDate = '';
                        } else {
                            item.doneDate = filemanDateUtil.getVprDateTime(doneDateStr);
                        }
                        items.push(item);
                    }
                }
                res.rdkSend({
                    'data': {
                        'items': items
                    }
                });
            }
        });
}
