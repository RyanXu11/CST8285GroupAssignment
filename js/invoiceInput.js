import {
  displayDateTime,
  validateNumber,
  newVendorInputWindow,
} from "./common.js";

// functions for window.onload
window.onload = function () {
  fetchVendorOptions()
    .then((options) => {
      console.log("Options: ", options);
    })
    .catch((error) => {
      console.error("Error occurred: ", error);
    });

  // set default transaction date to today
  setTransactionDateTime();
  formState();
  // displayDateTime();
};

// =============================================================================

// set transaction date default value is today
function setTransactionDateTime() {
  // get the timstamp
  const timestamp = Date.now();
  const currentDate = new Date(timestamp);

  // Get the year, month, day
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Get hours, minutes, seconds
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // format date, time and DateTime
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const formattedDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;

  document.getElementById("transactionDate").value = formattedDate;
  document.getElementById("transactionTime").value = formattedTime;
  document.getElementById("invoiceNumber").value = formattedDateTime;
}
// =============================================================================
// Following parts are used to fetch information from Database==================
// Function to fetch vendor options to create options of Vendor <select>
function fetchVendorOptions() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "./server/getVendorName.php");
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log("fetchVendorOptions: \n", this.responseText);
        let options = JSON.parse(this.responseText);
        let select = document.getElementById("vendorSelect");
        removeOptions(select.id);
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

// Function to fetch vendor options to populate vendor related form elements
function fetchVendorInfo(vendorId) {
  let xhr = new XMLHttpRequest();
  // console.log("This is vendorId:\n", vendorId);
  xhr.open("GET", "./server/getVendorInfo.php?selectedValue=" + vendorId, true);
  // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  // displayDateTime();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let options = JSON.parse(this.responseText);
      // console.log("This is options:\n", options);
      options.forEach((option) => {
        for (let key in option) {
          let element = document.getElementById(key.toLowerCase());
          if (element) {
            element.value = option[key];
          }
        }
      });
      fetchProductName(vendorId);
    }
  };
  xhr.send();
}

// This function is used to remove the options from product <select> to avoid duplicated options
function removeOptions(selectElement) {
  // get select element
  let select = document.getElementById(selectElement);
  // console.log(select);
  // remove all options except the first one (value = 0)
  if (select.options.length > 1) {
    for (var i = select.options.length - 1; i >= 0; i--) {
      if (select.options[i].value !== "0") {
        select.remove(i);
      }
    }
  }
}

// Function to fetch Productname options to create new options of product <select>
function fetchProductName(vendorId) {
  let xhr = new XMLHttpRequest();
  // console.log("This is vendorId:\n", vendorId);
  xhr.open("GET", "./server/getProductName.php?selectedValue=" + vendorId, true);
  // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  // displayDateTime();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // Get the <select> element and remove exsit options to avoid duplicated <option> items
      let selectVendorProductId = document.getElementById(
        "selectVendorProductId1"
      );
      removeOptions("selectVendorProductId1");
      // console.log("This is selectVendorProductId1:\n", selectVendorProductId1);
      // Append new options
      let options = JSON.parse(this.responseText);
      options.forEach((option) => {
        // console.log("This is option for fetchProductName:\n", option);
        let newOption = document.createElement("option");
        newOption.value = option["ProductID"];
        newOption.textContent =
          option["VendorProductID"] + " | " + option["ProductName"];
        selectVendorProductId.appendChild(newOption);
      });
    }
  };
  xhr.send();
}

// This function is used to create table for transaction detail
// function fetchProductName2(vendorId) {
//   let xhr = new XMLHttpRequest();
//   // console.log("This is vendorId:\n", vendorId);
//   xhr.open("GET", "server/getProductName.php?selectedValue=" + vendorId, true);
//   // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//   // displayDateTime();
//   xhr.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//       // Get the <select> element and remove exsit options to avoid duplicated <option> items
//       let selectVendorProductId = document.getElementById('selectVendorProductId1');
//       let newSelectElement=document.createElement('select');
//       // console.log("This is selectVendorProductId1:\n", selectVendorProductId1);
//       // Append new options
//       let options = JSON.parse(this.responseText);
//       options.forEach((option) => {
//           // console.log("This is option for fetchProductName:\n", option);
//           let newOption = document.createElement('option');
//           newOption.value = option['ProductID'];
//           newOption.textContent = option['VendorProductID'] + " | " + option['ProductName'];
//           newSelectElement.appendChild(newOption);
//       });
//       return newSelectElement;
//     }
//   }
//   xhr.send();
// }

