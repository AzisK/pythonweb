var sum = document.getElementsByName("sum")[0];
var pvm = document.getElementsByName("pvm")[0];

['paste', 'click', 'keyup'].forEach(function(evt) {
    sum.addEventListener(evt, updateTaxes);
});

function updateTaxes(){
    let taxes = Math.round(this.value * 21) / 100;
    pvm.value = taxes;
}