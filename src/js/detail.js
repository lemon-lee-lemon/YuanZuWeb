require(["./requirejs.config"],function(){
	require(["itemaside","url","parabola","jquery","header","footer"],function(itemaside,url){
  
        let arrSearch = location.search.slice(1).split("=");
        let objSearch = {};
        objSearch[arrSearch[0]] = arrSearch[1];

		/*引入rap2接口地址*/
       itemaside.init(url.urlRap+"/pagination-aside");
       
       $("#bigUnder").children("img").on("mouseenter",function(){
       	  $(this).addClass("imgbackColor").siblings().removeClass("imgbackColor");
       	  $("#smallBox").find("img").prop("src",$(this).prop("src"));
       	  $("#bigBox img").prop("src",$(this).prop("src"));
       })

       /*放大镜*/
       let smallBox=$("#smallBox"),
           Fdj=$("#imgFdj"),
           bigBox=$("#bigBox"),
           bigImg=$("#bigImg");

       smallBox.on("mouseenter",function(){ //进入盒子，放大镜显示
          Fdj.show();
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

       /* 商品介绍-评价背景色 */
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
    });   


        /* 购物车 */

         /* 增减商品数量 */
         $("#buyNum").on("click",".plus",()=>{
            $("#buyNumbers").val(parseInt($("#buyNumbers").val())+1);
        }).on("click",".minus",()=>{               
            $("#buyNumbers").val(parseInt($("#buyNumbers").val())-1);
            if(parseInt($("#buyNumbers").val())<1) $("#buyNumbers").val(1);
        });
     
        /* 抛入购物车动画效果 */ 
           $("#addCart").on("click",function(){
              $("#moni").show().find("img").prop("src",$("#smallBox img").prop("src"));
              let hei=50+$(window).scrollTop();
               var bool=new Parabola({
                  el: "#moni",
                  offset: [680, hei],
                 /*  targetEl: $("#btnCart"), */
                  curvature: 0.0002,
                  duration: 1000,
                  callback: function(){                       
                    $("#moni").hide();
                    bool.reset();
                  }                      
               });
                bool.start();
             
            /* 加入购物车，存cookie，将数据渲染到购物车 */
              let objBuyInfor={
                  id : parseInt(objSearch.id),
                  price : $("#youhuiPrice").html(),
                  name : $("#purTitle").html(),
                  num : parseInt($("#buyNumbers").val())
              };
              console.log(objBuyInfor.num);
            let arrBuyInfor = $.cookie("buyInfor")? JSON.parse($.cookie("buyInfor")):[];
           /*  console.log(arrBuyInfor); */
            var index;
            let panduan=arrBuyInfor.some(function(item,i){
                index = i;
                return objBuyInfor.id===item.id;
            })              
            panduan? arrBuyInfor[index].num+=objBuyInfor.num : arrBuyInfor.push(objBuyInfor);

            /* 用户是否登录 */
            if($.cookie("userInfor")){
                $.cookie("buyInfor",JSON.stringify(arrBuyInfor),{expires:100,path:"/"});
            }else{
                $.cookie("buyInfor",JSON.stringify(arrBuyInfor),{path:"/"}); 
            }               
            console.log( $.cookie("buyInfor")); 
            
             /* cookie渲染右边栏商品数量 */
            if($.cookie("buyInfor")){
                let cookieNum=  JSON.parse($.cookie("buyInfor"));
                let cartNum = 0;
                cookieNum.forEach((item,i) => {
                cartNum += item.num;               
                });
                $("#cartNum").html(cartNum);    
            };
    })

      
 
	})
})