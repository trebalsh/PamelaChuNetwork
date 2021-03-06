
_.templateSettings = {
    interpolate: /\<\@\=(.+?)\@\>/gim,
    evaluate: /\<\@(.+?)\@\>/gim,
    escape: /\<\@\-(.+?)\@\>/gim
};

var PamelaChu = {
    Views: {},
    Collections: {},
    Models: {},
    Factories: {}
};

PamelaChu.app = new Backbone.Marionette.Application();

if(!window.app){
    app = window.app = _.extend({
        views: {},
        collections: {},
        View: {},
        Collection: {},
        Model: {},
        Router: {}
    }, Backbone.Events);
}
else {
    app = window.app;
}

if (!String.prototype["trim"]){
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

app.formSuccess = $('#form-success-label').html().trim();
app.formError =   $('#form-error-label').html().trim();
app.deleteFileSuccess = $('#delete-file-success-label').html().trim();
app.deleteFileError = $('#delete-file-error-label').html().trim();
app.memberAddSuccess = $('#groups-form-adduser-success-label').html().trim();
app.memberAddError = $('#groups-form-adduser-error-label').html().trim();
app.formErrorLDAP = $('#form-ldap').html().trim();

app.on('even-alert-success', function(msg){
    
    $.jGrowl(msg, {
        theme: 'alert-success',
        life: 4000 ,
         animateOpen: {
         height: "show"
         }
    });
});

app.on('even-alert-error', function(msg){

    $.jGrowl(msg, {
        theme: 'alert-danger',
        life: 6000
    });
});

app.on('even-alert-warning', function(msg){

    $.jGrowl(msg, {
        theme: 'alertColor',
        life: 3000,
         animateOpen: {
         height: "show"
         },
         animateClose: {
         height: "hide"
         }
    });
});

accountLayout = new AccountLayout();
AccountContainer.show(accountLayout);

accountLayout.avatar.show(new VAvatar());
accountLayout.navigation.show(new VNavigation());

contentLayout = new ContentLayout();
ContentContainer.show(contentLayout);

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

PamelaChu.app.on("initialize:after", function(options){
    if (Backbone.history){
            app.router = new AdminRouter();
        Backbone.history.start({
            pushState: true,
                root: "/pamelaChu/account/"
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



