define(["jquery","template"],function($,template){
     class Item{
     	constructor(){
          
     	}
     	init(url){
          console.log(url);
          
          new Promise((resolve,reject)=>{
          	/*列表页上加载item的html*/
          	$("#complateList").load("/html/component/item.html",function(){
          		resolve();
          	})
          }).then(()=>{
          	  $.ajax({
          	  	/*rap2的地址*/
          	  	url:url,
          	  	type:"get",
          	  	success:function(res){
                     if(res.res_code===1){
                         let list=res.res_body.data;
                         /*把list内容依次渲染到id名为list-template上面*/
                         let html=template("list-template",{list:list});
                         //console.log(html);
                         $("#complateList ul").html(html);
                     }
          	  	}
          	  })
          })
     	}
     }
     return new Item();
})