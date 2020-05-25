const rp = require('request-promise');
const url = 'https://www.reddit.com';
const puppeteer = require('puppeteer');
const $ = require('cheerio');

/* rp(url)
.then(function(html){
//success!
console.log(html);
})
.catch(function(err){
//handle error
console.log('error', err);
}); */

puppeteer
    .launch()
    .then(function(browser){
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