var footer = document.querySelector('footer');

const divs = [
    {nome: 'devel', links: [
        {nome: 'Google', link: 'www.google.com'}
    ]},
    {nome: 'info', links: [
        {nome: 'Google', link: 'www.google.com'}
    ]},
    {nome: 'video', links: [
        {nome: 'Google', link: 'www.google.com'}
    ]},
    {nome: 'social', links: [
        {nome: 'Google', link: 'www.google.com'}
    ]}
];

//for (var prop in obj) {
    // ctrl+shift+k (para abrir o console no mozilla firefox)
    //console.log("obj." + prop + " = " + obj[prop]);
//}

for (let item of divs) {
    let newDiv = document.createElement('div');
    newDiv.classList.add("cat");

    let newUl = document.createElement('ul');
    
    let newLi = document.createElement('li');
    newLi.innerHTML = '<h4>' + item.nome + '</h4>';
    newUl.appendChild(newLi);

    for (let subitem of item.links) {
        let newSubItem = document.createElement('li');
        newSubItem.innerHTML = '<h4>' + subitem.nome + '</h4>';    
        newUl.appendChild(newSubItem);
    }

    
    newDiv.appendChild(newUl);
    footer.appendChild(newDiv);

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