// This function is used to fetch product information and populate related Product form elements
function fetchProductInfo(productId) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    let currentElement = document.getElementById(productId);
    let currentLineNumber = currentElement.parentElement.previousElementSibling;
    xhr.open("GET","./server/getProductInfo.php?selectedValue=" + currentElement.value, true);

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let options = JSON.parse(this.responseText);
          options.forEach((option) => {
            for (let key in option) {
              let element = document.getElementById(
                key + currentLineNumber.textContent.trim()
              );
              if (element) {
                element.value = option[key];
              }
            }
          });
          resolve();
        } else {
          reject(new Error("Request failed with status: " + this.status));
        }
      }
    };
    xhr.send();
  });
}

// This function is used to insert new vendor information
function insertVendor() {
  return new Promise((resolve, reject) => {
    let vendorName = document.getElementById("inputVendorName").value;
    let GSTNo = document.getElementById("gstno").value;
    let Address = document.getElementById("address").value;
    let City = document.getElementById("city").value;
    let Province = document.getElementById("province").value;

    // let Country = document.getElementById('country').value;
    let Zip = document.getElementById("zip").value;
    let Email = document.getElementById("email").value;
    let Phone = document.getElementById("phone").value;
    let Membership = document.getElementById("membership").value;

    let data = {
      vendorName: vendorName,
      GSTNo: GSTNo,
      Email: Email,
      Phone: Phone,
      Address: Address,
      City: City,
      Province: Province,
      Zip: Zip,
      // 'Country': Country,
      Membership: Membership,
    };
    console.log("data: ", data);

    // change dict object "data" to JSON format "body" which will post to php
    let body = JSON.stringify(data);
    console.log("body: ", body);

    fetch("./server/insertVendor.php", {
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
        if (data.error) {
          // throw new Error(data.error);
          alert("Append new vendor failed! \n" + data.error);
          reject(new Error(data.error));
        } else {
          let lastInsertId = data.lastInsertId;
          console.log("lastInsertId", lastInsertId);
          resolve(lastInsertId);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(error);
      });
  });
}

// This function is used to update the exist vendor information
function updateVendor() {
  return new Promise((resolve, reject) => {
    let vendorID = document.getElementById("vendorSelect").value;
    let vendorName = document.getElementById("inputVendorName").value;
    let GSTNo = document.getElementById("gstno").value;
    let Address = document.getElementById("address").value;
    let City = document.getElementById("city").value;
    let Province = document.getElementById("province").value;

    // let Country = document.getElementById('country').value;
    let Zip = document.getElementById("zip").value;
    let Email = document.getElementById("email").value;
    let Phone = document.getElementById("phone").value;
    let Membership = document.getElementById("membership").value;

    let data = {
      VendorID: vendorID,
      vendorName: vendorName,
      GSTNo: GSTNo,
      Email: Email,
      Phone: Phone,
      Address: Address,
      City: City,
      Province: Province,
      Zip: Zip,
      // 'Country': Country,
      Membership: Membership,
    };
    console.log("data: ", data);

    // change dict object "data" to JSON format "body" which will post to php
    let body = JSON.stringify(data);
    console.log("body: ", body);

    fetch("./server/updateVendor.php", {
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
        // let updateRows = data;
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(error);
      });
  });
}

// let childWindow;
// // Add event listener for "New Vendor" button
// document.getElementById("newVendor").addEventListener("click", function () {
//   childWindow = newVendorInputWindow();
// });

// Receive message from childWindow
// window.addEventListener('message', function(event) {
//   // displayDateTime();
//   console.log("Message from: ", event.source);
//   console.log("The event.data is: ", event.data);
//   if (event.source === childWindow) {
//     fetchVendorOptions().then(options => {
//       console.log("Options: ", options);
//       document.getElementById("vendorSelect").value = event.data;
//       let testvalue = document.getElementById("vendorSelect").value
//       console.log("testvalue is: ", testvalue);
//       fetchVendorInfo(event.data);
//       document.getElementById("inputNewVendorProductId1").focus();
//     }).catch(error => {
//         console.error("Error occurred: ", error);
//     });
//   }
// });

//==============================================================================
// These functions are used to clear fieldsets
function clearFieldset1() {
  let fields = [
    "address",
    "city",
    "province",
    "zip",
    "email",
    "phone",
    "gstno",
    "membership",
  ];
  fields.forEach(function (field) {
    document.getElementById(field).value = "";
  });
}

function setVendorEditable(setBoolean) {
  let fields = [
    "address",
    "city",
    "province",
    "zip",
    "email",
    "phone",
    "gstno",
    "membership",
  ];
  if (setBoolean) {
    fields.forEach(function (field) {
      document.getElementById(field).removeAttribute("readonly");
    });
  } else {
    fields.forEach(function (field) {
      document.getElementById(field).setAttribute("readonly", true);
    });
  }
}

function clearFieldset3() {
  // Reset Invoice Item
  let parentDiv = document.getElementById("fieldset3");
  let childDivs = parentDiv.children;
  let i = childDivs.length - 1;
  // the first child is legend, the second child is label, the third is the first item
  for (i; i >= 3; i--) {
    console.log("childDivs[i] will be removed: ", childDivs[i]);
    parentDiv.removeChild(childDivs[i]);
  }
  document.getElementById("inputNewVendorProductId1").value = "";
  document.getElementById("productName1").value = "";
  document.getElementById("quantity1").value = "1";
  document.getElementById("unit1").value = "0";
  document.getElementById("price1").value = "";
  document.getElementById("taxType1").value = "0";
  document.getElementById("inputNewVendorProductId1").style.display = "inline";
}

function clearFieldset4() {
  document.getElementById("subtotal").value = "";
  document.getElementById("totalTax").value = "";
  document.getElementById("total").value = "";
}

function clearForm() {
  // Clear Vendor information
  clearFieldset1();

  // Reset invoiceNumber, TransactionDate and Time
  setTransactionDateTime();

  clearFieldset3();

  // Clear subtotal
  clearFieldset4();
}

// =============================================================================
// Following part is used to validation=========================================
let nameErrorMsg =
  "❌ Name should be non-empty, and within 50 characters long.";
let numberErrorMsg = "❌ Invalid number.";
let defaultMSg = "";

function validateName(targetId) {
  let productName = targetId.value; // access the value of the product name, trim the spaces
  let error = "";
  // console.log("productName.length = ", productName.length);
  if (productName.trim() === "" || productName.length > 50) {
    //test is predefiend method to check if the entered name matches the regexp
    error = nameErrorMsg;
  } else {
    error = defaultMSg;
    targetId.value = productName.trim();
  }
  return error;
}

//function to validate all product names
function validateAllProductNames() {
  let validResult = new Set();
  let errorMsg = "";

  // Get all name="productName" <input> elements
  var inputs = document.querySelectorAll(
    '#fieldset3 input[name="productName"]'
  );
  // validation for all inputs until exists a invalid elements
  for (var i = 0; i < inputs.length; i++) {
    errorMsg = validateName(inputs[i]);
    if (errorMsg !== defaultMSg) {
      validResult.add(inputs[i].id);
    }
  }
  return validResult;
}

// This function is used to create a table for TransactionDetail List
// function createTransactionDetailTabel() {
//   let vendorID=document.getElementById("vendorSelect").value;
//   let container = document.getElementById("fieldset5");
//   container.innerHTML = ""; //Clear the result before new search
//   let columns = [
//     "Row#",
//     "Vendor ProductID",
//     "ProductName",
//     "Quantity",
//     "Price",
//     "TaxType",
//     "Delete",
//     "Description",
//     "ProductID",
//   ];

//   let table = document.createElement("table");
//   table.setAttribute("class", "list");

//   // Create label row
//   let rowlabel = document.createElement("tr");
//   for (let column of columns) {
//     let cell = document.createElement("th");
//     if (column !== "ProductID") {
//       cell.textContent = column;
//     } else {
//       // The last column is for View Button
//       cell.textContent = "";
//     }
//     rowlabel.appendChild(cell);
//   }
//   table.appendChild(rowlabel);

//   let inputRow = document.createElement("tr");
//   let cell= document.createElement("td");
//   cell.textContent = "1";
//   inputRow.appendChild(cell);  // Row#

//   inputRow.appendChild(fetchProductName2(vendorID)); // Vendor Product ID Select

//   inputRow.appendChild
//   //
//   //

// }

// Add event listener to the parent element to validate all sub elements of "quantity" and "price"
// parentElement.addEventListener("change", function(e) {
//   // Check the <input> product name element
//   if(e.target && (e.target.name === 'quantity' || e.target.name === 'price')) {
//       // "change" event
//       let validateResult = validateNumber(e.target);
//       // console.log("This is selectVendorProductId, \n", selectVendorProductId)
//       e.target.nextElementSibling.textContent = validateResult;
//       if (validateResult !== defaultMSg){
//         e.target.focus();
//       }
//   }
// });

function calculateSubtotal() {
  let quantities = document.querySelectorAll(
    '#fieldset3 input[name="quantity"]'
  );
  let prices = document.querySelectorAll('#fieldset3 input[name="price"]');
  let taxType = document.querySelectorAll('#fieldset3 select[name="taxType"]');
  let subtotal = 0;
  let tax = 0;
  console.log("quantities[0]:", quantities[0]);
  console.log("prices[0]:", prices[0]);
  for (let i = 0; i < quantities.length; i++) {
    console.log("quantities[i].value:", quantities[i].value);
    console.log("prices[i].value:", prices[i].value);
    let itemPrice =
      parseFloat(quantities[i].value) * parseFloat(prices[i].value);
    console.log("itemPrice = ", itemPrice);
    console.log("taxType[i] = ", taxType[i].value);
    subtotal += itemPrice;
    switch (taxType[i].value) {
      case "H":
        tax += parseFloat(itemPrice) * 0.13;
        break;
      case "G":
        tax += parseFloat(itemPrice) * 0.05;
        break;
      default:
    }
  }
  subtotal = subtotal.toFixed(2);
  tax = tax.toFixed(2);
  document.getElementById("subtotal").value = subtotal;
  document.getElementById("totalTax").value = tax;
  document.getElementById("total").value =
    parseFloat(subtotal) + parseFloat(tax);
}

// For Product list event listener, get the parent element to validate all related sub elements in fieldset3
var parentElement = document.getElementById("fieldset3");

// Add event listener to the parent element to deal with product <select> change
// e.target.name can select and deal with all same "name" attribute sub elements.
parentElement.addEventListener("change", function (e) {
  // Check the <select> element
  if (e.target && e.target.name === "selectVendorProductId") {
    // "change" event
    let inputNewVendorProductId = e.target.nextElementSibling;
    // console.log("This is selectVendorProductId, \n", selectVendorProductId)
    if (e.target.value == 0) {
      // Let "new product" input visible and empty name and price, and name editable
      inputNewVendorProductId.style.display = "inline";
      e.target.parentElement.nextElementSibling.children[0].readOnly = false;
      e.target.parentElement.nextElementSibling.children[0].value = "";
      e.target.parentElement.parentElement.children[5].children[0].value = "";
      inputNewVendorProductId.focus();
    } else {
      // let "new product" input invisible and get related product information
      fetchProductInfo(e.target.id)
        .then(() => {
          inputNewVendorProductId.style.display = "none";
          e.target.parentElement.nextElementSibling.children[0].readOnly = true;
          e.target.parentElement.nextElementSibling.children[1].textContent =
            "";
          e.target.parentElement.parentElement.children[5].children[1].textContent =
            "";
          calculateSubtotal();
        })
        .catch((error) => {
          console.error(
            "An error occurred while fetching product info:",
            error
          );
        });
    }
  }
});

// Add event listener to the parent element to validate Product Name
parentElement.addEventListener("change", function (e) {
  // Check the <input> product name element
  if (e.target && e.target.name === "productName") {
    // "change" event
    let error = validateName(e.target);
    // console.log("This is selectVendorProductId, \n", selectVendorProductId)
    e.target.nextElementSibling.textContent = error;
    if (error !== defaultMSg) {
      e.target.focus();
    }
  }
});

// Add event listener to the parent element to validate all sub elements of "quantity" and "price" during input
parentElement.addEventListener("input", function (e) {
  // Check the <input> product name element
  if (e.target && (e.target.name === "quantity" || e.target.name === "price")) {
    // "input" event
    let value = e.target.value;
    let negativeSign = value.startsWith("-") ? "-" : "";
    let numbersAndDot = value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    e.target.value = negativeSign + numbersAndDot;
  }
});

parentElement.addEventListener("change", function (e) {
  // Check the <input> product name element
  if (
    e.target &&
    (e.target.name === "quantity" ||
      e.target.name === "price" ||
      e.target.name === "taxType")
  ) {
    // "change" event
    calculateSubtotal();
  }
});

//function to validate all quantity or price used by "submit" button
function validateAllQuantityPrice() {
  let validResult = new Set();
  let errorMsg = defaultMSg;

  // Get all name="productName" <input> elements
  let inputs = document.querySelectorAll(
    '#fieldset3 input[name="quantity"], #fieldset3 input[name="price"]'
  );
  // validation for all inputs until exists a invalid elements
  for (var i = 0; i < inputs.length; i++) {
    errorMsg = validateNumber(inputs[i]);
    if (errorMsg !== defaultMSg) {
      validResult.add(inputs[i].id);
    }
  }
  return validResult;
}

// This function is used to validate the whole Form
function validateAllForm() {
  let valid2 = false; // pass or not for all ProductNames
  let valid3 = false; // pass or not for all quantity and price
  let validresult2 = validateAllProductNames();
  let validresult3 = validateAllQuantityPrice();
  let allValid = false;

  // validation for all product name
  if (validresult2.size > 0) {
    validresult2.forEach((item) => {
      document.getElementById(item).nextElementSibling.textContent =
        nameErrorMsg;
    });
  } else {
    valid2 = true;
  }

  // validate for all quantity and price
  if (validresult3.size > 0) {
    validresult3.forEach((item) => {
      document.getElementById(item).nextElementSibling.textContent =
        numberErrorMsg;
    });
  } else {
    valid3 = true;
  }

  if (valid2 && valid3) {
    allValid = true;
  }
  return allValid;
}

// =============================================================================
// The followin fuctions are used to post form data to database, before post validate all related elements again!
// This function is used to submit invoice data
// 3 tables are involves: insert products, insert transaction, insert transactionDetails

// Solution 1
// let xhr = new XMLHttpRequest();
// xhr.open("POST", url, true);
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     console.log("this.responseText:", this.responseText);
//     let response = JSON.parse(this.responseText);
//     console.log("Return to submitTransaction: ", response);
//     return response;
//   }
// };
// xhr.send(body);

function submitTransaction() {
  return new Promise((resolve, reject) => {
    let vendorID = document.getElementById("vendorSelect").value;
    let invoiceNumber = document.getElementById("invoiceNumber").value;
    let transactionDate = document.getElementById("transactionDate").value;
    let transactionTime = document.getElementById("transactionTime").value;
    let subtotal = document.getElementById("subtotal").value;
    let totalTax = document.getElementById("totalTax").value;
    let description = document.getElementById("description").value;

    let data = {
      vendorID: vendorID,
      InvoiceNumber: invoiceNumber,
      TransactionDate: transactionDate,
      TransactionTime: transactionTime,
      Subtotal: subtotal,
      TotalTax: totalTax,
      Descriptions: description,
    };

    let body = JSON.stringify(data);
    let url = "./server/insertTransaction.php";

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
        let lastInsertId = data.lastInsertId;
        console.log("Return to submitTransaction: ", lastInsertId);
        resolve(lastInsertId);
        // return lastInsertId;
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("Error object:", error);
        reject(error);
      });
  });
}

