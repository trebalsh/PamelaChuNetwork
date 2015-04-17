(function(Backbone, PamelaChu){

    var searchModel;

    PamelaChu.Factories.Search = {
        searchBody: function(input){          
            if(searchModel==null)
                searchModel = new PamelaChu.Models.Search({"input": input});
            var searchBody = new PamelaChu.Views.SearchBody({model: searchModel});

            return searchBody;
        },
        searchHeader: function(input){
            searchModel = new PamelaChu.Models.Search({"input": input});
            var vSearchHeader = new PamelaChu.Views.SearchHeader({model: searchModel});

            return vSearchHeader;
        },

        searchUsers: function(input){
           var c = new PamelaChu.Collections.SearchUsers();
            if(input) c.fetch({data: {q : input} });

            return  new PamelaChu.Views.UserList({
                collection: c,
                itemViewOptions:{desactivable:true}
            });
        },

        searchGroups: function(input){
            var c = new PamelaChu.Collections.SearchGroups();
            if(input) c.fetch({data: {q : input} });

            return  new PamelaChu.Views.GroupsList({
                collection: c
            });
        },

        searchTags: function(input){
            var c = new PamelaChu.Collections.SearchTags();
            if(input) c.fetch({data: {q : input} });

            return  new PamelaChu.Views.TagsList({
                collection: c
            });
        }
    };

})(Backbone, PamelaChu);