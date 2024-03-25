<?php
function debug_to_console($data) {
    echo "<script>console.log('Debug Objects: " . json_encode($data) . "' );</script>";
}
$array = array('apple', 'banana', 'cherry');
debug_to_console($array);

for ($x=0; $x<5;$x++){
    echo ($x);
}

phpinfo();

?>