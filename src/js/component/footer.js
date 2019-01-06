define(["jquery"],()=>{
    class Footer{
        constructor(){
            this.init();
        }
        init(){  //主页里面找$("footer")--回调函数里面
            $("footer").load("/html/component/footer.html",()=>{
                this.footerSlide();
                this.btnBackTop();
                this.btnNewSale();
            });
            
        }
        footerSlide(){    //右边侧边栏滑动效果
            $.each($("#footerSlide li"),(i,li)=>{
                $(li).hover(function(){$(this).find("em").animate({right:0},"fast")},
                function(){$(this).find("em").animate({right:-100},"fast")})
            });       
            $("#btnCart").hover(function(){$(this).addClass("changeCart");},
                function(){$(this).removeClass("changeCart");});
        }
        btnBackTop(){  //返回顶部
            $("#btn-backtop").on("click",function(){
              $(window).scrollTop(0);
                
            })
        }
        btnNewSale(){  //最新活动
            $("#btn-sales").on("click",function(){
                $(window).scrollTop(0);
            })
        }
    }
    return new Footer();
})