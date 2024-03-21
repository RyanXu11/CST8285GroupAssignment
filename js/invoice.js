// import { validateName } from './common.js';

// =============================================================================
// This function is used displayDateTime=========================
function displayDateTime() {
  // get the timstamp
  const timestamp = Date.now();
  const currentDate = new Date(timestamp);

  // format datetime
  const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
  const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  // Display the datetime
  console.log(`Current date and time: ${formattedDate} ${formattedTime}`);
}

// set transaction date default value is today
function setTransactionDateTime(){
  // get the timstamp
  const timestamp = Date.now();
  const currentDate = new Date(timestamp);

// Get the year, month, day
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
const day = String(currentDate.getDate()).padStart(2, '0'); 

// Get hours, minutes, seconds
const hours = String(currentDate.getHours()).padStart(2, '0'); 
const minutes = String(currentDate.getMinutes()).padStart(2, '0'); 
const seconds = String(currentDate.getSeconds()).padStart(2, '0'); 

// format date, time and DateTime
const formattedDate = `${year}-${month}-${day}`;
const formattedTime = `${hours}:${minutes}:${seconds}`;
const formattedDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;

  // document.getElementById("transactionDate").value = formattedDate;
  // document.getElementById("transactionTime").value = formattedTime;
  document.getElementById("invoiceNumber").value = formattedDateTime;
}
// =============================================================================
// Following parts are used to fetch information from Database==================
// Function to fetch vendor options to create options of Vendor <select>
function fetchVendorOptions() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "php/getVendorName.php");
  // xhr.responseType = 'json';
  // displayDateTime();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // console.log("This is reponseText:\n", this.responseText);
      let options = JSON.parse(this.responseText);
      // console.log("This is options:\n", options);
      let select = document.getElementById("vendorSelect");
      removeOptions(select.id);
      // Add new options
      options.forEach((option) => {
        let optionElement = document.createElement("option");
        optionElement.value = option.vendorID;
        optionElement.textContent = option.vendorName;
        select.appendChild(optionElement);
      });
    }
  };
  xhr.send();
}

// Function to fetch vendor options to populate vendor related form elements
function fetchVendorInfo(vendorId) {
  let xhr = new XMLHttpRequest();
  // console.log("This is vendorId:\n", vendorId);
  xhr.open("GET", "php/getVendorInfo.php?selectedValue=" + vendorId, true);
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
  if (select.options.length>1){
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
  xhr.open("GET", "php/getProductName.php?selectedValue=" + vendorId, true);
  // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  // displayDateTime();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // Get the <select> element and remove exsit options to avoid duplicated <option> items
      let selectVendorProductId = document.getElementById('selectVendorProductId1');
      removeOptions('selectVendorProductId1');
      // console.log("This is selectVendorProductId1:\n", selectVendorProductId1);
      // Append new options
      let options = JSON.parse(this.responseText);
      options.forEach((option) => {
          // console.log("This is option for fetchProductName:\n", option);
          let newOption = document.createElement('option');
          newOption.value = option['ProductID'];
          newOption.textContent = option['VendorProductID'] + " | " + option['ProductName'];
          selectVendorProductId.appendChild(newOption);
      });
    }
  }
  xhr.send();
}

// This function is used to fetch product information and populate related Product form elements
function fetchProductInfo(productId) {
  let xhr = new XMLHttpRequest();
  // console.log("This is vendorId:\n", vendorId);
  let currentElement = document.getElementById(productId);
  let currentLineNumber = currentElement.parentElement.previousElementSibling;
  xhr.open("GET", "php/getProductInfo.php?selectedValue=" + currentElement.value, true);
  // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  //  console.log(currentLineNumber.id);
  // displayDateTime();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let options = JSON.parse(this.responseText);
      // console.log("This is options:\n", options);
      // populate related form elements
      options.forEach((option) => {
        for (let key in option) {
          // console.log(key + currentLineNumber.textContent.trim());
          let element = document.getElementById(key + currentLineNumber.textContent.trim());
          if (element) {
            element.value = option[key];
          }
        }
      });
    }
  };
  xhr.send();
}

function newVendorInputWindow() {
  // New window size
  let windowWidth = 600;
  let windowHeight = 400;

  // Calculate the windows' position
  let leftPosition = (window.innerWidth - windowWidth) / 2 + window.screenX;
  let topPosition = (window.innerHeight - windowHeight) / 2 + window.screenY;

  // Other parameters for the new window
  let windowFeatures = 'width=' + windowWidth + ',height=' + windowHeight + ',top=' + 
                      topPosition + ',left=' + leftPosition + ',titlebar=no,location=no,toolbar=no';
  // Open the window
  let newWindow = window.open('newVendor.html', 'newWindow', windowFeatures);
  // Set new title
  newWindow.document.title = 'New Vendor';
  return newWindow;
}

