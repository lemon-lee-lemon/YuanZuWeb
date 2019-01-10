require(["./requirejs.config"],function(){
    require(["itemaside","url","detailItem","jquery","header","footer"],
    function(itemaside,url,detailItem){

        let arrSearch = location.search.slice(1).split("=");
        let objSearch = {};
        objSearch[arrSearch[0]] = arrSearch[1];

        /* 通用接口 */
        itemaside.init(url.urlRap+"/pagination-aside");
        detailItem.init(url.urlRap+"/pagination-detail",objSearch);

       



    })
})