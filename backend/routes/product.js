import express from 'express';
const router = express.Router();
import ctrl from '../controllers/product.js';
const { read } = ctrl;

router.get('/', read);

export default router;



