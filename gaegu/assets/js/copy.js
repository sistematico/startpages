function copyDivToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("code"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
    alert("Conteúdo compiado!")
}