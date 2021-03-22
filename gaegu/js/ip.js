const divip = document.getElementById("ip");

// myHeaders = new Headers({
//   "Content-Type": "text/plain",
//   "Content-Length": content.length.toString(),
//   "X-Custom-Header": "ProcessThisImmediately",
// });

headers = new Headers({
  "Content-Type": "text/plain",
});

let params = { method: 'GET', headers, mode: 'cors', cache: 'default' }

//fetch('https://www.cloudflare.com/cdn-cgi/trace', params).then(function (response) {
//var linhas = response.split('\n')

// for(var i = 0;i < lines.length; i++){
//   if (lines[i].startsWith('ip='))
//     return lines[i].split('=')[1]
// }

//  linhas.filter((linha) => {
//    if (linha.startsWith('ip='))
//      return linha.split('=')[1]
//  })

//divip.innerHTML = ip

//console.info(response)
//})

fetch('https://www.cloudflare.com/cdn-cgi/trace')
  .then(function (response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    console.info(response.data)
  })
  .catch(function (error) {
    console.log('Looks like there was a problem: \n', error);
  });
