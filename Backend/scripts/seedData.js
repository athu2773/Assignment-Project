require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const InterfaceLog = require('../models/InterfaceLog');

const interfaces = [
  { name: 'Payment Gateway', key: 'PAYMENT_API' },
  { name: 'Order System', key: 'ORDER_API' },
  { name: 'Inventory Service', key: 'INVENTORY_API' },
  { name: 'User Authentication', key: 'AUTH_API' },
  { name: 'Notification Service', key: 'NOTIFICATION_API' }
];

const messages = {
  SUCCESS: [
    'Request processed successfully',
    'Operation completed',
    'Data synchronized',
    'Transaction completed',
    'Service responded normally'
  ],
  FAILED: [
    'Connection timeout',
    'Invalid response format',
    'Service unavailable',
    'Authentication failed',
    'Internal server error'
  ],
  PENDING: [
    'Request queued',
    'Awaiting response',
    'Processing',
    'In progress',
    'Scheduled'
  ]
};

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateTimestamp(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return new Date(date.getTime() + Math.random() * 24 * 60 * 60 * 1000);
}

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await InterfaceLog.deleteMany({});
    console.log('Cleared existing logs');

    const logs = [];
    // Generate 7 days of logs
    for (let day = 7; day >= 0; day--) {
      // Generate 20-50 logs per day
      const logsPerDay = Math.floor(Math.random() * 31) + 20;
      
      for (let i = 0; i < logsPerDay; i++) {
        const interface = getRandomElement(interfaces);
        const status = getRandomElement(['SUCCESS', 'FAILED', 'PENDING']);
        const severity = getRandomElement(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
        
        logs.push({
          interfaceName: interface.name,
          integrationKey: interface.key,
          status,
          message: getRandomElement(messages[status]),
          severity,
          timestamp: generateTimestamp(day)
        });
      }
    }

    // Insert all logs
    await InterfaceLog.insertMany(logs);
    console.log(`Successfully seeded ${logs.length} logs`);

  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedData();
