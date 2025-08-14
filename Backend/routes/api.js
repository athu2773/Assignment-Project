const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/logController');
const { getSummary } = require('../controllers/summaryController');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Interface Monitoring API',
      version: '1.0.0',
      description: 'API documentation for Interface Monitoring System'
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://your-api-domain.com' 
          : `http://localhost:${process.env.PORT || 5000}`
      }
    ]
  },
  apis: ['./routes/*.js', './models/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage()
  });
});

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get interface logs
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 */
router.get('/logs', getLogs);

/**
 * @swagger
 * /api/summary:
 *   get:
 *     summary: Get interface monitoring summary
 *     parameters:
 *       - in: query
 *         name: range
 *         schema:
 *           type: string
 *         description: Time range (1h, 24h, week, month)
 */
router.get('/summary', getSummary);

// Swagger UI
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;