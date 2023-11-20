import multer from 'multer';
import path from 'path';
import configuractions from "@/controllers/settings/Default";
import { dirCR } from '@/utils';

class Multer {
  private localepath: string;
  private storage: multer.StorageEngine;

  constructor(localepath: string, uuid:string) {
    this.localepath = localepath
    dirCR(configuractions.routesPATH + "/static/files/" + this.localepath)
    this.storage = multer.diskStorage({
      destination: configuractions.routesPATH + "/static/files/" + this.localepath,
      filename: (req, file, cb) => {
        cb(null, uuid + path.extname(file.originalname));
      }
    });

    multer({ storage: this.storage });
  }
}

export default Multer;
