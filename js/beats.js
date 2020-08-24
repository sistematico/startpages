let beatsinterval = setInterval(function() {
    let currentdate = new Date();
    let h = currentdate.getHours();
    let m = currentdate.getMinutes();
    let s = currentdate.getSeconds();
    // (UTC+1sec + (UTC+1min * 60) + (UTC+1hr * 3600)) / 86.4 
    let beats = s + (m * 60) + (h * 3600) / 86.4;
    document.querySelector('.beats').innerHTML = beats;
},1000);
