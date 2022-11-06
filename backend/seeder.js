// const express = require('express');
// const mongoose = require('mongoose');
// const Product = require('./models/products.js')
// const fetch = require('node-fetch');
import express from 'express';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import Product from './models/products.js';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.DB)
    .then(() => console.log('mongoodb connected successfullly'))
    .catch(err => console.log(err));

const url = "https://mindler-dashboard.s3.us-east-2.amazonaws.com/products.json";
const insertData = async () => {
    try {
        const productList = [];
        const result = await fetch(url);
        const data = await result.json();
        const products = data.products;
        for (const key in products) {
            products[key].popularity = parseInt(products[key].popularity);
            products[key].price = parseInt(products[key].price);
            products[key].id = parseInt(products[key].id);
            const obj = {
                id: key,
                productObj: products[key],
            }
            productList.push(obj);
        }
        await Product.deleteMany();
        await Product.insertMany(productList);
        console.log("success");
    } catch (err) {
        console.log(err);
    }
}
console.log('seedre');

insertData();
