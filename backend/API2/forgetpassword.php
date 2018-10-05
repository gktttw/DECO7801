<?php include("inc/sessionStart.php");?>
<?php include("inc/sendemail.php");?>
<?php
$conn = mysqli_connect('localhost', 'webuser', 'l8rzwup9nqtX4jVB', 'Donate_A_Mole');
mysqli_set_charset($conn,"utf8");

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$email = $obj['email'];

// check if email exists and send reset link to it
$checkemail = "SELECT * FROM USER WHERE email = '$email'";
$res = mysqli_query($conn, $checkemail);
$count = mysqli_num_rows($res);

if($count == 0){
	// no such user
	$data = ['email' => false];
	header('Content-type: application/json');
	echo json_encode( $data );
}else{
	
	$_SESSION['programName'] = "myEmail";

	// get the salt to verify the link later
	$row = mysqli_fetch_array($res);
	$salt = $row['salt'];

	// This will only be populated if we pressed the submit button on our form ealier
	$sendFlag = filter_input(INPUT_POST,'hiddenField',FILTER_SANITIZE_STRING);

	// Write the email if we have been called from the form
    $from = "DM@mail.com";
	$to = $email;
    $subject = "DM: RESET PWD";
	$msg = "<a href='donateamole://forgetpassword/".$email."/".$salt."'> reset password</a>";

    $ok = sendemail($from,$to,$subject,$msg);

	// Check if mail was sent, display result later on form
    if (!$ok) {
		$data = ['email' => false, 'error' => 'fail to send email'];
		header('Content-type: application/json');
		echo json_encode( $data );
    } else {
		$data = ['email' => true, 'salt' => $salt];
		header('Content-type: application/json');
		echo json_encode( $data );
    }
}
$conn->close(); 
?>