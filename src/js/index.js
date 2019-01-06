require(["./requirejs.config"],()=>{
  
  require(["jquery","header","footer"],()=>{
        /*轮播图*/
        let $ul =  $("#ratation-chart"),
            $items = $ul.children(),
            len = $items.length,
            liWidth = $items.eq(0).width(),
            btns =[],
            index =0,
            timer=null;
        $ul.append($items.eq(0).clone());
        $ul.css({width:(len+1)*liWidth});
        for(var i=1;i<=len;i++){  //创建下方圆形按钮
           btns.push($("<li>").addClass(i===1?"ac":"").appendTo($("#roll-Btns")));
        }
        //点击按钮轮播
        $.each(btns,function(i,$btn){
          $btn.on("mouseenter", ()=>{
            btns[index].removeClass('ac');
            $(this).addClass("ac");
            $ul.stop().animate({left:-i*liWidth},"slow");
            index = $(this).index();
          })
          
        })
       //自动轮播
       $("#goNext").on("click",()=>{  //虚拟一个向后按钮
        btns[index].removeClass('ac');
        if(++index>=len){
          $ul.stop().animate({left:-len*liWidth},"slow",function(){
            $ul.css({left:0});            
          })
          index=0;
        }else{
          $ul.stop().animate({left:-index*liWidth},"slow");
        }
            btns[index].addClass('ac');
       })
        $("#banner-rolling").hover(function(){clearInterval(timer);},
          (function autoPlay(){
            timer=setInterval(()=>{$("#goNext").trigger('click')},1500);
            return autoPlay;
          })())
    /*main-HotRec热门推荐*/
     $("#hot-title").on("mouseenter","li",function(){
        $(this).addClass("titleChange").siblings().removeClass('titleChange');
        let $productList = $("#hotTab").children();
        $productList.eq($(this).index()).addClass('productListShow').siblings().removeClass('productListShow');
     })
     /*Cake Category*/    
    $(".main-largeCake").hover(function(){   //光线划过效果
      $(this).find($(".slide-light")).animate({left:200,top:200},"slow");},
      function(){$(this).find($(".slide-light")).css({"left":-160,"top":-190});})

   

  });

}) 



