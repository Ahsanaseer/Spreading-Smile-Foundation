<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/src/PHPMailer.php';
require __DIR__ . '/src/SMTP.php';
require __DIR__ . '/src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $email = htmlspecialchars($_POST['email']);
    $fullName = htmlspecialchars($_POST['fullName']);
    $volunteerProgramTitle = htmlspecialchars($_POST['volunteerProgramTitle'] ?? 'Winter Volunteer program 2025');
    
    // Debug: Check what data we received
    error_log("Received POST data: " . print_r($_POST, true));
    error_log("Email: " . $email);
    error_log("Full Name: " . $fullName);
    error_log("Volunteer Program Title: " . $volunteerProgramTitle);
    
    // Validate required fields
    if (empty($email)) {
        echo "Error: Email is required.";
        exit;
    }
    
    if (empty($fullName)) {
        echo "Error: Full name is required. Received: '" . ($_POST['fullName'] ?? 'null') . "'";
        exit;
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Error: Invalid email format.";
        exit;
    }

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'spreadingsmilefoundation@gmail.com';
        $mail->Password = 'twzmcdkolhaxnhwt';  // Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Set sender and recipient
        $mail->setFrom('spreadingsmilefoundation@gmail.com', 'Spreading Smile Foundation');
        $mail->addAddress($email, $fullName);

        $mail->isHTML(true);
        $mail->Subject = "Thank You for Applying - Spreading Smile Foundation Volunteer Program";
        
        // Create a beautiful HTML email template
        $mail->Body = "
        <!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Thank You - Spreading Smile Foundation</title>
            <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' rel='stylesheet'>
            <style>
                body {
                    font-family: 'Poppins', Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f8f9fa;
                }
                .email-container {
                    background-color: #ffffff;
                    border-radius: 10px;
                    padding: 30px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .logo {
                    color: #46C0B2;
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .greeting {
                    color: #46C0B2;
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 20px;
                }
                
                /* Dark mode support */
                @media (prefers-color-scheme: dark) {
                    body {
                        background-color: #ffffff !important;
                        color: #000000 !important;
                    }
                    .email-container {
                        background-color: #ffffff !important;
                        color: #000000 !important;
                    }
                    .greeting {
                        color: #000000 !important;
                    }
                    .content {
                        color: #000000 !important;
                    }
                    .content p {
                        color: #000000 !important;
                    }
                    .footer {
                        color: #000000 !important;
                    }
                    .highlight {
                        background-color: #f0f8f7 !important;
                        color: #000000 !important;
                    }
                }
                .content {
                    margin-bottom: 25px;
                }
                .highlight {
                    background-color: #f0f8f7;
                    padding: 15px;
                    border-left: 4px solid #46C0B2;
                    margin: 20px 0;
                    border-radius: 5px;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 2px solid #e9ecef;
                    color: #6c757d;
                    font-size: 14px;
                }
                .social-links {
                    margin: 20px 0;
                }
                .social-links a {
                    color: #46C0B2;
                    text-decoration: none;
                    margin: 0 10px;
                }
                .cta-button {
                    display: inline-block;
                    background-color: #46C0B2;
                    color: white;
                    padding: 12px 25px;
                    text-decoration: none;
                    border-radius: 25px;
                    font-weight: 600;
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <div class='email-container'>
                <div class='header'>
                    <div class='logo'>Spreading Smile Foundation</div>
                </div>
                
                <div class='greeting'>Dear " . (!empty($fullName) ? $fullName : 'Volunteer') . ",</div>
                
                <div class='content'>
                    <p>Our team is carefully assessing your and other respondents application, we'll be contacting the shortlisting candidate soon.
                       For any queries feel free to contact at <a href='tel:03213214884'>03213214884</a></p>
                </div>
                
                <div class='footer'>
                    <p><strong>Regards,</strong></p>
                    <p><strong>Spreading smile foundation</strong></p>
                    <p style='font-size: 12px; margin-top: 20px;'>
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            </div>
        </body>
        </html>
        ";

        $mail->send();
        echo "Email sent successfully!";
        
    } catch (Exception $e) {
        echo "Failed to send email. Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request method.";
}
?>
