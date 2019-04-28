/**
 * Global JS 
 */

// Bootstrap tooltips
$("dropdown-toggle").dropdown("togle");

// My Years Old
$("#yearsOld").text(myYearsOld(27, 11, 1997));

// My Years Old Function 
function myYearsOld(d, m, y) {
    let initDate = new Date(`${y}-${m}-${d}`).getTime();
    let date = new Date();
    let dif = initDate - date;
    let yearsOld = Math.abs((dif / (1000 * 60 * 60 * 24)) / 365);
    
    return yearsOld.toFixed(1);
}