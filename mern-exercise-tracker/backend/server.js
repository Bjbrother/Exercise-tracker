const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// for data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// // Db Connection:

mongoose.connect('mongodb://localhost/exercise', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

mongoose.connection.on('connected', () => {
	console.log('Mongoose has been connected');
});

app.use(morgan('tiny'));

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, console.log(`Server is running at ${port}`));
