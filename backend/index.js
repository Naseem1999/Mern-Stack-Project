const express=require('express');
const products=require('./db');
var cors = require('cors')

const app=express();
app.use(cors())


app.use('/api/auth/',require('./routes/auth'));
app.use('/api/notes/',require('./routes/notes.js'));
app.listen(5000);