// File name: invoiceSearch.js
// Description: This file is JavaScript for invoiceSearch.php
// Course & Section: CST8285 313
// Professor: Hala Own
// Author: Ryan Xu
// Date Created: 2024-03-22
// Last Date modified: 2024-03-29

import { displayDateTime, newVendorInputWindow } from "./common.js";

// =============================================================================
// This function is used to fetch all vendor name to populate Vendor <select>
function fetchVendorOptions() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "./server/getVendorName.php");
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("fetchVendorOptions: \n", this.responseText);
        let options = JSON.parse(this.responseText);
        let select = document.getElementById("vendorSelect");
        // Add new options
        options.forEach((option) => {
          let optionElement = document.createElement("option");
          optionElement.value = option.vendorID;
          optionElement.textContent = option.vendorName;
          select.appendChild(optionElement);
        });
        resolve(options);
      } else if (this.readyState === 4) {
        reject(new Error("Error occurred while fetching vendor options"));
      }
    };
    xhr.send();
  });
}

// This function is used to fetch Transactions or TransactionDetails
function fetchTransaction(filterOptions, url, populateFunction) {
  return new Promise((resolve, reject) => {
    let body = JSON.stringify(filterOptions);
    console.log("body: \n", body);

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetch all transactions data: \n", data);
        if (data !== "") {
          populateFunction(data);
        }
        resolve(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(error);
      });
  });
}

// This function is used to populate the Transactions List
function transactionListTable(data) {
  let dataArray = JSON.parse(data);
  let container = document.getElementById("formPart2");
  container.innerHTML = ""; //Clear the result before new search
  let columns = [
    "VendorName",
    "InvoiceNumber",
    "TransactionDate",
    "TransactionTime",
    "Subtotal",
    "TotalTax",
    "Total",
    "Descriptions",
    "TransactionID",
  ];

  let table = document.createElement("table");
  table.setAttribute("class", "list");

  // Create label row
  let rowlabel = document.createElement("tr");
  for (let column of columns) {
    let cell = document.createElement("th");
    if (column !== "TransactionID") {
      cell.textContent = column;
    } else {
      // The last column is for View Button
      cell.textContent = "View";
    }
    rowlabel.appendChild(cell);
  }
  table.appendChild(rowlabel);

  // Traversal the data for data row
  dataArray.forEach((item) => {
    // Create a tr element
    let row = document.createElement("tr");

    // Traversal the columns
    columns.forEach((column) => {
      // Create a td element
      let cell = document.createElement("td");

      // Place the data into the cell
      if (column !== "Total" && column !== "TransactionID") {
        cell.textContent = item[column];
      } else if (column === "Total") {
        let totalValue =
          parseFloat(item["Subtotal"]) + parseFloat(item["TotalTax"]);
        cell.textContent = totalValue;
      } else {
        let viewButton = document.createElement("button");
        let TransactionID = item["TransactionID"];
        viewButton.setAttribute("type", "button");
        viewButton.setAttribute("value", TransactionID);
        viewButton.setAttribute("id", "button"+TransactionID);
        viewButton.textContent = "View";
        viewButton.addEventListener("click", (e) => {
          // Call the function to view the detail
          e.preventDefault();  //prevent the form from submitting normally
          transactionDetailSearchEvent(TransactionID, row);
          console.log("View button clicked, TransactionID: ", TransactionID);
        });
        // cell = document.createElement('td');
        cell.appendChild(viewButton);
      }
      // Append the cell to row
      row.appendChild(cell);
    });
    // Append the row to table
    table.appendChild(row);
  });
  // Append the table to form fieldset
  container.appendChild(table);
}

