const express = require("express");
const app = express();
const fetch = require("node-fetch");
const path = require("path")

app.use((req, res) => {
    fetch("https://pvcmapper.my.to?" + req.url.split("?=")[1] ).then(async (result) => {
        res.setHeader("Content-Type", result.headers.get("Content-Type"))
        if(result.headers.get("Content-Type") == "text/html" || result.headers.get("Content-Type") == "text/css" || result.headers.get("Content-Type") == "application/javascript") {
            let r = await result.text()
            r.replace(/"\//gm, "/api?=")
            res.send(r)
        } else {
            result.body.pipe(res)
        }
    });
})

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;