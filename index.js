const express = require('express');
const fs = require('fs');
const app     = express();
const osmosis = require('osmosis');

const creditJson = { marketplaceCredit : '', ipsthemesCredit : ''};
const ipsCredentials = {
  auth: 'tctc91@gmail.com',
  password: 'nfoISoxAWn6ZIUz'
}

app.get('/scrape', function(req, res){
  scrapeIpsCredit();
})

function scrapeIpsCredit() {
  osmosis
    .get('https://invisionpower.com/login/')
    .submit('form.ipsForm', ipsCredentials)
    .get('https://invisionpower.com/clients/credit/')
    .find('.cNexusCredit_total')
    .set('accountCredit')
    .data((obj) => creditJson.marketplaceCredit = obj.accountCredit)
    .done(() => writeToFile())
}

function writeToFile() {
  fs.writeFile('mp-credit.json', JSON.stringify(creditJson, null, 4));
}

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
