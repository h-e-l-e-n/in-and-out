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

    // 如果有上傳檔案，則處理 S3 上傳
    if (req.file) {
        imageUrl = uploadImage(req.file)
    }

    try {
        const { product_name, amount, purchase_cost, expire_date, product_source, purchase_order_number } = req.body;

        // 檢查是否缺少必要欄位
        if (!product_name || !amount || !purchase_cost || !expire_date || !product_source || !purchase_order_number) {
            return res.status(400).json({ error: "請提供完整的商品資訊" });
        }

        // 建立資料
        const response = await prisma.restocks.create({
            data: {
                product_name,
                amount: Number(amount),
                purchase_cost: Number(purchase_cost),
                expire_date: new Date(expire_date),
                product_source,
                purchase_order_number,
                build_time: new Date(),
                image_url: imageUrl, 
            }
        });

        res.status(201).json({
            message: "資料建立成功",
            status: 201,
            data: response, // 回傳 Prisma 建立的資料
        });

    } catch (err) {
        console.error(err);
        next(err); // 傳遞錯誤給 Express 的錯誤處理中介軟體
    }
});


export default router;