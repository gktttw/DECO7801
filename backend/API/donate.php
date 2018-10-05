<?php
/* DONATE
 * INPUT: {entry: entry, uid: uid}
 * OUTPUT: {upload: true/false}
 */
$conn = mysqli_connect('localhost', 'webuser', 'l8rzwup9nqtX4jVB', 'test');
mysqli_set_charset($conn,"utf8");

$entry = $_POST['entry'];
$uid = $_POST['uid'];

// get the file and alter the file name so there will be no duplicate file
$target_dir = "../../uploads/";
$temp = explode(".", $_FILES["img"]["name"]);
$newfilename = round(microtime(true)) . '.' . end($temp);
$target_file = $target_dir . $newfilename;

// upload file
if(move_uploaded_file($_FILES["img"]["tmp_name"], $target_file)) {
	$sql = "INSERT INTO Donation (UID, D_Name, URL) VALUES ('$uid', '$entry','$target_file')";
	if ($conn->query($sql) === TRUE) {
		$data = ['upload' => true, 'query' => true ];
		header('Content-type: application/json');
		echo json_encode( $data );
	}else{
		$data = ['upload' => false, 'query' => false , 'uid' => $uid, 'entry' => $entry, 'url' => $target_file];
		header('Content-type: application/json');
		echo json_encode( $data );
	}
}else {
	$data = ['upload' => false];
	header('Content-type: application/json');
	echo json_encode( $data );
}

$conn->close(); 

?>