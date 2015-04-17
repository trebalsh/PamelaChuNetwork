(function(Backbone, PamelaChu){

    var HomeBody = Backbone.Model.extend({
        idAttribute: 'tabName',

        defaults: {
            tabName: 'timeline'
        }

    });

    PamelaChu.Models.HomeBody = HomeBody;


})(Backbone, PamelaChu);