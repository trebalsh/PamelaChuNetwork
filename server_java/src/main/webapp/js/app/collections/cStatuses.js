(function(Backbone, PamelaChu){

    var Statuses = Backbone.Collection.extend({
        initialize: function(){
            this.initStorage();
            this.initNext();
            this.initRefresh();
        },
        model: PamelaChu.Models.Status,
        initStorage: function(){

        },
        initNext: function(){
            var self = this;
            this.next = _.once(function(cb){
                var options = {
                    remove:false,
                    merge:true,
                    success: function(collection, response){
                        if(response.length > 1) self.initNext();
                        if (cb) cb();
                    }
                };
                if(self.last())
                    options = _.extend(options, {
                        data: {
                            finish:  self.last().get('timelineId')
                        }
                    });
                return self.fetch(options);
            });
        },
        initRefresh: function(){
            var self = this;
            this.refresh = _.once(function(cb){
                var options = {
                    remove:false,
                    merge:true,
                    at:0,
                    success: function(){
                        PamelaChu.app.trigger('statusPending', self.filter(function(model){
                            return model.hidden;
                        }));
                        self.initRefresh();
                        if (cb) cb();
                    }
                };
                if(self.first())
                    options = _.extend(options, {
                        data: {
                            start: self.first().get('timelineId')
                        }
                    });
                return self.fetch(options);
            });
        }
    });

    var StatusesTimeline = Statuses.extend({
        url: '/pamelaChu/rest/statuses/home_timeline'
    });

    var StatusesFavorites = Statuses.extend({
        url: '/pamelaChu/rest/favorites'
    });

    var StatusesMentions = Statuses.extend({
        model: PamelaChu.Models.Status,
        url: '/pamelaChu/rest/mentions'
    });

    var StatusesCompany = Statuses.extend({
        model: PamelaChu.Models.Status,
        url: '/pamelaChu/rest/company'
    });

    var StatusesTags = Statuses.extend({
        model: PamelaChu.Models.Status,
        url: function(){
            return '/pamelaChu/rest/tags/' + this.tag + '/tag_timeline';
        }
    });

    var StatusesUsers = Statuses.extend({
        model: PamelaChu.Models.Status,
        url: function(){
            return '/pamelaChu/rest/statuses/' + this.user + '/timeline';
        }
    });

    var StatusesGroups = Statuses.extend({
        model: PamelaChu.Models.Status,
        url: function(){
            return '/pamelaChu/rest/groups/' + this.group + '/timeline';
        }
    });

    var StatusesSearch = Statuses.extend({
        model: PamelaChu.Models.Status,
        url: function(){
            return '/pamelaChu/rest/search/status?q='+this.input;
        }
    });

    PamelaChu.Collections.Statuses = Statuses;
    PamelaChu.Collections.StatusesTimeline = StatusesTimeline;
    PamelaChu.Collections.StatusesFavorites = StatusesFavorites;
    PamelaChu.Collections.StatusesMentions = StatusesMentions;
    PamelaChu.Collections.StatusesCompany = StatusesCompany;
    PamelaChu.Collections.StatusesTags = StatusesTags;
    PamelaChu.Collections.StatusesUsers = StatusesUsers;
    PamelaChu.Collections.StatusesGroups = StatusesGroups;
    PamelaChu.Collections.StatusesSearch = StatusesSearch;

})(Backbone, PamelaChu);