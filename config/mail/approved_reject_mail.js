export const ACCOUNT_APPROVED_HTML_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Status - CareerNest</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f6f9;
            padding: 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        /* APPROVAL TEMPLATE STYLES */
        .approval-header {
            background: linear-gradient(135deg, #28a745, #20c997);
            padding: 30px;
            text-align: center;
            color: white;
        }
        
        .approval-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        
        .approval-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        /* REJECTION TEMPLATE STYLES */
        .rejection-header {
            background: linear-gradient(135deg, #dc3545, #c82333);
            padding: 30px;
            text-align: center;
            color: white;
        }
        
        .rejection-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        
        .rejection-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .logo {
            font-size: 18px;
            font-weight: bold;
            opacity: 0.95;
        }
        
        .content {
            padding: 35px 30px;
        }
        
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        
        .username {
            color: #667eea;
            font-weight: 600;
        }
        
        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 25px;
            line-height: 1.7;
        }
        
        .next-steps {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #28a745;
            margin: 25px 0;
        }
        
        .rejection-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #dc3545;
            margin: 25px 0;
        }
        
        .next-steps h3, .rejection-info h3 {
            color: #333;
            font-size: 16px;
            margin-bottom: 10px;
        }
        
        .next-steps p, .rejection-info p {
            color: #666;
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .next-steps ul {
            color: #666;
            font-size: 14px;
            margin-left: 20px;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        
        .footer p {
            font-size: 14px;
            color: #666;
            margin-bottom: 8px;
        }
        
        .contact-info {
            margin-top: 15px;
            font-size: 13px;
            color: #888;
        }
        
        .contact-info a {
            color: #667eea;
            text-decoration: none;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 6px;
            }
            
            .approval-header, .rejection-header, .content, .footer {
                padding: 20px;
            }
            
            .approval-title, .rejection-title {
                font-size: 20px;
            }
            
            .greeting {
                font-size: 16px;
            }
        }
    </style>
</head>
<body>

<!-- ACCOUNT APPROVAL TEMPLATE -->
<div class="container" id="approval-template" style="display: block;">
    <div class="approval-header">
        <div class="approval-icon">✅</div>
        <h1 class="approval-title">Account Approved!</h1>
        <div class="logo">CareerNest</div>
    </div>
    
    <div class="content">
        <p class="greeting">Hello <span class="username">{{email}}</span>,</p>
        
        <div class="message">
            We're pleased to inform you that your CareerNest account has been successfully reviewed and approved by our admin team. Welcome to the CareerNest community!
        </div>
        
        <div class="message">
            You can now access all features of your account and start exploring career opportunities, connecting with professionals, and building your professional profile.
        </div>
        
        <div class="next-steps">
            <h3>What's Next?</h3>
            <ul>
                <li>Log in to your account and complete your profile</li>
                <li>Browse available job opportunities</li>
                <li>Connect with industry professionals</li>
                <li>Access career resources and tools</li>
            </ul>
        </div>
        
        <div class="message">
            Thank you for choosing CareerNest. We're excited to be part of your career journey!
        </div>
    </div>
    
    <div class="footer">
        <p><strong>CareerNest Team</strong></p>
        <p>Building Your Future, One Step at a Time</p>
        
        <div class="contact-info">
            Questions? Contact us at <a href="mailto:support@careernest.com">support@careernest.com</a><br>
            © 2024 CareerNest. All rights reserved.
        </div>
    </div>
</div>

</body>
</html>`;
export const ACCOUNT_DELETED_HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Status - CareerNest</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f6f9;
            padding: 20px;
            line-height: 1.6;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .rejection-header {
            background: linear-gradient(135deg, #dc3545, #c82333);
            padding: 30px;
            text-align: center;
            color: white;
        }
        
        .rejection-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        
        .rejection-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        
        .logo {
            font-size: 18px;
            font-weight: bold;
            opacity: 0.95;
        }
        
        .content {
            padding: 35px 30px;
        }
        
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        
        .username {
            color: #667eea;
            font-weight: 600;
        }
        
        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 25px;
            line-height: 1.7;
        }
        
        .rejection-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #dc3545;
            margin: 25px 0;
        }
        
        .rejection-info h3 {
            color: #333;
            font-size: 16px;
            margin-bottom: 10px;
        }
        
        .rejection-info p {
            color: #666;
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        
        .footer p {
            font-size: 14px;
            color: #666;
            margin-bottom: 8px;
        }
        
        .contact-info {
            margin-top: 15px;
            font-size: 13px;
            color: #888;
        }
        
        .contact-info a {
            color: #667eea;
            text-decoration: none;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 6px;
            }
            
            .rejection-header, .content, .footer {
                padding: 20px;
            }
            
            .rejection-title {
                font-size: 20px;
            }
            
            .greeting {
                font-size: 16px;
            }
        }
    </style>
</head>
<body>

<div class="container">
    <div class="rejection-header">
        <div class="rejection-icon">❌</div>
        <h1 class="rejection-title">Account Application Declined</h1>
        <div class="logo">CareerNest</div>
    </div>
    
    <div class="content">
        <p class="greeting">Hello <span class="username">{{email}}</span>,</p>
        
        <div class="message">
            Thank you for your interest in joining CareerNest. After careful review, we regret to inform you that your account application has not been approved at this time.
        </div>
        
        <div class="rejection-info">
            <h3>Possible Reasons:</h3>
            <p>• Incomplete or insufficient profile information</p>
            <p>• Application did not meet our current membership criteria</p>
            <p>• Verification documents were unclear or incomplete</p>
            <p>• Profile content did not align with our community guidelines</p>
        </div>
        
        <div class="message">
            If you believe this decision was made in error or if you have additional information to provide, please feel free to contact our support team. We're here to help clarify any concerns.
        </div>
        
        <div class="message">
            We appreciate your understanding and wish you the best in your career endeavors.
        </div>
    </div>
    
    <div class="footer">
        <p><strong>CareerNest Team</strong></p>
        <p>Building Your Future, One Step at a Time</p>
        
        <div class="contact-info">
            Questions? Contact us at <a href="mailto:support@careernest.com">support@careernest.com</a><br>
            © 2024 CareerNest. All rights reserved.
        </div>
    </div>
</div>

</body>
</html>`;
