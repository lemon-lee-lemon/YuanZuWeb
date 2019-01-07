require(["./requirejs.config"],()=>{
	require(["item","url","jquery","header","footer"],(item,url)=>{
          item.init(url.urlRap+'/pagination-list');

		
	})
})