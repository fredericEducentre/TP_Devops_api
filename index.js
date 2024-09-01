const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3001;

app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
});

pool.query('CREATE TABLE IF NOT EXISTS users(id MEDIUMINT NOT NULL AUTO_INCREMENT,name VARCHAR(255), email VARCHAR(255), PRIMARY KEY(id));', (err, results) => {
    if (err) {
        console.error('Error creating users table:', err);
    }
})

// Endpoint to get all users
app.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
        console.log('Get all users');
    });
});

// Endpoint to get a user by ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    pool.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(results[0]);
    });
});

// Endpoint to create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, name, email });
        console.log(`Create user : ${name} ${email}`)
    });
});

// Endpoint to update a user by ID
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: userId, name, email });
    });
});

// Endpoint to delete a user by ID
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    pool.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
        console.log(`Delete user`)
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
