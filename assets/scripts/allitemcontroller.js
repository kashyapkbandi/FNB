
var allitemListRecords=[];

window.addEventListener('load', (event) => {
    // Check for token. 
    //  if thats null
    if(localStorage.getItem('accessToken') == null)
    {
        console.log("accesstoken set in home page was not found when All item was loaded");

        // call getSFSession server api if the localstorage is empty.
    
          fetch('/getSFAccessToken').then(
                data=>{
                    return data.json()
                    }).then(
                            res=>{
                                // Store this token in local storage
                                localStorage.setItem('accessToken',res.accessToken);  
                                fetchAllFNBItemsFromSF();  
                                 }
                            );
     
    
    }else
    {
        console.log("accesstoken set in home page was found when All item was loaded");

        fetchAllFNBItemsFromSF();
    }
    
    
    });
    
    
    function fetchAllFNBItemsFromSF() {
        // make call to FNB_Item__c endpoint
        fetch('https://fnb3-dev-ed.my.salesforce.com/services/data/v51.0/queryAll/?q=SELECT Id, Name, Title__c,Cuisine__c, Type__c, Price__c, Default_Quanitity__c FROM FNB_Item__c',{ headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+localStorage.getItem('accessToken')
          }}).then(
            data=>{
                return data.json()
                }).then(
                        res=>{
                            //  console.log(res.records);
                             allitemListRecords = res.records;
                             
                                var holder =document.getElementById("listcardscontainer-internal");

                                allitemListRecords.forEach(element => {
                                             //  generate cards
                                holder.appendChild(createCard(element));
   
                                });
                
                             }
                        );
    
     }
    
     

     document.getElementById("isVegchecktoggle").addEventListener("click",(event)=>{
         console.log(event.target.checked);
        //  then we sort the result again for Veg / NV options
        console.log(allitemListRecords);
     })



     function createCard(element) {
        var col_div = document.createElement("div");
        col_div.classList.add('col');
        var card_shadow_sm_div = document.createElement("div");
        card_shadow_sm_div.classList.add('card','shadow-sm');

        var card_body_div = document.createElement("div");
        card_body_div.className='card-body';

        var para = document.createElement("p");
        para.className="card-text";
        para.innerText=element.Title__c;
        // <p class="card-text"></p>
        card_body_div.appendChild(para);

        var dflex_div = document.createElement("div");
        dflex_div.classList.add('d-flex','justify-content-between','align-items-center');

        var btngrp_div = document.createElement("div");
        btngrp_div.className='btn-group';

        var btn1 = document.createElement("button");
        btn1.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
        btn1.setAttribute("type","button");
        btn1.innerText="Add";

        var btn2 = document.createElement("button");
        btn2.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
        btn2.setAttribute("type","button");
        btn2.innerText="remove";

        btngrp_div.appendChild(btn1);
        btngrp_div.appendChild(btn2);
        

        dflex_div.appendChild(btngrp_div);
        card_body_div.appendChild(dflex_div);
        card_shadow_sm_div.appendChild(card_body_div);
        col_div.appendChild(card_shadow_sm_div);

        console.log(col_div);
        return col_div;

     }