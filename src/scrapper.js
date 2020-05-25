import rp from 'request-promise';
import $ from 'cheerio';
const potusParse = require('./potusParse');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
// const url2 = 'https://en.wikipedia.org/wiki/George_Washington';

rp(url).then((html)=> {
    /*le.log($('b > a',html).length);
        console.log($('b > a',html)); */
    
    const wikiUrls = [];
    for (let i = 0; i < 45; i++) {
        wikiUrls.push($('b > a', html)[i].attribs.href);
    }

    return Promise.all(
        wikiUrls.map(function(itemUrl) {
            console.log('itemurl: ', itemUrl);
            return potusParse('https://en.wikipedia.org' + itemUrl);
        })
    );
    // console.log(wikiUrls);
}).then((presidents)=>{
    console.log(presidents);
}).catch((err)=>{
    console.log(err);
});
