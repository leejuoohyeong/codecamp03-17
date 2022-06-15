import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async upload({ files }) {
    const storage = new Storage({
      projectId: 'graphic-pattern-352601',
      keyFilename: 'graphic-pattern-352601-ae61233cff6c.json',
    }).bucket('yebomnim');

    console.log(storage);
    // await new Promise((resolve, reject) => {
    //   myfile
    //     .createReadStream()
    //     .pipe(storage.createWriteStream())
    //     .on('finish', () => resolve('철수'))
    //     .on('error', () => reject('실패!!'));
    // });

    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles);

    const result = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          console.log(el.filename);
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`yebomnim/${el.filename}`))
            .on('error', () => reject());
        });
      }),
    ); // await Promise.all([Promise, Promise])
    // const result = ["폴더명/파일명", "폴더명/파일명"]
    console.log(result);
    return result;
  }
}
