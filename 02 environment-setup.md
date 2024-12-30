# MacBook Setup Guide for Amber Alert System Development

## Prerequisites Setup (One-time setup)

### Step 1: Install Command Line Tools
1. Open Terminal (Press Cmd + Space, type "Terminal")
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Click "Install" when prompted and wait for completion

### Step 2: Install Package Manager
1. Install Homebrew (Mac's package manager):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Follow any terminal prompts to complete installation

### Step 3: Install Development Tools
Run these commands in Terminal one by one:
```bash
# Install Git for version control
brew install git

# Install Docker Desktop for containerization
brew install --cask docker

# Install Visual Studio Code (code editor)
brew install --cask visual-studio-code

# Install AWS CLI
brew install awscli

# Install Kubernetes tools
brew install kubernetes-cli
```

### Step 4: Install Node.js and Development Tools
```bash
# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal and install Node.js
nvm install 16
nvm use 16

# Install Terraform for infrastructure management
brew install terraform
```

## AWS Account Setup

### Step 1: Create AWS Account
1. Go to aws.amazon.com
2. Click "Create an AWS Account"
3. Follow signup process with your email and credit card
4. Choose "Basic Support Plan" (free)

### Step 2: Setup AWS Security
1. Login to AWS Console
2. Go to IAM (Identity and Access Management)
3. Create a new IAM user:
   - Click "Users" → "Add user"
   - Username: "amber-alert-admin"
   - Select "Programmatic access"
   - Attach "AdministratorAccess" policy
4. Save the Access Key ID and Secret Access Key

### Step 3: Configure AWS CLI
1. Open Terminal
2. Run:
   ```bash
   aws configure
   ```
3. Enter your AWS credentials when prompted:
   - AWS Access Key ID: [Enter your key]
   - AWS Secret Access Key: [Enter your secret]
   - Default region: ap-southeast-1 (Singapore)
   - Default output format: json

## Project Setup

### Step 1: Create Project Directory
```bash
# Create project folder
mkdir ~/Documents/amber-alert-system
cd ~/Documents/amber-alert-system

# Initialize git repository
git init
```

### Step 2: Setup Basic Project Structure
```bash
# Create project structure
mkdir -p services/core services/interface services/intelligence services/integration
mkdir infrastructure docs tests
```

### Step 3: Install Core Dependencies
```bash
# Initialize Node.js project
npm init -y

# Install core dependencies
npm install express typescript @types/node @types/express
npm install -D nodemon ts-node
```

## Development Environment Setup

### Step 1: Configure VS Code
1. Open VS Code
2. Install recommended extensions:
   - Docker
   - AWS Toolkit
   - GitLens
   - Prettier
   - ESLint
   - Thunder Client

### Step 2: Setup Basic Configuration
Create a basic TypeScript configuration:
```bash
# Create TypeScript config
npx tsc --init
```

### Step 3: Create Basic Service
1. Create a test service file:
   ```bash
   code services/core/alert-service.ts
   ```
2. Add basic code (VS Code will open):
   ```typescript
   import express from 'express';
   const app = express();
   const port = 3000;

   app.get('/', (req, res) => {
     res.json({ message: 'Alert Service Running' });
   });

   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });
   ```

## Local Testing

### Step 1: Run Local Service
```bash
# Run the service
npx ts-node services/core/alert-service.ts
```

### Step 2: Test Service
1. Open web browser
2. Visit: http://localhost:3000
3. You should see the message "Alert Service Running"

## Basic AWS Deployment

### Step 1: Create Deployment Scripts
1. Create a deployment folder:
   ```bash
   mkdir deployment
   cd deployment
   ```

2. Initialize Terraform:
   ```bash
   terraform init
   ```

### Step 2: Create Basic Infrastructure
Create a basic infrastructure file (main.tf):
```hcl
provider "aws" {
  region = "ap-southeast-1"
}

resource "aws_ecr_repository" "alert_service" {
  name = "amber-alert-service"
}
```

### Step 3: Deploy Basic Infrastructure
```bash
terraform plan
terraform apply
```

## Next Steps

After completing this setup, you'll have:
- A working development environment
- Basic AWS infrastructure
- Local testing capability

To proceed with full development:

1. **Study Resources**:
   - Learn basic TypeScript (codecademy.com)
   - Learn basic AWS concepts (aws.training)
   - Learn Docker basics (docker.com/get-started)

2. **Get Help**:
   - Join AWS Discord community
   - Join Node.js Discord community
   - Consider hiring a technical consultant for complex parts

3. **Security Notes**:
   - Never commit AWS credentials to Git
   - Keep your macOS updated
   - Enable FileVault disk encryption
   - Use strong passwords

4. **Regular Maintenance**:
   - Keep your tools updated: `brew update && brew upgrade`
   - Update Node.js periodically: `nvm install node --latest-npm`
   - Keep VS Code extensions updated

## Troubleshooting Common Issues

### If Docker Won't Start:
1. Open Docker Desktop manually
2. Check System Preferences → Security & Privacy
3. Allow Docker kernel extensions

### If AWS CLI Fails:
1. Verify internet connection
2. Re-run `aws configure`
3. Check AWS console for access key status

### If Node.js Commands Fail:
1. Verify Node installation: `node --version`
2. Reinstall if needed: `nvm install node`
3. Clear npm cache: `npm cache clean --force`
