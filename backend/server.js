// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const router = require('./routes/product.js');
// const cors = require('cors');


import express from 'express';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import Product from './models/products.js';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/product.js';
dotenv.config();
const app = express();

const port = process.env.PORT || 8000;

//mongoose connection
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("mongoose connected successfully");
})

//middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//routers
app.use(router);

app.listen(port, () => {
    console.log(`server is listening at ${port}`);
})