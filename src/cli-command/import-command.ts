import { CliCommandInterface } from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import {createOffer, getErrorMessage} from '../utils/common.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
  }

  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
  // public execute(filename: string): void {
  //   const fileReader = new TSVFileReader(filename.trim());

  //   try {
  //     fileReader.read();
  //     console.log(fileReader.toArray());
  //   } catch (err) {

  //     if (!(err instanceof Error)) {
  //       throw err;
  //     }

  //     console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`);
  //   }
  // }
}
