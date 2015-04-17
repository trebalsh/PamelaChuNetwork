
var MPreferences = Backbone.Model.extend({
    url: '/pamelaChu/rest/account/preferences',

    defaults: {
        mentionEmail: '',
        dailyDigest :'',
        weeklyDigest : '',
        rssUidActive : '',
        rssUid : ''
    }
});