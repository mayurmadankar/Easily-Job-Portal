//THIS FUNCTION IS FOR PDF UPLOADS AND FETCHING THE NAME 
import multer from "multer";

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/resume/");
    },
    filename: (req, file, cb) => {
        const name = new Date().toISOString().replace(/:/g, '_') +file.originalname
        cb(null, name);
    },
});
export const uploadFile = multer({
    storage: storageConfig,
});