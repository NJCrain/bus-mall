'use strict';
//add total clicks tracker
var totalClicks = 0;

//make a var for max clicks to make testing/changing the max easier
var maxClicks = 5;

//create an array to store all product objects
Product.allProducts = [];

var onScreen = document.getElementsByClassName('product');

/*constructor function that creates a product object with the following properties
    -file path for the image
    -alt text for the image
    -total clicks
    -times shown
    -was part of previous set or not
    -stores each prodcut in an array*/
function Product(filePath, altText) {
  this.filePath = filePath;
  this.altText = altText;
  this.clicks = 0;
  this.timesShown = 0;
  this.wasPrevious = false;
  Product.allProducts.push(this);
}

new Product('img/bag.jpg', 'bag');
new Product('img/banana.jpg', 'banana');
new Product('img/bathroom.jpg', 'bathroom');
new Product('img/boots.jpg', 'boots');
new Product('img/breakfast.jpg', 'breakfast');
new Product('img/bubblegum.jpg', 'bubblegum');
// new Product('img/chair.jpg', 'chair');
// new Product('img/cthulhu.jpg', 'cthulhu');
// new Product('img/dog-duck.jpg', 'dog-duck');
// new Product('img/dragon.jpg', 'dragon');
// new Product('img/pen.jpg', 'pen');
// new Product('img/pet-sweep.jpg', 'pet-sweep');
// new Product('img/scissors.jpg', 'scissors');
// new Product('img/shark.jpg', 'shark');
// new Product('img/sweep.png', 'sweep');
// new Product('img/tauntaun.jpg', 'tauntaun');
// new Product('img/unicorn.jpg', 'unicorn');
// new Product('img/usb.gif', 'usb');
// new Product('img/water-can.jpg', 'water-can');
// new Product('img/wine-glass.jpg', 'wine-glass');

/*event handler for click event
    -changes prop for all imgs on screen to display they were just shown
    -adds +1 to seen property for images that were just shown
    -adds +1 to total clicks
    -changes each img src to a new, non-duplicate image
    -changes the alt text for each img as it is added
    -can remove event listeners if total clicks reaches max?*/
function pictureChanger(e) {
  if (e) {
    totalClicks++;
    console.log(totalClicks);
    var clicked = e.target;
    for (var i = 0; i < Product.allProducts.length; i++) {
      if (clicked.alt === Product.allProducts[i].altText) {
        Product.allProducts[i].clicks++;
        Product.allProducts[i].wasPrevious = false;
      }
    }
  }
  if (totalClicks < maxClicks) {
    for (i = 0; i < onScreen.length; i++) {
      var random = Math.floor(Math.random() * Product.allProducts.length);
      while (Product.allProducts[random].wasPrevious === true) {
        random = Math.floor(Math.random() * Product.allProducts.length);
      }
      onScreen[i].src = Product.allProducts[random].filePath;
      onScreen[i].alt = Product.allProducts[random].altText;
      Product.allProducts[random].wasPrevious = true;
      Product.allProducts[random].timesShown++;
    }
  } else {
    for (i = 0; i < onScreen.length; i++) {
      onScreen[i].removeEventListener('click', pictureChanger);
    }
  }
}

//add an event listener for when an image is clicked
for (var i = 0; i < onScreen.length; i++) {
  onScreen[i].addEventListener('click', pictureChanger);
  console.log('we are on line 96');
}

pictureChanger();
