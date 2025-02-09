import express from 'express'
import { PrismaClient } from '@prisma/client';
import { uploadImage, upload } from '../utils/s3Upload.js';


const router = express.Router()
const prisma = new PrismaClient()


router.get('/detail', async (req, res) => {
    try {
        const products = await prisma.restocks.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: '無法取得資料' });
    }
});


router.post('/addstock', upload.single('file'), async (req, res, next) => {
    let imageUrl = null;     

    if (req.file) {
        const response = await uploadImage(req.file)     

        imageUrl = response        
    }

    try {        
        const { product_name, amount, purchase_cost, expire_date, product_source, purchase_order_number } = req.body;

        if (!product_name || !amount || !purchase_cost || !expire_date || !product_source || !purchase_order_number) {
            return res.status(400).json({ error: "請提供完整的商品資訊" });
        }

        const response = await prisma.restocks.create({
            data: {
                product_name,
                amount: Number(amount),
                purchase_cost: Number(purchase_cost),
                expire_date: new Date(expire_date),
                product_source,
                purchase_order_number,
                build_time: new Date(),
                stock_image: imageUrl, 
            }
        });

        res.status(201).json({
            message: "資料建立成功",
            status: 201,
            data: response, 
        });

    } catch (err) {
        console.error(err);
        next(err); 
    }
});


export default router;