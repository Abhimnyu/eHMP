module.exports = {
    name: 'The running configuration',
    edition: 'ONC',
    environment: 'development',
    externalProtocol: 'http',
    appServer: {
        port: 8888
    },
    authServer : {
        hostname: 'localhost',
        port: 8888,
        path: '/resource/auth/authentication'
    },
    patientPhotoServer :{
        hostname: 'localhost',
        port: 8888,
        path: 'resource/patientphoto'
    },
    ccowServer: {
        hostname: 'localhost',
        port: 8890,
        path: '/ccow'
    },
    timeoutMillis: 120000,
    maxListeners: 50,
    requestTrace: {
        active: true,
        logIdParam: 'logId',
        requestIdParam: 'requestId'
    },
    pdpConfig: {
        ruleFile: './rules.js'
    },
    rpcConfig: {
        context: 'HMP UI CONTEXT'
    },
    vistaSites: {
        '34C5': {
            name: 'krm',
            division: '1',
            host: '192.168.33.10',
            localIP: '192.168.33.12',
            localAddress: 'localhost',
            port: 9430,
            production: false,
            accessCode: 'SM1234',
            verifyCode: 'SM1234!!!',
            infoButtonOid: '1.3.6.1.4.1.3768'
        }
    },
    mvi: {
        host: '10.4.4.205',
        protocol: 'http',
        senderCode: '200EHMP',
        port: 8896,
        search: {
            path: '/mvi'
        },
        sync: {
            path: '/mvi'
        }
    },
    vhic: {
        host: '10.4.4.205',
        protocol: 'http',
        senderCode: '200EHMP',
        port: 8896,
        search: {
            path: '/vhic'
        },
        sync: {
            path: '/vhic'
        }
    },
    responseTimeoutMillis: 420000,
    hmpServer: {
        host: '192.168.33.10',
        port: 8443,
        accessCode: '34C5;1',
        verifyCode: 'SM1234;SM1234!!!'
    },
    vxSyncServer: {
        //host: '192.168.200.30',
        //host: '192.168.200.31',
        //host: '192.168.43.198',
        //host: '192.168.2.8',
        host: '192.168.33.12',
        port: 8080
    },
    solrServer: {
        host: '10.3.3.10',
        port: '8983',
        path: '/solr/vpr'
    },
    asu: {
        evaluateRuleService: {
            timeoutMillis: 30000,
            protocol: 'http',
            options : {
                path : '/asu/rules/accessDocument',
                method: 'POST',
                port : 9000
            }
        }
    },
    jdsServer: {
        host: '192.168.33.10',
        port: 9080
    },
    generalPurposeJdsServer: {
        host: '192.168.33.10',
        port: 9080
    },
    jdsSync: {
        settings: {
            waitMillis: 1000,
            timeoutMillis: 420000
        },
        syncPatientLoad: {
            timeoutMillis: 420000,
            protocol: 'http',
            options: {
                path: '/sync/load',
                method: 'POST',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        },
        syncPatientLoadPrioritized: {
            timeoutMillis: 420000,
            protocol: 'http',
            options: {
                path: '/sync/load',
                method: 'POST',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        },
        syncPatientLoadForced: {
            timeoutMillis: 420000,
            protocol: 'http',
            options: {
                path: '/sync/load',
                method: 'POST',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        },
        syncPatientClear: {
            timeoutMillis: 420000,
            protocol: 'http',
            options: {
                path: '/sync/clearPatient',
                method: 'POST',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        },
        syncPatientStatus: {
            timeoutMillis: 420000,
            options: {
                path: '/sync/status',
                method: 'GET',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        },
        syncPatientDataStatus: {
            timeoutMillis: 420000,
            options: {
                path: '/sync/status',
                method: 'GET',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        },
        syncPatientStatusDetail: {
            timeoutMillis: 420000,
            options: {
                path: '/status',
                method: 'GET',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        },
        syncOperationalStatus: {
            timeoutMillis: 420000,
            options: {
                path: '/statusod/',
                method: 'GET',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        },
        patientSelectIcn: {
            timeoutMillis: 420000,
            options: {
                path: '/data/index/pt-select-icn?range=',
                method: 'GET',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        },
        patientSelectPid: {
            timeoutMillis: 420000,
            options: {
                path: '/data/index/pt-select-pid?range=',
                method: 'GET',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        },
        patientSelectPidAllSites: {
            timeoutMillis: 420000,
            options: {
                path: '/vpr/mpid',
                method: 'GET',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        },
        jdsStatusFind: {
            timeoutMillis: 420000,
            protocol: 'http',
            options: {
                path: '/vpr/{pid}/count/collection',
                method: 'GET',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        },
        syncExpirePatientData: {
            timeoutMillis: 420000,
            protocol: 'http',
            options: {
                path: '/sync/expire?',
                method: 'POST',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        }
    },
    vxSyncComplexNote: {
        getComplexNote: {
            timeoutMillis: 120000,
            protocol: 'http',
            port: 8089,
            options: {
                method: 'GET',
                rejectUnauthorized: false,
                requestCert: true,
                agent: false
            }
        }
    },
    loggers: [{
        name: 'res-server',
        streams: [{
            level: 'debug',
            stream: process.stdout
        }, {
            type: 'rotating-file',
            level: 'trace',
            period: '1d',
            count: 10,
            path: '/tmp/res-server.log'
        }]
    }, {
        name: 'audit',
        streams: [{
            type: 'rotating-file',
            period: '1d',
            count: 10,
            path: '/tmp/audit.log',
            level: 'info'
        }]
    }, {
        name: 'ccow-server',
        streams: [{
            level: 'debug',
            stream: process.stdout
        }, {
            type: 'rotating-file',
            level: 'debug',
            period: '1d',
            count: 10,
            path: '/tmp/ccow.log'
        }]
    }],
    interceptors: {
        authentication: {
            disabled: false
        },
        pep: {
            disabled: false
        },
        operationalDataCheck: {
            disabled: false
        },
        synchronize: {
            disabled: false
        }
    }
};
