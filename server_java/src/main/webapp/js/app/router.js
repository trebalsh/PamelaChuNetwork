(function(Backbone, _, PamelaChu){
    var Router = Backbone.Marionette.AppRouter.extend({
        routes: {
            'timeline' : 'homeTimeline',
            'mentions' : 'homeMentions',
            'favorites' : 'homeFavorites',
            'tags/:tag' : 'tags',
            'status/:id' : 'status',
            'users/:username' : 'profile',
            'users/:username/friends' : 'profileFriends',
            'users/:username/followers' : 'profileFollowers',
            'groups/:group' : 'groups',
            'groups/:group/members' : 'groupsMembers',
            'search/:input' : 'search',
            'company' : 'company',
            '*actions' : 'defaults'
        },

        // Home

        defaults: function() {
            Backbone.history.navigate('timeline', true);
        },

        homeTimeline: function(){
            if (!ios) {
                PamelaChu.app.navbar.displaySearch();
                var homeSide = PamelaChu.Factories.Home.homeSide();
                PamelaChu.app.side.show(homeSide);
                homeSide.tagTrends.show(PamelaChu.Factories.Home.tagTrends());
                homeSide.cardProfile.show(PamelaChu.Factories.Home.cardProfile());
                homeSide.groups.show(PamelaChu.Factories.Home.groups());
                homeSide.whoToFollow.show(PamelaChu.Factories.Home.whoToFollow());
            }
            PamelaChu.app.header.close();

            var homeBody = PamelaChu.Factories.Home.homeBody('timeline');

            var region = PamelaChu.Factories.Status.getTimelineRegion();
            var timeline = PamelaChu.Factories.Status.statusesTimeline();
            PamelaChu.app.body.show(homeBody);

            homeBody.tatams.show(region);

            region.refresh.show(PamelaChu.Factories.Status.getUpdateButton());

            region.timeline.show(timeline);

            timeline.collection.fetch({
                success: function () {
                    if (timeline.collection.length == 0 && showWelcome == true) {
                        homeBody.welcome.show(PamelaChu.Factories.Status.getWelcomeRegion());
                        $('#WelcomeModal').modal('show');
                    }
                }
            });

            homeBody.show('timeline');
        },

        homeMentions: function(){
            PamelaChu.app.header.close();

            if (!ios) { 
                PamelaChu.app.navbar.displaySearch();
                var homeSide = PamelaChu.Factories.Home.homeSide();
                PamelaChu.app.side.show(homeSide);
                homeSide.tagTrends.show(PamelaChu.Factories.Home.tagTrends());
                homeSide.whoToFollow.show(PamelaChu.Factories.Home.whoToFollow());
                homeSide.cardProfile.show(PamelaChu.Factories.Home.cardProfile());
            }

            var homeBody = PamelaChu.Factories.Home.homeBody('mentions');

            var region = PamelaChu.Factories.Status.getTimelineRegion();
            var timeline = PamelaChu.Factories.Status.statusesMentions();
            PamelaChu.app.body.show(homeBody);

            homeBody.tatams.show(region);

            region.refresh.show(PamelaChu.Factories.Status.getUpdateButton());

            region.timeline.show(timeline);

            timeline.collection.fetch();

            homeBody.show('mentions');

        },

        homeFavorites: function(){
            PamelaChu.app.header.close();

            if (!ios) {
                PamelaChu.app.navbar.displaySearch();
                var homeSide = PamelaChu.Factories.Home.homeSide();
                PamelaChu.app.side.show(homeSide);
                homeSide.tagTrends.show(PamelaChu.Factories.Home.tagTrends());
                homeSide.whoToFollow.show(PamelaChu.Factories.Home.whoToFollow());
                homeSide.cardProfile.show(PamelaChu.Factories.Home.cardProfile());
            }
            var homeBody = PamelaChu.Factories.Home.homeBody('favorites');

            var region = PamelaChu.Factories.Status.getTimelineRegion();
            var timeline = PamelaChu.Factories.Status.statusesFavorites();
            PamelaChu.app.body.show(homeBody);

            homeBody.tatams.show(region);

            region.refresh.show(PamelaChu.Factories.Status.getUpdateButton());

            region.timeline.show(timeline);

            timeline.collection.fetch();

            homeBody.show('favorites');

        },

        tags: function(tag) {

            if (!ios) {
                PamelaChu.app.navbar.displaySearch("#"+tag);
                var homeSide = PamelaChu.Factories.Home.homeSide();
                PamelaChu.app.side.show(homeSide);
                homeSide.groups.show(PamelaChu.Factories.Home.groups());
                homeSide.tagTrends.show(PamelaChu.Factories.Home.tagTrends());
                homeSide.cardProfile.show(PamelaChu.Factories.Home.cardProfile());
            }
            var tagsBody = PamelaChu.Factories.Tags.tagsBody("#"+tag);

            var region = PamelaChu.Factories.Status.getTimelineRegion();
            var timeline = PamelaChu.Factories.Status.statusesTags(tag);
            PamelaChu.app.body.show(tagsBody);

            tagsBody.tatams.show(region);

            tagsBody.header.show(PamelaChu.Factories.Tags.tagsHeader(tag));

            region.refresh.show(PamelaChu.Factories.Status.getUpdateButton());

            region.timeline.show(timeline);

            timeline.collection.fetch();
        },

        search: function(input){
            PamelaChu.app.header.close();
            if (!ios) {
                var homeSide = PamelaChu.Factories.Home.homeSide();
                PamelaChu.app.side.show(homeSide);
                homeSide.groups.show(PamelaChu.Factories.Home.groups());
                homeSide.tagTrends.show(PamelaChu.Factories.Home.tagTrends());
                homeSide.cardProfile.show(PamelaChu.Factories.Home.cardProfile());
                PamelaChu.app.navbar.displaySearch(input);
            }

            var searchBody = PamelaChu.Factories.Search.searchBody(input);

            var region = PamelaChu.Factories.Status.getTimelineRegion();
            var timeline = PamelaChu.Factories.Status.statusesSearch(input);
            PamelaChu.app.body.show(searchBody);
            searchBody.header.show(PamelaChu.Factories.Search.searchHeader(input));

            searchBody.tatams.show(region);            
            region.timeline.show(timeline);
            timeline.collection.fetch();

        },

        status: function(statusId) {
            if (!ios) {
                PamelaChu.app.navbar.displaySearch();
            }
            var status = new PamelaChu.Models.Status({
                statusId: statusId
            });
            status.fetch({
                error: function(){
                    PamelaChu.app.router.defaults();
                },
                success: function(model){
                    var username = model.get('username');

                    if (!ios) {
                        // PamelaChu.app.header.show(PamelaChu.Factories.Profile.profileHeader(username));
                        PamelaChu.app.navbar.displaySearch("@"+username);
                        var profileSide = PamelaChu.Factories.Profile.profileSide();
                        PamelaChu.app.side.show(profileSide);

                        profileSide.informations.show(PamelaChu.Factories.Profile.informations(username));
                        profileSide.stats.show(PamelaChu.Factories.Profile.stats(username));
                        profileSide.tagTrends.show(PamelaChu.Factories.Profile.tagTrends(username));
                    }
                    var profileBody = PamelaChu.Factories.Profile.profileBody(username);

                    PamelaChu.app.body.show(profileBody);

                    var statusView = new PamelaChu.Views.StatusItem({
                        model : model
                    });

                    profileBody.tatams.show(statusView);
                    profileBody.header.show(PamelaChu.Factories.Profile.profileHeader(username));

                    statusView.$el.slideDown();
                    profileBody.show('timeline');

                }
            });
        },

        profile: function(username) {
            // PamelaChu.app.header.show(PamelaChu.Factories.Profile.profileHeader(username));

            if (!ios) {
                PamelaChu.app.navbar.displaySearch("@"+username);
                var profileSide = PamelaChu.Factories.Profile.profileSide();
                PamelaChu.app.side.show(profileSide);
                profileSide.informations.show(PamelaChu.Factories.Profile.informations(username));
                profileSide.stats.show(PamelaChu.Factories.Profile.stats(username));
                profileSide.tagTrends.show(PamelaChu.Factories.Profile.tagTrends(username));
            }

            var profileBody = PamelaChu.Factories.Profile.profileBody(username);

            var region = PamelaChu.Factories.Status.getTimelineRegion();
            var timeline = PamelaChu.Factories.Profile.statuses(username);
            PamelaChu.app.body.show(profileBody);

            profileBody.tatams.show(region);
            profileBody.header.show(PamelaChu.Factories.Profile.profileHeader(username));

            region.refresh.show(PamelaChu.Factories.Status.getUpdateButton());

            region.timeline.show(timeline);

            timeline.collection.fetch();

            profileBody.show('timeline');
        },

        profileFriends: function(username) {
            // PamelaChu.app.header.show(PamelaChu.Factories.Profile.profileHeader(username));

            if (!ios) {
                PamelaChu.app.navbar.displaySearch("@"+username);
                var profileSide = PamelaChu.Factories.Profile.profileSide();
                PamelaChu.app.side.show(profileSide);
                profileSide.stats.show(PamelaChu.Factories.Profile.stats(username));
                profileSide.informations.show(PamelaChu.Factories.Profile.informations(username));
                profileSide.tagTrends.show(PamelaChu.Factories.Profile.tagTrends(username));
            }
            var profileBody = PamelaChu.Factories.Profile.profileBody(username);

            var region = PamelaChu.Factories.Status.getTimelineRegion();
            var timeline = PamelaChu.Factories.Profile.friends(username);
            PamelaChu.app.body.show(profileBody);

            profileBody.tatams.show(region);
            profileBody.header.show(PamelaChu.Factories.Profile.profileHeader(username));

            region.refresh.show(PamelaChu.Factories.Status.getUpdateButton());

            region.timeline.show(timeline);

            window.c = timeline.collection;
            timeline.collection.fetch();

            profileBody.show('friends');
        },

        profileFollowers: function(username) {
            // PamelaChu.app.header.show(PamelaChu.Factories.Profile.profileHeader(username));

            if (!ios) {
                PamelaChu.app.navbar.displaySearch("@"+username);
                var profileSide = PamelaChu.Factories.Profile.profileSide();
                PamelaChu.app.side.show(profileSide);
                profileSide.stats.show(PamelaChu.Factories.Profile.stats(username));
                profileSide.informations.show(PamelaChu.Factories.Profile.informations(username));
                profileSide.tagTrends.show(PamelaChu.Factories.Profile.tagTrends(username));
            }
            var profileBody = PamelaChu.Factories.Profile.profileBody(username);

            var region = PamelaChu.Factories.Status.getTimelineRegion();
            var timeline = PamelaChu.Factories.Profile.followers(username);
            PamelaChu.app.body.show(profileBody);

            profileBody.tatams.show(region);
            profileBody.header.show(PamelaChu.Factories.Profile.profileHeader(username));

            region.refresh.show(PamelaChu.Factories.Status.getUpdateButton());

            region.timeline.show(timeline);

            timeline.collection.fetch();

            profileBody.show('followers');
        },

        groups: function(group){
            // PamelaChu.app.header.show(PamelaChu.Factories.Groups.groupsHeader(group));

            if (!ios) {
                PamelaChu.app.navbar.displaySearch();
                var homeSide = PamelaChu.Factories.Home.homeSide();
                PamelaChu.app.side.show(homeSide);
                homeSide.tagTrends.show(PamelaChu.Factories.Home.tagTrends());
                homeSide.groups.show(PamelaChu.Factories.Home.groups());
                homeSide.cardProfile.show(PamelaChu.Factories.Home.cardProfile());
            }
            var groupsBody = PamelaChu.Factories.Groups.groupsBody(group);

            var region = PamelaChu.Factories.Status.getTimelineRegion();
            var timeline = PamelaChu.Factories.Status.statusesGroups(group);
            PamelaChu.app.body.show(groupsBody);

            groupsBody.tatams.show(region);
            groupsBody.header.show(PamelaChu.Factories.Groups.groupsHeader(group));

            region.refresh.show(PamelaChu.Factories.Status.getUpdateButton());

            region.timeline.show(timeline);

            timeline.collection.fetch();

            groupsBody.show('timeline');
        },

        groupsMembers: function(group){
            if (!ios) {
                PamelaChu.app.navbar.displaySearch();
                var homeSide = PamelaChu.Factories.Home.homeSide();
                PamelaChu.app.side.show(homeSide);
                homeSide.tagTrends.show(PamelaChu.Factories.Home.tagTrends());
                homeSide.groups.show(PamelaChu.Factories.Home.groups());
                homeSide.cardProfile.show(PamelaChu.Factories.Home.cardProfile());
            }
            // PamelaChu.app.header.show(PamelaChu.Factories.Groups.groupsHeader(group));

            var groupsBody = PamelaChu.Factories.Groups.groupsBody(group);
            var region = PamelaChu.Factories.Status.getTimelineRegion();
            var usersInGroup = PamelaChu.Factories.Groups.groupsUser(group);

            PamelaChu.app.body.show(groupsBody);

            groupsBody.tatams.show(region);
            groupsBody.header.show(PamelaChu.Factories.Groups.groupsHeader(group));

            region.timeline.show(usersInGroup);

            usersInGroup.collection.fetch();
            
            groupsBody.show('members');
        },

        company: function(){

            PamelaChu.app.navbar.displaySearch();
            var homeSide = PamelaChu.Factories.Home.homeSide();
            PamelaChu.app.side.show(homeSide);
            homeSide.tagTrends.show(PamelaChu.Factories.Home.tagTrends());
            homeSide.whoToFollow.show(PamelaChu.Factories.Home.whoToFollow());

            PamelaChu.app.header.close();

            var homeBody = PamelaChu.Factories.Home.homeBody('company');

            var region = PamelaChu.Factories.Status.getTimelineRegion();
            var timeline = PamelaChu.Factories.Status.statusesCompany();
            PamelaChu.app.body.show(homeBody);

            homeBody.tatams.show(region);

            region.refresh.show(PamelaChu.Factories.Status.getUpdateButton());

            region.timeline.show(timeline);

            timeline.collection.fetch();
        }
    });

    PamelaChu.Router = Router;
})(Backbone, _, PamelaChu);