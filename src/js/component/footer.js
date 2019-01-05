define(["jquery"],()=>{
    class Footer{
    	constructor(){
            this.init();
    	}
    	init(){  //主页里面找$("footer")--回调函数里面
    		$("footer").load("/html/component/footer.html",()=>{
                this.footerSlide();
    		});
    		
    	}
    	footerSlide(){    
            $.each($("#footerSlide li"),(i,li)=>{
            	$(li).hover(function(){$(this).find("em").animate({right:0},"fast")},
    			function(){$(this).find("em").animate({right:-100},"fast")})
            });       
            $("#btnCart").hover(function(){$(this).addClass("changeCart");},
            	function(){$(this).removeClass("changeCart");});
    	}
    }
    return new Footer();
})