let childWindow;
// Add event listener for "New Vendor" button
document.getElementById("newVendor").addEventListener("click", function () {
  childWindow = newVendorInputWindow();
});

// function handleChildWindowClose() {
//   console.log('Child window closed');
//   setTimeout(() => {
//     fetchVendorOptions();
//     let vendorSelect = document.getElementById("vendorSelect");
//     let maxOption = Array.from(vendorSelect.options).reduce((max, option) => Number(option.value) > Number(max.value) ? option : max);
//     document.getElementById("vendorSelect").value = maxOption.value;
//     console.log('document.getElementById("vendorSelect").value is: ', maxOption.value);
//     fetchVendorInfo(maxOption.value);
//     document.getElementById("inputNewVendorProductId1").focus();
//   }, 200);
// }
// window.addEventListener('childWindowClosed', handleChildWindowClose);

// Receive message from childWindow
window.addEventListener('message', function(event) {
  // displayDateTime();
  console.log("Message from: ", event.source);
  console.log("The event.data is: ", event.data);
  // if (event.source === childWindow) {
    // Update vendor selection options
    setTimeout(() => {
      fetchVendorOptions();
      setTimeout(() => {
        document.getElementById("vendorSelect").value = event.data;
        let testvalue = document.getElementById("vendorSelect").value
        console.log("testvalue is: ", testvalue);
        fetchVendorInfo(event.data);
        document.getElementById("inputNewVendorProductId1").focus();
      },200);
    }, 100); // delay 100ms
  // }
});

// Add event listener for change of vendorSelect
document.getElementById("vendorSelect").addEventListener("change", selectVendor);
// document.getElementById("vendorSelect").addEventListener("click", selectVendor);

// This event is used for "vendorSelect" <select>
function selectVendor(event) {
  let selectVendorProductId = document.getElementById("selectVendorProductId1");
  // displayDateTime();
  if (event.target.value === "0") {
    // console.log(this.value);
    location.reload();  
  } else {
    selectVendorProductId.style.display = "inline";
    fetchVendorInfo(this.value);
    fetchProductName(this.value);
    // replace select 
  }
}

// This eventListener is used to delete the last product line in case of misoperation
document.getElementById('removeProduct').addEventListener('click', function() {
  if (lineNumber > 1){
    if (confirm("Are you sure you want to delete the last product?")) {
      // get the last product item <div> element
      formPart = document.querySelector('.formPart3InvoiceProductList')
      let lastChild = formPart.lastElementChild;

      // Delete the last product line
      formPart.removeChild(lastChild);
      lineNumber--;
    }
  } else {
    alert("There's at least one item in this invoice!")
  }
});

// For Product list event listener, get the parent element
var parentElement = document.getElementById('formPart3InvoiceProductList');

// Add event listener to the parent element to deal with product <select> change
parentElement.addEventListener('change', function(e) {
    // Check the <select> element
    if(e.target && e.target.name === 'selectVendorProductId') {
        // "change" event
        let inputNewVendorProductId = e.target.nextElementSibling;
        // console.log("This is selectVendorProductId, \n", selectVendorProductId)
        if (e.target.value == 0) {
            // Let "new product" input visible and empty name and price, and name editable
            inputNewVendorProductId.style.display = "inline";
            e.target.parentElement.nextElementSibling.children[0].readOnly = false;
            e.target.parentElement.nextElementSibling.children[0].value="";
            e.target.parentElement.parentElement.children[5].children[0].value="";
            inputNewVendorProductId.focus();
        } else {
            // let "new product" input invisible and get related product information
            fetchProductInfo(e.target.id);
            inputNewVendorProductId.style.display = "none";
            // set Product name read only
            e.target.parentElement.nextElementSibling.children[0].readOnly = true;
            // set warning to empty
            e.target.parentElement.nextElementSibling.children[1].textContent="";
            e.target.parentElement.parentElement.children[5].children[1].textContent="";
            // calculate the subtotal
            setTimeout(() => {
              calculateSubtotal();
            }, 50)

        }
    }
});

// =============================================================================
// Following part is used to validation=========================================
let nameErrorMsg = "❌ Name should be non-empty, and within 50 characters long.";
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

