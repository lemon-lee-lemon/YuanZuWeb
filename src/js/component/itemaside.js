define(["jquery","template"],function($,template){
     class Itemaside{
     	constructor(){
          
     	}
     	init(url){
          console.log(url);
          
          new Promise((resolve,reject)=>{
          	/*列表页上加载item的html*/
          	$("#complateAside").load("/html/component/itemaside.html",function(){
          		resolve();
          	})
          }).then(()=>{
          	  $.ajax({
          	  	/*rap2的地址*/
          	  	url:url,
          	  	type:"get",
          	  	success:function(res){
                     if(res.res_code===1){
                         let listAside=res.res_body.data;                         
                         /*把list内容依次渲染到id名为list-template上面*/
                         let html=template("aside-template",{list:listAside});
                         //console.log(html);
                         $("#complateAside ul").html(html);
                     }
          	  	}
          	  })
          })
     	}
     }
     return new Itemaside();
})