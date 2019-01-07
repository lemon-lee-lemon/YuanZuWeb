require(["./requirejs.config"],()=>{
     require(["jquery","cookie","header","footer"],()=>{

         (function(){$("#slideUnder").animate({left:435})})()

         //点击头部登录开关
         $("#switch-login").on("click",function(){  
         	 $("#slideUnder").animate({left:435});
         	 $(this).addClass('addColor').next().removeClass("addColor");
         	 $("#conLogin").show().next().hide();
         })

         //点击头部注册开关
         $("#switch-register").on("click",function(){  
         	 $("#slideUnder").animate({left:665});
         	 $(this).addClass('addColor').prev().removeClass("addColor");
         	 $("#conRegister").show().prev().hide();
         })

         //注册验证
         //电话号码  
         $("#telRegister").on("blur",function(){ 
                if($("#telRegister").val()===''){
                     $("#warn-notice-telEmp").show();
	            	 $("#telLabel").css({"borderColor":'red'});	   
                }else if(!(/^1[34578]\d{9}$/.test($("#telRegister").val()))){
	            	 $("#warn-notice-style").show();
	            	 $("#telLabel").css({"borderColor":'red'});	            	
	            }else{
	            	$("#warn-notice-style").hide();
	            	  $("#warn-notice-telEmp").hide();
	            }
         })
         //验证码
          $("#yzmRegister").on("blur",function(){
                if($("#yzmRegister").val()===''){
                   $("#warn-notice-yzm").show();
                }else{
                	 $("#warn-notice-yzm").hide();
                }
          }) 
          //邮箱认证
          $("#emailRegister").on("blur",function(){
          	  var regEmail=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;           	  
          	  if(!(regEmail.test($("#emailRegister").val()))){
                  $("#warn-notice-email").show();  
          	  }else{
          	  	  $("#warn-notice-email").hide();  
          	  }
          })
          //第一次密码认证不能小于6位
           $("#pasRegister").on("blur",function(){
              if(!(/.{6,}/.test($("#pasRegister").val()))){
                  $("#warn-notice-pas").show(); 
              }else{
              	   $("#warn-notice-pas").hide();
              }
           })

           //第二次密码验证
            $("#pasRegister2").on("blur",function(){
              if($("#pasRegister2").val() != $("#pasRegister").val()){
                  $("#warn-notice-pas2").show(); 
              }else{
              	   $("#warn-notice-pas2").hide();
              }
           })

         //开始注册register
         $("#formRegister").on("submit",function(e){
             e.preventDefault();
             $.ajax({
             	url:"http://localhost/api/v1/register.php",
             	type:"post",
             	data:{
             		telephone: $("#telRegister").val(),
             		email:$("#emailRegister").val(),
             		password:$("#pasRegister").val()
             	},
             	success:function(res){
	                 if(res.res_code){
	                    alert("注册成功，马上去登录吧");
	                    $("#switch-login").trigger("click");
	                    $(window).scrollTop(0);
	                    $("#conRegister input").val("");
	                 }else if(res.res_code===0){
	                    $("#warn-notice-exist").show();	                    
	                    $(window).scrollTop(0);
	                 }else{
	                 	$("#warn-notice-exist").hide();
	                 	
	                 }
             	},
             	dataType:"json"
             })           
         })

         //登录验证
         
         
         //开始登录
         $("#formLogin").on("submit",function(e){
           
           $.ajax({
           	url:"http://localhost/api/v1/login.php",
           	type:"post",
           	data:{
           		telMail : $("#telMailLogin").val(),
           		password : $("#pasLogin").val()
           	},
           	success:function(res){
               if(res.res_code){
                   //存cookie      
                   var data = res.res_body;
                   if($("#rememberLogin")[0].checked){
                        $.cookie("userInfor",
                       	JSON.stringify({id:data.id,tel:data.telephone,pas:data.password}),
                       	{expires:7,path:"/"});                    
                   }else{
                   	    $.cookie("userInfor",
                       	JSON.stringify({id:data.id,tel:data.telephone}),
                       	{path:"/"});
                   }
                   window.location.href="/index.html";
               }
           	},
           	dataType:"json" 

           })
            
           e.preventDefault();
         })     

     })
})