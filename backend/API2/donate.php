<?php
$conn = mysqli_connect('localhost', 'webuser', 'l8rzwup9nqtX4jVB', 'Donate_A_Mole');
mysqli_set_charset($conn,"utf8");

// 	donation_id 	user_id 	date_submitted 	mole_name 	mole_location 	mole_size 	mole_description 	img 

$user_id = $_POST['user_id'];
$mole_name = $_POST['mole_name'];
$mole_location = $_POST['mole_location'];
$mole_size = $_POST['mole_size'];
$mole_description = $_POST['mole_description'];
$date = date("Y/m/d");

$target_dir = "../../uploads/";
$target_file = $target_dir . basename($_FILES["img"]["name"]);


if(move_uploaded_file($_FILES["img"]["tmp_name"], $target_file)) {
	$sql = "INSERT INTO DONATION (user_id, date_submitted, mole_name, mole_location, mole_size, mole_description, img)
			VALUES ('$user_id', '$date', '$mole_name', '$mole_location', '$mole_size', '$mole_description', '$target_file')"
	if ($conn->query($sql) === TRUE) {
		$data = ['upload' => true, 'email' => $email ];
		header('Content-type: application/json');
		echo json_encode( $data );
	}
}else {
	$data = ['upload' => false, 'email' => $email];
	header('Content-type: application/json');
	echo json_encode( $data );
}

$conn->close(); 
?>