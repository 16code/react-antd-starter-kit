const express = require('express');
const path = require('path');
const app = express();
// gzip
app.use(express.static(`${__dirname}/dist`));
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/dist/index.html`));
});
app.listen(8181, () => {
    console.log('App listening on port 8080!');
});
module.exports = app;