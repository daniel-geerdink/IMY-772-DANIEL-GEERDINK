# Hexadecimal Calculator Application


## Overview
This calculator application performs basic arithmetic on hexadecimal numbers with certain constraints.


## Functional Requirements

| **Category**                   | **Functional Requirement**                                                                   |
|--------------------------------|---------------------------------------------------------------------------------------------|
| **Input Handling**             | Limit input to hexadecimal numbers only (0-9, A-F)                                         |
|                                | Accept only up to 2-digit hexadecimal numbers per operand                                   |
|                                | Display an error when invalid characters are input                                         |
| **Output Handling**            | Return results as hexadecimal values only                                                  |
|                                | Limit output to a maximum of 4-digit hexadecimal values                                    |
|                                | Ensure results are always positive (no negative results)                                   |
|                                | Do not return results with decimal places (only integers)                                  |
| **Operations**                 | Perform addition on two valid hexadecimal numbers                                          |
|                                | Perform subtraction ensuring no negative results                                           |
|                                | Perform multiplication of two valid hexadecimal numbers                                    |
|                                | Perform division and round down to the nearest whole number (floor division)               |
| **User Interface (UI)**        | Provide buttons for hexadecimal digits (0-9, A-F)                                         |
|                                | Provide buttons for basic operations (+, -, *, /)                                         |
|                                | Provide a clear button to reset input and output                                         |
|                                | Provide an equal (=) button to compute the result                                          |
|                                | Display both inputs and the result clearly in the UI                                       |
| **Error Handling**             | Display user-friendly error messages for invalid inputs or operations                     |
|                                | Handle division by zero gracefully with an appropriate message                             |
| **Validation Logic**           | Ensure all inputs and outputs are follow the 2-digit input and 4-digit output constraints   |
|                                | Prevent operations that would result in outputs exceeding the 4-digit limit              |
| **Test-Driven Development**    | Implement tests for all input constraints and arithmetic operations                        |
|                                | Automate tests using GitHub Actions on every push request                         |

---
  
## Project Structure

- **packages/app**: Contains the main application code.
  - **public/index.html**: The main HTML file for the application.
  - **src/components/Calculator.tsx**: The Calculator component with logic and UI.
  - **src/App.tsx**: The main App component that integrates the Calculator.
  - **src/index.tsx**: The entry point for the React application.
  - **src/styles/App.css**: CSS styles for the application.
  - **package.json**: Configuration file for the app package.
  - **tsconfig.json**: TypeScript configuration file.

- **packages/tests**: Contains the test files.
  - **unit/Calculator.test.tsx**: Unit tests for the Calculator component.
  - **e2e/Calculator.e2e.test.ts**: End-to-end tests for the Calculator application.
  - **package.json**: Configuration file for the tests package.

- **.github/workflows**: Contains the CI configuration for GitHub Actions.
  - **ci.yml**: Defines the workflow for continuous integration.

## Getting Started

To get started with the calculator application, follow these steps:

1. Install dependencies:
   ```
   yarn install
   ```

2. Run the application:
   ```
   yarn workspace app start
   ```

3. Run tests:
   ```
   yarn workspace tests test
   ```

# Deployment Guide

## Prerequisites
- AWS account with appropriate permissions
- AWS CLI installed and configured
- Docker installed

## Setting Up AWS Credentials

### 1. Get AWS Access Keys
1. Go to AWS Console
2. Click on your username (top right) → Security credentials
3. Under "Access keys", click "Create access key"
4. Choose "Command Line Interface (CLI)"
5. Click "Create access key"
6. **IMPORTANT**: Save both the Access Key ID and Secret Access Key immediately - you won't see the Secret Access Key again!

### 2. Configure AWS CLI
1. Open PowerShell or Command Prompt
2. Run:
```bash
aws configure
```
3. Enter these details when prompted:
   - AWS Access Key ID: (paste your Access Key ID)
   - AWS Secret Access Key: (paste your Secret Access Key)
   - Default region: eu-west-1
   - Default output format: json

## Manual Deployment Steps

### 1. Create ECR Repository
1. Go to AWS Console → ECR
2. Click "Create repository"
3. Name: "hex-calc-app"
4. Click "Create repository"

### 2. Build and Push Docker Image
```bash
# Build the Docker image
docker build -t hex-calc-app .

# Login to ECR
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.eu-west-1.amazonaws.com

# Tag the image
docker tag hex-calc-app:latest <your-account-id>.dkr.ecr.eu-west-1.amazonaws.com/hex-calc-app:latest

# Push to ECR
docker push <your-account-id>.dkr.ecr.eu-west-1.amazonaws.com/hex-calc-app:latest
```

### 3. Create Security Group
   - Auto-assign Public IP: Enable
   - Security group: Create new
   - Security group name: "hex-calc-sg"
   - Description: "Security group for hex-calc-app"
   - Add these inbound rules:
     - Type: SSH, Port: 22, Source: My IP (for secure access)
     - Type: HTTP, Port: 80, Source: Anywhere (0.0.0.0/0)
     - Type: HTTPS, Port: 443, Source: Anywhere (0.0.0.0/0)
     - Type: Custom TCP, Port: 3000, Source: Anywhere (0.0.0.0/0)
   - Add these outbound rules:
     - Type: All traffic, Port: All, Destination: Anywhere (0.0.0.0/0)

### 4. Create EC2 Instance
1. Go to AWS Console → EC2
2. Click "Launch Instance"
3. Name: "hex-calc-app"
4. Choose "Amazon Linux 2 AMI"
5. Instance type: t2.micro (free tier eligible)
6. Create key pair
   - Click "Create new key pair"
   - Name: "hex-calc-key"
   - Key pair type: RSA
   - Private key file format: .pem
   - Click "Create key pair"
   - **IMPORTANT**: Save the downloaded .pem file in a secure location:
     - Create folder: `C:\Users\YourUsername\.aws\keys`
     - Move the .pem file there
     - Set file permissions:
       - Right-click the .pem file
       - Properties → Security
       - Remove all users except your own
       - Give only yourself Read permissions
7. Network settings:
   - Security group: "hex-calc-sg"
8. Click "Launch instance"

### 5. Connect to EC2 Instance
Using SSH:
   ```powershell
   # Navigate to your keys directory
   cd C:\Users\YourUsername\.aws\keys
   
   # Connect to the instance
   ssh -i "hex-calc-key.pem" ec2-user@<public-ip>
   ```
   Replace `<public-ip>` with your instance's public IP 


### 6. Deploy to EC2
1. Install Docker and AWS CLI:
```bash
# Update system packages
sudo yum update -y

# Install Docker
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Configure AWS CLI
aws configure
# When prompted, enter:
# - AWS Access Key ID: (your access key)
# - AWS Secret Access Key: (your secret key)
# - Default region: eu-west-1
# - Default output format: json

# Log out and back in to apply group changes
exit
```

2. Repeat Step 5. Connect to EC2 Instance

3. Deploy the application:
```bash
# Authenticate with ECR
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.eu-west-1.amazonaws.com

# Pull and run container
docker pull <your-account-id>.dkr.ecr.eu-west-1.amazonaws.com/hex-calc-app:latest
docker run -d -p 3000:3000 <your-account-id>.dkr.ecr.eu-west-1.amazonaws.com/hex-calc-app:latest
```

### 7. Access the Application
- Find your EC2 instance's public IP in the EC2 console
- Access the calculator at: `http://<public-ip>:3000`

