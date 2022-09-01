import app from '../app';
import { config } from '../config';

const port = config.server.PORT;

export async function loadServer() {

  return new Promise((resolve, reject) => {

    app.listen(port, () => {
      console.log(`server listen at ${port}`);
      resolve(true);
    });
  });
}