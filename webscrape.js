const axios = require("axios");
const cheerio = require("cheerio");

async function scrappingData(){
    getDatafromwebpage = await axios.get("https://www.oppo.com/en/smartphones/series-find-x/find-x3-pro/#camera-sections");
    const $ = cheerio.load(getDatafromwebpage)
    const phoneName = $('.selected');
    // console.log(phoneName.text());
    Name = phoneName.find(('a').text())
    console.log(Name);
    // allorganisationName = $('.tbody');
    // console.log(allorganisationName.text());
    // alltd = allorganisationName.find(('tr').text());


};

scrappingData();



