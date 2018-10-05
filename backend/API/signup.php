<?php

/* SIGNUP
 * INPUT: {email: email, password: password}
 * OUPPUT: {signup: true/false}
 */
$conn = mysqli_connect('localhost', 'webuser', 'l8rzwup9nqtX4jVB', 'test');
mysqli_set_charset($conn,"utf8");

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$email = $obj['email'];
$password = $obj['password'];

// query by email
$check_unique = "SELECT * FROM User WHERE Email = '$email'";
$res = mysqli_query($conn, $check_unique);
$count = mysqli_num_rows($res);

if($count == 0){
	// new user 
	$date = date("Y/m/d");
	$salt = base64_encode(openssl_random_pseudo_bytes(16));
	$pwd = hashing($password, $salt);
	
	// insertion for new user
	$sql = "INSERT INTO User (Email, Password, Register_date, salt) VALUES ('$email', '$pwd', '$date', '$salt')";
	if ($conn->query($sql) === TRUE) {
			$data = ['signup' => true, 'email' => $email];
			header('Content-type: application/json');
			echo json_encode( $data );
		} else {
			$data = ['signup' => false,'error' => $pwd];
			header('Content-type: application/json');
			echo json_encode( $data );
		}
}else{
	// email already exsists
	$data = ['signup' => false,'error' => 'Email already exsists'];
	header('Content-type: application/json');
	echo json_encode( $data );
}

// hash function
function hashing($pwd, $salt){
	$iterations = 1000;
	$hash = hash_pbkdf2("sha256", $pwd, $salt, $iterations, 20);
	return $hash;
}
	
$conn->close(); 
?>