(function(Backbone, PamelaChu){

    var statusDetails = new (Backbone.Collection.extend({
        model : PamelaChu.Models.StatusDetails
    }))();

    PamelaChu.Factories.Status = {

        getStatusDetail: function(id){
            var statusDetail = statusDetails.get(id);
            if(!statusDetail){
                var statusDetail = new PamelaChu.Models.StatusDetails({
                    statusId: id
                });
                statusDetails.add(statusDetail);
            }
            return statusDetail;
        },

        getTimelineRegion: function(){
            return new PamelaChu.Views.StatusTimelineRegion();
        },

        getWelcomeRegion: function(){
            return new PamelaChu.Views.WelcomeRegion();
        },

        getUpdateButton: function(){
            return new PamelaChu.Views.StatusUpdateButton();
        },

        statusesTimeline: function(){
            return new PamelaChu.Views.Statuses({
                collection: new PamelaChu.Collections.StatusesTimeline()                
            });
        },

        statusesFavorites: function(){
            return new PamelaChu.Views.Statuses({
                collection: new PamelaChu.Collections.StatusesFavorites()
            });
        },

        statusesMentions: function(){
            return new PamelaChu.Views.Statuses({
                collection: new PamelaChu.Collections.StatusesMentions()
            });
        },

        statusesCompany: function(){
            return new PamelaChu.Views.Statuses({
                collection: new PamelaChu.Collections.StatusesCompany()
            });
        },

        statusesTags: function(tagName){
            var c = new PamelaChu.Collections.StatusesTags();
            c.tag = tagName;

            return new PamelaChu.Views.Statuses({
                collection: c
            });
        },

        statusesGroups: function(groupId){
            var c = new PamelaChu.Collections.StatusesGroups();
            c.group = groupId;

            return new PamelaChu.Views.Statuses({
                collection: c
            });
        }, 

        statusesSearch: function(input){
            var c = new PamelaChu.Collections.StatusesSearch();
            c.input = input;
            
            return new PamelaChu.Views.Statuses({
                collection: c
            });
        }
    };

})(Backbone, PamelaChu);