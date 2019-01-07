define(["jquery","template"],function($,template){
     class Item{
     	constructor(){
          
     	}
     	init(url){
          console.log(url);
          
          new Promise((resolve,reject)=>{
          	$("#complateList").load("/html/component/item.html",function(){
          		resolve();
          	})
          }).then(()=>{
          	  $.ajax({
          	  	url:url,
          	  	type:"get",
          	  	success:function(res){
                     if(res.res_code===1){
                         let list=res.res_body.data;
                         let html=template("list-template",{list:list});
                         console.log(html);
                         $("#complateList ul").html(html);
                     }
          	  	}
          	  })
          })
     	}
     }
     return new Item();
})