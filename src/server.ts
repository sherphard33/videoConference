import express from 'express';
import http from 'http';
import fs from 'fs';
import https from 'https';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { initMeetingServer } from './lib/meeting-server';
import router from './routes';
const key = fs.readFileSync(path.join(__dirname, '../certs/privkey.pem'));
const cert = fs.readFileSync(path.join(__dirname, '../certs/fullchain.pem'));

const PORT = 8081;
const app = express();
const server = http.createServer(app);
const httpsServer = https.createServer({ key: key, cert: cert }, app);

initMeetingServer(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/echo', (req, res) => {
  res.send('Echo From server');
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});

httpsServer.listen(4443, () => { console.log('listening on 4443') });

