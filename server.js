import { URL } from 'url';
import express from 'express';
import passportConfig from './passport/config.js';
import authRoute from './routes/authRoutes.js';
const PORT = process.env.PORT || process.env.LOCAL_PORT;
const app = express();
const buildPath = (PORT === process.env.PORT) ?
  new URL('client/build/', import.meta.url).pathname :
  (new URL('client/build/', import.meta.url).pathname).substring(1);
passportConfig(app);
app
  .use(express.static(buildPath))
  .use(authRoute)
  .listen(PORT, ()=> console.log(`Listening on ${PORT}`));