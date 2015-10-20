define([
    "backbone",
    "marionette",
    "jquery",
    "hbs!app/applets/patient_search/templates/singleSearchResultTemplate",
    "hbs!app/applets/patient_search/templates/singleSearchResult_clinicsTemplate",
    "hbs!app/applets/patient_search/templates/singleSearchResult_roomBedIncludedTemplate"
], function(Backbone, Marionette, $, singleSearchResultTemplate, singleSearchResult_clinicsTemplate, singleSearchResult_roomBedIncludedTemplate) {

    var ENTER_KEY = 13;
    var SPACE_KEY = 32;

    var base64PatientPhoto;
    var PatientSearchResultView = Backbone.Marionette.ItemView.extend({
        source: '',
        tagName: "a",
        className: "list-group-item row-layout",
        template: singleSearchResultTemplate,
        attributes: {
            tabIndex: "0",
            onclick: "return false",
            href: ""
        },
        events: {
            "click": "selectPatient",
            "keyup": "selectPatient"
        },
        initialize: function(options) {
            this.searchApplet = options.searchApplet;
            this.source = options.source;
            if (options.templateName) {
                this.templateName = options.templateName;
            }
            if (options.source) {
                this.source = options.source;
            }
        },
        getTemplate: function() {
            if (this.templateName && (this.templateName === 'clinics')) {
                return singleSearchResult_clinicsTemplate;
            } else if (this.templateName && (this.templateName === 'roomBedIncluded')) {
                return singleSearchResult_roomBedIncludedTemplate;
            } else {
                return singleSearchResultTemplate;
            }
        },
        selectPatient: function(event) {
            if (event.keyCode !== undefined && (event.keyCode != ENTER_KEY && event.keyCode != SPACE_KEY)) {
                return;
            }
            var currentPatient = this.model;
            if (this.source === 'global') {
                this.mviGetCorrespondingIds();
            }
            $("#patient-search-results a.active").removeClass('active');
            $("#patient-search-confirmation").removeClass('hide');
            $("#global-search-results a.active").removeClass('active');
            $("#global-search-confirmation").removeClass('hide');

            $(event.currentTarget).siblings('.active').removeClass('active');
            $(event.currentTarget).addClass('active');
             this.searchApplet.patientSelected(this.model);
        },
        mviGetCorrespondingIds: function() {
            var response = $.Deferred();
            var dataToBeSent = this.model.attributes;
            dataToBeSent.dob = dataToBeSent.birthDate;
            var PostModel = Backbone.Model.extend({
                url: ADK.ResourceService.buildUrl('search-mvi-patient-sync'),
                defaults: {
                    pid: dataToBeSent.pid,
                    demographics: dataToBeSent
                }
            });

            var postModel = new PostModel();
            postModel.save({}, {
                success: function(model, resp, options) {
                    response.resolve(resp);
                }
            });

            return response.promise();
        }
    });

    return PatientSearchResultView;

});
