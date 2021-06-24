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
                            //  generate cards
                                allitemListRecords.forEach(element => {
                                    var newNode = document.createElement('div');
                                    var nodeval=`<div class="col">
                                    <div class="card shadow-sm">
                                    <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                            
                                    <div class="card-body">
                                        <p class="card-text"></p>
                                        <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                            <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                        </div>
                                        <small class="text-muted">9 mins</small>
                                        </div>
                                    </div>
                                    </div>
                                </div>`
                                newNode.appendChild(nodeval);
                                holder.appendChild(newNode);
                                    
                                });

                             }
                        );
    
     }
    
     

     document.getElementById("isVegchecktoggle").addEventListener("click",(event)=>{
         console.log(event.target.checked);
        //  then we sort the result again for Veg / NV options
        console.log(allitemListRecords);
     })