export const ACCOUNT_VERIFICATION_HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Under Review - CareerNest</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            line-height: 1.6;
        }
        
        .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 300;
        }
        
        .header .brand {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 500;
        }
        
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        
        .icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #FFA726 0%, #FF7043 100%);
            border-radius: 50%;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            color: white;
        }
        
        .greeting {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .message {
            font-size: 16px;
            color: #666;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        
        .status-box {
            background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }
        
        .status-title {
            font-size: 18px;
            font-weight: 600;
            color: #856404;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .status-message {
            color: #856404;
            font-size: 14px;
            font-weight: 500;
        }
        
        .timeline {
            margin: 30px 0;
            padding: 0;
        }
        
        .timeline-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 0 20px;
        }
        
        .timeline-step {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #4CAF50;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .timeline-step.pending {
            background: #FFA726;
        }
        
        .timeline-step.future {
            background: #e0e0e0;
            color: #999;
        }
        
        .timeline-text {
            font-size: 14px;
            color: #555;
        }
        
        .timeline-text.completed {
            color: #4CAF50;
            font-weight: 500;
        }
        
        .timeline-text.pending {
            color: #FFA726;
            font-weight: 500;
        }
        
        .info-box {
            background: #f8f9fa;
            border-left: 4px solid #4CAF50;
            padding: 20px;
            margin: 30px 0;
            text-align: left;
            border-radius: 0 8px 8px 0;
        }
        
        .info-title {
            font-size: 16px;
            font-weight: 600;
            color: #333;
            margin-bottom: 10px;
        }
        
        .info-text {
            font-size: 14px;
            color: #666;
            line-height: 1.6;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
        }
        
        .footer-text {
            font-size: 14px;
            color: #666;
            margin-bottom: 15px;
        }
        
        .brand-name {
            font-size: 16px;
            font-weight: 600;
            color: #4CAF50;
        }
        
        .contact-info {
            font-size: 12px;
            color: #999;
            margin-top: 15px;
        }
        
        /* Responsive Design */
        @media only screen and (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .header {
                padding: 25px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .greeting {
                font-size: 20px;
            }
            
            .timeline-item {
                padding: 0 10px;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="header">
            <h1>Account Registration Received</h1>
            <div class="brand">CareerNest Platform</div>
        </div>
        
        <div class="content">
            <div class="icon">⏳</div>
            
            <div class="greeting">Hello {{username}}!</div>
            
            <div class="message">
                Thank you for registering with <strong>CareerNest</strong>. We're excited to have you join our community!
            </div>
            
            <div class="status-box">
                <div class="status-title">
                    🔍 Account Under Review
                </div>
                <div class="status-message">
                    Your account is currently being reviewed by our admin team for validation.
                </div>
            </div>
            
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-step">✓</div>
                    <div class="timeline-text completed">Registration submitted successfully</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-step pending">2</div>
                    <div class="timeline-text pending">Admin review in progress</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-step future">3</div>
                    <div class="timeline-text">Account activation & welcome email</div>
                </div>
            </div>
            
            <div class="info-box">
                <div class="info-title">What happens next?</div>
                <div class="info-text">
                    Our admin team will review your registration details within <strong>1-2 business days</strong>. 
                    Once approved, you'll receive a confirmation email and can start using all platform features.
                </div>
            </div>
            
            <div class="message">
                We appreciate your patience during this process. If you have any questions, 
                please don't hesitate to contact our support team.
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                If you did not create this account, please ignore this email.
            </div>
            <div class="brand-name">CareerNest Development Team</div>
            <div class="contact-info">
                © 2025 CareerNest | Support: careernest.dev@gmail.com
            </div>
        </div>
    </div>
</body>
</html>`;