function insertProduct(
  VendorProductId,
  ProductName,
  Unit,
  LatestPrice,
  TaxType
) {
  return new Promise((resolve, reject) => {
    //These fields will be inserted into the Products table
    let vendorID = document.getElementById("vendorSelect").value;
    let data = {
      ProductName: ProductName,
      VendorProductID: VendorProductId,
      LatestPrice: LatestPrice,
      TaxType: TaxType,
      Unit: Unit,
      VendorID: vendorID,
    }; // dict object
    console.log("data: ", data);

    // change dict object "data" to JSON format "body" which will be posted to PHP
    let body = JSON.stringify(data);
    console.log("body: ", body);

    let url = "./server/insertProduct.php";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let lastInsertId = data.lastInsertId;
        console.log(lastInsertId);
        resolve(lastInsertId); // Resolve the Promise with lastInsertId
      })
      .catch((error) => {
        console.error("Error:", error);
        reject(error); // Reject the Promise with the error
      });
  });
}

// This function is used to insert data into TransactionDetails table
// Every time only one line will be inserted, it's inefficient,
// but no time to update to insert multi-rows at same time!
function insertTransactionDetail(TransactionID, ProductID, Price, Quantity) {
  //These fields will inserted to table Products
  let vendorID = document.getElementById("vendorSelect").value;
  let data = {
    TransactionID: TransactionID,
    ProductID: ProductID,
    Price: Price,
    Quantity: Quantity,
  }; // dict object
  // console.log("data: ", data);

  // change dict object "data" to JSON format "body" which will post to php
  let body = JSON.stringify(data);
  // console.log("body: ", body);

  let url = "./server/insertTransactionDetail.php";

  // Solution 2
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let lastInsertId = data.lastInsertId;
      console.log("insertTransactionDetail: ", lastInsertId);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// This function is used to traverse the invoice list.
// If it's a new product, append this product to talbe product and return the new productID,
// Then append all rows to table transactionDetail. If it's not a new product, append all
// rows to table tranactionDetail directly.
function traversalInvoicelist(TransactionID) {
  // Get the Parent div
  let parentDiv = document.getElementById("fieldset3");
  // Get all level one sub-div
  // let childDivs = parentDiv.querySelectorAll(':scope > div');
  let childDivs = parentDiv.children;
  // console.log("childDivs", childDivs);
  // From the second <div>, for the first is legend, the second <div> are labels
  for (let i = 2; i < childDivs.length; i++) {
    // There're 7 sub-elements in each childDivs[i], the first is label, from the second
    // From the second childDivs, if not new product, get VendorProductId, if not get ProductID
    let isNewProduct = false;
    let ProductID;
    let VendorProductId;
    console.log(
      "childDivs[i].children[1].children[0].value:\n",
      childDivs[i].children[1].children[0].value
    );
    if (childDivs[i].children[1].children[0].value === "0") {
      isNewProduct = true;
      VendorProductId = childDivs[i].children[1].children[1].value; // inputNewVendorProductId
    } else {
      ProductID = childDivs[i].children[1].children[0].value; // For old product, productId is the selectVendorProductId value
    }

    // Get other values directly, 2 => ProductName, 3 => Quantity, ...
    let ProductName = childDivs[i].children[2].children[0].value;
    let Quantity = childDivs[i].children[3].children[0].value;
    let Unit = childDivs[i].children[4].value;
    let Price = childDivs[i].children[5].children[0].value;
    let TaxType = childDivs[i].children[6].value;

    console.log("ProductName = ", ProductName);
    console.log("Unit = ", Unit);
    console.log("TaxType = ", TaxType);
    console.log("TransactionID = ", TransactionID);
    console.log("ProductID = ", ProductID);
    console.log("Price = ", Price);
    console.log("Quantity = ", Quantity);

    // if it's new product, insert this new product and get the productID
    if (isNewProduct) {
      insertProduct(VendorProductId, ProductName, Unit, Price, TaxType)
        .then((ProductID) => {
          console.log("ProductID = ", ProductID);
          insertTransactionDetail(TransactionID, ProductID, Price, Quantity);
        })
        .catch((error) => {
          console.error("Error inserting product:", error);
        });
    } else {
      // If not new product insertTransactionDetail directly
      insertTransactionDetail(TransactionID, ProductID, Price, Quantity);
    }
  }
}

// The following variable lineNumber, function updateElementIds, and two eventLiseners are used to add or delete product line.
let lineNumber = 1;

// This function is used to updateElementIds when Clone the <div> for Ids are unique in Form
function updateElementIds(cloneDiv, n) {
  const labels = cloneDiv.querySelectorAll("label");
  const inputs = cloneDiv.querySelectorAll("input");
  const selects = cloneDiv.querySelectorAll("select");

  labels.forEach((label) => {
    label.id = "line" + n;
    label.textContent = n;
  });

  inputs.forEach((input) => {
    input.id = input.name + n;
  });

  selects.forEach((select) => {
    select.id = select.name + n;
  });
  return cloneDiv;
}

// This function is used to set the form state, which can be used, which can't
function formState(state) {
  let selectProduct = document.getElementById("selectVendorProductId1");
  let selectedVendor = document.getElementById("vendorSelect");
  switch (state) {
    case "newVendorInput":
      console.log("formstate newVendorInput!");
      // vendorSelect element
      selectedVendor.disabled = true;
      // inputVendorName
      document.getElementById("inputVendorName").style.display = "inline";
      document.getElementById("inputVendorName").value = "";
      // newVendor Button
      document.getElementById("newVendorBtn").disabled = false;
      document.getElementById("newVendorBtn").textContent = "Save Vendor";
      // existVendor Button
      document.getElementById("existVendorBtn").disabled = true;
      document.getElementById("existVendorBtn").textContent = "Edit Vendor";
      // vendorEditCancel Button
      document.getElementById("vendorEditCancelBtn").disabled = false;
      // set vendor edit area
      setVendorEditable(true);
      // selectProduct in line# 1 of transaction detail area
      selectProduct.style.display = "none";
      // delete1 button in line# 1 of transaction detail area
      document.getElementById("delete1").style.display = "none";
      // fieldsets
      document.getElementById("fieldset2").disabled = true;
      document.getElementById("fieldset3").disabled = true;
      document.getElementById("fieldset4").disabled = true;
      break;
    case "existVendorSeleted":
      console.log("formstate existVendorSeleted!");
      // vendorSelect element
      selectedVendor.disabled = false;
      // inputVendorName
      document.getElementById("inputVendorName").value = "";
      document.getElementById("inputVendorName").style.display = "none";
      // newVendor Button
      document.getElementById("newVendorBtn").disabled = true;
      document.getElementById("newVendorBtn").textContent = "New Vendor";
      // existVendor Button
      document.getElementById("existVendorBtn").disabled = false;
      document.getElementById("existVendorBtn").textContent = "Edit Vendor";
      // vendorEditCancel Button
      document.getElementById("vendorEditCancelBtn").disabled = true;
      // set vendor edit area
      setVendorEditable(false);
      // selectProduct in line# 1 of transaction detail area
      selectProduct.style.display = "inline";
      // delete1 button in line# 1 of transaction detail area
      document.getElementById("delete1").style.display = "none";
      // fieldsets
      document.getElementById("fieldset2").disabled = false;
      document.getElementById("fieldset3").disabled = false;
      document.getElementById("fieldset4").disabled = false;

      selectProduct.focus();
      break;
    case "existVendorEdit":
      console.log("formstate existVendorEdit!");
      // vendorSelect element
      selectedVendor.disabled = true;
      // inputVendorName
      document.getElementById("inputVendorName").value =
        selectedVendor.options[selectedVendor.selectedIndex].text;
      document.getElementById("inputVendorName").style.display = "inline";
      // newVendor Button
      document.getElementById("newVendorBtn").disabled = true;
      document.getElementById("newVendorBtn").textContent = "New Vendor";
      // existVendor Button
      document.getElementById("existVendorBtn").disabled = false;
      document.getElementById("existVendorBtn").textContent = "Save Vendor";
      // vendorEditCancel Button
      document.getElementById("vendorEditCancelBtn").disabled = false;
      // set vendor edit area
      setVendorEditable(true);
      // selectProduct in line# 1 of transaction detail area
      selectProduct.style.display = "inline";
      // delete1 button in line# 1 of transaction detail area
      document.getElementById("delete1").style.display = "none";
      // fieldsets
      document.getElementById("fieldset2").disabled = true;
      document.getElementById("fieldset3").disabled = true;
      document.getElementById("fieldset4").disabled = true;

      document.getElementById("inputVendorName").focus;
      break;
    default: // default is the status after page loaded
      console.log("formstate default!");
      // vendorSelect element
      selectedVendor.disabled = false;
      // inputVendorName element
      document.getElementById("inputVendorName").style.display = "none";
      // newVendor Button
      document.getElementById("newVendorBtn").disabled = false;
      document.getElementById("newVendorBtn").textContent = "New Vendor";
      // existVendor Button
      document.getElementById("existVendorBtn").disabled = true;
      document.getElementById("existVendorBtn").textContent = "Edit Vendor";
      // vendorEditCancel Button
      document.getElementById("vendorEditCancelBtn").disabled = true;
      // set vendor edit area
      setVendorEditable(false);
      // selectProduct in line# 1 of transaction detail area
      selectProduct.style.display = "none";
      // delete1 button in line# 1 of transaction detail area
      document.getElementById("delete1").style.display = "none";
      // fieldsets
      document.getElementById("fieldset2").disabled = true;
      document.getElementById("fieldset3").disabled = true;
      document.getElementById("fieldset4").disabled = true;
  }
}

// =============================================================================
// Add event listener for change of vendorSelect
document
  .getElementById("vendorSelect")
  .addEventListener("change", function (event) {
    // displayDateTime();
    clearForm();
    if (event.target.value === "0") {
      formState("newVendorInput");
      document.getElementById("inputVendorName").focus();
    } else {
      formState("existVendorSeleted");
      fetchVendorInfo(this.value);
      fetchProductName(this.value);
    }
  });

// Add event listener for "New Vendor" button， two state: "New Vendor", "Save Vendor"
document.getElementById("newVendorBtn").addEventListener("click", function () {
  if (this.textContent === "New Vendor") {
    formState("newVendorInput");
    document.getElementById("inputVendorName").focus();
  } else {
    let element = document.getElementById("inputVendorName");
    // console.log("validateName",element);
    let error = validateName(element);
    // console.log("The error",error);
    if (error !== defaultMSg) {
      document.getElementById("warning1").textContent = error;
      element.focus();
    } else {
      insertVendor()
        .then((lastInsertId) => {
          console.log("Last Inserted ID: ", lastInsertId);
          // window.opener.postMessage(lastInsertId, '*');
          fetchVendorOptions()
            .then((options) => {
              console.log("Options: ", options);
              fetchVendorInfo(lastInsertId);
              document.getElementById("vendorSelect").value = lastInsertId;
              // after saving, the formState should be existVendorSelected, the latest is the selected one
              formState("existVendorSeleted");
            })
            .catch((error) => {
              console.error("Error occurred: ", error);
            });
        })
        .catch((error) => {
          console.error("Error occurred: ", error);
        });
      alert("New Vendor '" + element.value + "' data has been submitted!");
    }
  }
});

// Add event listener for existVendorBtn button, two state: "Edit Vendor", "Save Vendor"
document
  .getElementById("existVendorBtn")
  .addEventListener("click", function () {
    if (this.textContent === "Edit Vendor") {
      let fields = [
        "address",
        "city",
        "province",
        "zip",
        "email",
        "phone",
        "gstno",
        "membership",
      ];
      let elements = [
        "vendorP1",
        "vendorP2",
        "vendorP3",
        "vendorP4",
        "vendorP5",
        "vendorP6",
        "vendorP7",
        "vendorP8",
      ];
      for (let i = 0; i < 8; i++) {
        document.getElementById(elements[i]).textContent =
          document.getElementById(fields[i]).value;
      }
      formState("existVendorEdit");
    } else {
      let element = document.getElementById("inputVendorName");
      // console.log("validateName",element);
      let error = validateName(element);
      // console.log("The error",error);
      if (error !== defaultMSg) {
        document.getElementById("warning1").textContent = error;
        element.focus();
      } else {
        updateVendor()
          .then((updateReturnInfo) => {
            console.log(updateReturnInfo);
            formState("existVendorSeleted");
            // fetchVendorOptions().then(options => {
            //     console.log("Options: ", options);
            //     formState("existVendorSeleted");
            // }).catch(error => {
            //     console.error("Error occurred: ", error);
            // });
          })
          .catch((error) => {
            console.error("Error occurred: ", error);
          });
        alert("Vendor '" + element.value + "' has been saved!");
        // window.close();
      }
    }
  });

// Add event listener for vendorEditCancelBtn button,
document
  .getElementById("vendorEditCancelBtn")
  .addEventListener("click", function () {
    let fields = [
      "address",
      "city",
      "province",
      "zip",
      "email",
      "phone",
      "gstno",
      "membership",
    ];
    let elements = [
      "vendorP1",
      "vendorP2",
      "vendorP3",
      "vendorP4",
      "vendorP5",
      "vendorP6",
      "vendorP7",
      "vendorP8",
    ];
    console.log(
      "vendorSelect value: ",
      document.getElementById("vendorSelect").value
    );
    if (document.getElementById("vendorSelect").value == 0) {
      for (let i = 0; i < 8; i++) {
        document.getElementById(fields[i]).value = "";
        formState("");
      }
    } else {
      for (let i = 0; i < 8; i++) {
        document.getElementById(fields[i]).value = document.getElementById(
          elements[i]
        ).textContent;
      }
      formState("existVendorSeleted");
    }
  });

// This eventListener is used for "Add Product" button to add a new line to input product item
document
  .getElementById("addInvoiceItem")
  .addEventListener("click", function () {
    // displayDateTime();
    // warning for all invalid product names
    let validResult2 = validateAllProductNames();
    let validResult3 = validateAllQuantityPrice();
    if (validResult2.size > 0) {
      validResult2.forEach((item) => {
        document.getElementById(item).nextElementSibling.textContent =
          nameErrorMsg;
      });
    } else if (validResult3.size > 0) {
      // warning for all numbers (quantity and price)
      validResult3.forEach((item) => {
        document.getElementById(item).nextElementSibling.textContent =
          numberErrorMsg;
      });
    } else {
      lineNumber++;
      let productDiv = document.querySelector(".productInput");
      // console.log(inputDiv);
      const newProduct = updateElementIds(
        productDiv.cloneNode(true),
        lineNumber
      );

      newProduct.children[1].children[1].style.display = "inline"; // New VendorProductID visible
      newProduct.children[1].children[1].value = ""; // Do not clone VendorProductID
      newProduct.children[2].children[0].value = ""; //Do not clone product name to next line
      newProduct.children[2].children[0].readOnly = false; // Set product name editable
      newProduct.children[3].children[0].value = "1"; //Do not clone price and set it to default value (1) to next line
      newProduct.children[5].children[0].value = ""; //Do not clone price to next line
      newProduct.children[7].style.display = "inline"; // Display 'Delete' button

      //Add event listener to delete button
      newProduct.children[7].addEventListener("click", function () {
        this.parentNode.remove();
      });

      //Append a new line for another product of invoice
      console.log("newProduct:\n", newProduct);
      document.getElementById("fieldset3").appendChild(newProduct);
    }
  });

// The following EventListeners are used to submit form or reset the form
// Before submit the table, validate four inputs: New vendor name, product name, quantity and price
document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault(); // prevent the form from submitting normally
  // warning for all invalid product names
  let allValid = validateAllForm();
  let TransactionID;

  if (allValid) {
    alert("All validation passed, it's ready to submit data...");
    setTimeout(() => {
      submitTransaction()
        .then((TransactionID) => {
          console.log("ReturnId after insert Transaction!", TransactionID);
          traversalInvoicelist(TransactionID);
          clearForm();
          formState();
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }, 100);
  }
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

//===The end of invoiceInput.js=================================================
