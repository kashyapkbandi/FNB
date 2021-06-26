
var allitemListRecords = [];

var orderedList = [];

// EXAMPLE RECORD FORMAT
// Cuisine__c: "USA"
// Default_Quanitity__c: 1
// Id: "a015g00000Q8GywAAF"
// Name: "FNB-DI-00951"
// Price__c: 120
// Title__c: "Blue Claw Crab Boil with Asian Condiments"
// Type__c: "Vegetarian"



// example card 
/* <div class="col">
<div class="card shadow-sm">
  <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

  <div class="card-body">
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <div class="d-flex justify-content-between align-items-center">
      <div class="btn-group">
        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
      </div>
      <small class="text-muted">9 mins</small>
    </div>
  </div>
</div>
</div> */

window.addEventListener('load', (event) => {
    // Check for token. 
    //  if thats null
    if (localStorage.getItem('accessToken') == null) {
        console.log("accesstoken set in home page was not found when All item was loaded");

        // call getSFSession server api if the localstorage is empty.

        fetch('/getSFAccessToken').then(
            data => {
                return data.json()
            }).then(
                res => {
                    // Store this token in local storage
                    localStorage.setItem('accessToken', res.accessToken);
                    fetchAllFNBItemsFromSF();
                }
            );


    } else {
        console.log("accesstoken set in home page was found when All item was loaded");
        fetchAllFNBItemsFromSF();

    }


});


function fetchAllFNBItemsFromSF() {
    // make call to FNB_Item__c endpoint
    fetch('https://fnb3-dev-ed.my.salesforce.com/services/data/v51.0/queryAll/?q=SELECT Id, Name, Title__c,Cuisine__c, Type__c, Price__c, Default_Quanitity__c FROM FNB_Item__c', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    }).then(
        data => {
            return data.json()
        }).then(
            res => {
                //  console.log(res.records);
                allitemListRecords = res.records;
                //  render items by passing this list.
                // a separate method is created called renderItems so that I can change the contents when needed
                renderItems(allitemListRecords);
                console.log("Done with loading of the items...");

            }
        );

}



document.getElementById("isVegchecktoggle").addEventListener("click", (event) => {
    console.log("User changed the preference to - " + event.target.checked);
    //  then we sort the result again for Veg / NV options
    allitemListRecords;
    var renderList = [];

    if (event.target.checked == true) {
        allitemListRecords.forEach(element => {
            if (element.Type__c == 'Vegetarian') {
                renderList.push(element);
            }
        });
    } else {
        allitemListRecords.forEach(element => {
            if (element.Type__c == 'Non-Vegetarian') {
                renderList.push(element);
            }
        });
    }
    // render that rendeList 
    renderItems(renderList);

})


