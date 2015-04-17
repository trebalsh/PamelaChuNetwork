
_.templateSettings = {
    interpolate: /\<\@\=(.+?)\@\>/gim,
    evaluate: /\<\@(.+?)\@\>/gim,
    escape: /\<\@\-(.+?)\@\>/gim
};

    var AdminRouter = Backbone.Marionette.AppRouter.extend({
    initialize: function(){
    },

    selectMenu: function(menu) {
        $('.adminMenu a').parent().removeClass('active');
        $('.adminMenu a[href="#' + menu + '"]').parent().addClass('active');
        },

    resetView : function(){
        contentLayout.close();
        contentLayout = new ContentLayout();
        ContentContainer.show(contentLayout);
    },

    routes: {
            'profile': 'profile',
            'preferences': 'preferences',
            'password': 'password',
            'groups': 'groups',
            'groups/recommended': 'recommendedGroups',
            'groups/search':'searchGroup',
            'groups/search/:inputURL':'searchGroup',
            'groups/:id': 'editGroup',
            'tags':'tags',
            'tags/recommended':'recommendedTags',
            'tags/search':'searchTags',
            'tags/search/:inputURL':'searchTags',
            'users':'users',
            'users/recommended':'recommendedUsers',
            'users/search/:inputURL':'searchUsers',
            'users/search':'searchUsers',
            'status_of_the_day' : 'status_of_the_day',
            'files' : 'files',
            '*action': 'profile'
        },

        profile: function() {
            this.selectMenu('profile');
            var vAccountProfile = PamelaChu.Factories.Admin.profile() ;
            var vAccountProfileDestroy = PamelaChu.Factories.Admin.destroyProfile() ;

            this.resetView();
            contentLayout.region1.show(vAccountProfile);
            contentLayout.region2.show(vAccountProfileDestroy) ;
        },

        preferences: function(){
            this.selectMenu('preferences');
            var vPreferences = PamelaChu.Factories.Admin.preferences();

            this.resetView();
            contentLayout.region1.show(vPreferences);
        },

        password: function(){
            this.selectMenu('password');
            var vPassword = PamelaChu.Factories.Admin.password();

            this.resetView();
            contentLayout.region1.show(vPassword);
        },

        groups: function(){
            this.selectMenu('groups');
            var vTabMenu = PamelaChu.Factories.Admin.tabMenu('#groups-menu');
            var vNewGroup = PamelaChu.Factories.Groups.newGroup();
            var listGroups = PamelaChu.Factories.Groups.groupsSubscribe();

            this.resetView();
            contentLayout.region1.show(vNewGroup);
            contentLayout.region2.show(vTabMenu);
            contentLayout.region3.show(listGroups);
            vTabMenu.selectMenu("groups");
        },

        recommendedGroups: function(){
            this.selectMenu('groups');
            var vNewGroup = PamelaChu.Factories.Groups.newGroup();
            var vTabMenu = PamelaChu.Factories.Admin.tabMenu('#groups-menu');
            var listGroupsRecommended = PamelaChu.Factories.Groups.groupsRecommended();

            this.resetView();
            contentLayout.region1.show(vNewGroup);
            contentLayout.region2.show(vTabMenu);
            contentLayout.region3.show(listGroupsRecommended);
            vTabMenu.selectMenu("groups/recommended");
        },

        searchGroup: function(inputURL){
            this.selectMenu('groups');
            var vNewGroup = PamelaChu.Factories.Groups.newGroup();
            var vTabMenu = PamelaChu.Factories.Admin.tabMenu('#groups-menu');
            var vTabSearch = PamelaChu.Factories.Admin.tabSearch(inputURL, 'groups/search/');
            var vGroupList = PamelaChu.Factories.Search.searchGroups(inputURL);

            vGroupList.listenTo(vTabSearch, 'search', function(input){
                vGroupList.collection.fetch({data: {q : input} });
            });

            this.resetView();
            contentLayout.region1.show(vNewGroup);
            contentLayout.region2.show(vTabMenu);
            contentLayout.region3.show(vTabSearch);
            contentLayout.region4.show(vGroupList);
            vTabMenu.selectMenu("groups/search");
        },

        editGroup: function(id){
            this.selectMenu('groups');
            var vEditGroup = PamelaChu.Factories.Admin.editGroup(id);
            var vAddUserGroup = PamelaChu.Factories.Admin.addUserInGroup(id);
            var vListUsersInGroup = PamelaChu.Factories.Groups.groupUsers(id);

            this.resetView();
            contentLayout.region1.show(vEditGroup);
            contentLayout.region2.show(vAddUserGroup);
            contentLayout.region3.show(vListUsersInGroup);
        },

        tags: function(){
            this.selectMenu('tags');
            var vTabMenu = PamelaChu.Factories.Admin.tabMenu('#tags-menu');
            var listTags = PamelaChu.Factories.Home.tagsFollow();

            this.resetView();
            contentLayout.region1.show(vTabMenu);
            contentLayout.region2.show(listTags);
            vTabMenu.selectMenu("tags");
        },

        recommendedTags: function(){
            this.selectMenu('tags');
            var vTabMenu = PamelaChu.Factories.Admin.tabMenu('#tags-menu');
            var listTags = PamelaChu.Factories.Home.tagsRecommended() ;

            this.resetView();
            contentLayout.region1.show(vTabMenu);
            contentLayout.region2.show(listTags);
            vTabMenu.selectMenu("tags/recommended");
        },

        searchTags: function(inputURL){
            this.selectMenu('tags');
            var vTabMenu = PamelaChu.Factories.Admin.tabMenu('#tags-menu');
            var vTabSearch = PamelaChu.Factories.Admin.tabSearch(inputURL, 'tags/search/');
            var vTagList = PamelaChu.Factories.Search.searchTags(inputURL);

            vTagList.listenTo(vTabSearch, 'search', function(input){
                vTagList.collection.fetch({data: {q : input} });
            });

            this.resetView();
            contentLayout.region1.show(vTabMenu);
            contentLayout.region2.show(vTabSearch);
            contentLayout.region3.show(vTagList);
            vTabMenu.selectMenu("tags/search");
        },

        users: function(){
            this.selectMenu('users');
            var vTabMenu = PamelaChu.Factories.Admin.tabMenu('#users-menu');
            var listFriends = PamelaChu.Factories.Profile.friends(PamelaChu.app.user.get('username'));

            this.resetView();
            contentLayout.region1.show(vTabMenu);
            contentLayout.region2.show(listFriends);
            vTabMenu.selectMenu("users");
        },

        recommendedUsers: function(){
            this.selectMenu('users');
            var vTabMenu = PamelaChu.Factories.Admin.tabMenu('#users-menu');
            var listFollowers = PamelaChu.Factories.Home.usersRecommended();

            this.resetView();
            contentLayout.region1.show(vTabMenu);
            contentLayout.region2.show(listFollowers);
            vTabMenu.selectMenu("users/recommended");
        },

        searchUsers: function(inputURL){
            this.selectMenu('users');
            var vTabMenu = PamelaChu.Factories.Admin.tabMenu('#users-menu');
            var vTabSearch = PamelaChu.Factories.Admin.tabSearch(inputURL, 'users/search/');
            var vListUser = PamelaChu.Factories.Search.searchUsers(inputURL);

            vListUser.listenTo(vTabSearch, 'search', function(input){
              vListUser.collection.fetch({data: {q : input} });
            });

            this.resetView();
            contentLayout.region1.show(vTabMenu);
            contentLayout.region2.show(vTabSearch);
            contentLayout.region3.show(vListUser);
            vTabMenu.selectMenu("users/search");
        },

        status_of_the_day: function(){
            this.selectMenu('status_of_the_day');
            var vDailyStats = PamelaChu.Factories.Admin.dailyStats();

            this.resetView();
            contentLayout.region1.show(vDailyStats);
        },

        files: function(){
            this.selectMenu('files');

            var vFileHeader = new PamelaChu.Views.FilesMenu;
            var vQuotaFiles = PamelaChu.Factories.Admin.quotaFiles();
            var vListFiles = PamelaChu.Factories.Admin.listFiles();
            this.resetView();
            contentLayout.region1.show(vFileHeader);
            contentLayout.region2.show(vQuotaFiles);
            contentLayout.region4.show(vListFiles);
            this.selectMenu('files');
        }
    });


