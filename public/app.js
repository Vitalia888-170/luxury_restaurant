
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.date-format').forEach(node => {
    node.textContent = toDate(node.textContent);
  });
  var el = document.querySelector('.tabs');
  var instance = M.Tabs.init(el, {});

  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems);

  var elems = document.querySelectorAll('.slider');
  var instances = M.Slider.init(elems, { height: 700 });

  var elem_carousel = document.querySelectorAll('.carousel');
  var instances1 = M.Carousel.init(elem_carousel, { numVisible: 1 });
  var elem_dropdown = document.querySelectorAll('.dropdown-trigger');
  var instances2 = M.Dropdown.init(elem_dropdown, { constrainWidth: false });
  var elem_select = document.querySelectorAll('select');
  var instances3 = M.FormSelect.init(elem_select);
  var elemModal = document.querySelectorAll('.modal');
  var instances4 = M.Modal.init(elemModal);
  burgerAction();
  appendCategories();
  // addTables();
  changeCardView();
  let isCanvas=document.querySelector('#canvas');
  if(isCanvas){
    initCanvas();
  }
 
});

const toDate = date => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date))
}

function burgerAction() {
  let burger = document.querySelector('.menu_burger');
  burger.addEventListener('click', () => {
    let children = document.querySelector('header').children;
    for (let item of children) {
      item.classList.toggle('active');
    }
  })
  // document.body.toggleClass('lock');
}

function appendCategories() {
  const categories = [
    {
      id: 1,
      name: "all",
      icon: '../images/Home-page_1_26.png'
    },
    {
      id: 2,
      name: "breakfast",
      icon: '../images/Home-page_1_03.png'
    },
    {
      id: 3,
      name: "lunch",
      icon: '../images/Home-page_1_30.png'
    },
    {
      id: 4,
      name: "desserts",
      icon: '../images/Home-page_1_21.png'
    },
    {
      id: 5,
      name: "pizza",
      icon: '../images/Home-page_1_23.png'
    },
    {
      id: 6,
      name: "soups",
      icon: '../images/Home-page_1_18.png'
    },
    {
      id: 7,
      name: "dinner",
      icon: '../images/Home-page_1_32.png'
    }
  ]
  let container = document.querySelector('.food_list');
  if(container){
    let html = '';
  categories.forEach(category => {
    html += `<div class="category-item">
<img src="${category.icon}" alt="${category.name}"/>
<a href="/menu/${category.name}">${category.name.toUpperCase()}</a>
</div>`
  });
container.innerHTML=html;
}
  }
//reservation canvas
let canvas
let number
const grid = 30
const backgroundColor = '#f8f8f8'
const lineStroke = '#ebebeb'
const tableFill = '#40c4ff'
const tableStroke = '#0091ea'
const tableShadow = 'rgba(0, 0, 0, 0.4) 3px 3px 7px'
const chairFill = '#424242'
const chairStroke = '#000000'
const chairShadow = 'rgba(0, 0, 0, 0.4) 3px 3px 7px'
const barFill = 'rgba(0, 93, 127, 0.7)'
const barStroke = '#003e54'
const barShadow = 'rgba(0, 0, 0, 0.4) 3px 3px 7px'
const barText = 'Bar'
const wallFill = 'rgba(136, 136, 136, 0.7)'
const wallStroke = '#686868'
const wallShadow = 'rgba(0, 0, 0, 0.4) 5px 5px 20px';
const windowFill = '#e1f5fe'
const windowStroke = '#b3e5fc'
const windowShadow = 'rgba(0, 0, 0, 0.4) 5px 5px 20px';

let canvasEl = document.getElementById('canvas')

function initCanvas() {

  canvas = new fabric.Canvas('canvas')
  number = 1
  canvas.backgroundColor = backgroundColor;
  canvasEl.width = 600
  canvasEl.height = 500
  const canvasContainerEl = document.querySelectorAll('.canvas-container')[0]
  canvasContainerEl.style.width = canvasEl.width
  canvasContainerEl.style.height = canvasEl.height
  addDefaultObjects();
}

function generateId() {
  return Math.random().toString(36).substr(2, 8)
}

