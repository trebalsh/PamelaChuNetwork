(function(Backbone, PamelaChu){

    var PostStatus = Backbone.Model.extend({
        defaults: {
            content: '',
            groupId: '',
            attachmentIds: [],
            replyTo: '',
            geoLocalization:'' ,
            statusPrivate: false
        },

        urlRoot: '/pamelaChu/rest/statuses/',

        addAttachment: function(id){
            var attachments = this.get('attachmentIds');
            attachments.push(id);
            this.set('attachmentIds', attachments);
        },

        resetAttachments: function() {
            this.set('attachmentIds', []);
        }
    });

    PamelaChu.Models.PostStatus = PostStatus;

})(Backbone, PamelaChu);