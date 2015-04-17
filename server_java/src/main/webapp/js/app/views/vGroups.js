(function(Backbone, _, PamelaChu){
    var GroupItems = Backbone.Marionette.ItemView.extend({
        template: '#GroupItems'
    });

    var Groups = Backbone.Marionette.CompositeView.extend({
        itemView: GroupItems,
        itemViewContainer: '.items',
        template: '#Groups'
    });

    PamelaChu.Views.GroupItems = GroupItems;
    PamelaChu.Views.Groups = Groups;
})(Backbone, _, PamelaChu);