// method which is responsible to dynamically prepare the card. 
function createCard(element) {
    var col_div = document.createElement("div");
    col_div.classList.add('col');
    var card_shadow_sm_div = document.createElement("div");
    card_shadow_sm_div.classList.add('card', 'shadow-sm');

    var card_body_div = document.createElement("div");
    card_body_div.className = 'card-body';

    var para = document.createElement("p");
    para.className = "card-text";
    para.innerText = element.Title__c;
    // <p class="card-text"></p>
    card_body_div.appendChild(para);

    var dflex_div = document.createElement("div");
    dflex_div.classList.add('d-flex', 'justify-content-between', 'align-items-center');
    //                 <small class="text-muted">9 mins</small>


    var imgicn=document.createElement("img");
    // check if veg and assign the right alt and imagesrc

    if(element.Type__c == "Vegetarian")
    {
        imgicn.setAttribute("src",'/images/veg.png');
        imgicn.setAttribute("alt","Vegetarian");
    }else{
        imgicn.setAttribute("src",'/images/nonveg.png');
        imgicn.setAttribute("alt","Non-Vegetarian");
    }
  

    var smalltag1 = document.createElement("small");
    smalltag1.className = "text-muted";
    smalltag1.innerText = "Count - ";

    var smalltag2 = document.createElement("small");
    smalltag2.className = "text-muted";
    smalltag2.setAttribute('id', 'PRICE_' + element.Id);
    smalltag2.innerText = "Price - " + element.Price__c;
    dflex_div.appendChild(imgicn);
    // dflex_div.appendChild(smalltag1);
    dflex_div.appendChild(smalltag2);

    var btngrp_div = document.createElement("div");
    btngrp_div.className = 'btn-group';

    var btn1 = document.createElement("button");
    btn1.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
    btn1.setAttribute("type", "button");
    btn1.innerText = "Add";
    btn1.setAttribute('id', 'ADD_' + element.Id + '_NAME_' + element.Title__c);

    var btn2 = document.createElement("button");
    btn2.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
    btn2.setAttribute("type", "button");
    btn2.innerText = "remove";
    btn2.setAttribute('id', 'REM_' + element.Id + '_NAME_' + element.Title__c);

    btngrp_div.appendChild(btn1);
    btngrp_div.appendChild(btn2);


    dflex_div.appendChild(btngrp_div);
    card_body_div.appendChild(dflex_div);
    card_shadow_sm_div.appendChild(card_body_div);
    col_div.appendChild(card_shadow_sm_div);

    // console.log(col_div);
    return col_div;

}


// method is used to render the items list when loading, and toggled for veg/nv options 
function renderItems(records) {

    var holder = document.getElementById("listcardscontainer-internal");
    holder.innerHTML = '';
    records.forEach(element => {
        //  generate cards
        holder.appendChild(createCard(element));
    });
}


// adding click listener for the add button for each item
document.addEventListener('click', (event) => {

    // if user clicked a button
    if (event.target.tagName == "BUTTON") {
        // AND that button has ID starting with ADD_ or REM_ so that we are dealing with only add or remove buttons
        if (event.target.id.startsWith("ADD_")) {
            // then we are adding items to the list.
            orderedList.push(
                {
                    "item_id": event.target.id.substring(24),
                    // convert the text to number
                    "item_price": parseInt(event.target.parentNode.parentNode.childNodes[1].innerText.substring(8))
                }
            );
            console.log(orderedList);
        }
        // if the user has pressed Remove button
        else if(event.target.id.startsWith("REM_")){
            // removal logic
            // first check if orderedList is empty (if empty no checking needed)
            if(orderedList.length==0){
                alert("Please add any item to remove it");
            }else{
                // orderedList is not empty it has atleast one item
                // Now check if the item on which Remove button is being pressed, is available in the orderedList or not.

                // we are not using forEach so that we can avoid removing multiple same items
                /*
                for example, If I have Item a 1 time and Item b 3 times and Item c once
                when I click remove on Item b, I remove 2 Item b because, after every click, the for loop runs for whole list and checks for b
                so it finds it 2 times and removes it twice. 
                so we need to add break. It seems Break doesnt work with forEach as I see illegal Break statement error. 
                replaced this with normal For loop so that the break can be added after removal of an Item so that we are removing one Item per Remove click
                */
                for(var i=0;i<orderedList.length;i++)
                {
                    if(event.target.id.substring(24) == orderedList[i].item_id)
                    {
                        // get the index of the item and remove it
                        orderedList.splice(orderedList.indexOf(orderedList[i].item_id),1);
                        break;
                    }
                }



            }
        }
        // if thats a Search button
        else if(event.target.id == "FilterFoodBySearch"){
            // get the value entered in item search box and populate a list to render inplace of what ever is present.
            var searchList = [];
            allitemListRecords.forEach(element=>{
                if (element.Title__c.toUpperCase().includes(document.getElementById("itemsearchbox").value.toUpperCase())) {
                    searchList.push(element);
                }
            });
            console.log(searchList);
            // send this to render the list.
            renderItems(searchList);
            
            event.preventDefault();
        }


    }



});