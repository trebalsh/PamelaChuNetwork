(function(Backbone, PamelaChu){

    var StatusDetails = Backbone.Model.extend({
        idAttribute: 'statusId',

        defaults: {
            discussionStatuses: [],
            sharedByLogins: []
        },

        urlRoot: '/pamelaChu/rest/statuses/details/',

        getStatusBefore: function(){
            var refDate = this.get('refDate');
            var statusBefore = this.get('discussionStatuses').filter(function(element){
                element.root = false;
                return (element.statusDate < refDate);
            });
            if(statusBefore.length > 0){
                statusBefore[0].first = true;
            }
            return new PamelaChu.Collections.Statuses(statusBefore);
        },

        getStatusAfter: function(){
            var refDate = this.get('refDate');
            var statusAfter = this.get('discussionStatuses').filter(function(element){
                element.root = false;
                return (element.statusDate > refDate);
            });
            var length = statusAfter.length;
            if(length > 0){
                length--;
                statusAfter[length].last = true;
            }

            return new PamelaChu.Collections.Statuses(statusAfter);
        },

        isSharedBy: function(username){
            var shares = this.get('sharedByLogins');
            var isOk = shares.some(function(element){
                return (element.username == username);
            });
            return isOk;
        }
    });

    var StatusDiscussion = Backbone.Model.extend({

        idAttribute: 'statusId',

        defaults: {
            statusId: '',
            discussions: []
        }

    });

    PamelaChu.Models.StatusDetails = StatusDetails;
    PamelaChu.Models.StatusDiscussion = StatusDiscussion;

})(Backbone, PamelaChu);