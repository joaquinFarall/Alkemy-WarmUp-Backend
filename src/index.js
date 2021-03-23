const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
require('./database');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/posts', require('./routes/posts'));

// Starting server
const port = app.get('port');

app.listen(port, () => {
    console.log('Server started at port ' + port);
});