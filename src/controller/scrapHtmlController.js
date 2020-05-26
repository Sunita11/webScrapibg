/*  

logic: based on tags
h1 -> titles
h2 -> section heading
Content between h2 comes as section content

*/


import rp from 'request-promise';
import $ from 'cheerio';

$.prototype.between = function (elm0, elm1) {
    var index0 = $(this).index(elm0);
    var index1 = $(this).index(elm1);
    if (index0 <= index1)
        return this.slice(index0, index1 + 1);
    else
        return this.slice(index1, index0 + 1);
}

const scrapHTML = (request, response, next) => {
    const { url } = request.body;
    rp(url).then((html)=> {

        const output = {};
        const title = $('h1', html).eq(0).text();
        const sectionHeadings = $('h2', html);
        

        output.sections= [];
        for(let i=0;i<sectionHeadings.length;i++) {
            output.sections.push({
                'heading': sectionHeadings.eq(i).text()
            });
        }
        const breakHtmIntoSection = [];

        const heading2Section = $('h2', html).nextUntil('h2').addBack();
        heading2Section.each((index, value) => {
            if(value.type === 'tag' && value.name === 'h2') {
                breakHtmIntoSection.push(index);
            }
        });
        const sectionHTML = [];
        if(breakHtmIntoSection && breakHtmIntoSection.length) {
            for(let i=0;i<breakHtmIntoSection.length;i++) {
                sectionHTML[i] = [];
                heading2Section.each((index, value) => {
                    if(i+1 < breakHtmIntoSection.length && index === breakHtmIntoSection[i+1]) {
                        index++;
                        return false;
                    } else {
                        const textContent = heading2Section.eq(index).text();
                        if(textContent) {
                            sectionHTML[i].push(textContent);
                        }
                        
                    }
                });
                output.sections[i] = {
                    ...output.sections[i],
                    'content': sectionHTML[i],
                }
            }
        }
        output.title = title;
        return output;
    }).then((blogContent)=>{
        response.json(blogContent)
    }).catch((err)=>{
        response.json(err);
    });
};

export default scrapHTML; 