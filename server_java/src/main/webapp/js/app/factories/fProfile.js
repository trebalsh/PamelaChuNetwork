(function(Backbone, _, PamelaChu){

    var users = new (Backbone.Collection.extend({
        model : PamelaChu.Models.User
    }))();

    PamelaChu.Factories.Profile = {
        profileSide: function(username){
            return new PamelaChu.Views.ProfileSide();

        },

        actions: function(username){
            var user = this.getUsers(username);

        },

        tagTrends: function(username){
            return PamelaChu.Factories.Home.tagTrends(username);
        },

        stats: function(username){
            var user = this.getUsers(username);

            return new PamelaChu.Views.ProfileStats({
                model: user
            });
        },

        informations: function(username){
            var user = this.getUsers(username);

            return new PamelaChu.Views.ProfileInformations({
                model: user
            });
        },

        profileBody: function(username){
            return new PamelaChu.Views.ProfileBody({
                user: username
            });
        },
        profileHeader: function(username){
            var user = this.getUsers(username);

            return new PamelaChu.Views.ProfileHeader({
                model: user
            });
        },

        getUsers: function(username){
            var user = users.get(username);
            if(!user){
                user = new PamelaChu.Models.User({
                    username: username
                });
                users.add(user);
                user.fetch({
                    error: function(){
                        PamelaChu.app.router.defaults();
                    }
                });
            }

            return user;
        },

        statuses: function(username){
            var c = new PamelaChu.Collections.StatusesUsers();
            c.user = username;

            return new PamelaChu.Views.Statuses({
                collection: c
            });
        },

        friends: function(username){
            var c = new PamelaChu.Collections.Friends();
            c.user = username;
            c.fetch();
            return  new PamelaChu.Views.UserList({
                collection: c,
                itemViewOptions:{desactivable:true}
            });
        },

        followers: function(username){
            var c = new PamelaChu.Collections.Followers();
            c.user = username;
            return  new PamelaChu.Views.UserList({
                collection: c
            });
        }
    };

})(Backbone, _, PamelaChu);