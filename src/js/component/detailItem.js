define(["jquery","template","getCookie","parabola","cookie"],
($,template,getCookie)=>{
    class DetailItem{
        constructor(){
          
        }
        init(url,objId){  
            /* console.log(url,parseInt(objId.id));   */        
           new Promise((resolve,reject)=>{
               $("#section").load("/html/component/detailItem.html",function(){
                   resolve();  
               })
           }).then(()=>{
               $.ajax({
                   url:url,
                   type:"get",
                   data:objId,
                   success:(res)=>{
                       //console.log(res);
                      if(res.res_code==1){
                          let list=res.res_body.data;
                          let html=template("detailItem-template",{list:list});
                          //console.log(html);
                          $("#section").html(html);                         
                            this.fdj();
                            this.goodsIntro(); 
                            this.changeNum();
                            this.addCart(objId); 
                                                         
                      }
                   },
                   dataType:"json"
               })
              
           })

        }/* end */

        fdj(){
              
            /*放大镜*/
                let smallBox=$("#smallBox"),
                    Fdj=$("#imgFdj"),
                    bigBox=$("#bigBox"),
                    bigImg=$("#bigImg");
           
            smallBox.on("mouseenter",function(){ //进入盒子，放大镜显示                
                Fdj.css("display", "block");
                bigBox.show();

            })           
            smallBox.on("mousemove",function(e){  //移动鼠标
                var left = e.clientX - smallBox.offset().left-Fdj.outerWidth()/2;
                var top = e.clientY - smallBox.offset().top-Fdj.outerHeight()/2+$(window).scrollTop();
                    //console.log($(window).scrollTop());
                
                if(left<0) left=0;
                if(top<0) top=0;
                if(left>smallBox.outerWidth()-Fdj.outerWidth())
                    left=smallBox.outerWidth()-Fdj.outerWidth();
                if(top>smallBox.outerHeight()-Fdj.outerHeight())
                    top=smallBox.outerHeight()-Fdj.outerHeight();
                //console.log(left,top);
                Fdj.css({"left":left,"top":top});
                bigImg.css({"left":-1.5*left,"top":-1.5*top});

            })

            smallBox.on("mouseleave",function(){  //离开盒子
                Fdj.hide();
                bigBox.hide();
            })
            /* 下方小图切换 */
            $("#bigUnder").children("img").on("mouseenter",function(){
                $(this).addClass("imgbackColor").siblings().removeClass("imgbackColor");
                $("#smallBox").find("img").prop("src",$(this).prop("src"));
                $("#bigBox img").prop("src",$(this).prop("src"));
            })
            
        
        }/* end */

        goodsIntro(){   /* 商品介绍-评价背景色 */
            $("#detailTit span").hover(function(){  
                $(this).addClass("changeColor");
            },function(){ 
                $(this).removeClass("changeColor") ;
            })
            $("#detailTit span:first-child").on("click",function(){
                $(this).addClass("spanCor").next().removeClass("changeColor");
                $("#bigPicShow").show().next().hide();
            }) 
            $("#detailTit span:last-child").on("click",function(){
                $(this).addClass("changeColor").prev().removeClass("spanCor");
                $("#bigPicShow").hide().next().show();
            })   
        }/* end */

        /* 购物车 */
        addCart(objId){
               /* 点击加入购物车 */
               $("#addCart").on("click",()=>{
                  this.addAnimate();                  
                  getCookie.init(objId);
               })
               /* 点击立即购买 */
               $("#soonBuy").on("click",function(){
           
                if($.cookie("userInfor")){
                    location.href="/html/myCart.html";               
                }else{
                    if(confirm("您还没登录，赶快去登录吧~")){
                        location.href = "/html/login.html";
                    }
                }              
                getCookie.init(objId); 
                   
            })
               
        }/* end */

        /*  抛入购物车动画效果 */ 
        addAnimate(){
            
            $("#moni").show().find("img").prop("src",$("#smallBox img").prop("src"));
            let hei=50+$(window).scrollTop();
            var bool=new Parabola({
                el: "#moni",
                offset: [650, hei],
                /*  targetEl: $("#btnCart"), */
                curvature: 0.0002,
                duration: 600,
                callback: function(){                       
                    $("#moni").hide();
                    bool.reset();
                }                      
            });
            bool.start();                 
           
           
        }  /* end */ 


        /* 增减商品数量 */
        changeNum(){
            $("#buyNum").on("click",".plus",()=>{
                $("#buyNumbers").val(parseInt($("#buyNumbers").val())+1);
            }).on("click",".minus",()=>{               
                $("#buyNumbers").val(parseInt($("#buyNumbers").val())-1);
                if(parseInt($("#buyNumbers").val())<1) $("#buyNumbers").val(1);
            })
        };

        
    }
    return new DetailItem();
})