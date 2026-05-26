import multer from 'multer';

// multer para guardar imagenes temporales en memoria ram memoryStorage


const storage = multer.memoryStorage();



export const upload = multer({
  storage
});