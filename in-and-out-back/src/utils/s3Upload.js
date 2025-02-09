import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'; 
import 'dotenv/config'
import multer from 'multer';


const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    S3_BUCKET_REGION,
    BUCKET_NAME,
} = process.env;

// 建立新的 S3 用戶端實例，設定區域和認證資訊
const s3Client = new S3Client({
    region: S3_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
});

// 使用 multer 設定上傳儲存和檔案過濾規則
export const upload = multer({
  storage: multer.memoryStorage(), // 使用記憶體儲存，檔案將保存在 RAM 中
    fileFilter: function (req, file, cb) {
    // 驗證檔案類型
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only jpg and png formats are allowed!'), false);
    }
    cb(null, true);
    },
});

// 建立並發送 PutObjectCommand
// PutObjectCommand 用於將檔案上傳到 Amazon Simple Storage Service (Amazon S3) 的儲存桶（bucket）。
export async function uploadImage(req) {    
    const key = Date.now().toString() + '-' + req.originalname;

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: req.buffer,
        ContentType: req.mimetype,
    });
    await s3Client.send(command); 

    const imageUrl = `https://${BUCKET_NAME}.s3.${S3_BUCKET_REGION}.amazonaws.com/${key}`;
    return imageUrl

}      

