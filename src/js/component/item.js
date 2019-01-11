define(["jquery","template","getCookie"],
function($,template,getCookie){
     class Item{
     	constructor(){
		  
     	}
     	init(url){
			
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
					success:(res)=>{
						if(res.res_code===1){
							let list=res.res_body.data;
							/*把list内容依次渲染到id名为list-template上面*/
							let html=template("list-template",{list:list});
							//console.log(html);
							$("#complateList ul").html(html);
							this.clickSoonBuy();
						}
					}
				})				
			})			

		} /* end */

		/* 给立即购买绑定加入购物车 */
		clickSoonBuy(){
			let objId = {};		    
			$(".soonBuy").on("click",function(){
				let urlList=$(this).parents("li").find(".imageShow a").prop("href");
				objId["id"] = parseInt($(this).parents("li").find(".imageShow span").html()); 
				if($.cookie("userInfor")){				  
				    location.href="/html/myCart.html";               
				}else{
				    if(confirm("您还没登录，赶快去登录吧~")){
					   location.href = "/html/login.html";
				    }
				}								
				getCookie.init(objId,urlList);               
				
				   
			 })					
		}/* end */
     }
     return new Item();
})