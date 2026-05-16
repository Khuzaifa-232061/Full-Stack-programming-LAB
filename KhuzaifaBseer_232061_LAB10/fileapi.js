const express = require('express');
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Ali", age: 20 },
  { id: 2, name: "Ahmed", age: 22 }
];

// READ
app.get('/users', (req, res) => {
  res.json(users);
});

// CREATE
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age
  };
  users.push(newUser);
  res.json(newUser);
});

// UPDATE
app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  let found = false;
  users = users.map(user => {
    if (user.id === id) {
      found = true;
      return { ...user, name: req.body.name, age: req.body.age };
    }
    return user;
  });
  if (!found) {
    return res.status(404).send("User not found");
  }
  res.send("User Updated Successfully");
});

// DELETE
app.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(user => user.id !== id);
  res.send("User Deleted Successfully");
});

// SERVER
app.listen(3000, () => {
  console.log("Running on http://localhost:3000/users");
});
