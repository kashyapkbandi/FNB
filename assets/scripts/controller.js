window.addEventListener('load', (event) => {
// Check for token. 
//  if thats null
if(localStorage.getItem('accessToken') == null)
{
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
                         console.log(res.records);
                         }
                    );
    
}
