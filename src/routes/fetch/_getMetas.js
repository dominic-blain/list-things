import cheerio from 'cheerio';

let $ = '';

function ruleOut(options) {
    let value;
    options.some((option) => {
        if (!!option) {
            value = option;
            return true;
        }
    });
    return value;
}

function getTitle () {
    const titles = [
        $('meta[property="og:title"]').attr('content'),
        $('meta[name="twitter:title"]').attr('content'),
        $('title').text(),
        $('.post-title').text(),
        $('.entry-title').text(),
        $('h1[class*="title" i] a').text(),
        $('h1[class*="title" i]').text()
    ]
    return ruleOut(titles);
}

function getImage () {
    const images = [
        $('meta[property="og:image:secure_url"]').attr('content'),
        $('meta[property="og:image:url"]').attr('content'),
        $('meta[property="og:image"]').attr('content'),
        $('meta[name="twitter:image:src"]').attr('content'),
        $('meta[name="twitter:image"]').attr('content'),
        $('meta[itemprop="image"]').attr('content'),
        $('article img[src]').first().attr('src'),
        $('#content img[src]').first().attr('src'),
        $('img[alt*="author" i]').attr('src'),
        $('img[src]').attr('src')
    ]
    return ruleOut(images);
}
   

export function getMetas (html) {
    $ = cheerio.load(html);
    return {
        title: getTitle(),
        image: getImage()
    }
}