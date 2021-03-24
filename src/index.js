const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/posts', require('./routes/posts'));

// DB sync
const db = require('./models/index');

db.sequelize.sync()
    .then(res => console.log('DB sync'))
    .catch(err => console.log(err));

// Starting server
const port = app.get('port');

app.listen(port, () => {
    console.log('Server started at port ' + port);
});