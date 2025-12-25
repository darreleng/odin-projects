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
        console.log(itemsResult)
        console.log(itemsResult.rows)
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
}

module.exports = { getItemsByCategory };

