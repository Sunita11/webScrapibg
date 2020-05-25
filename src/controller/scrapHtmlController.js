import rp from 'request-promise';
import $ from 'cheerio';

const scrapHTML = (request, response, next) => {
    console.log(request.body);
    const { url } = request.body;
    rp(url).then((html)=> {
        
        const wikiUrls = [];
        for (let i = 0; i < 45; i++) {
            wikiUrls.push($('b > a', html)[i].attribs.href);
        }
    
        return Promise.all(
            wikiUrls.map(function(itemUrl) {
                return rp('https://en.wikipedia.org' + itemUrl).then((html)=> {
                    return {
                        name: $('.firstHeading', html).text(),
                        bday: $('.bday', html).text()
                    };
                }).catch((err)=>{
                    response.json(err);
                });
            })
        );
    }).then((presidents)=>{
        response.json(presidents)
        // console.log(presidents);
    }).catch((err)=>{
        response.json(err);
    });
};

export default scrapHTML; 