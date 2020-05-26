const rp = require('request-promise');
const url = 'https://www.reddit.com';
const puppeteer = require('puppeteer');
const $ = require('cheerio');


puppeteer
.launch()
.then(function(browser){
    console.log('browser');
    return browser.newPage();
})
.then(function(page){
    return page.goto(url).then(function(){
        return page.content();
    }).then(function(html) {
        $('h2', html).each(function() {
            console.log($(this).text());
        });
        }).catch(function(err){
        console.log('error', err);
    });
});

/* async function getPic() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.screenshot({path: 'google.png'});

  await browser.close();
}

getPic(); */