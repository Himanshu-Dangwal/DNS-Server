const express = require("express");
const app = express();
const cors = require("cors")
const PORT = 8000;

app.use(express.json());
app.use(cors("*"))

// DNS table
const dnsTable = {
    "server1": "http://localhost:8080"
};

app.get("/", (req, res) => {
    res.status(200).json({ message: "DNS server is up and running" });
});

// Helper function
const handleRedirect = (serverName) => {
    return dnsTable[serverName] || null;
};

app.post("/", (req, res) => {
    const { server } = req.body;

    if (!server) {
        return res.status(400).json({ error: "Missing 'server' field in request body" });
    }

    const url = handleRedirect(server);

    if (!url) {
        return res.status(404).json({ error: "Server not found in DNS table" });
    }

    return res.redirect(url);
});

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
});
