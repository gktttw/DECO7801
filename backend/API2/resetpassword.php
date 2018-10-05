<?php
$conn = mysqli_connect('localhost', 'webuser', 'l8rzwup9nqtX4jVB', 'Donate_A_Mole');
mysqli_set_charset($conn,"utf8");

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$email = $obj['email'];
$salt = $obj['salt'];
$password = $obj['password'];
$new_salt = base64_encode(openssl_random_pseudo_bytes(16));
$pwd = hashing($password, $new_salt);

// link verification: the email and salt has to be the consistent to the data in db
$sql = "UPDATE USER SET password = '$pwd', salt = '$new_salt' WHERE email = '$email' AND salt = '$salt'";
if ($conn->query($sql) === TRUE) {
	$data = ['update' => true];
	header('Content-type: application/json');
	echo json_encode( $data );
} else {
	$data = ['update' => false];
	header('Content-type: application/json');
	echo json_encode( $data );
}

/*
 hash the password with salt
 param:
	$pwd: password need to be hashed
	$salt: salt 
return:
	hashed password
*/
function hashing($pwd, $salt){
	$iterations = 1000;
	$hash = hash_pbkdf2("sha256", $pwd, $salt, $iterations, 20);
	return $hash;
}
	
$conn->close(); 
?>