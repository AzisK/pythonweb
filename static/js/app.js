require('../scss/style.scss');
require('./main');

var dateEl = document.getElementsByName("date")[0];
var invoiceEl = document.getElementsByName("invoice")[0];
var sumEl = document.getElementsByName("sum")[0];
var companyEl = document.getElementsByName("company")[0];
var pvmEl = document.getElementsByName("pvm")[0];
var els = [dateEl, invoiceEl, sumEl, companyEl, pvmEl];
var deal = {};

var addDealEl = document.getElementsByClassName("add-deal")[0];

var url = 'http://localhost:5000';

function updateTaxes(){
    let taxes = Math.round(this.value * 21) / 100;
    pvmEl.value = taxes;
}

['paste', 'click', 'keyup'].forEach(function(evt) {
    sumEl.addEventListener(evt, updateTaxes);
});

setCurrentDate(dateEl);

addDealEl.onclick = function() {
    updateValues();

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url + '/adddeal', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(deal));
}

function updateValues() {
    els.forEach(function(el) { deal[el.name] = el.value; })
}

function setCurrentDate(el) {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear() + '';

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    el.value = year + '-' + month + '-' + day;
}