require(["./requirejs.config"],()=>{
    require(["jquery","bootstrap","header","footer"],()=>{        
        (function(){
            if($.cookie("buyInfor") && JSON.parse($.cookie("buyInfor")).length!=0){
                $("#emptyCart").hide();
                $("#cartBox").show();
            }else{
                $("#emptyCart").show();
                $("#cartBox").hide();
             
            }
        })()
       
       class myCart{
          constructor(){
            this.checkNum=0;  /* 单选框数量 */
            this.init();
          }
            init(){                
                this.creatCart();                
                this.total();                                      
            }

            creatCart(){                
                var buyInfor = JSON.parse($.cookie("buyInfor"));
                var str="";
                buyInfor.forEach((item,i)=>{ 
                    
                     str +=  ` <tr> 
                               <td>
                                    <label>
                                      <input type="checkbox" class="acheck">
                                    </label> 
                               </td>                                                 
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
                this.minusNum();
                this.plusNum(); 
                this.deleteCart();
                this.clickAllCheck();  
                this.clickACheck();           
            }/* end */

             /* 全选  */
             clickAllCheck(){
                 let _this=this;
                $("#allcheck").on("click",function(){                 
                    if($(this).prop("checked")){
                        $(this).prev().css({backgroundPositionY:-20});
                        $(".acheck").parent().css({backgroundPositionY:-20});
                        $(".acheck").prop("checked",true);                       
                    }else{
                        $(this).prev().css({backgroundPositionY:0});
                        $(".acheck").parent().css({backgroundPositionY:0});
                        $(".acheck").prop("checked",false); 
                    } 
                    /* 设定单选框数量 */
                    _this.checkNum = $(this).prop("checked")? $(".acheck").length:0;
                    _this.total();                      
                })                
             }/* end */

             /* 单选  */
             clickACheck(){
                 let _this = this;
                 $("#cartBox tbody").on("click",".acheck",function(){                    
                    if($(this).prop("checked")){                       
                        $(this).parent().css({backgroundPositionY:-20});
                        _this.checkNum++;
                    }else{
                        $(this).parent().css({backgroundPositionY:0}); 
                        _this.checkNum--;
                    }
                    if(_this.checkNum===$(".acheck").length){
                        $("#allcheck").prev().css({backgroundPositionY:-20});
                        $("#allcheck").prop("checked",true);
                    } else{
                        $("#allcheck").prev().css({backgroundPositionY:0});
                        $("#allcheck").prop("checked",false);
                    } 
                    _this.total(); 
                 })                
             }/* end */

             /* 增加商品数量 */
             plusNum(){
                /* 当前购物车商品总数量 */ 
                let  _this = this,
                     flag=true;                              
                if(flag){
                    $(".plus").on("click",function(){
                        /* 每次click，都要重新获取cookie */
                        let getBuyInfor=  JSON.parse($.cookie("buyInfor")),
                            cartNumPlus = 0; 
                        getBuyInfor.forEach((item,i) => {
                            cartNumPlus += item.num;               
                        });                     
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
                          
                           if(item.id===Number($(this).parents("tr").find(".cartGoodsname span").html())){                                            
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
             /* 点击减少按钮 */
             minusNum(){               
                let  _this = this;
                $(".minus").on("click",function(){
                    let getBuyInfor=  JSON.parse($.cookie("buyInfor"));
                    let cartNumMinus = 0;
                    getBuyInfor.forEach((item,i) => {
                        cartNumMinus += item.num;               
                    });                    
                    $(this).prev().val(parseInt($(this).prev().val())+1);  
                    cartNumMinus++;
                    /* 重新存cookie */ 
                    getBuyInfor.forEach((item,i)=>{                      
                        if(item.id===Number($(this).parents("tr").find(".cartGoodsname span").html())){
                            item.num++; 
                            $.cookie("buyInfor",JSON.stringify(getBuyInfor),{expires:100,path:"/"});
                                                    
                        }
                    });
                        $("#cartNum").html(cartNumMinus);
                        _this.total(); 
                })             
             } /* end */
                  
            
            /* 删除商品 */
            deleteCart(){
                  let  _this=this;                 
                $(".delBtn").on("click",function(){
                    if(confirm("确定要删除我吗？")){
                        let cartNumDel = 0;
                        let getBuyInforDet=  JSON.parse($.cookie("buyInfor"));
                         
                        /* 重新存cookie */ 
                        getBuyInforDet.forEach((item,index)=>{
                            /* 删除的这一行的id与cookie中的id名相等，就删除这一条记录 */
                            if(item.id===Number($(this).parents("tr").find(".cartGoodsname span").html())){                                            
                                getBuyInforDet.splice(index,1);                                
                                $.cookie("buyInfor",JSON.stringify(getBuyInforDet),{expires:100,path:"/"});                                               
                            }
                        });                        
                        JSON.parse($.cookie("buyInfor")).forEach((item,i) => {
                            cartNumDel += item.num;               
                        });
                        if(cartNumDel===0){
                            $("#emptyCart").show();
                            $("#cartBox").hide();
                        }
                        $("#cartNum").html(cartNumDel);
                        $(this).parents("tr").remove();
                        /* 判断本行是否被选中 */
                        let aCheckDel = $(this).parents("tr").find(".acheck");
                        if(aCheckDel.prop("checked"))  _this.checkNum--;
                        if(_this.checkNum === $(".acheck").length){
                            $("#allcheck").prev().css({backgroundPositionY:-20});
                            $("#allcheck").prop("checked",true);
                        }else{
                            $("#allcheck").prev().css({backgroundPositionY:0});
                            $("#allcheck").prop("checked",false);
                        }  
                        _this.total();                                                  
                    }                  
                })
                
            }/* end */

           /* 右下角总计结算数据 */
           total(){
               let cartNumSum=0,
                   cartPriceSum=0;
               $(".acheck").each(function(i,acheck){
                    /* 本行被选中 */
                    if($(acheck).prop("checked")){
                        /* 商品数量 */
                       let cartPrice = parseInt($(acheck).parents("tr").find(".cartPrice").html().slice(1));
                       let cartNum = parseInt($(acheck).parents("tr").find(".cartQuantity input").val());
                       cartNumSum += cartNum;
                       cartPriceSum += cartPrice*cartNum;                     
                    }
                }) 
               
               /* 数量总计 */
               $("#cartTotalNum").html(cartNumSum);

               /* 商品金额总计 */               
               $("#cartTotalMoney").html("￥"+cartPriceSum.toFixed(2));
               $("#total").html("￥"+cartPriceSum.toFixed(2));
               
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