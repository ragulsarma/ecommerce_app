require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./src/config/database');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const userRoutes = require('./src/routes/user.routes');
const productRoutes = require('./src/routes/product.routes');
const reviewRoutes = require('./src/routes/review.routes');
const wishlistRoutes = require('./src/routes/wishlist.routes');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Load and setup Swagger
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;

// Sync DB and Start Server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger API Docs available at http://localhost:${PORT}/api-docs`);
    });
}).catch(err => console.log("Database sync error:", err));
