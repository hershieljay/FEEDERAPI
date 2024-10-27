const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');

// Load the service account key JSON file
const serviceAccountPath = './new.json'; // Ensure this filename is correct

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

    console.log('Bearer Token:', token);
}

// Call the function to generate the token
generateBearerToken().catch(console.error);