function addRect(left, top, width, height) {
  const id = generateId()
  const o = new fabric.Rect({
    width: width,
    height: height,
    fill: tableFill,
    stroke: tableStroke,
    strokeWidth: 2,
    shadow: tableShadow,
    originX: 'center',
    originY: 'center',
    centeredRotation: true,
    snapAngle: 45,
    selectable: true
  })
  const t = new fabric.IText(number.toString(), {
    fontFamily: 'Calibri',
    fontSize: 20,
    fill: '#000',
    textAlign: 'center',
    originX: 'center',
    originY: 'center'
  })
  const g = new fabric.Group([o, t], {
    left: left,
    top: top,
    centeredRotation: true,
    snapAngle: 45,
    selectable: true,
    type: 'table',
    id: id,
    number: number
  })
  number++
  return g
}


function addChair(left, top, width, height) {
  const o = new fabric.Rect({
    left: left,
    top: top,
    width: width,
    height: height,
    fill: chairFill,
    stroke: chairStroke,
    strokeWidth: 2,
    shadow: chairShadow,
    originX: 'left',
    originY: 'top',
    centeredRotation: true,
    snapAngle: 45,
    selectable: true,
    type: 'chair',
    id: generateId()
  })
  return o
}

function addBar(left, top, width, height) {
  const o = new fabric.Rect({
    width: width,
    height: height,
    fill: barFill,
    stroke: barStroke,
    strokeWidth: 2,
    shadow: barShadow,
    originX: 'center',
    originY: 'center',
    type: 'bar',
    id: generateId()
  })
  const t = new fabric.IText(barText, {
    fontFamily: 'Calibri',
    fontSize: 14,
    fill: '#fff',
    textAlign: 'center',
    originX: 'center',
    originY: 'center'
  })
  const g = new fabric.Group([o, t], {
    left: left,
    top: top,
    centeredRotation: true,
    snapAngle: 45,
    selectable: true,
    type: 'bar'
  })
  canvas.add(g)
  return g
}

function addWall(left, top, width, height) {
  const o = new fabric.Rect({
    left: left,
    top: top,
    width: width,
    height: height,
    fill: wallFill,
    stroke: wallStroke,
    strokeWidth: 2,
    shadow: wallShadow,
    originX: 'left',
    originY: 'top',
    centeredRotation: true,
    snapAngle: 45,
    selectable: true,
    type: 'wall',
    id: generateId()
  })
  canvas.add(o)
  return o
}
function addWindow(left, top, width, height) {
  const o = new fabric.Rect({
    left: left,
    top: top,
    width: width,
    height: height,
    fill: windowFill,
    stroke: windowStroke,
    strokeWidth: 2,
    shadow: windowShadow,
    originX: 'left',
    originY: 'top',
    centeredRotation: true,
    snapAngle: 45,
    selectable: true,
    type: 'wall',
    id: generateId()
  })
  canvas.add(o)
  return o
}

function onePlacesGroup(left, top, chair) {
  var group = new fabric.Group([chair], {
    left: left,
    top: top
  });
  canvas.add(group);
}

function twoPlacesGroup(left, top, table1, ...chair) {
  var group = new fabric.Group([table1, ...chair], {
    left: left,
    top: top
  });
  canvas.add(group);
}
function threePlacesGroup(left, top, table1, ...chair) {
  var group = new fabric.Group([table1, ...chair], {
    left: left,
    top: top
  });
  canvas.add(group);
}

function fourPlacesGroup(left, top, table1, ...chair) {
  var group = new fabric.Group([table1, ...chair], {
    left: left,
    top: top
  });
  canvas.add(group);
}

function sixPlacesGroup(left, top, table1, ...chair) {
  var group = new fabric.Group([table1, ...chair], {
    left: left,
    top: top
  });
  canvas.add(group);
}
function snapToGrid(target) {
  target.set({
    left: Math.round(target.left / (grid / 2)) * grid / 2,
    top: Math.round(target.top / (grid / 2)) * grid / 2
  })
}

function formatTime(hours, minutes) {
  const englishHours = hours > 12 ? hours - 12 : hours
  const english = englishHours + ':' + minutes + (minutes === 0 ? '0' : '') + ' ' + (hours > 12 ? 'PM' : 'AM')

  return english
}


