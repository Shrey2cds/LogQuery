const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const uri = "mongodb+srv://shreya:Shreya12%23@clusterlq.7tr4gdb.mongodb.net/ClusterLQ?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let logsCollection;

// Connect to MongoDB Atlas
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        const database = client.db('ClusterLQ'); // Replace 'logsDB' with your database name
        logsCollection = database.collection('listingsAndReviews'); // Replace 'logs' with your collection name
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas', err);
    }
}

connectToMongoDB();

// Log Ingestor - Endpoint for log ingestion
app.post('/ingest', async (req, res) => {
    try {
        const logData = req.body;
        await logsCollection.insertOne(logData);
        res.status(200).send('Log data ingested successfully');
    } catch (err) {
        res.status(500).send('Error ingesting log data');
    }
});
app.post('/submitLog', async (req, res) => {
    try {
        const logData = {
            "level": "error",
            "message": "Failed to connect to database",
            "resourceId": "server-123",
            "timestamp": "2023-11-19T10:30:00Z",
            "traceId": "abc-xyz-123",
            "spanId": "span-456",
            "commit": "5e5342f",
            "metadata": {
                "parentResourceId": "server-098"
            }
        };

        // Simulate sending log data to the log ingestion endpoint (/ingest)
        await logsCollection.insertOne(logData);
        res.status(200).send('Log submitted successfully');
    } catch (err) {
        res.status(500).send('Error submitting log');
    }
});

// Query Interface - Endpoint for querying logs
app.get('/query', async (req, res) => {
    try {
        const { level, message, resourceId, timestamp, traceId, spanId, commit, parentResourceId } = req.query;
        const query = {
            level,
            message,
            resourceId,
            timestamp,
            traceId,
            spanId,
            commit,
            'metadata.parentResourceId': parentResourceId
        };
        const filteredLogs = await logsCollection.find(query).toArray();
        res.status(200).json(filteredLogs);
    } catch (err) {
        res.status(500).send('Error querying logs');
    }
});
app.get('/', (req, res) => {
    res.send('Welcome to the log ingestor and query interface!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