// Add event listener to the parent element to validate Product Name
parentElement.addEventListener("change", function(e) {
  // Check the <input> product name element
  if(e.target && e.target.name === 'productName') {
      // "change" event
      let error = validateName(e.target);
      // console.log("This is selectVendorProductId, \n", selectVendorProductId)
      e.target.nextElementSibling.textContent = error;
      if (error !== defaultMSg){
        e.target.focus();
      } 
  }
});

//function to validate all product names
function validateAllProductNames() {
  let validResult = new Set();
  let errorMsg = "";

  // Get all name="productName" <input> elements
  var inputs = document.querySelectorAll('#formPart3InvoiceProductList input[name="productName"]');
  // validation for all inputs until exists a invalid elements
  for (var i = 0; i < inputs.length; i++) {
    errorMsg = validateName(inputs[i]);
    if (errorMsg !== defaultMSg) {
      validResult.add(inputs[i].id);
    }
  }
  return validResult;
}

// following functions are used to validate quantity and price
// This function is used to validate quantity or price
function validateNumber(targetId) {
  let number = targetId.value;
  let regexp = /^(0\.\d{1,3}|[1-9]\d*(\.\d{1,3})?)$/; //reg. expression
  let result = numberErrorMsg; 
  if (regexp.test(number)) {
    //test is predefiend method to check if the entered quantity matches the regexp
    result = defaultMSg;
  } 
  return result;
}


// // Add event listener to the parent element to validate all sub elements of "quantity" and "price"
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

