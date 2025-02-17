# Zoom Classroom App

This application simplifies scheduling and managing Zoom meetings, especially for educational purposes. It provides a user-friendly interface for creating, viewing, and joining scheduled Zoom sessions.

## Features

* User Authentication: Secure user registration and login.
* Meeting Scheduling: Easily schedule Zoom meetings with details like date, time, topic, and duration.
* Meeting Listing: View a list of upcoming and past scheduled meetings.
* Meeting Joining: Join scheduled Zoom meetings directly through the app.

## Screenshots

* **Signup:** ![Signup](https://github.com/San126/zoom-classroom-app/assets/55818344/3bba87ca-9a86-4638-a376-e7cf868cb20c)
* **Alert:** ![Alert](https://github.com/San126/zoom-classroom-app/assets/55818344/9d7b0116-6527-4ca2-a85d-cafdab38659d)
* **Login:** ![Login](https://github.com/San126/zoom-classroom-app/assets/55818344/b3367c38-edc7-4167-a39c-c8752840eae6)
* **List Page:** ![List Page](https://github.com/user-attachments/assets/4581fd0e-1dc5-4b78-bdc1-0c753ff1a9d9)
* **Schedule Modal:** ![Schedule Modal](https://github.com/user-attachments/assets/0ee3ec8b-4ba2-4868-a69f-2f7275680631)

## Installation and Setup

### Backend (Node.js/Express)

1. **Prerequisites:**
    * Node.js (v14.x or higher)
    * npm (v6.x or higher) or yarn (v1.22.x or higher)
    * MongoDB (v4.x or higher)
2. **Clone the repository:** `git clone https://github.com/your-username/zoom-classroom-app.git`

3. **Navigate to the backend directory:** `cd backend`
4. **Install dependencies:** `npm install` (or `yarn install`)
5. **Set up MongoDB:**
    * Ensure MongoDB is installed and running on your local machine.
    * Create a database for the application.
    * Update the `DATABASE_URL` in the `.env` file with your MongoDB connection string (e.g., `mongodb://localhost:27017/your-database-name`).
6. **Set up environment variables:** Create a `.env` file in the `backend` directory and configure the following:
    * `PORT`:  The port the backend server will run on (e.g., 5000).
    * `ZOOM_API_KEY`: Your Zoom API key.
    * `ZOOM_API_SECRET`: Your Zoom API secret.
    * `DATABASE_URL`:  The connection string for your database.
7. **Run the backend server:** `npm start` (or `yarn start`)

### Frontend (React)

1. **Prerequisites:**
    * Node.js (v14.x or higher) — Ensure consistent Node.js version between frontend and backend.
    * npm (v6.x or higher) or yarn (v1.22.x or higher)
2. **Navigate to the frontend directory:** `cd frontend`
3. **Install dependencies:** `npm install` (or `yarn install`)
4. **Configure environment variables:** Create a `.env` file in the `frontend` directory:
    * `REACT_APP_API_URL`: The URL of your backend server (e.g., `http://localhost:5000`).
5. **Start the development server:** `npm start` (or `yarn start`)

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## License
