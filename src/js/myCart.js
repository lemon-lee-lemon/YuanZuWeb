require(["./requirejs.config"],()=>{
    require(["jquery","bootstrap","header","footer"],()=>{

        (function(){
            if(!($.cookie("buyInfor"))){
               $("#emptyCart").show();
               $("#cartBox").hide();
            }else{
              $("#emptyCart").hide();
              $("#cartBox").show();
            }
        })()
       
       class myCart{
          constructor(){
            this.init();
          }
            init(){
                this.creatCart();
                this.minusNum();
                this.plusNum(); 
                this.deleteCart();  
                this.total();                                      
            }

            creatCart(){                
                var buyInfor = JSON.parse($.cookie("buyInfor"));
                var str="";
                buyInfor.forEach((item,i)=>{ 
                    
                     str +=  ` <tr>                        
                                <td class="cartGoodsname">
                                    <span class="id">${item.id}</span>
                                    <a href="${item.url}" class="wrapImg">
                                    <img src="${item.src}" alt="${item.title}" title="${item.title}"/>
                                    </a>
                                    <em><a href="${item.url}">${item.title}</a> </em>
                                </td>                       
                                <td class="cartPrice">￥${item.price}</td>
                                <td class="cartQuantity">
                                    <div class="wrap">                          
                                        <span class="plus">-</span>
                                        <input type="text" value="${item.num}"/>
                                        <span class="minus">+</span>
                                </div>  
                                </td>                       
                                <td>
                                    <a href="javascript:;" class="delBtn">移除</a>
                                </td>
                            </tr> `; 
                })
                $("#cartBox tbody").html(str); 
                                                
            }/* end */
            
             /* 减商品数量 */
             plusNum(){

                /* 当前购物车商品总数量 */ 
                let getBuyInfor=  JSON.parse($.cookie("buyInfor"));              
                let cartNumPlus = 0,
                    _this = this,
                    flag=true;
                getBuyInfor.forEach((item,i) => {
                    cartNumPlus += item.num;               
                });   
                /* 点击减少按钮 */
                if(flag){
                    $(".plus").on("click",function(){ 
                                            
                        $(this).next().val(parseInt($(this).next().val())-1);
    
                        if( $(this).next().val()<1){
                            $(this).next().val(1);                      
                            flag=false;
                        }else{
                            if(--cartNumPlus<=1){
                                cartNumPlus=1;
                                flag=false;
                            }
                        }
                        /* 重新存cookie */ 
                        getBuyInfor.forEach((item,i)=>{
                          
                           if(item.id===Number($(this).parents("tr").find("td:first span").html())){                                            
                               if(--item.num<1){
                                   item.num=1;                             
                               }
                               $.cookie("buyInfor",JSON.stringify(getBuyInfor),{expires:100,path:"/"});
                               /* console.log($.cookie("buyInfor")); */                          
                           }
                        });
                        /* 渲染右边栏购物车 */
                        $("#cartNum").html(cartNumPlus); 
                        _this.total();                         
                    })
                }
            }/* end */
             /* 点击增加按钮 */
             minusNum(){
                let getBuyInfor=  JSON.parse($.cookie("buyInfor"));
                let cartNumMinus = 0,
                   _this = this;
                getBuyInfor.forEach((item,i) => {
                    cartNumMinus += item.num;               
                }); 
                $(".minus").on("click",function(){
                    
                    $(this).prev().val(parseInt($(this).prev().val())+1);  
                    cartNumMinus++;
                    /* 重新存cookie */ 
                    getBuyInfor.forEach((item,i)=>{                      
                        if(item.id===Number($(this).parents("tr").find("td:first span").html())){
                            item.num++; 
                            $.cookie("buyInfor",JSON.stringify(getBuyInfor),{expires:100,path:"/"});
                                                    
                        }
                    });
                        $("#cartNum").html(cartNumMinus);
                        _this.total();                       
                        console.log(JSON.parse($.cookie("buyInfor")));      
                })             
             } /* end */
                  
            
            /* 删除商品 */
            deleteCart(){
                  let  _this=this;
                  console.log(JSON.parse($.cookie("buyInfor")),111);
                $(".delBtn").on("click",function(){
                    if(confirm("确定要删除我吗？")){
                        let cartNumDel = 0;
                        let getBuyInforDet=  JSON.parse($.cookie("buyInfor"));
                        /* 重新存cookie */ 
                        getBuyInforDet.forEach((item,index)=>{
                        
                            if(item.id===Number($(this).parents("tr").find("td:first span").html())){                                            
                                getBuyInforDet.splice(index,1);                                
                                $.cookie("buyInfor",JSON.stringify(getBuyInforDet),{expires:100,path:"/"});
                                console.log(JSON.parse($.cookie("buyInfor")),index);                   
                            }
                        });                        
                        JSON.parse($.cookie("buyInfor")).forEach((item,i) => {
                            cartNumDel += item.num;               
                        });
                        $("#cartNum").html(cartNumDel);
                        _this.total();                      
                        $(this).parents("tr").remove();

                    }                  
                })
                
            }/* end */

           /* 右下角总计结算数据 */
           total(){
            let getBuyInfor=  JSON.parse($.cookie("buyInfor"));
            let cartNum = 0,
                cartTotalMoney =0;
            getBuyInfor.forEach((item,i) => {
                cartNum += item.num; 
                cartTotalMoney += item.num * item.price;              
             });

               /* 数量总计 */
               $("#cartTotalNum").html(cartNum);

               /* 商品金额总计 */               
               $("#cartTotalMoney").html("￥"+cartTotalMoney.toFixed(2));
               $("#total").html("￥"+cartTotalMoney.toFixed(2));
               
               /* 进入结算页面 */
               $("#checkout").on("click",function(){
                   if($.cookie("userInfor")){
                         location.href="/html/myCart.html";
                   }else{
                       if(confirm("您还没登录，赶快去登录吧~")){
                          location.href="/html/login.html";
                       }
                   }
               })
           }/* end */

           
        }
      if($.cookie("buyInfor")) return new myCart();

    })
})