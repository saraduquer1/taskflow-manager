# **TaskFlow- Gestor de Tareas**

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

### **3. Serverless Framework**

**Check if installed:**
```bash
serverless --version
```

**If not installed:**
```bash
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
- Serverless Framework