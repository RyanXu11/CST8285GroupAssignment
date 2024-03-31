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
File name: invoiceSearch.php
Description: This file is used for invoice search page, changed name from invoiceSearch.html
Course & Section: CST8285 313
Professor: Hala Own
Author: Ryan Xu
Date Created: 2024-03-22
Last Date modified: 2024-03-29
-->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/invoiceSearch.css">
    <script type="module" src="js/invoiceSearch.js" defer></script>
    <title>Invoice Form</title>
</head>

<body>
    <header>
        <div class="header">
            <h1 id="header" class="left">Invoice/Transaction Search</h1>
            <h2 class="right"><?php if (isset ($_SESSION['username'])) {echo 'Welcome, ' . $username . '!';}?></h2>
        </div>
        <nav>
            <ul>
                <li><a href="index.php" class="nav-link" id="index">Home</a></li>
                <li><a href="invoiceInput.php" class="nav-link" id="invoiceInput">InvoiceInput</a></li>
                <li><a href="invoiceSearch.php" class="nav-link current" id="invoiceSearch">InvoiceSearch</a></li>
                <li class="dropdown">
                    <a href="#" class="nav-link"><?php echo $username; ?></a>
                    <ul class="dropdown-menu">
                        <li><a href="profile.php">My Profile</a></li>
                        <li><a href="./server/logout.php">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <form>
            <fieldset>
                <legend>Filters</legend>
                <div class="formPart" id="formPart1">
                    <div class="row-item" id="vendorname">
                        <label for="vendorSelect">Vendors</label>
                        <select id="vendorSelect" name="vendorSelect">
                            <option value="0">All Vendors</option>
                        </select>
                    </div>

                    <div class="row-item">
                        <label for="startDate">Start Date</label>
                        <input type="date" name="startDate" id="startDate">
                    </div>

                    <div class="row-item">
                        <label for="endDate">End Date</label>
                        <input type="date" name="endDate" id="endDate">
                    </div>

                    <div class="row-item">
                        <button type="button" id="search">Search</button>
                        <button type="reset" class="warningButton" id="reset">Reset</button>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>Transactions List</legend>
                <div class="formPart" id="formPart2">
                    <div class="TransactionLabel">
                        <p class="label">Vendor Name</p>
                        <p class="label">InvoiceNumber</p>
                        <p class="label">Transaction Date</p>
                        <p class="label">Transaction Time</p>
                        <p class="label">Subtoal</p>
                        <p class="label">Tax</p>
                        <p class="label">Total</p>
                        <p class="label">Description</p>
                        <p class="label"></p>
                    </div>
                </div>
            </fieldset>
            <fieldset id="fieldset3">
                <legend>Trsanctions Detail</legend>
                <div class="formPart" id="formPart3">
                    <div class="productLabel">
                        <p class="label">Row#</p>
                        <p class="label">Vendor Product ID</p>
                        <p class="label">Product Name</p>
                        <p class="label">Quantity</p>
                        <p class="label">Unit</p>
                        <p class="label">Price</p>
                        <p class="label">TaxType</p>
                        <p>&nbsp</p>
                    </div>
                </div>
            </fieldset>
        </form>
    </main>
    <footer>
        <div>
            <p>&copy; 2024 Family Expense Tracker. All rights reserved. </p>
            <p>Coded by Ryan Xu & Yizhen Xu</p>
        </div>
        <nav>
            <a href="#header">Top of Page </a>
        </nav>
    </footer>

</body>

</html>