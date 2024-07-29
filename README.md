#todo-list-application
This is a simple Todo List application built with Node.js and Express.js. It provides a RESTful API for managing a list of todo items, including features such as adding, updating, deleting, and searching todos, as well as filtering them by their completion status and the date of the latest update. The todos are stored in a JSON file on the filesystem.

Table of Contents

#features
#installation
#API Endpoints

#features
Fetch all todos with optional search and filter parameters.
Add a new todo item.
Update an existing todo item.
Delete a todo item.
Mark a todo item as completed.
Search todos by title.
Filter todos by their completion status.
Filter todos by the date of the latest update.

#installation
Clone the repository:

sh
Copy code
git clone https://github.com/your-username/todo-list-app.git
cd todo-list-app
Install dependencies:

sh
Copy code
npm install
Run the application:

sh
Copy code
npm start
The server will start running on http://localhost:3000.

#API Endpoints
Fetch Todos
URL: /api/todos
Method: GET
Query Parameters:
search (optional): Search todos by title.
sortBy (optional): Sort todos by latest updated date.
status (optional): Filter todos by done or not done status.
Description: Retrieve the list of todos with optional search and filters.
Example:
sh
Copy code
GET http://localhost:3000/api/todos?search=sample&sortBy=latest&status=done
Add Todo
URL: /api/todos
Method: POST
Request Body:
title (required): The title of the todo item.
Description: Add a new todo item to the list.
Example:
sh
Copy code
POST http://localhost:3000/api/todos
Content-Type: application/json

{
  "title": "New Todo"
}
Update Todo
URL: /api/todos/:id
Method: PUT
Request Body:
Any fields to update (e.g., title).
Description: Update an existing todo item.
Example:
sh
Copy code
PUT http://localhost:3000/api/todos/1
Content-Type: application/json

{
  "title": "Updated Todo"
}
Delete Todo
URL: /api/todos/:id
Method: DELETE
Description: Remove a todo item from the list.
Example:
sh
Copy code
DELETE http://localhost:3000/api/todos/1
Mark as Done
URL: /api/todos/:id/done
Method: PATCH
Description: Mark a todo item as completed.
Example:
sh
Copy code
PATCH http://localhost:3000/api/todos/1/done
Search Todos
URL: /api/todos
Method: GET
Query Parameters:
search (optional): Search todos by title.
Description: Search todos by title.
Example:
sh
Copy code
GET http://localhost:3000/api/todos?search=sample
Filter by Status
URL: /api/todos
Method: GET
Query Parameters:
status (optional): Filter todos by done or not done status.
Description: Filter todos by their completion status.
Example:
sh
Copy code
GET http://localhost:3000/api/todos?status=done
Filter by Latest Update
URL: /api/todos
Method: GET
Query Parameters:
sortBy (optional): Sort todos by latest updated date.
Description: Filter todos by the date of the latest update.
Example:
sh
Copy code
GET http://localhost:3000/api/todos?sortBy=latest
File Structure
go
Copy code
todo-list-app/
├── routes/
│   └── todos.js
├── todos.json
├── counter.json
├── index.js
├── package.json
└── README.md
routes/todos.js: Contains the route handlers for the todos API.
todos.json: Stores the todo items in JSON format.
index.js: The main entry point of the application.
package.json: Contains the project's dependencies and scripts.
