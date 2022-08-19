let icone, greet

let interval = setInterval(function() {
    let currentdate = new Date()

    switch (currentdate) {
        case (currentdate.getHours() > 18):
            document.getElementById("greet").innerHTML = 'Boa noite'
        break;
        case (currentdate.getHours() > 12):
            document.getElementById("greet").innerHTML = 'Boa tarde'
        break;
        case (currentdate.getHours() > 5):
            document.getElementById("greet").innerHTML = 'Bom dia'
        break;
        case (currentdate.getHours() > 0):
            document.getElementById("greet").innerHTML = 'Boa madrugada'
        break;
        default:
            document.getElementById("greet").innerHTML = 'Bom dia'
    }
    let datetime = ('0' + currentdate.getHours()).slice(-2) + ':' + ('0' + currentdate.getMinutes()).slice(-2)
    document.getElementById("hora").innerHTML = datetime
},1000)