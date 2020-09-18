let icone, greet;

let interval = setInterval(function() {
    let currentdate = new Date(); 
    let datetime = ('0' + currentdate.getHours()).slice(-2) + ':' + ('0' + currentdate.getMinutes()).slice(-2) + ':' + ('0' + currentdate.getSeconds()).slice(-2);
    document.getElementById("hora").innerHTML = datetime;
},1000);