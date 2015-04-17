(function(Backbone, PamelaChu){

    var CFiles = Backbone.Collection.extend({
        model: PamelaChu.Models.File,
        initialize: function(){
            this.initNext();
        },

        initNext: function(){
            var self = this;
            this.next = _.once(function(cb){
                var options = {
                    remove:false,
                    merge:true,
                    success: function(collection, response){
                        if(response.length > 1) self.initNext();
                        if (cb) cb();
                    }
                };
                if(self.last())
                    options = _.extend(options, {
                        data: {
                            finish:  self.last().get('attachmentId')
                        }
                    });
                return self.fetch(options);
            });
        }

    });

    var CFilesPage = CFiles.extend({
        url: '/pamelaChu/rest/attachments'
    });

    PamelaChu.Collections.Files = CFiles;
    PamelaChu.Collections.FilesPage = CFilesPage;

})(Backbone, PamelaChu);