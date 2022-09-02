function greet() {
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
        default:
            document.getElementById("greet").innerHTML = 'Boa madrugada'
    }
    let datetime = ('0' + currentdate.getHours()).slice(-2) + ':' + ('0' + currentdate.getMinutes()).slice(-2)
    document.getElementById("hora").innerHTML = datetime
}

setInterval(greet, 1000)