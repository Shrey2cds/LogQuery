Log Query Application
This application allows ingestion of log data and provides a query interface to retrieve logs based on specified parameters.

Features
Log Ingestion: POST log data to /ingest endpoint.
Query Interface: GET logs using specified parameters at /query.
Installation
Clone the repository:

bash
Copy code
git clone 
Install dependencies:

bash
Copy code
cd log-query-app
npm install
Configure MongoDB Atlas:

Set up a MongoDB Atlas cluster.
mongodb+srv://shreya:Shreya12%23@clusterlq.7tr4gdb.mongodb.net/ClusterLQ?retryWrites=true&w=majority
Run the application:

bash
Copy code
node app.js
Usage
Ingesting Logs: POST log data to http://localhost:3000/ingest.
Querying Logs: GET logs by sending requests to http://localhost:3000/query with specific query parameters.
Endpoints
Log Ingestion:

Endpoint: /ingest
Method: POST
Query Interface:

Endpoint: /query
Method: GET
For more details on usage, refer to the application's Usage section.

Dependencies
Node.js
Express.js
MongoDB Node.js Driver
