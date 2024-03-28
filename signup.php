<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Add authorship metadata and link CSS and JS files -->
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/login.css">
    <script src="js/signup.js" defer></script> 
    <title>Signup</title>
</head>
<body>
    <header>
        <h1 id="header">Family Expense Tracker</h1>
        <nav>
            <a href="index.php" class="nav-link" id="indexPage">Home</a>
            <a href="signup.php" class="nav-link current" id="signupPage">Sign-Up</a>
            <a href="login.php" class="nav-link" id="loginPage">Login</a>
        </nav>
    </header>
    <main>
        <div class="formcontainer">
            <h2>Sign-Up</h2>
            <hr>
            <form>
                <!-- You will need to write the validate function for this form. -->
    
                <div class="textfield">
                    <label for="email">Email Address</label>
                    <input type="text" name="email" id="email" placeholder="Email" autocomplete="email">
                </div>
    
                <div class="textfield">
                    <label for="login">User Name</label>
                    <input type="text" name="login" id="login" placeholder="User name">
                </div>
    
                <div class="textfield">
                    <label for="pass">Password</label>
                    <input type="password" name="pass" id="pass" placeholder="Password">
                </div>
            
                <div class="textfield">
                    <label for="pass2">Re-type Password</label>
                    <input type="password" id="pass2" placeholder="Password">
                </div>
    
                <!-- <div class="checkbox">
                    <input type="checkbox" name="newsletter" id="newsletter">
                    <label for="newsletter">I agree to receive Weekly Kitten Pictures newsletters</label>
                </div> -->
    
                <div class="checkbox">
                    <input type="checkbox" name="terms" id="terms">
                    <label for="terms">
                        <a href="#" onclick="alert('You must have the right to use this system to register.'); return false;">
                            I agree to the terms and conditions
                        </a>
                    </label>

                </div>
                <div class="buttonDiv">
                    <button type="submit">Sign-Up</button>
                    <button type="reset">Reset</button>
                </div>

    
            </form>
    </main>
 
    <footer>
        <p> &copy; 2024 Family Expense Tracker. All rights reserved. Coded by Ryan Xu & Yizhen Xu</p>
        <nav>
            <a href="#header">Top of Page</a>
        </nav>
    </footer>
</body>
</html>