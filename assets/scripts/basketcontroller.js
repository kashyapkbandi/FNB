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
    console.log(basketItems);



calculateSummaryOfAllItems(basketItems);










//     <tr>
//     <th scope="row">1</th>
//     <td>Item 1 </td>
//     <td>5</td>
//     <td>600</td>
// </tr>



}

});

// calculate summary instead of using each item
function calculateSummaryOfAllItems(basketItems) {
    
    var sortedItems=[{
        item:"",
        cost:"",
        counter:0
    }];
    var count =0;

    for(var i=0;i<basketItems.length;i++)
    {
        if(sortedItems[i].item == basketItems[i].item_id)
        {
            sortedItems[i].counter+=1;
        }else{
            sortedItems.push({"item":basketItems[i].item_id,
                "cost":basketItems[i].item_price,
                "counter":1});
        }

    }

    console.log(sortedItems);
}

// render the table row by passing each item and its summarized info like how many count and total cost.
function renderTableRow(itemName,counter,totalcost,index) {
    var tr_node = document.createElement("tr");
    var th_node = document.createElement("th");
        th_node.setAttribute('scope',"row");
        th_node.innerText =index;
     
    var td_item = document.createElement("td");
        td_item.innerText =itemName;

    var td_count = document.createElement("td");
        td_count.innerText=counter;
    var td_total = document.createElement("td");
        td_total.innerText=totalcost;

    tr_node.appendChild(th_node);
    tr_node.appendChild(td_item);
    tr_node.appendChild(td_count);
    tr_node.appendChild(td_total);

    return tr_node;

}