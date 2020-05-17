import path from 'path';
import multer from 'multer';
import {randomBytes} from 'crypto';

const tmpFolder =  path.resolve(__dirname, '../', '../', 'tmp');

export default {
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (request, file, callback) => {
            const fileHash = randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;
            return callback(null, fileName);
        }
    }),
};
