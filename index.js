const express = require('express');
const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');

// Load the service account key JSON file
const serviceAccountPath = './news.json'; // Ensure this filename is correct

// Create an Express application
const app = express();
const PORT = 3000; // You can choose any available port

// Function to generate a bearer token
async function generateBearerToken() {
    // Read the service account key JSON file
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

    // Create a GoogleAuth instance
    const auth = new GoogleAuth({
        credentials: serviceAccount,
        scopes: 'https://www.googleapis.com/auth/firebase.messaging',
    });

    // Obtain the client and generate the token
    const client = await auth.getClient();
    const token = await client.getAccessToken();

    return token; // Return the token instead of logging it
}

// Define a route to respond with the bearer token
app.get('/generate-token', async (req, res) => {
    try {
        const token = await generateBearerToken();
        res.json({ bearerToken: token }); // Send the token in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate bearer token.' });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
