const express = require('express');
const fs = require('fs');
const app     = express();
const osmosis = require('osmosis');

const creditJson = { marketplace: null, ipsthemes : null };
const ipsData = {
  loginPage: 'https://invisionpower.com/login/',
  creditPage: 'https://invisionpower.com/clients/credit/',
  $formEle: 'form.ipsForm',
  $creditEle: '.cNexusCredit_total',
  credentials: {
    auth: 'tctc91@gmail.com',
    password: 'nfoISoxAWn6ZIUz'
  }
}

app.get('/scrape', function(req, res){
  scrapeIpsCredit();
})

function scrapeIpsCredit() {
  osmosis
    .get(ipsData.loginPage)
    .submit(ipsData.$formEle, ipsData.credentials)
    .get(ipsData.creditPage)
    .find(ipsData.creditEle)
    .set('accountCredit')
    .data((obj) => setCredit(obj.accountCredit))
    .done(() => writeToFile())
}

function setCredit(credit) {
  creditJson.marketplace = { credit: credit, lastUpdate: new Date() };
}

function writeToFile() {
  fs.writeFile('mp-credit.json', JSON.stringify(creditJson, null, 4));
}

app.listen('8081')
exports = module.exports = app;
