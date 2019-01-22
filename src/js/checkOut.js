require(["./requirejs.config"],function(){
       require(["jquery","header","footer"],function(){
          let str="";
          if(localStorage.getItem("addressInfor")){            
            $("#detailAddress ul").html(localStorage.getItem("addressInfor"));
            str+=localStorage.getItem("addressInfor");
          }
          
           /* 点击新增收货人地址出现模态框 */
            $("#addressInfor").on("click","a",function(){                   
               $("#adsForm").toggle();
            })
            /*点击表单中的“保存地址”，创建客户地址信息 */
            $("#isAddAddress").on("click","a:first",function(){
                   let obj={
                      name:$("#clientName").val(),
                      provence:$('#addressRegion option:selected').val(),
                      city:$('#addressCity option:selected').val(),
                      strict:$('#addressStrict option:selected').val(),
                      detailAds:$("#inputAddress").val(),
                      tel:$("#telephone").val()
                   };
                  if(str!=""){
                     str+=`<li>
                              <input type="radio" name="detailArs" checked="checked">
                              <span class="nameMsg">${obj.name}</span>
                              <span>
                                 <em class="provenceMsg">${obj.provence}</em>
                                 <em class="cityMsg">${obj.city}</em>
                                 <em class="regionMsg"> ${obj.strict}</em>
                                 <em class="allAddress">${obj.detailAds}</em>
                              </span>
                              <span class="telMsg">${obj.tel}</span>
                              <span class="defaultArs" id="defaultArs">
                                 <em><a href="javaScript:;">设为默认</a></em>
                                 <em><a href="javaScript:;">修改</a></em>
                              </span>
                           </li>`;
                  }else{
                     str+=` <li>
                              <input type="radio" name="detailArs" checked="checked">
                              <span class="nameMsg">${obj.name}</span>
                              <span>
                                 <em class="provenceMsg">${obj.provence}</em>
                                 <em class="cityMsg">${obj.city}</em>
                                 <em class="regionMsg"> ${obj.strict}</em>
                                 <em class="allAddress">${obj.detailAds}</em>
                              </span>
                              <span class="telMsg">${obj.tel}</span>
                              <span class="defaultArs" id="defaultArs">
                                 <em><a href="javaScript:;">默认地址</a></em>
                                 <em><a href="javaScript:;">修改</a></em>
                              </span>
                           </li>`;  
                  } 
                  //存cookie
                  localStorage.setItem("addressInfor",str);                                      
                  $("#detailAddress ul").html(localStorage.getItem("addressInfor"));
                  $("#adsForm").hide().find("input").val("");
            }).on("click","a:last",function(){ 
               $("#adsForm").hide().find("input").val("");
            })
            $("#detailAddress ul").on("mouseenter","li", function(){              
                $(this).find("#defaultArs").find("em:last").show(); 
            }).on("mouseleave","li",function(){
                $(this).find("#defaultArs").find("em:last").hide();
            });

       })
})