function calculateSubtotal(){
  let quantities = document.querySelectorAll('#formPart3InvoiceProductList input[name="quantity"]');
  let prices = document.querySelectorAll('#formPart3InvoiceProductList input[name="price"]');
  let taxType = document.querySelectorAll('#formPart3InvoiceProductList select[name="taxType"]');
  let subtotal = 0;
  let tax = 0;

  for (let i = 0; i < quantities.length; i++) {
    let itemPrice = parseFloat(quantities[i].value) * parseFloat(prices[i].value);
    // console.log("itemPrice = ", itemPrice);
    // console.log("taxType[i] = ", taxType[i].value);
    subtotal += itemPrice;
    switch(taxType[i].value){
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
  document.getElementById("total").value = parseFloat(subtotal) + parseFloat(tax);
}


// Add event listener to the parent element to validate all sub elements of "quantity" and "price" during input
parentElement.addEventListener("input", function(e) {
  // Check the <input> product name element
  if(e.target && (e.target.name === 'quantity' || e.target.name === 'price')) {
      // "input" event
      let value = e.target.value;
      let negativeSign = value.startsWith('-') ? '-' : '';
      let numbersAndDot = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      e.target.value = negativeSign + numbersAndDot;
  }
});

parentElement.addEventListener("change", function(e) {
  // Check the <input> product name element
  if(e.target && (e.target.name === 'quantity' || e.target.name === 'price' || e.target.name === 'taxType')) {
      // "change" event
      calculateSubtotal();
  }
});

//function to validate all quantity or price used by "submit" button
function validateAllQuantityPrice() {
  let validResult = new Set();
  let errorMsg = defaultMSg;

  // Get all name="productName" <input> elements
  let inputs = document.querySelectorAll('#formPart3InvoiceProductList input[name="quantity"], #formPart3InvoiceProductList input[name="price"]');
  // validation for all inputs until exists a invalid elements
  for (var i = 0; i < inputs.length; i++) {
    errorMsg = validateNumber(inputs[i]);
    if (errorMsg !== defaultMSg) {
      validResult.add(inputs[i].id);
    }
  }
  return validResult;
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

// This eventListener is used for "Add Product" button to add a new line to input product item
document.getElementById("addInvoiceItem").addEventListener("click", function () {
  // displayDateTime();
  // warning for all invalid product names
  let validResult2 = validateAllProductNames();
  let validResult3 = validateAllQuantityPrice();
  if (validResult2.size > 0){
    validResult2.forEach(item => {
      document.getElementById(item).nextElementSibling.textContent = nameErrorMsg;
    });
  } else if (validResult3.size > 0) {
    // warning for all numbers (quantity and price)
    validResult3.forEach(item => {
    document.getElementById(item).nextElementSibling.textContent = numberErrorMsg;
    });
  } else {
    lineNumber++;
    let productDiv = document.querySelector(".productInput");
    // console.log(inputDiv);
    const newProduct = updateElementIds(productDiv.cloneNode(true), lineNumber);
    newProduct.children[1].children[1].style.display = "inline";
    newProduct.children[2].children[0].value=""; //Do not clone product name to next line
    newProduct.children[2].children[0].readOnly = false;
    newProduct.children[3].children[0].value="1"; //Do not clone price and set it to default value (1) to next line
    newProduct.children[5].children[0].value=""; //Do not clone price to next line
  
    //Append a new line for another product of invoice
    document.querySelector(".formPart3InvoiceProductList").appendChild(newProduct);
  }
});

function validateAllForm() {
  let valid2 = false;  // pass or not for all ProductNames
  let valid3 = false;  // pass or not for all quantity and price
  let validresult2 = validateAllProductNames();
  let validresult3 = validateAllQuantityPrice();
  let allValid = false;

  // validation for all product name
  if (validresult2.size > 0){
    validresult2.forEach(item => {
      document.getElementById(item).nextElementSibling.textContent = nameErrorMsg;
    });
  } else {
    valid2 = true;
  }
  
  // validate for all quantity and price
  if (validresult3.size > 0) {
    validresult3.forEach(item => {
    document.getElementById(item).nextElementSibling.textContent = numberErrorMsg;
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
function formatTimeForMySQL(timeString) {
  // 将时间字符串拆分为小时、分钟和秒
  const [hours, minutes, seconds] = timeString.split(':');

  // 使用日期对象创建一个新的日期，日期部分默认为今天的日期
  const date = new Date();

  // 设置日期对象的小时、分钟和秒
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  // 格式化日期对象为 MySQL 支持的时间格式
  const formattedTime = date.toISOString().slice(11, 19);

  return formattedTime;
}

function submitTransactionData(){
  //These 6 fields will inserted to table transaction
  let vendorID = document.getElementById('vendorSelect').value; // in fact, it's vendorID
  let invoiceNumber = document.getElementById('invoiceNumber').value; 
  let transactionDate = document.getElementById('transactionDate').value;
  let transactionTime = document.getElementById('transactionTime').value;
  let subtotal = document.getElementById('subtotal').value;
  let totalTax = document.getElementById('totalTax').value;
  let description = document.getElementById('description').value;

  // transactionTime = formatTimeForMySQL(transactionTime);
  let data = {
    'vendorID': vendorID,
    'InvoiceNumber': invoiceNumber,
    'TransactionDate': transactionDate,
    'TransactionTime': transactionTime,
    'Subtotal': subtotal,
    'TotalTax': totalTax,
    'Descriptions': description
  }; // dict object 
   console.log("data: ", data);
  
  // change dict object "data" to JSON format "body" which will post to php
  let body = JSON.stringify(data);
  console.log("body: ", body);

  let url = "./php/insertInvoice.php";
  // Solution 1
  // let xhr = new XMLHttpRequest();
  // xhr.open("POST", url, true);
  // xhr.setRequestHeader("Content-Type", "application/json");

  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState === 4 && xhr.status === 200) {
  //     console.log("this.responseText:", this.responseText);
  //     let response = JSON.parse(this.responseText);
  //     console.log(response);
  //   }
  // };
  // xhr.send(body);

  // Solution 2
  fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: body,
  }).then(response => {
      return response.json();
  }).then(data => {
      let lastInsertId = data.lastInsertId;
      console.log(lastInsertId);
  }).catch(error => {
      console.error('Error:', error);
  });  
}

// =============================================================================
// The following EventListeners are used to submit form or reset the form
// Before submit the table, validate four inputs: New vendor name, product name, quantity and price
document.getElementById("submit").addEventListener("click", function(e) {
  e.preventDefault(); // prevent the form from submitting normally
  // warning for all invalid product names
  let allValid = validateAllForm();
  
  if (allValid) {
    alert("All validation passed, it's ready to submit data...");
    submitTransactionData();
  }

});

// This listener is used to click "reset" button
// One scenario is not considered now: click "reset" when there're more than one product lines, keep one line or not?
document.getElementById("reset").addEventListener("click", function(event){
  var confirmReset = confirm("Are you sure reset the form?");
  if (!confirmReset) {
    event.preventDefault();
  }else{
    location.reload();  
  }
});


// =======================================================================
// functions for window.onload
window.onload = function () {
  fetchVendorOptions();
  // set default transaction date to today
  setTransactionDateTime();

  let select = document.getElementById("selectVendorProductId1");
  select.style.display = "none";
  // displayDateTime();
}