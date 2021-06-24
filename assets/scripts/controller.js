window.addEventListener('load', (event) => {
// Check for token. 
//  if thats null
if(localStorage.getItem('accessToken') == null)
{
    // call getSFSession server api if the localstorage is empty.
  if(localStorage.getItem('accessToken')!=null)
  {  
      fetch('/getSFAccessToken').then(
            data=>{
                return data.json()
                }).then(
                        res=>{
                            // Store this token in local storage
                            localStorage.setItem('accessToken',res.accessToken);    
                             }
                        );
    }

}else
{
    // make call to FNB_Item__c endpoint
    fetch('https://fnb3-dev-ed.my.salesforce.com/services/data/v51.0/sobjects/FNB_Item__c/a015g00000Q82g7AAB',{ headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+localStorage.getItem('accessToken')
      }}).then(
        data=>{
            return data.json()
            }).then(
                    res=>{
                         console.log(JSON.stringify(res));
                         }
                    );
}


});