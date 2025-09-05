// server/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname,'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true}));

// enable CORS for frontend (customize origin in production)
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  next();
});

// endpoint the frontend pings on click
app.post('/api/click', (req,res)=>{
  const rec = {type:'click',ts:Date.now(),body:req.body, ip:req.ip};
  fs.appendFileSync(path.join(DATA_DIR,'clicks.log'), JSON.stringify(rec) + '\n');
  res.status(200).json({ok:true});
});

// Monetag postback endpoint (register this exact URL in your Monetag dashboard)
app.post('/monetag-postback', (req,res)=>{
  // optional simple verification: include a secret token as query param in the postback URL:
  // example set in dashboard -> https://yourdomain/monetag-postback?secret=MYSECRET
  const secret = req.query.secret || req.body.secret || req.headers['x-monetag-secret'];
  if (process.env.MONETAG_SECRET && secret !== process.env.MONETAG_SECRET) {
    console.warn('Monetag postback: invalid secret', secret);
    return res.status(403).send('forbidden');
  }
  const rec = {type:'postback', ts:Date.now(), headers:req.headers, body:req.body, query:req.query, ip:req.ip};
  fs.appendFileSync(path.join(DATA_DIR,'postbacks.log'), JSON.stringify(rec) + '\n');
  // respond 200 to acknowledge
  res.status(200).send('ok');
});

// Optional: serve web files if you want one server for both
app.use('/', express.static(path.join(__dirname,'..','web')));

app.listen(PORT, ()=> console.log('Server listening', PORT));
