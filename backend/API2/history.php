<?php
$conn = mysqli_connect('localhost', 'webuser', 'l8rzwup9nqtX4jVB', 'Donate_A_Mole');
mysqli_set_charset($conn,"utf8");

$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$user_id = $obj['user_id'];

// get dictinct name from the donations of this user
$getImgName = "SELECT DISTINCT mole_name FROM DONATION WHERE user_id = '$user_id'"
$res = mysqli_query($conn, $getImgName);
$names = mysqli_fetch_array($res);

$data = ['name' => $names];
header('Content-type: application/json');
echo json_encode( $data );

$conn->close(); 
?>