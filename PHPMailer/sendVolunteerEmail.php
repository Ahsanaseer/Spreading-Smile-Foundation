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
    
    // Validate required fields
    if (empty($email) || empty($fullName)) {
        echo "Error: Email and full name are required.";
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
            <style>
                body {
                    font-family: 'Arial', sans-serif;
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
                    color: #f6f6f6;
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 20px;
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
                
                <div class='greeting'>Dear $fullName,</div>
                
                <div class='content'>
                    <p>Thank you for your interest in joining our <strong>Volunteer Program Summer 25'</strong>! We are thrilled that you've taken the first step towards making a positive impact in your community.</p>
                    
                    <div class='highlight'>
                        <p><strong>Your application has been received successfully!</strong></p>
                        <p>We have received your volunteer application and our team will review it carefully. We appreciate the time and effort you've put into completing the application form.</p>
                    </div>
                    
                    <h3 style='color: #f6f6f6;'>What happens next?</h3>
                    <ul>
                        <li>Our team will review your application within <strong>3-5 business days</strong></li>
                        <li>If selected, you will receive an email with further instructions</li>
                        <li>Selected candidates will be invited for a brief interview</li>
                        <li>Final selections will be announced via email</li>
                    </ul>
                    
                    <h3 style='color: #f6f6f6;'>Program Highlights:</h3>
                    <ul>
                        <li><strong>Duration:</strong> 5-6 weeks of meaningful volunteer work</li>
                        <li><strong>Activities:</strong> Visits to orphanages, old age homes, and special needs centers</li>
                        <li><strong>Certificate:</strong> Globally recognized certificate upon completion</li>
                        <li><strong>Networking:</strong> Connect with like-minded individuals</li>
                        <li><strong>Opportunity:</strong> Chance to join our permanent team</li>
                    </ul>
                    
                    <p>We believe in the power of youth to bring positive change to society. Your willingness to volunteer shows your commitment to making a difference, and we're excited about the possibility of working together.</p>
                    
                    <p>If you have any questions or need further information, please don't hesitate to contact us.</p>
                </div>
                
                <div class='footer'>
                    <p><strong>Stay Connected with Us:</strong></p>
                    <div class='social-links'>
                        <a href='#'>Facebook</a> |
                        <a href='#'>Instagram</a> |
                        <a href='#'>LinkedIn</a>
                    </div>
                    <p>Email: <a href='mailto:spreadingsmilefoundation@gmail.com' style='color: #46C0B2;'>spreadingsmilefoundation@gmail.com</a></p>
                    <p><em>Together, let's spread smiles and make a difference!</em></p>
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
