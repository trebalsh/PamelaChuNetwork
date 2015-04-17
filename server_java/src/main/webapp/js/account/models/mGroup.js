
var MGroup = Backbone.Model.extend({
    urlRoot: '/pamelaChu/rest/groups',
    idAttribute: 'groupId',
    defaults: {
        name: '',
        description: '',
        publicGroup: true,
        archivedGroup: false
    }
});