const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
const bcrypt = require("bcrypt");
const fs = require('fs');
const PDFDocument = require('pdfkit');


const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));

app.set("view engine", "hbs");
app.set("views", templatePath);

hbs.registerHelper('formatDate', function(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-GB', options);
});

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        };

        await collection.insertMany([data]);
        res.render("login");
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Error during signup");
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.name, email: req.body.email });

        if (user && await bcrypt.compare(req.body.password, user.password)) {
            res.render("dashboard", { username: req.body.name });
        } else {
            res.send("Wrong password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.send("Wrong details");
    }
});

app.get("/dashboard", (req, res) => {
    const username = req.query.username;
    res.render("dashboard", { username });
});


//result save (code portion is written in Trailresults.js)
app.post("/save-resultTrailMaking", async (req, res) => {
    const { username, partATiming, partBTiming } = req.body;

    try {
        const user = await collection.findOneAndUpdate(
            { name: username },
            { $push: { results: { partATiming, partBTiming, date: new Date() } } },
            { new: true }
        );

        if (!user) {
            console.log(`User '${username}' not found in database`);
            return res.status(404).send("User not found");
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Error saving result:", error);
        res.status(500).send("Error saving result");
    }
});

// app.get("/results", async (req, res) => {
//     const username = req.query.username;

//     console.log("Received username:", username);

//     if (!username) {
//         return res.status(400).send("Username query parameter is missing");
//     }

//     try {
//         const user = await collection.findOne({ name: username });

//         if (!user) {
//             console.log(`User '${username}' not found in database`);
//             return res.status(404).send("User not found");
//         }

//              // Convert timings to seconds 
//              const resultsInSeconds = user.results.map(result => ({
//                 date: result.date,
//                 partATiming: convertTimeToSeconds(result.partATiming),
//                 partBTiming: convertTimeToSeconds(result.partBTiming)
//             }))

//         console.log("User results: ", user.results);

//         res.render("results", { results: user.results, username: username });
//     } catch (error) {
//         console.error("Error retrieving results:", error);
//         res.status(500).send("Error retrieving results");
//     }

    
// });

// function convertTimeToSeconds(time) {
//     const [minutes, seconds] = time.split(':').map(Number);
//     if (isNaN(minutes) || isNaN(seconds)) {
//         console.error("Invalid time format:", time);
//         return 0; // Default to 0 seconds on invalid format
//     }
//     return minutes * 60 + seconds;
// }

app.get("/results", async (req, res) => {
    const username = req.query.username;

    if (!username) {
        console.error("Username query parameter is missing");
        return res.status(400).send("Username query parameter is missing");
    }

    try {
        const user = await collection.findOne({ name: username });

        if (!user) {
            console.error(`User '${username}' not found in database`);
            return res.status(404).send("User not found");
        }

        // Log user results to debug
        console.log("User results: ", user.results);

        // Convert timings to seconds
        const resultsInSeconds = user.results.map(result => {
            console.log("Converting times for result: ", result);
            return {
                date: result.date,
                partATiming: convertTimeToSeconds(result.partATiming),
                partBTiming: convertTimeToSeconds(result.partBTiming)
            };
        });

        res.render("results", { results: resultsInSeconds, username: username });
    } catch (error) {
        console.error("Error retrieving results:", error);
        res.status(500).send("Error retrieving results");
    }
});

function convertTimeToSeconds(time) {
    if (!time) {
        console.error("Invalid or missing time value:", time);
        return 0; // Default to 0 seconds on invalid or missing time
    }

    const [minutes, seconds] = time.split(':').map(Number);

    if (isNaN(minutes) || isNaN(seconds)) {
        console.error("Invalid time format:", time);
        return 0; // Default to 0 seconds on invalid format
    }

    return minutes * 60 + seconds;
}



//download
app.get('/download-results-pdf', async (req, res) => {
    const username = req.query.username;

    try {
        const user = await collection.findOne({ name: username });

        if (!user) {
            console.log(`User '${username}' not found in database`);
            return res.status(404).send("User not found");
        }

        const doc = new PDFDocument();
        const filename = `${username}_results.pdf`;
        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        doc.pipe(res);

        doc.fontSize(20).text('Trail Making Test Results', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Username: ${username}`, { align: 'left' });
        doc.moveDown();

        doc.fontSize(12).text('Date', { continued: true }).text('Part A Time', { continued: true, align: 'center' }).text('Part B Time', { align: 'right' });
        doc.moveDown();

        user.results.forEach(result => {
            const partATimeInSeconds = convertTimeToSeconds(result.partATiming);
            const partBTimeInSeconds = convertTimeToSeconds(result.partBTiming);
            
            doc.fontSize(12)
                .text(new Date(result.date).toLocaleDateString('en-GB'), { continued: true })
                .text(partATimeInSeconds + ' seconds', { continued: true, align: 'center' })
                .text(partBTimeInSeconds + ' seconds', { align: 'right' });
            doc.moveDown();
        });

        doc.end();
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).send("Error generating PDF");
    }
});

function convertTimeToSeconds(time) {
    if (!time) {
        console.error("Invalid or missing time value:", time);
        return 0; // Default to 0 seconds on invalid or missing time
    }

    const [minutes, seconds] = time.split(':').map(Number);

    if (isNaN(minutes) || isNaN(seconds)) {
        console.error("Invalid time format:", time);
        return 0; // Default to 0 seconds on invalid format
    }

    return minutes * 60 + seconds;
}




app.get("/logout", (req, res) => {
    res.redirect("/");
});




app.use('/trailmakingtest', express.static(path.join(__dirname, '../TrailMakingTest')));

app.get('/trailmakingtest', (req, res) => {
    res.sendFile(path.join(__dirname, '../TrailMakingTest/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
