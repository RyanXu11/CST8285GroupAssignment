<?php
session_start(); // Start the session if not already started

// Clear session data
session_unset();
session_destroy();

// Redirect to login page
header('Location: index.php');
echo "Logout already";
exit;


// File name: index.php
// Description: This file is used for home page, name changed from index.html
// Course & Section: CST8285 313
// Professor: Hala Own
// Author: Yizhen Xu
// Date Created: 2024-03-28
// Last Date modified: 2024-03-29
?>