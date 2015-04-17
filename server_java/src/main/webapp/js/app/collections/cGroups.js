(function(Backbone, PamelaChu){

    var Groups = Backbone.Collection.extend({
        url: '/pamelaChu/rest/groups',
        model: PamelaChu.Models.Group
    });

    var GroupsSuscribe = Groups.extend({
        url: function(){
            return '/pamelaChu/rest/groups';
        }
    })

    var GroupsRecommended = Groups.extend({
        url: function(){
            return '/pamelaChu/rest/groupmemberships/suggestions';
        }
    })

    var SearchGroups = Groups.extend({
        url: function(){
            return '/pamelaChu/rest/search/groups';
        }
    });

    var SearchTags = Groups.extend({
        url: function(){
            return '/pamelaChu/rest/search/tags';
        }
    });

    PamelaChu.Collections.Groups = Groups;
    PamelaChu.Collections.GroupsList = GroupsSuscribe;
    PamelaChu.Collections.GroupsRecommended = GroupsRecommended;
    PamelaChu.Collections.SearchGroups = SearchGroups;
    PamelaChu.Collections.SearchTags = SearchTags;
})(Backbone, PamelaChu);
