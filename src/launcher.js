import express from 'express'
import render from './serverrender'
import child from 'child_process'

const app = express()
const port = 3000

app.get('/rwc-launcher/', (req, res) => {
    var url = req.originalUrl;
    var teamstring = url.split("?team=")[1];
    console.log(teamstring);
    child('gulp');

    res.send(`request was ${req}`);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

console.log('launcher')