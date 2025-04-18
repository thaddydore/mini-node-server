const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;
const TODOS_DIR = path.join(__dirname, 'todos');

// Create todos directory if it doesn't exist
if (!fs.existsSync(TODOS_DIR)) {
	fs.mkdirSync(TODOS_DIR);
}

app.use(cors());
app.use(bodyParser.json());

// Helper function to get todo file path
const getTodoPath = id => path.join(TODOS_DIR, `${id}.json`);

// Create a new todo
app.post('/todos', (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({ error: 'Name is required' });
	}

	const todo = {
		id: Date.now(),
		name,
		completed: false,
		date: new Date(),
	};

	fs.writeFileSync(getTodoPath(todo.id), JSON.stringify(todo));
	res.status(201).json(todo);
});

// Get all todos
app.get('/todos', (req, res) => {
	const files = fs.readdirSync(TODOS_DIR);
	const todos = files.map(file => {
		const data = fs.readFileSync(path.join(TODOS_DIR, file), 'utf8');
		return JSON.parse(data);
	});
	res.json(todos);
});

// Get a single todo
app.get('/todos/:id', (req, res) => {
	const todoPath = getTodoPath(req.params.id);
	if (!fs.existsSync(todoPath)) {
		return res.status(404).json({ error: 'Todo not found' });
	}
	const todo = JSON.parse(fs.readFileSync(todoPath, 'utf8'));
	res.json(todo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
	const todoPath = getTodoPath(req.params.id);
	if (!fs.existsSync(todoPath)) {
		return res.status(404).json({ error: 'Todo not found' });
	}

	const existingTodo = JSON.parse(fs.readFileSync(todoPath, 'utf8'));
	const updatedTodo = {
		...existingTodo,
		...req.body,
		id: existingTodo.id, // Prevent ID modification
		date: existingTodo.date, // Keep original date
	};

	fs.writeFileSync(todoPath, JSON.stringify(updatedTodo));
	res.json(updatedTodo);
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
	const todoPath = getTodoPath(req.params.id);
	if (!fs.existsSync(todoPath)) {
		return res.status(404).json({ error: 'Todo not found' });
	}

	fs.unlinkSync(todoPath);
	res.status(204).send();
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
