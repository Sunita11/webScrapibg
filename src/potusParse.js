import rp from 'request-promise';
import $ from 'cheerio';


const potusParse = function (url) {
    return rp(url).then((html)=> {
            return {
                name: $('.firstHeading', html).text(),
                bday: $('.bday', html).text()
            };
    }).catch((err)=>{
        console.log(err);
    });
};


export default potusParse;