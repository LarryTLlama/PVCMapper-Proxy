const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.use((req, res) => {
    fetch("https://pvcmapper.my.to" + req.url).then(async (result) => {
        res.setHeader("Content-Type", result.headers.get("Content-Type"))
        /*console.log(typeof result.headers.get("Content-Type"))
        if(result.headers.get("Content-Type").includes("text/html") || result.headers.get("Content-Type").includes("text/css") || result.headers.get("Content-Type").includes("application/javascript")) {
            console.log("Acceptable to text replace")
            let r = await result.text()
            res.send(r.replace(/".\//gm, "\"/api?url="))
        } else {
            console.log("Standard - Do not replace")
            
        }*/
        result.body.pipe(res)
    });
})

module.exports = app;