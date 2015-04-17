(function(Backbone, PamelaChu){

    var tags = new (Backbone.Collection.extend({
        model : PamelaChu.Models.Tag
    }))();

    var tagsBody, tagsHeader;

    PamelaChu.Factories.Tags = {
        tagsBody: function(tagName){          
            tagsBody = new PamelaChu.Views.TagsBody();

            return tagsBody;
        },
        tagsHeader: function(tagName){
            var tag = tags.get(tagName);
            if(!tag){
                tag = new PamelaChu.Models.Tag({
                    name: tagName
                });
                tags.add(tag);
                tag.fetch({
                    error: function(){
                        PamelaChu.app.router.defaults();
                    }
                });
            }

            return new PamelaChu.Views.TagsHeader({
              model: tag
            });
        }



    };

})(Backbone, PamelaChu);