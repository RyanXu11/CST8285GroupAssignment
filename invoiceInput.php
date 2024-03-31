<?php
session_start();

// check the session user
if (isset ($_SESSION['username'])) {
    // if user login
    $username = $_SESSION['username'];
} else {
    // if user not login
    header('Location: login.php');
    exit;
}
?>

<!-- 
File name: invoiceInput.php
Description: This file is used for invoice input page, changed name from invoiceInput.html
Course & Section: CST8285 313
Professor: Hala Own
Author: Ryan Xu
Date Created: 2024-03-13
Last Date modified: 2024-03-29
-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/invoiceInput.css">
    <script type="module" src="js/invoiceInput.js" defer></script>
    <title>Invoice Form</title>
</head>

<body>
    <header>
        <div class="header">
            <h1 class="left">Family Expense Tracker</h1>
            <h2 class="right"><?php if (isset ($_SESSION['username'])) {echo 'Welcome, ' . $username . '!';}?></h2>
        </div>
        <nav>
            <ul>
                <li><a href="index.php" class="nav-link" id="index">Home</a></li>
                <li><a href="invoiceInput.php" class="nav-link current" id="invoiceInput">InvoiceInput</a></li>
                <li><a href="invoiceSearch.php" class="nav-link" id="invoiceSearch">InvoiceSearch</a></li>
                <li class="dropdown">
                    <a href="#" class="nav-link"><?php echo $username; ?></a>
                    <ul class="dropdown-menu">
                        <li><a href="profile.php">My Profile</a></li>
                        <li><a href="./php/logout.php">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <form id="invoiceDetail">
            <fieldset class="fieldset" id="fieldset1">
                <legend>Vendor Info</legend>
                <div class="grid-item column-2 " id="vendorName">
                    <div>
                        <label for="vendorSelect">Existing Vendors</label>
                        <select id="vendorSelect">
                            <option value="0">New Vendor</option>
                        </select>
                    </div>
                    <div class="vendorName">
                        <!-- <label for="inputVendorName" id="inputVendorNameLabel" class="invisible">New Vendor Name</label> -->
                        <input type="text" id="inputVendorName" placeholder="New Vendor">
                        <p class="warning" id="warning1"></p>
                    </div>
                </div>
                <div class="grid-item column-1" id="vendorButtonDiv">
                    <button type="button" id="newVendorBtn">New Vendor</button>
                    <button type="button" id="existVendorBtn">Edit Vendor</button>
                    <button type="button" class="warningButton" id="vendorEditCancelBtn">Cancel</button>
                    <p id="vendorP1" class="invisible">
                        </p1>
                    <p id="vendorP2" class="invisible">
                        </p1>
                    <p id="vendorP3" class="invisible">
                        </p1>
                    <p id="vendorP4" class="invisible">
                        </p1>
                    <p id="vendorP5" class="invisible">
                        </p1>
                    <p id="vendorP6" class="invisible">
                        </p1>
                    <p id="vendorP7" class="invisible">
                        </p1>
                    <p id="vendorP8" class="invisible">
                        </p1>
                </div>

                <div class="grid-item column-1">
                    <label for="address">Address</label>
                    <input type="text" name="address" id="address" readonly>
                </div>

                <div class="grid-item column-1">
                    <label for="city">City</label>
                    <input type="text" name="city" id="city" readonly>
                </div>

                <div class="grid-item column-1">
                    <label for="province">Province</label>
                    <input type="text" name="province" id="province" readonly>
                </div>

                <!-- <div class="grid-item column-1">
                    <label for="country">Country</label>
                    <input type="text" name="country" id="country" value="Canada" readonly>
                </div> -->

                <div class="grid-item column-1">
                    <label for="zip">ZIP</label>
                    <input type="text" name="zip" id="zip" readonly>
                </div>

                <div class="grid-item column-1">
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" readonly>
                </div>

                <div class="grid-item column-1">
                    <label for="phone">Phone</label>
                    <input type="text" name="phone" id="phone" readonly>
                </div>

                <div class="grid-item column-1">
                    <label for="gstno">GST No</label>
                    <input type="text" name="gstno" id="gstno" readonly>
                </div>

                <div class="grid-item column-1">
                    <label for="membership">Membership</label>
                    <input type="text" name="membership" id="membership" readonly>
                </div>
            </fieldset>
            <fieldset class="fieldset" id="fieldset2">
                <legend>Transaction Info</legend>
                <div class="row-item">
                    <label for="invoiceNumber">Invoice Number</label>
                    <input type="text" name="invoiceNumber" id="invoiceNumber">
                </div>

                <div class="row-item">
                    <label for="transactionDate">Transaction Date</label>
                    <input type="date" name="transactionDate" id="transactionDate">
                </div>

                <div class="row-item">
                    <label for="transactionTime">Transaction Time</label>
                    <input type="time" name="transactionTime" id="transactionTime">
                </div>
            </fieldset>

            <fieldset class="fieldset" id="fieldset3">
                <legend>Transaction Items</legend>
                <div class="productLabel column-1">
                    <label>Line#</label>
                    <label for="selectVendorProductId1" id="vendorProductIdLabel">Vendor Product ID</label>
                    <label for="productName1">Product Name</label>
                    <label for="quantity1">Quantity</label>
                    <label for="unit1">Unit</label>
                    <label for="price1">Price</label>
                    <label for="taxType1">TaxType</label>
                    <label></label>
                </div>
                <div class="productInput column-1">
                    <label id="line1" class="column-1"> 1</label>
                    <div class="vendorProductId column-1">
                        <select id="selectVendorProductId1" name="selectVendorProductId">
                            <option value="0">New Product</option>
                        </select>
                        <input type="text" id="inputNewVendorProductId1" name="inputNewVendorProductId">
                    </div>
                    <div class="validation column-1">
                        <input type="text" name="productName" id="productName1">
                        <p class="warning"></p>
                    </div>
                    <div class="validation column-1">
                        <input type="text" class="number" name="quantity" id="quantity1" value="1">
                        <p class="warning"></p>
                    </div>
                    <select id="unit1" name="unit" class="column-1">
                        <option value="0"> </option>
                        <option value="kg">kg</option>
                        <option value="lb">lb</option>
                        <option value="l">L</option>
                        <option value="ml">ml</option>
                    </select>
                    <div class="validation column-1">
                        <input type="text" class="number" name="price" id="price1">
                        <p class="warning"></p>
                    </div>
                    <select id="taxType1" name="taxType" class="column-1">
                        <option value="0"> </option>
                        <option value="H">H</option>
                        <option value="G">G</option>
                    </select>
                    <button type="button" class="warningButton column-1" id="delete1">Delete</button>
                </div>
            </fieldset>

            <fieldset class="fieldset" id="fieldset4">
                <legend>Summary</legend>
                <div class="invoice-foot">
                    <label for="subtotal">SUBTOTAL</label>
                    <input type="text" class="total" name="subtotal" id="subtotal">
                </div>

                <div class="invoice-foot">
                    <label for="totalTax">TAX</label>
                    <input type="text" class="total" name="totalTax" id="totalTax">
                </div>

                <div class="invoice-foot">
                    <label for="total">TOTAL</label>
                    <input type="text" class="total" name="total" id="total">
                </div>

                <div class="invoice-foot">
                    <label for="description">Invoice Description: </label>
                    <textarea name="description" id="description"></textarea>
                </div>
                <!-- <div class="invoice-foot">

                </div>   -->
                <div class="invoice-foot">
                    <button type="button" id="addInvoiceItem">Add Transaction Item</button>
                    <button type="submit" id="submit">Submit Transaction</button>
                    <button type="reset" class="warningButton" id="reset">Reset</button>
                </div>
            </fieldset>
        </form>

    </main>
    <footer>
        <div>
            <p> &copy; 2024 Family Expense Tracker. All rights reserved.</p>
            <p> Coded by Ryan Xu & Yizhen Xu</p>
        </div>
        <nav>
            <a href="#header">Top of Page</a>
        </nav>
    </footer>
</body>

</html>