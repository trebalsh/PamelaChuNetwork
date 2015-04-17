(function(Backbone, _, PamelaChu, Modernizr, window){

    var User = Backbone.Model.extend({
        initialize: function(){
          this.listenTo(this, 'sync', function(model){
            if(PamelaChu.app.user.id === model.id)
              PamelaChu.app.user.set(model.toJSON());
          });
        },

        idAttribute: 'username',

        defaults: {
            login: '',
            avatar: '',
            firstName: '',
            lastName: '',
            jobTitle: '',
            phoneNumber: '',
            attachmentsSize: 0,
            friendsCount: 0,
            followersCount: 0,
            statusCount: 0,
            you: false,
            friend: false,
            follower: false,
            activated: true
        },

        urlRoot: '/pamelaChu/rest/users/',

        toJSON: function(){
            var attr = Backbone.Model.prototype.toJSON.call(this);

            attr.fullName = this.getFullName();
            attr.avatarURL = this.getAvatarURL();

            return attr;
        },

        getFullName: function(){
            var fullName = [];

            if (this.get('firstName')) fullName.push(this.get('firstName'));
            if (this.get('lastName')) fullName.push(this.get('lastName'));

            return fullName.join(' ');
        },

        getAvatarURL: function(){
            return (this.get('avatar'))? '/pamelaChu/avatar/' + this.get('avatar') + '/photo.jpg': '/img/default_image_profile.png';
        },

        toggleIsFriend: function(options){
            this.fetch({
                friend: !this.model.get('friend')
            }, options || null);
        }
    });


    var UserGroup = User.extend({
        urlRoot : ''
    });

    PamelaChu.Models.User = User;
    PamelaChu.Models.UserGroup = UserGroup;


})(Backbone, _, PamelaChu, Modernizr, window);