function addDefaultObjects() {
  addWall(0, 0, 598, 10);
  addWindow(60, 0, 100, 10)
  addWindow(240, 0, 100, 10)
  addWindow(420, 0, 100, 10);
  addWall(0, 10, 10, 496);
  addWall(10, 488, 587, 10);
  addWall(588, 10, 10, 180);
  addWall(150, 110, 300, 10);
  addWall(150, 330, 300, 10);
  addWall(588, 280, 10, 220);
  addWindow(588, 50, 10, 100)
  addWindow(588, 330, 10, 100);
  addBar(30, 150, 50, 150);
  threePlacesGroup(30, 15, addRect(60, 14, 50, 50), addChair(110, 26, 10, 25), addChair(50, 26, 10, 25), addChair(72, 65, 25, 10));
  threePlacesGroup(140, 15, addRect(60, 14, 50, 50), addChair(110, 26, 10, 25), addChair(50, 26, 10, 25), addChair(72, 65, 25, 10))
  threePlacesGroup(250, 15, addRect(60, 14, 50, 50), addChair(110, 26, 10, 25), addChair(50, 26, 10, 25), addChair(72, 65, 25, 10));
  threePlacesGroup(360, 15, addRect(60, 14, 50, 50), addChair(110, 26, 10, 25), addChair(50, 26, 10, 25), addChair(72, 65, 25, 10))
  sixPlacesGroup(490, 18, addRect(60, 14, 50, 90), addChair(110, 24, 10, 25), addChair(50, 24, 10, 25), addChair(70, 105, 25, 10), addChair(72, 2, 25, 10), addChair(50, 65, 10, 25), addChair(110, 65, 10, 25));
  sixPlacesGroup(40, 360, addRect(60, 14, 50, 90), addChair(110, 24, 10, 25), addChair(50, 24, 10, 25), addChair(70, 105, 25, 10), addChair(72, 2, 25, 10), addChair(50, 65, 10, 25), addChair(110, 65, 10, 25));
  fourPlacesGroup(160, 400, addRect(60, 54, 50, 50), addChair(110, 67, 10, 25), addChair(50, 67, 10, 25), addChair(73, 105, 25, 10), addChair(73, 42, 25, 10));
  fourPlacesGroup(270, 400, addRect(60, 54, 50, 50), addChair(110, 67, 10, 25), addChair(50, 67, 10, 25), addChair(73, 105, 25, 10), addChair(73, 42, 25, 10));
  fourPlacesGroup(380, 400, addRect(60, 54, 50, 50), addChair(110, 67, 10, 25), addChair(50, 67, 10, 25), addChair(73, 105, 25, 10), addChair(73, 42, 25, 10));
  fourPlacesGroup(480, 400, addRect(60, 54, 50, 50), addChair(110, 67, 10, 25), addChair(50, 67, 10, 25), addChair(73, 105, 25, 10), addChair(73, 42, 25, 10));
  fourPlacesGroup(170, 130, addRect(60, 54, 50, 50), addChair(110, 67, 10, 25), addChair(50, 67, 10, 25), addChair(73, 105, 25, 10), addChair(73, 42, 25, 10));
  fourPlacesGroup(170, 250, addRect(60, 54, 50, 50), addChair(110, 67, 10, 25), addChair(50, 67, 10, 25), addChair(73, 105, 25, 10), addChair(73, 42, 25, 10));
  twoPlacesGroup(280, 130, addRect(0, 10, 50, 50), addChair(13, 0, 25, 10), addChair(13, 61, 25, 10));
  twoPlacesGroup(280, 250, addRect(0, 10, 50, 50), addChair(13, 0, 25, 10), addChair(13, 61, 25, 10));
  twoPlacesGroup(370, 130, addRect(0, 10, 50, 50), addChair(13, 0, 25, 10), addChair(13, 61, 25, 10));
  twoPlacesGroup(370, 250, addRect(0, 10, 50, 50), addChair(13, 0, 25, 10), addChair(13, 61, 25, 10));
  onePlacesGroup(80, 150, addChair(0, 0, 20, 25));
  onePlacesGroup(80, 190, addChair(0, 0, 20, 25));
  onePlacesGroup(80, 235, addChair(0, 0, 20, 25));
  onePlacesGroup(80, 275, addChair(0, 0, 20, 25));
}
const tableArray = [
  {
    table: 1,
    isOrder: false,
    left: 40,
    top: 15
  },
  {
    table: 2,
    isOrder: false,
    left: 150,
    top: 15
  },
  {
    table: 3,
    isOrder: false,
    left: 260,
    top: 15
  },
  {
    table: 4,
    isOrder: false,
    left: 370,
    top: 15
  },
  {
    table: 5,
    isOrder: false,
    left: 500,
    top: 30
  },
  {
    table: 6,
    isOrder: false,
    left: 50,
    top: 372
  },
  {
    table: 7,
    isOrder: false,
    left: 170,
    top: 412
  },
  {
    table: 8,
    isOrder: false,
    left: 280,
    top: 412
  },
  {
    table: 9,
    isOrder: false,
    left: 390,
    top: 412
  },
  {
    table: 10,
    isOrder: false,
    left: 490,
    top: 412
  },
  {
    table: 11,
    isOrder: false,
    left: 180,
    top: 142
  },
  {
    table: 12,
    isOrder: false,
    left: 180,
    top: 262
  },
  {
    table: 13,
    isOrder: false,
    left: 280,
    top: 140
  },
  {
    table: 14,
    isOrder: false,
    left: 280,
    top: 260
  },
  {
    table: 15,
    isOrder: false,
    left: 370,
    top: 140
  },
  {
    table: 16,
    isOrder: false,
    left: 370,
    top: 260
  },
];
// function addTables() {
//   tableArray.forEach(item => {
//     createCustomTable(item.table === 5 || item.table === 6 ? 92 : 52, item.left, item.top, item.table, item.isOrder);
//   })
//   function createCustomTable(height, left, top, index, isOrder) {
//     let div = document.createElement('div');
//     div.setAttribute('data-index', index);
//     div.className='table-item';
//     div.innerHTML=index;
//     div.className = 'table-div';
//     div.style.position = 'absolute';
//     div.style.backgroundColor = isOrder ? '#bdbdbd' : '40c4ff';
//     div.style.border = '2px solid black';
//     div.style.left = left + 'px';
//     div.style.top = top + 'px';
//     div.style.width = 52 + 'px';
//     div.style.height = height + 'px';
//     document.querySelector('.canvas-container').append(div);
//   }

