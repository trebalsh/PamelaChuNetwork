(function(Backbone, PamelaChu){

    var Search = Backbone.Model.extend({
        defaults: {
            input: ''
        }
    });

    PamelaChu.Models.Search = Search;

})(Backbone, PamelaChu);