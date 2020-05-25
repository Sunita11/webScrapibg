import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import scrapHTML from './src/controller/scrapHtmlController';


const app = express();
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
);
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/scrape', scrapHTML);

app.listen(7000, ()=>{
    console.log('server is listening at 7000');
});