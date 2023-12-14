import { URL } from 'url';
import express from 'express';
import passportConfig from './passport/config.js';
import authRoute from './routes/authRoutes.js';
import userRoute from './routes/userRoutes.js';
import roundRoute from './routes/roundRoute.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || process.env.LOCAL_PORT;
const app = express();
const buildPath = (PORT === process.env.PORT) ?
  new URL('client/build/', import.meta.url).pathname :
  (new URL('client/build/', import.meta.url).pathname).substring(1);


const connectStr = 'mongodb+srv://' + process.env.MONGODB_USER + ':' + 
                  process.env.MONGODB_PW + process.env.MONGODB_CSTRING; //Remote DB
mongoose.connect(connectStr, {useNewUrlParser: true, useUnifiedTopology: true})
                  .then(
                    () =>  {console.log(`Connected to ${connectStr}.`)},
                    err => {console.error(`Error connecting to ${connectStr}: ${err}`)}
                  );

passportConfig(app);
app
  .use(express.static(buildPath))
  .use(express.json({limit: '20mb'}))
  .use(authRoute)
  .use(userRoute)
  .use(roundRoute)
  .listen(PORT, ()=> console.log(`Listening on ${PORT}`));