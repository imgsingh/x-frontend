📘 x_frontend_v2

Welcome to x_frontend_v2! This project is a clone of Twitter, designed to replicate its core features with a user-friendly platform, authentication, protected routes, and a sleek design.

🛠️ Features

User Authentication: Login and Sign Up functionality with protected routes.

Routing: Uses react-router-dom to navigate between pages such as Home, Login, and Sign Up.

Global State Management: Manages shared state using React's Context API.

Responsive Design: Fully responsive user interface for an optimal experience on all devices.

📂 Project Structure

src/
├── assets/                # Images and static resources
├── components/            # Reusable React components
│   ├── Home/              # Home page component
│   ├── Login/             # Login and Signup components
│   └── Utils.js           # Utility functions (like getCookie)
├── App.js                 # Main React component, defines routes and logic
├── index.js               # Entry point for the React application
└── styles/                # CSS stylesheets

🚀 Getting Started

Prerequisites

Ensure you have the following installed:

Node.js (>= 14.x)

npm (>= 6.x) or yarn (>= 1.x)

Installation

Clone the repository:

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

Install dependencies:

npm install
# or
yarn install

Running the Application

To start the development server, run:

npm start
# or
yarn start

This will launch the app in development mode at http://localhost:3000.

📚 Usage

Authentication

Login: Users can log in with a username and password. If a valid authentication token exists, users are redirected to the Home page.

Sign Up: New users can register for access to the platform.

Routes

Home (/home): Protected route accessible only to authenticated users.

Login (/login): Available to users who are not logged in.

Sign Up (/signup): User registration page.

🧰 Available Scripts

In the project directory, you can run:

Start the app:

npm start

Runs the app in development mode. Open http://localhost:3000 to view it in the browser.

Build the app:

npm run build

Builds the app for production in the build folder.

Run tests:

npm test

Launches the test runner in interactive watch mode.

📦 Dependencies

React: Core library for building user interfaces.

React Router: Manages navigation and routing.

Context API: Handles global state management.

✍️ Contributing

Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch for your feature (git checkout -b feature-name).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature-name).

Open a pull request.

🛡️ License

This project is licensed under the MIT License. See the LICENSE file for details.

💬 Contact

For questions or support, feel free to open an issue on the GitHub repository.