// }
// document.querySelector('.canvas-container').addEventListener('click', (e) => {
//   if (e.target.classList.contains('table-div')) {
//     let modifiedTables = [...tableArray];
//     let selectedTable = Number(e.target.dataset.index);
//     let index = tableArray.findIndex(item => item.table === selectedTable);
//     modifiedTables[index].isOrder = true;
//     let modalText = 'You have not selected anything';
//     if (selectedTable) {
//       document.querySelectorAll('#table-list')[0].value = modifiedTables;
//     } else {
//       document.querySelector('.modal-content').innerHTML = modalText;
//     }
//     console.log(modifiedTables);
//   }
  
// });
// document.querySelector('.reservation-container').addEventListener('click', (e)=>{
//   if(e.target.closest('.reserve-details')){
//     console.log(e.target);
//     let children=Array.from(e.target.parentNode.children);
//     console.log(children);
//     let values=children.map(item=>item.innerText);
//     document.querySelector('#date').value=values[0];
//     document.querySelector('#hour').value=values[1];
//   }
// })

const categoryElem = document.querySelector('#category');
if (categoryElem) {
  categoryElem.addEventListener('change', (e) => {
    location.reload(true);
   })
}

function changeCardView(){
  const menu_container=document.querySelector('.change-card-pannel');
  const menu_list=document.querySelector('.menu-list');
 if(menu_container){
  menu_container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('fa-list')){
        menu_list.classList.add('list');
    }else if(e.target.classList.contains('fa-th')){
     menu_list.classList.remove('list');
    }
  })
 }

}

const $cart = document.querySelector('#cart');
if ($cart) {
   $cart.addEventListener('click', (e) => {
      if (e.target.classList.contains('js-remove')) {
         const id = e.target.dataset.id;
         const csrf = e.target.dataset.csrf
         fetch('/cart/remove/' + id, {
            method: 'delete',
            headers: {
               'X-XSRF-TOKEN': csrf
            }
         }).then(res => res.json())
            .then(cart => {
               if (cart.dishes.length) {
                  const html = cart.dishes.map(item => {
                     return `
                        <tr>
                              <td>${item.title}</td>
                              <td class="center-align">${item.count}</td>
                              <td class="center-align">
                                 <button class="btn black js-remove" data-id="${item.id}" data-csrf="${csrf}">Delete</button>
                              </td>
                           </tr>
                     `
                  }).join('');
                  $cart.querySelector('tbody').innerHTML = html;
                  $cart.querySelector('.total-price').textContent = cart.price;
               } else {
                  $cart.innerHTML = `<div class="pos-center">
                  <img class="empty-card" src="../images/empty-cart.png" alt="empty cart" />
                  <p class="center-align">The card is empty</p>
              </div>`
               }
            })
      }
   })
}
