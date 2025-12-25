const pool = require("../db/pool");

async function getItemsByCategory(req, res) {
    try {
        const categoryName = req.params.categoryName;
        const [categoriesResult, itemsResult] = await Promise.all([
            pool.query('SELECT DISTINCT category FROM items ORDER BY category ASC'), 
            !categoryName ? pool.query('') :
            categoryName.toLowerCase() === 'all' 
                ? pool.query('SELECT * FROM items')
                : pool.query('SELECT * FROM items WHERE LOWER(category) = LOWER($1)', [categoryName]) 
        ]);
        res.render('index', { categories: categoriesResult.rows, items: itemsResult.rows, currentCategory: categoryName });
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
}

async function addItemPost(req, res) {
    const { name, quantity, price, category } = req.body;
    try {
        await pool.query(
            "INSERT INTO items (name, quantity, price, category) VALUES ($1, $2, $3, $4)",
            [name, quantity, price, category]
        );
        res.redirect(`/category/${category || 'all'}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding item");
    }
}

async function deleteItemPost(req, res) {
    const { itemId, category } = req.body;
    try {
        await pool.query(
            "DELETE FROM items WHERE id = $1", [itemId]
        )
        res.redirect(`/category/${category || 'all'}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting item");
    }
}

module.exports = { getItemsByCategory, addItemPost, deleteItemPost };

