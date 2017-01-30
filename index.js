var express = require('express');
var fs = require('fs');
var app     = express();
var osmosis = require('osmosis');

app.get('/scrape', function(req, res){
  scrapeIpsCredit();
})

function scrapeIpsCredit() {
  osmosis
  .get('https://invisionpower.com/login/')
  .submit('form.ipsForm', {
    'auth': 'tctc91@gmail.com',
    'password': 'nfoISoxAWn6ZIUz'
  })
  //.follow('.cClientAreaLink > a')
  .get('https://invisionpower.com/clients/credit/')
  .find('.cNexusCredit_total')
  .set('title')
  .data(console.log)
}


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
