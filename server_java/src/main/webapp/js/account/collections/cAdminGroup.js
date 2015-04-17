


var CListUserGroup = Backbone.Collection.extend({
    model : MUserGroup,
    url : function() {
        return '/pamelaChu/rest/groups/' + this.options.groupId + '/members/';
    }
});