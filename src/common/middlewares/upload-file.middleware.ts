import {NextFunction, Request, Response} from 'express';
import {nanoid} from 'nanoid';
import multer, {diskStorage} from 'multer';
import {MiddlewareInterface} from '../../types/middleware.interface.js';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {

    const storage = diskStorage({
      filename: (_req, file, callback) => {
        const filename = nanoid();
        console.log(file.mimetype);
        callback(null, `${filename}.${file.mimetype}`);
      },
      destination: this.uploadDirectory,
    });
    const uploadSingleFileMiddleware = multer({storage})
      .single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