// This function is used to populate transactin detail list
function populateTransactionDetailList(data) {
  let dataArray = JSON.parse(data);
  let container = document.getElementById("formPart3");
  container.innerHTML = ""; //Clear the result before new search
  let columns = [
    "Row#",
    "VendorProductID",
    "ProductName",
    "Quantity",
    "Unit",
    "Price",
    "TaxType",
    "TransactionDetailID",
  ];

  let table = document.createElement("table");
  table.setAttribute("class", "list");

  // Create label row
  let rowlabel = document.createElement("tr");
  for (let column of columns) {
    let cell = document.createElement("th");
    if (column !== "TransactionDetailID") {
      cell.textContent = column;
    } else {
      // The last column is for View Button
      cell.textContent = "Edit";
    }
    rowlabel.appendChild(cell);
  }
  table.appendChild(rowlabel);

  // Traversal the data for data row, as the data create a table row
  dataArray.forEach((item) => {
    // Create a tr element
    let row = document.createElement("tr");

    // Traversal the columns, the button need to add event so let it outside forEach
    let editSaveButton;
    let cancelButton;
    columns.forEach((column) => {
      // Create a td element
      let cell = document.createElement("td");

      // Place the data into the cell
      let inputElement;
      switch(column){
        case "Row#": 
          cell.textContent = item["rowNumber"];
          break;
        case "TransactionDetailID":
          let TransactionDetailID = item["TransactionDetailID"];
          editSaveButton = document.createElement("button");
          editSaveButton.setAttribute("type", "button");
          editSaveButton.setAttribute("class", "Edit");
          editSaveButton.setAttribute("value", TransactionDetailID);
          editSaveButton.setAttribute("id", "EditButton"+TransactionDetailID);
          editSaveButton.textContent = "Edit";
          // cell = document.createElement('td');
          cell.appendChild(editSaveButton);

          cancelButton = document.createElement("button");
          cancelButton.setAttribute("type", "button");
          cancelButton.setAttribute("class", "cancel");
          cancelButton.setAttribute("value", TransactionDetailID);
          cancelButton.setAttribute("id", "cancelButton"+TransactionDetailID);
          cancelButton.style.display = 'none';
          cancelButton.textContent = "Cancel";
          // cell = document.createElement('td');
          cell.appendChild(cancelButton);

          let p1 = document.createElement("p");
          p1.setAttribute("class", "memory");
          p1.textContent = item['Quantity'];

          let p2 = document.createElement("p");
          p2.setAttribute("class", "memory");
          p2.textContent = item['Price'];
          cell.appendChild(p1);
          cell.appendChild(p2);
          break;
        case "Quantity":
          inputElement = document.createElement("input");
          inputElement.setAttribute("type", "text");
          inputElement.setAttribute("class", "transactionDetail");
          inputElement.setAttribute("readonly", true);
          inputElement.setAttribute("value", item["Quantity"]);
          cell.appendChild(inputElement);
          break;
        case "Price":
          inputElement = document.createElement("input");
          inputElement.setAttribute("type", "text");
          inputElement.setAttribute("class", "transactionDetail");
          inputElement.setAttribute("readonly", true);
          inputElement.setAttribute("value", item["Price"]);
          cell.appendChild(inputElement);
          break;
        default:
          cell.textContent = item[column];
      }
      // Append the cell to row
      row.appendChild(cell);
    });
    // Append the row to table
    editSaveButton.addEventListener("click", (event) => {
      transactionDetailEditEvent.call(event.target);
    });

    cancelButton.addEventListener('click', (event) => {
      transactionDetailCancelEvent.call(event.target);
    });
    table.appendChild(row);
  });
  // Append the table to form fieldset
  container.appendChild(table);
}

// This function is used to find the privous nth sibling which is used for "view"/"Edit" button
// the element is 
function previousNthElementSibling(element, n) {
  console.log("previousNthElementSibling current element:", element);
  let currentSibling = element.parentNode.previousElementSibling;
  
  while (currentSibling && n > 1) {
      currentSibling = currentSibling.previousElementSibling;
      n--;
  }
  currentSibling = currentSibling.children[0];
  return currentSibling;
}

// this funciton is used for Cancel button Event
function transactionDetailCancelEvent() {
  this.previousElementSibling.textContent = 'Edit';
  this.previousElementSibling.setAttribute("class",'edit');
  this.style.display = 'none';
  previousNthElementSibling(this, 4).setAttribute("readonly", true);
  previousNthElementSibling(this, 4).classList.remove("editable");
  previousNthElementSibling(this, 2).removeAttribute("readonly",true);
  previousNthElementSibling(this, 2).classList.remove("editable");
  previousNthElementSibling(this, 4).value = this.nextSibling.textContent;
  previousNthElementSibling(this, 2).value = this.nextSibling.nextSibling.textContent;
}

// This function is used for transactionDetails Save button
function transactionDetailEditEvent() {
  let TransactionDetailID = this.value;
  let self = this;
  console.log("TransactionDetailID in transactionDetailEditEvent: ", TransactionDetailID);
  // console.log("element this: ", this);
  // console.log("element this.parentNode: ", this.parentNode);
  // console.log("element.previousNthElementSibling(this, 4): ", previousNthElementSibling(this, 4));
  if ( this.textContent == "Edit") {
    // "Quantity" is 4th previous sibling, "Unit" is 3rd previous sibling
    //  "Price" is 2nd previous sibling, "TaxType" is 1st previous sibling
    previousNthElementSibling(this, 4).removeAttribute("readonly");
    previousNthElementSibling(this, 4).classList.add("editable");
    previousNthElementSibling(this, 2).removeAttribute("readonly");
    previousNthElementSibling(this, 2).classList.add("editable");
    this.setAttribute("class", "save");
    this.textContent = "Save";
    this.nextSibling.style.display = 'inline';
  } else {

    // update transactionDetails and products
    // save the 'selected' button
    let selectedID = document.querySelector('.selected').children[8].children[0].id;
      updateTransactionDetail.call(self).then(updateReturnInfo => {
      console.log(updateReturnInfo);
      console.log("this self for Save: ", self);
      previousNthElementSibling(self, 4).setAttribute("readonly", true);
      previousNthElementSibling(self, 4).classList.remove("editable");
      previousNthElementSibling(self, 2).removeAttribute("readonly",true);
      previousNthElementSibling(self, 2).classList.remove("editable");
      self.setAttribute("class", "edit");
      self.textContent = "Edit";
      self.nextSibling.style.display = 'none';
      transactionSearchEvent().then((data) => {
        console.log("selectedID =", selectedID);
        document.getElementById(selectedID).parentElement.parentElement.classList.add('selected');
      })
      .catch((error) => {
        console.error("Error occurred: ", error);
      });
    }).catch(error => {
        console.error("Error occurred: ", error);
    });
    alert("The data has been submitted!");
    }
  // console.log("TransactionDetailID: ", TransactionDetailID);
}

