var footer = document.querySelector('footer');

const divs = [
    {nome: 'devel1', links: 'www.google.com'},
    {nome: 'info1', links: 'www.google.com'},
    {nome: 'video1', links: 'www.google.com'},
    {nome: 'social1', links: 'www.google.com'}
];

//for (var prop in obj) {
    // ctrl+shift+k (para abrir o console no mozilla firefox)
    //console.log("obj." + prop + " = " + obj[prop]);
//}

for (let item of divs) {
    let newDiv = document.createElement('div');
    newDiv.classList.add("cat");
    newDiv.innerHTML = '<h4>' + item.nome + '</h4>';    

    footer.appendChild(newDiv);
    
    //let newUl = document.createElement('ul');

    //let newLi = document.createElement('li');
    
    
    
    //newUl.before(newLi);

    //newDiv.before(newUl);
    
    
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