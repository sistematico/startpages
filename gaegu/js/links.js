var ulDevel = document.querySelector('.devel');

const devel = [
    {nome: 'Google', link: 'www.google.com'},
    {nome: 'Google', link: 'www.google.com'},
];

//for (var prop in obj) {
    // ctrl+shift+k (para abrir o console no mozilla firefox)
    //console.log("obj." + prop + " = " + obj[prop]);
//}

for (let link of devel) {
    let newNode = document.createElement('div');
    newNode.innerHTML = link.nome;
    ulDevel.after(newNode);
}



// var slides = document.getElementsByClassName("slide");
// for (var i = 0; i < slides.length; i++) {
//    Distribute(slides.item(i));
// }


// var arrows = document.getElementsByClassName("divs");
// for(var i = 0; i < arrows.length; i++){
//     if(obj != arrows[i]){
//         arrows[i].style.display = "none";
//     }
// }