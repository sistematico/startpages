const title = document.getElementById("code-title")
const placeholder = document.getElementById("code")
const select = document.getElementById("snippets")

fetch('json/snippets.json')
  .then(res => res.json())
  .then(json => {
    let html = '<option value="">Snippets</option>'
    for(let item in json) {
        html += '<option value="' + json[item].name + '">' + json[item].name + '</option>'
    }
    select.innerHTML = html;
  })
  .catch(err => console.log(err))

function snippet() {
  let sn = select.value;

  fetch('json/snippets.json')
    .then(res => res.json())
    .then(json => {

      let s = json.filter((el,i)=>{
        return el.name == sn ? el : false 
      })

      title.innerText = s != false ? s[0].description : ''
      placeholder.innerText = s != false ? s[0].code : ''

    })
    .catch(err => console.log(err))
}