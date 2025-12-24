const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get("/", getUsernames);
app.get('/new', (req, res) => res.render('new'));
app.post('/new', createUsernamePost);
app.get('/search', searchUsername);

const db = require("./db/queries");

async function getUsernames(req, res) {
  const usernames = await db.getAllUsernames();
  console.log("Usernames: ", usernames);
  res.send("Usernames: " + usernames.map(user => user.username).join(", "));
}

async function createUsernameGet(req, res) {
  // render the form
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

async function searchUsername(req, res) {
    try {
        const searchTerms = req.query.username;
        // If the user hasn't searched for anything yet, just show the blank page
        if (!searchTerms) {
            return res.render("search", { user: null, searched: false });
        }

        const user = await db.getUsername(searchTerms);

        // Pass 'user' (the object) and a flag to tell the template a search happened
        res.render("search", { user: user, searched: true });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});