(function(Backbone, _, PamelaChu){

    PamelaChu.Factories.Home = {
        homeSide: function(){
            return new PamelaChu.Views.HomeSide();
        },
        homeBody: function(tabName){
            var model = new PamelaChu.Models.HomeBody({'tabName':tabName});
            return new PamelaChu.Views.HomeBody({'model': model});
        },
       tagTrends: function(username){
            var data = _.extend({
                popular: true
            }, (username)?{
                user: username
            }: null);

            var tags = new PamelaChu.Collections.Tags();

            View = (username)?PamelaChu.Views.TagTrendsProfile:PamelaChu.Views.TagTrends;
            tagTrends = new View({
                collection: tags
            });

            tags.fetch({
                data: data
            });

            return tagTrends;
        },

        tagsFollow: function(){
            var c = new PamelaChu.Collections.TagsFollow();
            c.fetch();
            return new PamelaChu.Views.TagsList({
                collection: c
            });
        },

        tagsRecommended : function(){
            var c = new PamelaChu.Collections.TagsRecommended();
            c.fetch();
            return new PamelaChu.Views.TagsList({
                collection: c
            });
        },

        cardProfile: function(){
            var cardProfile = new PamelaChu.Views.CardProfile({
                model: PamelaChu.app.user
            });

            cardProfile.model.fetch();
            return cardProfile;
        },
        groups: function(){
            var groups = new PamelaChu.Views.Groups({
                collection: new PamelaChu.Collections.Groups(PamelaChu.app.groups.where({archivedGroup: false}))
            });

            return groups;
        },
        whoToFollow: function(){
            var c = new PamelaChu.Collections.WhoToFollow();
            c.fetch();
            return new PamelaChu.Views.WhoToFollow({
                collection: c
            });
        },

        usersRecommended: function(){
            var c = new PamelaChu.Collections.WhoToFollow();
            c.fetch();
            return  new PamelaChu.Views.UserList({
                collection: c
            });
        }
    };

})(Backbone, _, PamelaChu);