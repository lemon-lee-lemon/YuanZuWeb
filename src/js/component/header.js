define(["jquery","cookie"],()=>{
   class Header{
           constructor(){
               this.init();
           }
           init(){ //加载html
           	    new Promise((resolve,reject) =>{
           	    	$("header").load("/html/component/header.html",()=>{
           	    		resolve();
           	    	})
           	    }).then(()=>{
           	    	this.ewmShow();
           	    	this.srhInput();
           	    	this.mallList();
					this.userNameShow();
					/* this.baiduNozzle(); */
           	    })                
           }
           ewmShow(){  //二维码显示隐藏
	           	   $("#ecshop").mouseenter(function(){$("#icon_ewm").fadeIn()});
	   	           $("#ecshop").mouseleave(function(e){                
		           if(e.offsetY>$(".header-top").outerHeight()){
				        $("#icon_ewm").hover(function(){$(this).css({"display":"block"});},
				                      function(){$(this).fadeOut();});
		           }else{
		           	    $("#icon_ewm").fadeOut();
		           }
		           })
           }
           srhInput(){  //搜索框模拟placeholder
                  $("#srh_tex").on("focus",function(){
		              if($("#srh_tex").val()==="请输入搜索名称"){
						  $("#srh_tex").val("");						 
						
		              }else if($("#srh_tex").val()!=""){
						$("#input-Infor").css({"backgroundColor":"#e8f0fe"});
					  }
	              });
	              $("#srh_tex").on("blur",function(){
		              if($("#srh_tex").val()===""){
			             $("#srh_tex").val("请输入搜索名称");
		              }
				  });
				 
		   }
		    /* 搜索框引入百度接口 --要有name属性*/
		  /*  baiduNozzle(){   
                 $("#input-Infor").on("submit",function(e){
					 var str = decodeURIComponent($(this).serialize());
					
					 $.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&"+str,
					    function(res){
							var data = res.s; console.log(res);
							$("#baiDuSrh").empty().show();
							$.each(data,function(i,item){                                
                                 $("<li>").html(item).appendTo($("#baiDuSrh"));
							})
						})
						$("#baiDuSrh").on("click","li",function(){
							$("#srh_tex").val($(this).html());
							$("#baiDuSrh").hide();
						})
					 e.preventDefault();
				 })
		   } */
           mallList(){   //商品列表滑入显示/隐藏
                  $("#mall_title").on("mouseenter",function(){
                  	$("#list_All").show();
                  })
                  $("#mall_title").on("mouseleave",function(e){
                  	if(e.offsetY>$(this).outerHeight()){
                  		$("#list_All").hover(function(){
                  			$("#list_All").css({"display":"block"})},
                  			function(){$("#list_All").hide()});
                  	}else{
                  		$("#list_All").hide();
                  	}
                  })
           }
           userNameShow(){  //头部显示用户名--新增“退出”按钮
                if($.cookie("userInfor")){
                     var userTel = JSON.parse($.cookie("userInfor")).tel;
                     $("#login_register").html(userTel).next().html("&nbsp;&nbsp;欢迎您");
                     $("#login_register").parent().css({"width":150});                    
                     
                     $("<li>").html(`<a href="##">退出</a>`).appendTo($("#smallNav"));
                     
                     $("#smallNav li:last-child").on("click",function(){
						 $.cookie("userInfor",'',{expires:-1,path:"/"});						 
                         window.location.href="/html/login.html";
                     })
                }
           }

   }
      return new Header();
})


