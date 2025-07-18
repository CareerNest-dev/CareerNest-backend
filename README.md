# 🚀 Career & Intern Finding System

A comprehensive Node.js backend system designed specifically for IT undergraduates struggling with career enhancements and finding proper internships. Built with AWS infrastructure for scalability and reliability.

## 🎯 Overview

This backend system serves as the foundation for a career-building platform that connects IT undergraduates with internship opportunities, career guidance, and skill development resources. The system is built to handle:

- **Student Authentication & Profiles**
- **Company Registration & Management**
- **Internship Posting & Applications**
- **Career Guidance & Mentorship**
- **Skills Assessment & Tracking**
- **Real-time Notifications**

## ✨ Features

### For Students
- 🔐 **Secure Authentication** - JWT-based login/registration
- 👤 **Profile Management** - Skills, education, experience tracking
- 🔍 **Internship Search** - Filter by location, skills, duration
- 📄 **Application Management** - Track application status
- 📊 **Progress Tracking** - Career development metrics
- 💬 **Mentorship Matching** - Connect with industry professionals
- 🎓 **Skill Assessments** - Validate technical competencies

### For Companies
- 🏢 **Company Profiles** - Detailed company information
- 📝 **Internship Posting** - Create and manage internship opportunities
- 👥 **Candidate Management** - Review and filter applications
- 📈 **Analytics Dashboard** - Track hiring metrics
- 🔔 **Notification System** - Real-time updates on applications

### For Mentors
- 👨‍🏫 **Mentor Profiles** - Experience and expertise showcase
- 🤝 **Student Matching** - Connect with students based on skills
- 📚 **Resource Sharing** - Share career guidance materials
- 💼 **Career Counseling** - Provide personalized advice

## 🏗️ Architecture

### Technology Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: AWS DynamoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: AWS S3
- **Notifications**: AWS SNS
- **Email Service**: AWS SES
- **Caching**: AWS ElastiCache (Redis)
- **API Gateway**: AWS API Gateway
- **Hosting**: AWS Lambda + API Gateway (Serverless)

### AWS Services Used
- **DynamoDB** - NoSQL database for user data, internships, applications
- **S3** - File storage for resumes, company logos, documents
- **SNS** - Push notifications and email alerts
- **SES** - Email service for notifications and communications
- **ElastiCache** - Redis caching for improved performance
- **API Gateway** - API management and routing
- **Lambda** - Serverless compute for API endpoints
- **CloudWatch** - Monitoring and logging
- **IAM** - Identity and access management

## 📋 Prerequisites

- Node.js 18+ installed
- AWS Account with appropriate permissions
- Git installed
- Basic knowledge of REST APIs
- Understanding of AWS services (DynamoDB, S3, etc.)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/career-intern-system.git
cd career-intern-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set up Environment Variables
```bash
cp .env.example .env
```

### 4. Configure AWS Credentials
```bash
# Option 1: AWS CLI
aws configure

# Option 2: Environment Variables (see Configuration section)
```

### 5. Set up Database Tables
```bash
# Create all required DynamoDB tables
npm run setup:database

# Or create individually
node scripts/setup-students-table.js
node scripts/setup-companies-table.js
node scripts/setup-internships-table.js
node scripts/setup-applications-table.js
```

### 6. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## ☁️ AWS Setup

### 1. Create AWS Account
- Sign up at [AWS Console](https://aws.amazon.com/console/)
- Complete account verification

### 2. Create IAM User
```bash
# Create user with programmatic access
# Attach policies:
# - AmazonDynamoDBFullAccess
# - AmazonS3FullAccess
# - AmazonSNSFullAccess
# - AmazonSESFullAccess
```

### 3. Set up DynamoDB Tables
The system uses multiple DynamoDB tables:
- `students` - Student profiles and authentication
- `companies` - Company profiles and details
- `internships` - Internship postings
- `applications` - Internship applications
- `mentors` - Mentor profiles
- `skills` - Skills catalog
- `notifications` - User notifications

### 4. Configure S3 Buckets
```bash
# Create S3 buckets
aws s3 mb s3://career-system-resumes
aws s3 mb s3://career-system-company-logos
aws s3 mb s3://career-system-documents
```

### 5. Set up SES for Email
```bash
# Verify your email domain in AWS SES
# Move out of sandbox mode for production
```

## 🚀 Deployment

### Option 1: AWS Lambda + API Gateway (Serverless)
```bash
# Install Serverless Framework
npm install -g serverless

# Configure serverless.yml
# Deploy to AWS
serverless deploy
```

### Option 2: AWS EC2
```bash
# Launch EC2 instance
# Install Node.js and dependencies
# Configure PM2 for process management
pm2 start ecosystem.config.js
```

### Option 3: AWS ECS (Container)
```bash
# Build Docker image
docker build -t career-intern-system .

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag career-intern-system:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/career-intern-system:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/career-intern-system:latest

# Deploy to ECS
```




## 📊 Monitoring & Analytics

### CloudWatch Integration
- API response times
- Error rates
- Database performance
- Memory and CPU usage

### Custom Metrics
- User registration rates
- Application success rates
- Popular internships
- Company engagement

## 🔒 Security Features

- JWT authentication with refresh tokens
- Rate limiting on API endpoints
- Input validation and sanitization
- File upload security (virus scanning)
- HTTPS enforcement
- CORS configuration
- SQL injection prevention
- XSS protection

## 🛠️ Development Tools

### NPM Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run lint         # Check code quality
npm run format       # Format code
npm run migrate      # Run database migrations
npm run seed         # Seed database with sample data
```

### Development Dependencies
- **nodemon** - Auto-restart server
- **eslint** - Code linting
- **prettier** - Code formatting
- **jest** - Testing framework
- **supertest** - API testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Follow conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

- **Documentation**: [Wiki](https://github.com/yourusername/career-intern-system/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/career-intern-system/issues)
- **Email**: support@yourcompany.com
- **Discord**: [Join our community](https://discord.gg/yourserver)

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic authentication system
- ✅ Student and company profiles
- ✅ Internship posting and application
- ✅ Basic search and filtering

### Phase 2 (Q2 2024)
- 🔄 Mentor system implementation
- 🔄 Advanced search with AI
- 🔄 Real-time chat system
- 🔄 Mobile app development

### Phase 3 (Q3 2024)
- 📅 Video interviewing platform
- 📅 Skills assessment tests
- 📅 Career guidance AI
- 📅 Analytics dashboard

### Phase 4 (Q4 2024)
- 📅 Machine learning recommendations
- 📅 Blockchain certificates
- 📅 API marketplace
- 📅 International expansion

---

**Made with ❤️ for IT undergraduates worldwide**

*Helping students build better careers, one internship at a time.*

