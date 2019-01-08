require(["./requirejs.config"],()=>{
	require(["item","url","itemaside","jquery","header","footer"],(item,url,itemaside)=>{
          item.init(url.urlRap+"/pagination-list");
         itemaside.init(url.urlRap+"/pagination-aside");
          
         /*头部排序显示隐藏*/
         $("#allRanking ul").hover(function(){
              $(this).find("li").show();
         },function(){
               $(this).find("li").hide();
         })

		
	})
})