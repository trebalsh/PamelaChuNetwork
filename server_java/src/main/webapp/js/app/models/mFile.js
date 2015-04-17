(function(Backbone, PamelaChu){

    var MFile = Backbone.Model.extend({
        idAttribute: 'attachmentId',
        initialize: function(){
        }
    });

    var MQuota = Backbone.Model.extend({
        url : '/pamelaChu/rest/attachments/quota',

        parse : function(data){
            var response = {};

            response.quota = data[0];

            return response;
        },

        defaults:
        {
            quota : ''
        }
    });

    PamelaChu.Models.File = MFile;
    PamelaChu.Models.Quota = MQuota;

})(Backbone, PamelaChu);