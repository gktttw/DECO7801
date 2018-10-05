<?php
$conn = mysqli_connect('localhost', 'webuser', 'l8rzwup9nqtX4jVB', 'Donate_A_Mole');
mysqli_set_charset($conn,"utf8");

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$email = $obj['email'];
$password = $obj['password'];

// query by email
$sql = "SELECT * FROM USER WHERE email = '$email'";
$res = mysqli_query($conn, $sql);
$count = mysqli_num_rows($res);

if($count == 1){
	// fetch the salt and hash password again
	$row = mysqli_fetch_array($res);
	$salt = $row['salt'];
	$pwd = hashing($password, $salt);
	if($row['password'] == $pwd){
		$data = ['login' => true, 'email' => $email];
		header('Content-type: application/json');
		echo json_encode( $data );
	}else{
		// wrong password return error
		$data = ['login' => false,'error' => 'wrong password'];
		header('Content-type: application/json');
		echo json_encode( $data );
	}
}else{
	// no such email or more that one email return error
	$data = ['login' => false,'error' => 'no such user'];
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