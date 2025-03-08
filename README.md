# Notes API

A simple and scalable RESTful API for a note-taking application built with Express.js, TypeScript, and MongoDB.

## Features

- Built with **Node.js**, **Express.js**, and **TypeScript** for strong type safety.
- Uses **MongoDB with Mongoose** for data persistence.
- Implements **custom error handling** for better debugging.
- Structured following **MVC (Model-View-Controller)** principles.
- API endpoints for **creating, retrieving, updating, and deleting notes**.
- Environment configuration via `.env` file. Left the variable for testing.

## Project Structure

- **controllers/**: Handles request-response logic, ensuring separation of concerns.
- **services/**: Contains business logic and interacts with the database for CRUD operations.
- **schemas/**: Defines Mongoose schemas and TypeScript types to enforce structure and validation.
- **middlewares/**:
  - **Error Handling Middleware**: Captures errors across the application and returns meaningful responses.
  - **Custom Error Class (`NoteAppError`)**: Extends JavaScript’s built-in `Error` object, enabling structured error handling with HTTP status codes and messages.
- **routes/**: Defines API endpoints and maps them to corresponding controllers.
- **db.ts**: Manages MongoDB connection.
- **server.ts**: Entry point for the application, responsible for initializing the Express server and connecting to the database.

## API Endpoints

| Method | Endpoint        | Description |
|--------|----------------|-------------|
| GET    | `/api/notes`       | Fetch all notes |
| GET    | `/api/notes/:id`   | Fetch a note by ID |
| POST   | `/api/notes`       | Create a new note |
| PUT    | `/api/notes/:id`   | Update a note by ID |
| DELETE | `/api/notes/:id`   | Delete a note by ID |

## Setup & Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Novice000/intro-to-express.git
   cd intro-to-express
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables (`.env` file):

   ```sh
   PORT=8000
   MONGO_URI=<your_mongodb_connection_string>
   ```

4. Start the server:

   ```sh
   npm start
   ```

## Error Handling

- **Custom `NoteAppError` Class**: Defines application-specific errors with custom messages and HTTP status codes.
- **Centralized Middleware**: Ensures all errors are processed and returned in a consistent format.
- **Validations**: Prevents invalid operations like creating notes without required fields or updating nonexistent records.

## Notable Decisions

- **Separation of Concerns**: Keeps business logic in services and controllers dedicated to handling HTTP requests.
- **Type Safety**: TypeScript enforces structured data handling.
- **Modular Architecture**: Improves scalability and maintainability.
