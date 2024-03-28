<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/common.css">
    <title>Document</title>
</head>
<body>
    <header>
        <h1 id="header">Family Expense Tracker</h1>
        <nav>
            <?php
                if(isset($_SESSION['username'])) {
                    echo ' <a href="index.php" class="nav-link  current" id="index">Home</a>';
                    echo '<a href="invoiceInput.html" class="nav-link" id="invoiceInput">InvoiceInput</a>';
                    echo '<a href="invoiceSearch.html" class="nav-link" id="invoiceSearch">InvoiceSearch</a>';
                    echo '<a href="login.php" class="nav-link" id="logout">Logout</a>';
                } else {
                    echo ' <a href="index.php" class="nav-link  current" id="index">Home</a>';
                    echo '<a href="signup.php" class="nav-link" id="signup">Sign-Up</a>';
                    echo '<a href="login.php" class="nav-link" id="logout">Login</a>';
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
                    if(isset($_SESSION['username'])) {
                        echo '<a href="invoiceInput.html" id="invoiceInput">InvoiceInput</a>';
                        echo '<a href="invoiceSearch.html" id="invoiceSearch">InvoiceSearch</a>';
                    } else {
                        echo '<a href="signup.html"  id="signup">Sign-Up</a>';
                        echo '<a href="login.html" id="logout">Login</a>';
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