const express = require("express");
const app = express();
const fetch = require("node-fetch");
const path = require("path")

app.use((req, res) => {
    console.log(req.url)
    let url = new URL(req.url)
    fetch("https://pvcmapper.my.to" + url.pathname.replace("/api", "") + url.hash + url.search ).then((result) => {
        res.setHeader("Content-Type", result.headers.get("Content-Type"))
        result.body.pipe(res);
    });
})

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;