// This function event is used for transactionDetails search button
// @row is used to know which row clicked
// TransactionID is the search condition
function transactionDetailSearchEvent(TransactionID, row) {
  console.log("this.parentNode.parentNode: \n", row.parentNode);
  // remove all "selected" class
  let rows = row.parentNode.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
      rows[i].classList.remove("selected");
  }
  row.classList.add("selected");

  let filterOptions = {
    "TransactionID": TransactionID,
  }; // dict object
  // console.log("filterOptions for fetchTransactions: \n", filterOptions);
  let url = "./server/fetchTransactionDetail.php";

  fetchTransaction(filterOptions, url, populateTransactionDetailList)
    // .then(response => response.json())
    .then(data => {
      // console.log("fetchTransactions result from php: \n", data);
      data = JSON.parse(data);
      console.log("fetchTransactionDetails result from php: \n", data);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

// This function is used for transaction search button
function transactionSearchEvent() {
  return new Promise((resolve, reject) => {
    let VendorID = document.getElementById("vendorSelect").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let filterOptions = {
      "VendorID": VendorID,
      "startDate": startDate,
      "endDate": endDate,
    }; // dict object

    let url = "./server/fetchTransactions.php";
    fetchTransaction(filterOptions, url, transactionListTable)
      .then((data) => {
        data = JSON.parse(data);
        console.log("fetchTransactions result from php: \n", data);
        resolve(data); // Resolve with the parsed data
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        reject(error); // Reject with the error object
      });
  });
}

// This function is used to update TransactionDetails table
function updateTransactionDetail() {
  // console.log("this in updateTransactionDetail: ", this);
  return new Promise((resolve, reject) => {
      let Quantity = previousNthElementSibling(this, 4).value;
      let Price = previousNthElementSibling(this, 2).value;
      let TransactionDetailID = this.value;
      // console.log("This: ", this);
      // console.log("Quantity: ", Quantity);

      let data = {
          'TransactionDetailID': TransactionDetailID,
          'Quantity': Quantity,
          'Price': Price,
      };
      console.log("data: ", data);
      // change dict object "data" to JSON format "body" which will post to php
      let body = JSON.stringify(data);
      console.log("body: ", body);

      fetch('./server/updateTransactionDetail.php', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', },
          body: body,
      }).then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json(); 
      }).then(data => {
          // let updateRows = data;
          console.log("Return from updateTransactionDetail:", data);
          resolve(data);
      }).catch(error => {
          console.error('Error:', error);
          reject(error);
      });  
  });
}


// For validate Quantity and Price
// let numberErrorMsg = "❌ Invalid number.";
// let defaultMSg = "";
var parentElement = document.getElementById('fieldset3');

// Add event listener to the parent element to validate all sub elements of "quantity" and "price" during input
parentElement.addEventListener("input", function(e) {
  // Check the <input> product name element
  if(e.target && (e.target.classList.contains('transactionDetail'))) {
      // "input" event
      let value = e.target.value;
      let negativeSign = value.startsWith('-') ? '-' : '';
      let numbersAndDot = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      e.target.value = negativeSign + numbersAndDot;
  }
});


document.getElementById("search").addEventListener("click", function(e) {
  e.preventDefault();  //prevent the form from submitting normally
  transactionSearchEvent();
});

// This listener is used to click "reset" button
// One scenario is not considered now: click "reset" when there're more than one product lines, keep one line or not?
document.getElementById("reset").addEventListener("click", function (event) {
  var confirmReset = confirm("Are you sure reset the form?");
  if (!confirmReset) {
    event.preventDefault();
  } else {
    location.reload();
  }
});

// document.getElementById('logout').addEventListener('click', function() {
//   // Redirect to logout.php when the button is clicked
//   window.location.href = './server/logout.php';
// });

// document.addEventListener("click", function(event) {
//   var logoutDropdown = document.getElementById("logout-dropdown");
//   if (!event.target.closest("#logout") && logoutDropdown.style.display === "block") {
//       logoutDropdown.style.display = "none";
//   }
// });

window.onload = function () {
  fetchVendorOptions()
    .then((options) => {
      console.log("Options: ", options);
    })
    .catch((error) => {
      console.error("Error occurred: ", error);
    });
};
