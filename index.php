<?php
session_start();

// check the session user
if (isset ($_SESSION['username'])) {
    // if user login
    $username = $_SESSION['username'];
}
?>

<!-- 
File name: index.php
Description: This file is used for home page, name changed from index.html
Course & Section: CST8285 313
Professor: Hala Own
Author: Yizhen Xu & Ryan Xu
Date Created: 2024-03-27
Last Date modified: 2024-03-29
-->


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/index.css">
    <title>Document</title>
</head>

<body>
    <header>
        <div class="header">
            <h1 class="left">Family Expense Tracker</h1>
            <h2 class="right"><?php if (isset ($_SESSION['username'])) {echo 'Welcome, ' . $username . '!';}?></h2>
        </div>
        <nav>
            <?php
            if (isset ($_SESSION['username'])) { ?>
                <nav>
                    <ul>
                        <li><a href="index.php" class="nav-link current" id="index">Home</a></li>
                        <li><a href="invoiceInput.php" class="nav-link" id="invoiceInput">InvoiceInput</a></li>
                        <li><a href="invoiceSearch.php" class="nav-link " id="invoiceSearch">InvoiceSearch</a></li>
                        <li class="dropdown">
                            <a href="#" class="nav-link">
                                <?php echo $_SESSION['username']; ?>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="profile.php">My Profile</a></li>
                                <li><a href="./php/logout.php">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <?php
            } else { ?>
                <nav>
                    <ul>
                        <li><a href="index.php" class="nav-link current" id="index">Home</a></li>
                        <li><a href="signup.php" class="nav-link" id="signup">Sign-Up</a></li>
                        <li><a href="login.php" class="nav-link" id="logout">Login</a></li>
                    </ul>
                </nav>
                <?php
            }
            ?>
        </nav>
    </header>
    <main>
        <div class="main">
            <div class="cell"><img class="pictures" src="img/pairGrid2.png" alt="pairGrid1"></div>
            <div class="cell maintext">
                <h1>Track family expense, Know where the cost are</h1>
                <div>
                    <p>Conveniently and quickly record all household expenses.</p>
                    <p>Quickly query historical data.</p>
                    <p>Cost analysis to help families consume rationally</p>
                </div>
                <div class="buttonDiv">
                    <?php
                    if (isset ($_SESSION['username'])) {
                        echo '<a href="invoiceInput.php" id="invoiceInput">InvoiceInput</a>';
                        echo '<a href="invoiceSearch.php" id="invoiceSearch">InvoiceSearch</a>';
                    } else {
                        echo '<a href="signup.php"  id="signup">Sign-Up</a>';
                        echo '<a href="login.php" id="logout">Login</a>';
                    }
                    ?>
                </div>
            </div>
        </div>
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