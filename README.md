# Cromwell-tech-test

This project consists of a React frontend and a Node.js/Express backend.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Cromwell-tech-test
    ```
    Replace `<repository-url>` with the actual URL of your Git repository.

## Backend Setup

The backend is a Node.js application using Express and PostgreSQL.

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    For the purpose of this test the .env file is apart of the repository

4.  **Run the backend server:**
    ```bash
    npm start
    ```
    The backend server should now be running (typically on `http://localhost:3000` for the purpose of this test port has been set to 3000).

## Frontend Setup

The frontend is a React application built with Vite.

1.  **Navigate to the frontend directory (from the project root):**

    ```bash
    cd ../frontend
    # Or, if you are in the project root:
    # cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the frontend development server:**

    ```bash
    npm run dev
    ```

    This will start the Vite development server, usually on `http://localhost:5173` (the default Vite port, but it might vary). Open this URL in your web browser.

    The API endpoint is configured within the frontend code (API service file).

4. **Running unit tests:**
    ```bash
    npm test
    ```
    
    This will run the test for `email validation` and `password validation`.
## Notes

- Ensure the backend is running before starting the frontend if the frontend makes API calls on load.
- The frontend application likely expects the backend to be running on a specific port (`http://localhost:3000`). 

