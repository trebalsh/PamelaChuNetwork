(function(Backbone, _, PamelaChu){
    var StatusUpdateButton = Backbone.Marionette.ItemView.extend({
        initialize: function(){
            _.defaults(this.options, {
                count: 0
            });
            this.$el.css('display', 'none');
            this.listenTo(PamelaChu.app, 'statusPending', function(hiddenStatuses){
                this.options.count = (hiddenStatuses)? hiddenStatuses.length: 0;
                this.render();
            });
        },
        serializeData: function(){
            return this.options;
        },
        events: {
            'click': 'onClick'
        },
        onClick: function(){
            $(this.el).removeClass('refresh-button-style');
            PamelaChu.app.trigger('display');
            if (!ie || ie>9){
                PamelaChu.app.favi.badge(0) ;
            }
            document.title = "PamelaChu";
            this.$el.slideUp();
        },
        onRender: function(){
            var self = this;
            if(this.options.count !== 0) {
                $(this.el).addClass('refresh-button-style');
                if (!ie || ie>9){
                    PamelaChu.app.favi.badge(this.options.count) ;
                }
                document.title = "PamelaChu (" + this.options.count + ")";
                this.$el.slideDown();
            } else {
                $(this.el).removeClass('refresh-button-style');
                document.title = "PamelaChu";
                this.$el.slideUp();
                if (!ie || ie > 9){
                    PamelaChu.app.trigger("changeFavicon", {
                        countFavicon : self.options.count
                    });
                }
            }
        },
        className: 'text-center',
        template: '#StatusUpdateButton'
    });

    var StatusTimelineRegion = Backbone.Marionette.Layout.extend({
        template: '#StatusTimelineRegion',
        regions: {
            timeline: '.timeline',
            refresh: '.refresh-button'
        }
    });

    PamelaChu.Views.StatusTimelineRegion = StatusTimelineRegion;
    PamelaChu.Views.StatusUpdateButton = StatusUpdateButton;
})(Backbone, _, PamelaChu);
