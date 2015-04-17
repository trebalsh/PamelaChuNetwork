(function(Backbone, PamelaChu){

    var groups = new (Backbone.Collection.extend({
        model : PamelaChu.Models.Group
    }))();

    PamelaChu.Factories.Groups = {
        groupsHeader: function(groupId){
            var group = groups.get(groupId);
            if(!group){
                group = new PamelaChu.Models.Group({
                    groupId: groupId
                });
                groups.add(group);
                group.fetch({
                    error: function(){
                        PamelaChu.app.router.defaults();
                    }
                });
            }

            return new PamelaChu.Views.GroupsHeader({
              model: group
            });
        },
        groupsBody: function(groupId){
            return new PamelaChu.Views.GroupsBody({
                group: groupId
            });
        }, 
        groupsUser: function(groupId){
            var c = new PamelaChu.Collections.UsersInGroup();
            c.group = groupId;
            return new PamelaChu.Views.UserList({
                collection: c
            });
        }  ,

        groupUsers: function(groupId){
            var c = new PamelaChu.Collections.UsersInGroup();
            c.group = groupId;
            c.fetch();
            return new PamelaChu.Views.UserGroupList({
                collection: c
            });
        },

        groupsSubscribe: function(){
            var c = new PamelaChu.Collections.GroupsList();
            c.fetch();
            return new PamelaChu.Views.GroupsList({
                collection: c
            });
        },

        groupsRecommended: function(){
            var c = new PamelaChu.Collections.GroupsRecommended();
            c.fetch();
            return new PamelaChu.Views.GroupsList({
                collection: c
            });
        },

        newGroup: function(){
            var mGroup = new MGroup();
            var vNewGroup = new VAddGroup({model : mGroup});

            return vNewGroup
        }


    };

})(Backbone, PamelaChu);