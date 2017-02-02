const osmosis = require('osmosis');

var IPSCreditScraper = function(credentials) {
  var self = this;

  if(!credentials || !credentials.hasOwnProperty('auth') || !credentials.hasOwnProperty('password')) {
    console.warn('Missing credentials');
    return false;
  }

  const ipsData = {
    loginPage: 'https://invisionpower.com/login/',
    creditPage: 'https://invisionpower.com/clients/credit/',
    $formEle: 'form.ipsForm',
    $creditEle: '.cNexusCredit_total',
    credentials: credentials
  }

  self.creditData = null;
  self.fetchCredit = fetchCredit;
  self.buildJson = buildJson;

  return self.fetchCredit();

  function fetchCredit() {
    return new Promise((resolve, reject) => {
      osmosis
        .get(ipsData.loginPage)
        .submit(ipsData.$formEle, ipsData.credentials)
        .get(ipsData.creditPage)
        .find(ipsData.$creditEle)
        .set('accountCredit')
        .data((obj) => self.buildJson(obj.accountCredit))
        .error(console.log)
        .done(() => resolve(self.creditData));
      });
  }

  function buildJson(credit) {
    this.creditData = {
      credit: credit,
      lastUpdate: new Date()
    };
  }
};

exports = module.exports = new IPSCreditScraper(credentials);
