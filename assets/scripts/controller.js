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
                             }
                        );
 

}
});

document.getElementById("checkoutallitems").addEventListener("click",(event)=>{

    location.href='/AllItems';

});