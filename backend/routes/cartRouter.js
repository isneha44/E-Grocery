import express from 'express';
import { cartCreate, cartDelete, getAllCart, getAllOrder, payment, paymentAll } from '../controllers/cartControllers.js';


const router = express.Router();


router.post('/create', cartCreate );
router.delete('/:id', cartDelete );
router.post('/payment/:userId', paymentAll );
router.post('/get-all/:userId', getAllCart );
router.post('/order/get-all/:userId', getAllOrder );



export default router