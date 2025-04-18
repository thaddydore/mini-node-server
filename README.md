# Todo Server

A simple Express server for managing todos with file-based storage for learning purposes.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

The server will run on http://localhost:3000 by default when run locally. However, you can change the default port on the server.js file. If you can in for a real quick test, use https://mini-node-server.onrender.com as the base url.

## API Endpoints

### Create a Todo

-  **POST** `/todos`
-  Body: `{ "name": "Todo name" }`
-  Returns: Created todo object

### Get All Todos

-  **GET** `/todos`
-  Returns: Array of all todos

### Get a Single Todo

-  **GET** `/todos/:id`
-  Returns: Single todo object

### Update a Todo

-  **PUT** `/todos/:id`
-  Body: `{ "name": "Updated name", "completed": true }`
-  Returns: Updated todo object

### Delete a Todo

-  **DELETE** `/todos/:id`
-  Returns: 204 No Content

## Todo Object Structure

```javascript
{
    id: number,        // Timestamp from Date.now()
    name: string,      // Todo name
    completed: boolean,// Completion status
    date: Date        // Creation date
}
```
