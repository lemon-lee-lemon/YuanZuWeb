require(["./requirejs.config"],function(){
	require(["itemaside","url","jquery","header","footer"],function(itemaside,url){
       itemaside.init(url.urlRap+"/pagination-aside");



	})
})