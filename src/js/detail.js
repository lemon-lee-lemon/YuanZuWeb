require(["./requirejs.config"],function(){
	require(["itemaside","url","parabola","jquery","header","footer"],function(itemaside,url){
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
    })   

    /* 购物车 */
       
            /* 抛入购物车动画效果 */ 
            $("#addCart").on("click",function(){
                $("#moni").show().find("img").prop("src",$("#smallBox img").prop("src"));
                let hei=50+$(window).scrollTop();
                 var bool=new Parabola({
                    el: "#moni",
                    offset: [650, hei],
                   /*  targetEl: $("#btnCart"), */
                    curvature: 0.0002,
                    duration: 1000,
                    callback: function(){
                      $("#cartNum").html(parseInt($("#cartNum").html())+1);
                      $("#moni").hide();
                      bool.reset();
                    }                      
                 });
                  bool.start();
             })

	})
})