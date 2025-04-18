# Todo Server

A simple Express server for managing todos with file-based storage.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

The server will run on http://localhost:3000

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
# mini-node-server
