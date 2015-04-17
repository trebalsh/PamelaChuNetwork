(function(window, Backbone, $, _){
    _.templateSettings = {
        interpolate: /<\@\=(.+?)\@\>/gim,
        evaluate: /<\@(.+?)\@\>/gim
    };

    Backbone.$.ajaxSetup({
        cache: false
    });

    marked.setOptions({
        gfm: true,
        pedantic: false,
        sanitize: true,
        highlight: null,
        urls: {
            youtube : function(text, url){
                var cap;
                if((cap = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/.exec(url))){
                    return '<iframe width="420" height="315" src="https://www.youtube.com/embed/' +
                        cap[5] +
                        '" frameborder="0" allowfullscreen></iframe>';
                }
            },
            vimeo : function(text, url){
                var cap;
                if((cap = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/.exec(url))){
                    return '<iframe src="https://player.vimeo.com/video/' +
                        cap[5] +
                        '" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                }
            },
            dailymotion : function(text, url){
                var cap;
                if((cap = /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/.exec(url))){
                    return '<iframe frameborder="0" width="480" height="271" src="https://www.dailymotion.com/embed/video/' +
                        cap[2] +
                        '"></iframe>';
                }
            },
            gist : function(text, url){
                var cap;
                if((cap = /^.+gist.github.com\/(([A-z0-9-]+)\/)?([0-9A-z]+)/.exec(url))){
                    $.ajax({
                        url: cap[0] + '.json',
                        dataType: 'jsonp',
                        success: function(response){
                            if(response.stylesheet && $('link[href="' + response.stylesheet + '"]').length === 0){
                                var l = document.createElement("link"),
                                    head = document.getElementsByTagName("head")[0];

                                l.type = "text/css";
                                l.rel = "stylesheet";
                                l.href = response.stylesheet;
                                head.insertBefore(l, head.firstChild);
                            }
                            var $elements = $('.gist' + cap[3]);
                            $elements.html(response.div);
                        }
                    });
                    return '<div class="gist' + cap[3] + '"/>';
                }
            }
        }
    });

    var show = Backbone.Marionette.Region.prototype.show;
    _.extend(Backbone.Marionette.Region.prototype, {
        show: function(view) {
            if (this.currentView !== view)
                show.apply(this, arguments);
        }
    });


    $.fn.typeahead.Constructor.prototype.show  =function () {
        var pos = $.extend({}, this.$element.position(), {
            height: this.$element[0].offsetHeight
        });

        var padding = parseInt( this.$element.css('padding-left'), 10 );

        this.$menu
            .insertAfter(this.$element)
            .css({
                top: pos.top + pos.height,
                left: pos.left + padding
            })
            .show();

        this.shown = true;

        this.$menu.css('width', this.$element.width() + 'px' );

        return this;
    };

    var PamelaChu = {
        Models : {},
        Collections : {},
        Views : {},
        Factories : {}
    };

    PamelaChu.app = new Backbone.Marionette.Application();

    PamelaChu.app.addInitializer(function(){
        $('input, textarea').placeholder();
    });

    // Polling : used as long as Atmosphere is not working with the proxy
    PamelaChu.app.addInitializer(function(){
        var autoRefresh = function(){
            PamelaChu.app.trigger('refresh');
            _.delay(autoRefresh, 20000);
        };
        autoRefresh();
    });

    PamelaChu.app.addInitializer(function(){
        var $w = $(window);
        var $d = $(document);

        var autoNext = _.debounce(function(){
            if($w.height() + $d.scrollTop() > $d.height() - 200)
                PamelaChu.app.trigger('next');
        }, jQuery.fx.speeds._default);

        $(window).scroll(autoNext);
    });

    PamelaChu.app.addInitializer(function(){
        PamelaChu.app.addRegions({
            header: '#pamelaChuHeader',
            side: '#pamelaChuSide',
            body: '#pamelaChuBody',
            slider: '#slider'
        });
    });

    PamelaChu.app.addInitializer(function(){
        PamelaChu.app.edit = new PamelaChu.Views.StatusEdit({
            el: $('#pamelaChuEdit')
        });
        if (!ie || ie>9){
            PamelaChu.app.favi = new Favico({
                animation : 'popFade'
            });
        }
    });

    PamelaChu.app.on('changeFavicon', function(options){
        if (!ie || ie>9){
            setTimeout(function(){
                PamelaChu.app.favi.badge(options.countFavicon);
            },1000)
        }
    });

    if(!ios) {
        PamelaChu.app.addInitializer(function(){
            PamelaChu.app.navbar = new PamelaChu.Views.Navbar({
                el: $('#navbar')
            });
        });

        PamelaChu.app.addInitializer(function(){
            PamelaChu.app.on('edit:show', function(){
                PamelaChu.app.edit.show.apply(PamelaChu.app.edit, arguments);
            });
        });

    }

    PamelaChu.app.on("initialize:after", function(options){
        //if (Backbone.History.started){
            if (Backbone.history){
            PamelaChu.app.router = new PamelaChu.Router();
            Backbone.history.start({
                pushState: true,
                root: "/pamelaChu/home/"
            });
            if (Backbone.history._hasPushState) {
                $(document).delegate("a", "click", function(evt) {
                    var href = $(this).attr("href");
                    var protocol = this.protocol + "//";
                    if (typeof href !== 'undefined' && href.slice(protocol.length) !== protocol && /^#.+$/.test(href)) {
                        evt.preventDefault();
                        Backbone.history.navigate(href, true);
                    }
                });
            }
        }
    });

    $(function(){
        var onStart = _.after(2, function(){
            PamelaChu.app.start();
        });

        PamelaChu.app.user = new PamelaChu.Models.User({
            username: username
        });
        PamelaChu.app.groups = new PamelaChu.Collections.Groups();

        PamelaChu.app.user.fetch({
            success: onStart
        });
        PamelaChu.app.groups.fetch({
            success: onStart
        });
    });

    window.PamelaChu = PamelaChu;
})(window, Backbone, jQuery, _);
