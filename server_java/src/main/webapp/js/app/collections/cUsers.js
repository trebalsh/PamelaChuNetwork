(function(Backbone, PamelaChu){

    var Users = Backbone.Collection.extend({
        model: PamelaChu.Models.User
    });

    var UsersInGroup = Backbone.Collection.extend({
        model: PamelaChu.Models.UserGroup,

        url: function(){
            return '/pamelaChu/rest/groups/' + this.group + '/members/';
        }
    });

    var Friends = Users.extend({
        url: function(){
          return '/pamelaChu/rest/users/' + this.user + '/friends';
        }
    });

    var Followers = Users.extend({
        url: function(){
            return '/pamelaChu/rest/users/' + this.user + '/followers';
        }
    });

    var WhoToFollow = Users.extend({
        url: function(){
          return '/pamelaChu/rest/users/suggestions';
        }
    });

    var SearchUsers = Users.extend({
        url: function(){
            return '/pamelaChu/rest/search/users';
        }
    });



    PamelaChu.Collections.Users = Users;
    PamelaChu.Collections.Friends = Friends;
    PamelaChu.Collections.Followers = Followers;
    PamelaChu.Collections.WhoToFollow = WhoToFollow;
    PamelaChu.Collections.UsersInGroup = UsersInGroup;
    PamelaChu.Collections.SearchUsers = SearchUsers;

})(Backbone, PamelaChu);