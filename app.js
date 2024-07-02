
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Make app.js an async function
(async () => {
    try {
        const db = await require('./startup/db')(); // Wait for the database connection
        console.log('Connected successfully to MongoDB');

        app.get('/paw/api', (req, res) => {
            res.send('Hello World!');
        });

        app.get('/paw/api/hospitals', async (req, res) => {
            try {
                console.log("Received request to /paw/api/hospitals");

                const userLocation = req.query.location;
                console.log("The location is --->", userLocation);

                const obj = await findLocationByPlace(userLocation, db); // Pass db as a parameter
                console.log("user location lat and long is -->", obj);

                const collection = db.collection('vet_hospitals');
                const queryResult = await collection.find({
                    location: {
                        $geoWithin: {
                            $centerSphere: [[obj.longitude, obj.latitude], 1.5 / 6378.1]
                        }
                    }
                }).toArray();

                console.log("Query Result:", queryResult);

                console.log("Sending response to /paw/api/hospitals");
                res.json(queryResult);
            } catch (error) {
                console.error("Error in /paw/api/hospitals:", error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})();

async function findLocationByPlace(placeName, db) {
    try {
        console.log("find location by place --->", placeName);
        const collection = db.collection('localities');

        // Find the location with the provided place name and return only lat and long
        const query = { place: placeName.trim() };
        const projection = { _id: 0, latitude: 1, longitude: 1 };
        const location = await collection.findOne(query, { projection });

        return location; // Return the location instead of sending a response
    } catch (error) {
        console.error('Error finding location by place:', error);
        throw error; // Rethrow the error to be caught by the calling function
    }
}
