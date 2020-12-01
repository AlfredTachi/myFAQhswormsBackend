'use strict'

const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

const url = 'https://www.hs-worms.de/corona/faq-fuer-studierende'
let data = [];

// function to scraping data form web
(function fetchData() {
    let data = [];
    request(url, (error, response, html) => {

        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            const title = $('div[class="pagetitle-title"] > h1').text().trim();
            const intro = $('section[id="c18741"] > p').text().trim();
            const general = $('section[id="c21898"] > p').text().trim();
            const certificats = $('section[id="c21899"] > p').text().trim();
            const studentID = $('section[id="c21900"] > p').text().trim();
            const semesterReregistration = $('section[id="c21901"] > p').text().trim();
            const informationForFreshmen = $('section[id="c21902"] > p').text().trim();
            const registrationOfInternshipSemestersOrThese = $('section[id="c21903"] > ul').text().trim();
            const internships = $('section[id="c21904"] > p').text().trim();
            const submissionOfTheses = $('section[id="c21905"] > p').text().trim();
            const examReviews = $('section[id="c21906"] > p').text().trim();
            const examinationPhase = $('section[id="c21907"] > p').text().trim();
            const periodOfStudy = $('section[id="c22762"] > p').text().trim().replace(/\. ?/, '. ');

            data.push({
                intro,
                general,
                certificats,
                studentID,
                semesterReregistration,
                informationForFreshmen,
                registrationOfInternshipSemestersOrThese,
                internships,
                submissionOfTheses,
                examReviews,
                examinationPhase,
                periodOfStudy
            });

            const dataText = JSON.stringify(data, null, 2);
            fs.writeFileSync('../assets/data.json', dataText);
        }
        const dataJson = JSON.parse(fs.readFileSync('../assets/data.json', { encoding: 'utf-8' }));
        console.log(dataJson);
    });

})();