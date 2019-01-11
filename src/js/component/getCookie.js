define(["jquery"],function(){

    /* 存cookie单独封装组件方法 */
    function GetCookie(){

    }

    GetCookie.prototype.init = function(objId,urlList){
        let objBuyInfor={
            id : parseInt(objId.id),
            src :$(".smallBox img").prop("src"),
            url:location.href,           
            title:$(".purTitle").html(),
            price : $(".youHuiPrice").html().slice(1),
            name : $(".purTitle").html(),
            num : parseInt($("#buyNumbers").val())
        };
        /* 从列表页进入购物车，数目设置为1 */
        if(!(objBuyInfor.num)){
            objBuyInfor.num=1;
            objBuyInfor.url=urlList;
        } 
       /*           
        if(objBuyInfor.url.split("=").length=1){
           
           objBuyInfor.url=urlList;
        } */
        let arrBuyInfor = $.cookie("buyInfor")? JSON.parse($.cookie("buyInfor")):[];             
        let index;
        let panduan=arrBuyInfor.some(function(item,i){
            index = i;
            return objBuyInfor.id===item.id;
        }) 
        panduan? arrBuyInfor[index].num+=objBuyInfor.num : arrBuyInfor.push(objBuyInfor);
        $.cookie("buyInfor",JSON.stringify(arrBuyInfor),{expires:100,path:"/"});
        this.cartNum();
        
    };

    /* cookie渲染右边栏商品数量 */
    GetCookie.prototype.cartNum=function(){

        if($.cookie("buyInfor")){
            let cookieNum=  JSON.parse($.cookie("buyInfor"));
            let cartNum = 0;
            cookieNum.forEach((item,i) => {
            cartNum += item.num;               
            });
            $("#cartNum").html(cartNum);    
        }
    };
    return new GetCookie();
    
})