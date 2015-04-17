(function(Backbone, _, PamelaChu){
    var CardProfile = Backbone.Marionette.ItemView.extend({
        template: '#CardProfile',
        modelEvents: {
            'change': 'render',
            'sync': 'render'
        }
    });

    PamelaChu.Views.CardProfile = CardProfile;
})(Backbone, _, PamelaChu);