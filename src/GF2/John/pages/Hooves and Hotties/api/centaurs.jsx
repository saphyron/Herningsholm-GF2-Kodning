const fs = require('fs');
const path = require('path');

const BASE_URL = "http://localhost:3000/api/centaurs";

export async function fetchCentaurs() {
    try {
        const response = await fetch(BASE_URL);
        if (response.ok) {
            return await response.json();
        }
        throw new Error("API returned error");
    } catch (error) {
        console.log("API failed, falling back to local data:", error);

        const picsDir = path.join(__dirname, '../../data/pics');
        const picFiles = fs.readdirSync(picsDir)
            .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
            .map(file => path.join(picsDir, file));

        const centaurJsonPath = path.join(__dirname, '../../data/centaur.json');
        const centaurData = JSON.parse(fs.readFileSync(centaurJsonPath, 'utf8'));

        return { pictures: picFiles, centaurData };
    }
}