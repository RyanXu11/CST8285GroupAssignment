// This function is used displayDateTime=========================
export function displayDateTime() {
    // get the timstamp
    const timestamp = Date.now();
    const currentDate = new Date(timestamp);
  
    // format datetime
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  
    // Display the datetime
    console.log(`Current date and time: ${formattedDate} ${formattedTime}`);
  }

let numberErrorMsg = "❌ Invalid number.";
let defaultMSg = "";
// This function is used to validate quantity or price
export function validateNumber(targetId) {
    let number = targetId.value;
    let regexp = /^(0\.\d{1,3}|[1-9]\d*(\.\d{1,3})?)$/; //reg. expression
    let result = numberErrorMsg; 
    if (regexp.test(number)) {
      //test is predefiend method to check if the entered quantity matches the regexp
      result = defaultMSg;
    } 
    return result;
  }


//
export function newVendorInputWindow() {
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