import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getAProduct, updateProduct } from '../controllers/productControllers.js';


const router = express.Router();


router.post('/create', createProduct);
router.post('/update/:id', updateProduct);
router.get('/getall', getAllProducts);
router.get('/:id', getAProduct);
router.delete('/delete/:id', deleteProduct);

export default router