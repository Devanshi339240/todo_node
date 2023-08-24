const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require("path");
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const PORT = 4000;

/*module.exports = [
    bodyParser.json({ limit: '10mb', extended: false }),
    bodyParser.urlencoded({ extended: false }),
]
 */


app.get("/fetchreminders", (req, res) => {
    const jsoncontent = JSON.stringify(JSON.parse(fs.readFileSync('db.json', 'utf8')));
    console.log("fetching all reminders");
    console.log(jsoncontent);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', Buffer.byteLength(jsoncontent, 'utf8'));
    console.log("used json.stringify");
    res.status(200).json(jsoncontent);
});

app.post('/addreminder', (req, res) => {
    console.log(`body is ${req.body}`);

    var key = 'tasks';
    let newdata = req.body;

    var rawData = fs.readFileSync('db.json', 'utf8');
    var jsonArray= JSON.parse(rawData);
    jsonArray[key].push(newdata);
    console.log(rawData);
    console.log(jsonArray);
    console.log(newdata);

    fs.writeFile('db.json', JSON.stringify(jsonArray), err => {
        // error checking
        if(err) {
            console.log("failed to add new data");
            // res.setHeader('Content-Type', 'application/json; charset: utf-8');
            res.writeHead(400);
            // let failresponse = {"message":"fail"}
            // res.json(JSON.stringify(JSON.parse("")));
        } else {
            console.log("New data added");
            // let successresponse = {"message":"success"}
            // res.setHeader('Content-Type', 'application/json; charset: utf-8');
            res.writeHead(200);
            // res.json(JSON.stringify(JSON.parse("")));
        }
    });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});