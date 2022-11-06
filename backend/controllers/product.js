
import express from 'express';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import Product from '../models/products.js';

const ctrl = {
    //Read data;
    read: async (req, res) => {

        try {
            let products;
            let ans;
            const { filter } = req.query;
            products = await Product.find({ $and: [{ "productObj.subcategory": "mobile" }, { "productObj.title": { $regex: /lg/i } }] });
            if (filter == "LG_MOBILE") {
                products = await Product.find({ $and: [{ "productObj.subcategory": "mobile" }, { "productObj.title": { $regex: /lg/i } }] });
            } else if (filter == "ALL_SUBCATEGORY_WITH_POPULARITY_LESS_THAN_500") {
                products = await Product.find({ "productObj.popularity": { $lte: 500 } });
            } else if (filter == "TOP_5_BASED_ON_POPULARITY") {
                products = await Product.aggregate([{ $sort: { "productObj.popularity": -1 } }, { $limit: 5 }]);
            } else if (filter == "MOBILE_PRICE_RANGE_FROM_$2000_TO_$9000") {
                products = await Product.find(
                    {
                        $and: [
                            { "productObj.price": { $lte: 9500 } },
                            { "productObj.price": { $gte: 2000 } },
                            {
                                $or:
                                    [{ "productObj.title": { $regex: /nokia/i } }, { "productObj.title": { $regex: /xolo/i } }, { "productObj.title": { $regex: /zen/i } }]
                            }
                        ]
                    }
                );
            } else if (filter == "TOTAL") {
                const tablet = await Product.find({ "productObj.subcategory": "tablet" }).count();
                const mobile = await Product.find({ "productObj.subcategory": "mobile" }).count();
                ans = [{
                    total: tablet + mobile,
                    tablet: tablet,
                    mobile: mobile,
                }]
            } else {
                products = await Product.find();
            }
            let result = ans ? ans : products;
            res.status(200).json({ message: 'success', result });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

}

export default ctrl;