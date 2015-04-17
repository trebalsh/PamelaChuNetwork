
var CDailyStat = Backbone.Collection.extend({
    url:'/pamelaChu/rest/stats/day',
    defaults :{
        "username" : '',
        "statusCount" : ''
    }
});