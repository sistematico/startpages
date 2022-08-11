const printIcons = () => {
  for (const card of ICONS) {
    let currentItem = document.createElement("a");
    let currentItemIcon = document.createElement("span");

    currentItem.classList.add("icon");
    currentItem.href = card.link;

    currentItemIcon.classList.add("fas");
    currentItemIcon.classList.add(card.icon);

    currentItem.append(currentItemIcon);
    iconsContainer.appendChild(currentItem);
  }
};

const printListItems = () => {
  let currentItem = null;

  for (const listItem of LIST_ITEMS) {
    if (typeof listItem.sublink === 'object') {
      currentItem = document.createElement("details");
      currentItem.dataset.popover = "up";
      
      let summary = document.createElement("summary");      
      let div = document.createElement("div");
      
      for (const key in listItem.sublink) {
        let p = document.createElement("p");
        let link = document.createElement("a");

        link.href = listItem['sublink'][key].link;
        link.appendChild(document.createTextNode(listItem['sublink'][key].name));

        p.appendChild(link);
        div.appendChild(p);
      }
        
      summary.appendChild(document.createTextNode(listItem.name));
      currentItem.appendChild(summary);
      currentItem.appendChild(div);
    } else {
      currentItem = document.createElement("a");
      currentItem.href = listItem.link;
      currentItem.appendChild(document.createTextNode(listItem.name));      
    }
    
    currentItem.classList.add("listItem");
    listContainer.appendChild(currentItem);
  }
};

printIcons();
printListItems();
