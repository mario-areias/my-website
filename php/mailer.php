<?php 

$name = $_POST["name"]; 
$email = $_POST["email"]; 
$message = $_POST["message"]; 


require_once('PHPMailer_5.2.3/class.phpmailer.php');

$mail             = new PHPMailer();

$mail->IsSendmail();

$body             = $message;

$mail->SetFrom($email, $name);

$address = "mail@mail.com"; // YOUR EMAIL ADDRESS
$nameto = "YourName"; // YOUR NAME
$mail->AddAddress($address, $nameto); 

$mail->Subject    = "Message from CV contact form";

$mail->AltBody    = "To view the message, please use an HTML compatible email viewer!"; // optional, comment out and test

$mail->MsgHTML($body);

if(!$mail->Send()) {
  echo "Mailer Error: " . $mail->ErrorInfo;
} else {
  echo "Message sent!";
}


?>