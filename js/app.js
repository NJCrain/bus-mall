'use strict';

var totalClicks = 0;
var maxClicks = 25;
var onScreen = document.getElementsByClassName('product');
var previousAlts = new Array(onScreen.length);
var myProducts = localStorage.getItem('products');

Product.allProducts = [];

/*constructor function for each product to set its source and alt text and give it properties to track individual clicks and how many times it was displayed*/
function Product(filePath, altText) {
  this.filePath = filePath;
  this.altText = altText;
  this.clicks = 0;
  this.timesShown = 0;
  this.isDisplayed = false;
  Product.allProducts.push(this);
}

//instantiate all products
if (!myProducts) {
  new Product('img/bag.jpg', 'bag');
  new Product('img/banana.jpg', 'banana');
  new Product('img/bathroom.jpg', 'bathroom');
  new Product('img/boots.jpg', 'boots');
  new Product('img/breakfast.jpg', 'breakfast');
  new Product('img/bubblegum.jpg', 'bubblegum');
  new Product('img/chair.jpg', 'chair');
  new Product('img/cthulhu.jpg', 'cthulhu');
  new Product('img/dog-duck.jpg', 'dog-duck');
  new Product('img/dragon.jpg', 'dragon');
  new Product('img/pen.jpg', 'pen');
  new Product('img/pet-sweep.jpg', 'pet-sweep');
  new Product('img/scissors.jpg', 'scissors');
  new Product('img/shark.jpg', 'shark');
  new Product('img/sweep.png', 'sweep');
  new Product('img/tauntaun.jpg', 'tauntaun');
  new Product('img/unicorn.jpg', 'unicorn');
  new Product('img/usb.gif', 'usb');
  new Product('img/water-can.jpg', 'water-can');
  new Product('img/wine-glass.jpg', 'wine-glass');

  localStorage.setItem('products', JSON.stringify(Product.allProducts));
}

else {
  Product.allProducts = JSON.parse(myProducts);
}
/*This function will check first is an event is passed (since it is also called to render the pictures the first time). If it was called by an event, then it will increment total clicks and add a click to the specific picture clicked. From there if totalClicks is less than maxClicks it will loop through each image container and  assign a new picture that is currently not displayed and set it's isDisplayed value to true. This also constructs and array of the previously displayed alts to use in comparison to unflag the isDisplayed value for the images that were just shown. If the user has hit the maxNumber of clicks, then the eventlistners will be removed to prevent more clicking causing changes.*/
function pictureChanger(e) {
  if (e) {
    totalClicks++;
    var clicked = e.target;
    for (var i = 0; i < Product.allProducts.length; i++) {
      if (clicked.alt === Product.allProducts[i].altText) {
        Product.allProducts[i].clicks++;
      }
    }
  }

  if (totalClicks < maxClicks) {
    for (i = 0; i < onScreen.length; i++) {
      var random = Math.floor(Math.random() * Product.allProducts.length);
      while (Product.allProducts[random].isDisplayed === true) {
        random = Math.floor(Math.random() * Product.allProducts.length);
      }
      previousAlts[i] = onScreen[i].alt;
      onScreen[i].src = Product.allProducts[random].filePath;
      onScreen[i].alt = Product.allProducts[random].altText;
      Product.allProducts[random].isDisplayed = true;
      Product.allProducts[random].timesShown++;
    }
  } else {
    for (i = 0; i < onScreen.length; i++) {
      onScreen[i].removeEventListener('click', pictureChanger);
    }
    displayData();
  }

  for (var j = 0; j < Product.allProducts.length; j++) {
    for (var k = 0; k < previousAlts.length; k++)
      if (Product.allProducts[j].altText === previousAlts[k]) {
        Product.allProducts[j].isDisplayed = false;
      }
  }
}

// fills in arrays with data to label and add data to a chart and then draws a horizontal bar chart on the screen
function displayData() {
  var ctx  = document.getElementById('data').getContext('2d');
  var labels = [];
  var data = [];
  var colors = [];

  for(var i = 0; i < Product.allProducts.length; i++) {
    labels[i] = Product.allProducts[i].altText;
    data[i] = Product.allProducts[i].clicks;
    colors[i] = 'rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')';
  }

  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets:[{
        label: '# of votes',
        data: data,
        backgroundColor: colors
      }]
    }
  });

  localStorage.setItem('products', JSON.stringify(Product.allProducts));
}

//generate event listeners for all possible image containers
for (var i = 0; i < onScreen.length; i++) {
  onScreen[i].addEventListener('click', pictureChanger);
}

pictureChanger();
