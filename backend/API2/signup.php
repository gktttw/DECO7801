<?php
$conn = mysqli_connect('localhost', 'webuser', 'l8rzwup9nqtX4jVB', 'Donate_A_Mole');
mysqli_set_charset($conn,"utf8");

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$email = $obj['email'];
$password = $obj['password'];
$dob = $obj['dob'];
$gender = $obj['gender'];
$race = $obj['race'];

// USER	 user_id 	password 	salt 	email 	date_of_birth 	gender 	race 


// check if email exists or not
$check_unique = "SELECT * FROM USER WHERE email = '$email'";
$res = mysqli_query($conn, $check_unique);
$count = mysqli_num_rows($res);

if($count == 0){
	
	// generate salt
	$salt = base64_encode(openssl_random_pseudo_bytes(16));
	// hash password using salt
	$pwd = hashing($password, $salt);
	
	$sql = "INSERT INTO User (password, salt, email, date_of_birth, gender, race) 
						VALUES ('$pwd', '$salt', '$email', '$dob', '$gender', '$race')";
	if ($conn->query($sql) === TRUE) {
			$get_id = "SELECT * FROM USER WHERE email = '$email'"
			$data=mysqli_query($conn, $get_id);
			$fetch = mysqli_fetch_object($data);
			$id = $fetch -> user_id;
			
			$data = ['signup' => true, 'email' => $email, 'user_id' => $id];
			header('Content-type: application/json');
			echo json_encode( $data );
		} else {
			$data = ['signup' => false,'error' => $pwd];
			header('Content-type: application/json');
			echo json_encode( $data );
		}
}else{
	// email already used
	$data = ['signup' => false,'error' => 'Email already exsists'];
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