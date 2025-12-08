# **Documento Técnico**

[Documento de Google Docs] (https://docs.google.com/document/d/1pcC9RQF0iqKfuOEp-qQXptkYECjwDEYPz6KZ2fTJIGU/edit?usp=sharing)

# **TaskFlow- Tasks manager**

Web application for managing tasks.

## **Prerequisites**

Before starting, make sure you have the following installed on your system:

### **1. Node.js**

**Check if installed:**
```bash
node --version
```

**If not installed:**
- Download from: https://nodejs.org/

### **2. AWS CLI**

**Check if installed:**
```bash
aws --version
```

**If not installed:**
1. Download from: https://aws.amazon.com/cli/

### **3. Serverless Framework (Into backend folder)**

**Check if installed:**
```bash
serverless --version
```

**If not installed:**
```bash
# IMPORTANT: This command must be executed in backend's folder
cd backend
npm install -g serverless
```

## **Configurations**

### **General**

```sh
# Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>
```

### **Frontend**

```bash
# 1. Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# 2. Install the necessary dependencies.
npm i

# 3. Start the development server with auto-reloading and an instant preview.
npm run dev
```

### **Backend**

```bash
# 1. Navigate to the project's backend directory. 
cd backend

# 2. Install the necessary dependencies for the backend.
npm i

# 3. Configure AWS
aws configure
# Enter: 

# Your Access Key ID
# Your Secret Access Key
# Region: us-east-1
# Output: json
```
The final step is to deploy project's backend to AWS after install specific dependencies to make it possible. [Please, click here to read backend guide](backend/README.md) before you run the command below:
```bash
# 4. Deploy to AWS
serverless deploy
```
## **Frontend technologies**

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## **Bakend technologies**

- AWS Lambda
- API Gateway
- DynamoDB
- Docker
- Serverless Framework
