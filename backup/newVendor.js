// import { validateName } from './common.js';

// =============================================================================
// This function is used display datatime for debugging=========================
function displayDateTime() {
    // get the timstamp
    const timestamp = Date.now();
    const currentDate = new Date(timestamp);
  
    // format datetime
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ` +
      `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  
    // Display the datetime
    console.log(`Current date and time: ${formattedDate}`);
  }

// This function is used to submit new Vendor data
function insertVendor() {
    return new Promise((resolve, reject) => {
        let vendorName = document.getElementById('newVendor').value;
        let GSTNo = document.getElementById('gstno').value;
        let Address = document.getElementById('address').value;
        let City = document.getElementById('city').value;
        let Province = document.getElementById('province').value;

        let Country = document.getElementById('country').value;
        let Zip = document.getElementById('zip').value;
        let Email = document.getElementById('email').value;
        let Phone = document.getElementById('phone').value;
        let Membership = document.getElementById('membership').value;

        let data = {
            'vendorName': vendorName,
            'GSTNo': GSTNo,
            'Email': Email,
            'Phone': Phone,
            'Address': Address,
            'City': City,
            'Province': Province,
            'Zip': Zip,
            'Country': Country,
            'Membership': Membership
        };
        console.log("data: ", data);

        // change dict object "data" to JSON format "body" which will post to php
        let body = JSON.stringify(data);
        console.log("body: ", body);

        fetch('./php/insertVendor.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: body,
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        }).then(data => {
            let lastInsertId = data.lastInsertId;
            console.log(lastInsertId);
            resolve(lastInsertId);
        }).catch(error => {
            console.error('Error:', error);
            reject(error);
        });  
    });
}


// =============================================================================
let nameErrorMsg = "❌ Name should be non-empty, and within 50 characters long.";
let defaultMSg = "";
function validateName(targetId) {
    let productName = targetId.value; // access the value of the product name, trim the spaces
    let error = defaultMSg;
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

// Add event listener to the parent element to validate Vendor Name
document.getElementById("newVendor").addEventListener("change", function() {
    // "change" event
    let error = validateName(this);
    // console.log("This is selectVendorProductId, \n", selectVendorProductId)
    document.getElementById("warning1").textContent = error;
    // console.log("The error",error);
    if (error !== defaultMSg){
      e.target.focus();
    } 
});

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault(); // prevent the form from submitting normally
    let element = document.getElementById("newVendor");
    // console.log("validateName",element);
    let error = validateName(element);
    // console.log("The error",error);
    if (error !== defaultMSg){
        document.getElementById("warning1").textContent = error;
        element.focus();
    } else {
        insertVendor().then(lastInsertId => {
            console.log("Last Inserted ID: ", lastInsertId);
            window.opener.postMessage(lastInsertId, '*');
        }).catch(error => {
            console.error("Error occurred: ", error);
        });
        alert("New Vendor '" + element.value + "' has been appended!");
        window.close();
    }
});

document.getElementById("reset").addEventListener("click", function (event) {
    let confirmReset = confirm("Are you sure reset the form?");
    if (!confirmReset) {
        event.preventDefault();
    }else{
        document.getElementById("warning1").textContent = defaultMSg;
        document.getElementById("newVendor").focus();
    }
});


document.getElementById("close").addEventListener("click", function () {
    window.close();
});

// window.onunload = function() {
//     if (window.opener && !window.opener.closed) {
//         let event = new CustomEvent('childWindowClosed');
//         window.opener.dispatchEvent(event);
//     }
// };