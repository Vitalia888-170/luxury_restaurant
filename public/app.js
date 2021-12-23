
document.addEventListener('DOMContentLoaded', function () {
  var el = document.querySelector('.tabs');
  var instance = M.Tabs.init(el, {});

  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems);

  var elems = document.querySelectorAll('.slider');
  var instances = M.Slider.init(elems, { height: 550 });

  var elem_carousel = document.querySelectorAll('.carousel');
  var instances1 = M.Carousel.init(elem_carousel, { numVisible: 1 });
  var elem_dropdown = document.querySelectorAll('.dropdown-trigger');
  var instances2 = M.Dropdown.init(elem_dropdown, { constrainWidth: false });
  var elem_select = document.querySelectorAll('select');
  var instances3 = M.FormSelect.init(elem_select);
  burgerAction();

  appendCategories();
});

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
      name: "All",
      icon: '../images/Home-page_1_26.png'
    },
    {
      id: 2,
      name: "Breakfast",
      icon: '../images/Home-page_1_03.png'
    },
    {
      id: 3,
      name: "Lunch",
      icon: '../images/Home-page_1_30.png'
    },
    {
      id: 4,
      name: "Desserts",
      icon: '../images/Home-page_1_21.png'
    },
    {
      id: 5,
      name: "Pizza",
      icon: '../images/Home-page_1_23.png'
    },
    {
      id: 6,
      name: "Soups",
      icon: '../images/Home-page_1_18.png'
    },
    {
      id: 7,
      name: "Dinner",
      icon: '../images/Home-page_1_32.png'
    }
  ]
  let container = document.querySelector('.food_list');
  let html = '';
  categories.forEach(category => {
    html += `<div class="category-item">
<img src="${category.icon}" alt="${category.name}"/>
<a href="#">${category.name}</a>
</div>`
  });
  container.insertAdjacentHTML('beforeend', html);
}






