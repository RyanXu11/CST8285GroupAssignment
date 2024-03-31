<?php
session_start();

// check the session user
if (isset ($_SESSION['username'])) {
    // if user login
    $username = $_SESSION['username'];
    $memberId = $_SESSION['MemberID'];
} else {
    // if user not login
    header('Location: login.php');
    exit;
}
?>
<!-- 
File name: login.php
Description: This file is used for user change email/username and reset password
Course & Section: CST8285 313
Professor: Hala Own
Author: Ryan Xu
Date Created: 2024-03-30
Last Date modified: 2024-03-31
-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Add authorship metadata and link CSS and JS files -->
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/login.css">
    <script type="module" src="js/profile.js" defer></script> 
    <title>Signup</title>
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
                <li><a href="invoiceInput.php" class="nav-link" id="invoiceInput">InvoiceInput</a></li>
                <li><a href="invoiceSearch.php" class="nav-link" id="invoiceSearch">InvoiceSearch</a></li>
                <li class="dropdown">
                    <a href="#" class="nav-link current" name=<?php echo $memberId; ?> id="displayUsername"><?php echo $username; ?></a>
                    <ul class="dropdown-menu">
                        <li><a href="profile.php">My Profile</a></li>
                        <li><a href="./server/logout.php">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <div class="formcontainer">
            <h2>Profile Edit</h2>
            <hr>
            <form class="setup">
                <!-- You will need to write the validate function for this form. -->
    
                <div class="textfield">
                    <label for="email">Email Address</label>
                    <input type="text" name="email" id="email" placeholder="Email" autocomplete="email">
                </div>
    
                <div class="textfield">
                    <label for="login">User Name</label>
                    <input type="text" name="login" id="login" placeholder="User name">
                </div>
    
                <div class="textfield" id="passDiv">
                    <label for="pass">New Password</label>
                    <input type="password" name="pass" id="pass" placeholder="Password">
                </div>
            
                <div class="textfield" id="pass2Div">
                    <label for="pass2">Re-type New Password</label>
                    <input type="password" id="pass2" placeholder="Password">
                    <div class="checkbox">
                        <input type="checkbox" name="showPass" id="showPass">
                        <label for="showPass">Show Password</label>
                    </div>
                </div>

                <div class="buttonDiv">
                    <button id="editBtn">Edit email/username</button>
                    <button id="resetPassBtn">Reset Password</button>
                    <button id="cancelBtn" class="warningButton">Cancel</button>
                    <p id="p1" class='invisible'></p>
                    <p id="p2" class='invisible'>adg</p>
                </div>
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