
var grandTotal=0;
window.addEventListener("load",(event)=>{

// fetch the orderedItemsInBasket from session storage
// store the ordered list in session storage of browser.
if (localStorage.getItem("orderedItemsInBasket") == null || localStorage.getItem("orderedItemsInBasket") == undefined) {

   alert("something wrong , The items werent added. Please try again");
}
else{
    // items found in session storage
    var orderedItems= localStorage.getItem("orderedItemsInBasket");
    // console.log(orderedItems);
    
    // convert JSON String to Json object
    var basketItems = JSON.parse(orderedItems);    
    var tableBody = document.getElementById("basketTableBody");

    basketItems.forEach((element,index) => {
        tableBody.appendChild(renderTableRow(element.item_id,element.item_price,index+1));
        grandTotal+=element.item_price;
    });

    document.getElementById("grandTotalh1").innerText="₹ "+grandTotal;





// console.log(Object.keys(calculateSummaryOfAllItems(itemsList_Summary)));
// console.log('All the values - '+Object.values(calculateSummaryOfAllItems(itemsList_Summary)));
// console.log(basketItems);

// var unique_Keys=Object.keys(calculateSummaryOfAllItems(itemsList_Summary));
// var unique_Values = Object.values(calculateSummaryOfAllItems(itemsList_Summary));
 
// var tableBody = document.getElementById("basketTableBody");

// for (let i = 0; i < unique_Keys.length; i++) {
//     for (let j = 0; j < basketItems.length; j++) {
//         if(unique_Keys[i] == basketItems[j].item_id){
//             tableBody.appendChild(renderTableRow(unique_Keys[i],unique_Values[i],(basketItems[j].item_price*unique_Values[i]),i));
//             grandTotal+=(basketItems[j].item_price*unique_Values[i]);
          
//         }
//         continue;
//     }


console.log("Grand Total - "+grandTotal);

}

});

// calculate summary instead of using each item
function calculateSummaryOfAllItems(basketItems) {
    const counts = {};
    for (var i = 0; i < basketItems.length; i++) {
       counts[basketItems[i]] = 1 + (counts[basketItems[i]] || 0);
    };
    return counts;
}

// render the table row by passing each item and its summarized info like how many count and total cost.
function renderTableRow(itemName,totalcost,index) {
    var tr_node = document.createElement("tr");
    var th_node = document.createElement("th");
        th_node.setAttribute('scope',"row");
        th_node.innerText =index;
     
    var td_item = document.createElement("td");
        td_item.innerText =itemName;

    // var td_count = document.createElement("td");
    //     td_count.innerText=counter;
    var td_total = document.createElement("td");
        td_total.innerText=totalcost;

    tr_node.appendChild(th_node);
    tr_node.appendChild(td_item);
    // tr_node.appendChild(td_count);
    tr_node.appendChild(td_total);

    return tr_node;

}


document.addEventListener("click",(event)=>{

    if(event.target.id == "cancelButton")
    {
        location.href='/AllItems';
    }else if(event.target.id == "homeLink")
    {
         // clear the storage for ordered items 
    localStorage.clear("orderedItemsInBasket");
    location.href='/';
    }

    
})


function updateBasketNotification(totalItemcount) {
    document.getElementById("basketnotificationitem").innerText = totalItemcount;
    
}

