(function(Backbone, PamelaChu){

    var Tags = Backbone.Collection.extend({
        url: '/pamelaChu/rest/tags',
        model: PamelaChu.Models.Tag
    });

    var TagsFollow = Tags.extend({
        url: function(){
            return '/pamelaChu/rest/tags';
        }
    });

    var TagsRecommended = Tags.extend({
        url: function(){
            return '/pamelaChu/rest/tags/popular';
        }
    });


    PamelaChu.Collections.Tags = Tags;
    PamelaChu.Collections.TagsFollow = TagsFollow;
    PamelaChu.Collections.TagsRecommended = TagsRecommended;

})(Backbone, PamelaChu);

