<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/login.css">
    <!-- <link rel="stylesheet" href="css/login.css"> -->
    <script type="module" src="js/login.js" defer></script> 
    <title>Login</title>
</head>
<body>
<!DOCTYPE html>
<html>

<head>
  <title>Login</title>
</head>

<body>
  <header>
    <h1 id="header">Family Expense Tracker</h1>
    <nav>
      <a href="index.php" class="nav-link" id="index">Home</a>
      <a href="signup.php" class="nav-link" id="signup">Sign-Up</a>
      <a href="login.php" class="nav-link current" id="login">Login</a>
    </nav>
</header>
<main>
  <div class="formcontainer">
    <h2>Login</h2>
    <hr>
    <form id="loginForm">

      <div class="textfield">
        <label for="username">Username</label>
        <input type="text" placeholder="Enter Username" name="username" id="username" required>
      </div>
      <div class="textfield">
        <label for="pass">Password</label>
        <input type="password" placeholder="Enter Password" name="pass" id="pass" required>
      </div>

      <div class="buttonDiv">
        <button type="submit">Login</button>
        <button type="reset">Cancel</button>
      </div>
      
      <div class="checkbox">
        <label>
          <input type="checkbox" checked="checked" name="remember"> Remember me
        </label>
      </div>

      <div class="container">
        <span class="pass">Forgot <a href="#">password?</a></span>
        <a href="signup.html">New User Signup</a>
      </div>
    </form>
  </div>
  </main>
  <footer>
    <p> &copy; 2024 Family Expense Tracker. All rights reserved. Coded by Ryan Xu & Yizhen Xu</p>
    <nav>
        <a href="#header">Top of Page</a>
    </nav>
</footer>
</body>
</html>
</body>
</html>