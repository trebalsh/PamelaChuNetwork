(function(Backbone, _, PamelaChu){

    var SearchBody = Backbone.Marionette.Layout.extend({
        template: '#SearchBody',
        regions: {
            header: {
                selector: ".tatams-content-title"
            },
            tatams: {
                selector: ".tatams-container"
            }
        }
    });

    var SearchHeader = Backbone.Marionette.ItemView.extend({
        template: '#SearchHeader'
    });

    PamelaChu.Views.SearchHeader = SearchHeader;
    PamelaChu.Views.SearchBody = SearchBody;

})(Backbone, _, PamelaChu);