'use stirct';

/* 1. При добвлении товаров реализовть вывод количества товаров и общей цены
в блоке вверху окна ( .top-cart-info__item ) в виде
Товаров в корзине - XXX, на сумму XXX грн  */


var productBoxBtn = document.getElementsByClassName('product-box__btn');
// создаю пустой массив, длинной равной количеству карточек(кнопок)
var quaArr = new Array(productBoxBtn.length).fill(0);
var priceArr = new Array(productBoxBtn.length).fill(0);
for (var i = 0; i < productBoxBtn.length; i++) {
	const indexCard = [i];
	productBoxBtn[i].onclick = function() {
		// ищу соседний инпут
		var qua =	this.previousElementSibling.childNodes[1].value;
		// добавляю значения инпутов в массив по их местам
		if (qua > 0) {
			quaArr[indexCard] = qua;
		} else {
			quaArr[indexCard] = 0;
		}
		// суммирую все значения массива
		var sum = 0;
		for (var i=0; i<quaArr.length; i++) {
			sum = sum + parseInt(quaArr[i]);
		// кладу результат в хедер
			var quaSum = document.getElementById('qua-sum');
			quaSum.innerHTML = sum;
		// ищу цену и делаю все аналогично
			var price = this.parentElement.childNodes[1].innerText;
			if (qua > 0) {
				priceArr[indexCard] = parseInt(qua) * parseInt(price);
			} else {
				priceArr[indexCard] = 0;
			}
			var sumPrice = 0;
			for (ind=0; ind<priceArr.length; ind++) {
				sumPrice = sumPrice + parseInt(priceArr[ind]);
				var sumSum = document.getElementById('sum-sum');
				sumSum.innerHTML = sumPrice;
			}
		}
	}
}

/* Самостоятельно распределить товары по категориям (по 4 товара в каждую категорию)
	 согласно значениям элемента select Категори */

document.getElementsByClassName('select-control')[0].addEventListener("change", applyFilter);
document.getElementsByClassName('select-control')[1].addEventListener("change", applyFilter);

function applyFilter() {
	var type = document.getElementsByClassName('select-control')[0].value;
	var price = document.getElementsByClassName('select-control')[1].value;

	var allDishes = getElements(document.getElementsByClassName('product-box__item'));
	displayBoxes(allDishes, false);
	var filtered = allDishes.filter(dish => {
		if (type === 'all') {
			return true;
		}
		return dish.getAttribute('class').split(' ').find(className => {
			return className === type;
		}) === type;
	}).filter(dish => {
		var dishPrice = parseInt(dish.getElementsByClassName('product-box__meta')[0].childNodes[1].innerText);
		if (price == 0) {
			return true;
		}
		return dishPrice <= price;
	});
	displayBoxes(filtered, true);
}

function displayBoxes(elements, isShown) {
	for (var i = 0; i < elements.length; i++) {
		isShown ? elements[i].classList.remove("hidden-element") : elements[i].classList.add("hidden-element");
	}
}

function getElements(collection) {
	var elements = [];
	for (var i = 0; i < collection.length; i++) {
		elements.push(collection[i]);
	}
	return elements;
}


// модальное окно

var btnCheck = document.getElementById('btn-check');
var modalOn = document.getElementById('modal-on');
var modalOff = document.getElementById('modal-off');

btnCheck.addEventListener('click', function() {
	modalOn.style.display = 'block';
});

modalOff.addEventListener('click', function() {
	modalOn.style.display = 'none';
});


// document.getElementById('modal-btn').addEventListener('click', function() {
// 	sendOrder();
// });

document.getElementById('modal-btn').onclick = sendOrder;

function sendOrder(){
	var modalInputsList = document.querySelectorAll('.modal-input'),
		modalInputsArray = Array.prototype.slice.call(modalInputsList);

	if ((modalInputsArray[0].value == '') || (modalInputsArray[1].value == '')) {
		alert('Заполните правильно форму заказа!');
		//проверка на пустоту
	} else if ((modalInputsArray[0].value.replace(/\s/g,'') == '') || (modalInputsArray[1].value.replace(/\s/g,'') == '')) {
		alert('Заполните правильно форму заказа!');
		//проверка на пробелы
	} else {
		var priceSpan = document.getElementById('js-price'),
			amountSpan = document.getElementById('js-amount');
		alert('Ожидайте заказ. Приятного аппетита! :)');
		modalOn.style.display = 'none';
		document.getElementById('qua-sum').innerText = '0';
		document.getElementById('sum-sum').innerText = '0';
		document.getElementsByClassName('select-control')[0].selectedIndex = 0;
		document.getElementsByClassName('select-control')[1].selectedIndex = 0;
		applyFilter();
	}
}



	//  document.getElementsByClassName('select-control')[0].addEventListener("change", applyFilter);
	//  document.getElementsByClassName('select-control')[1].addEventListener("change", applyFilter);
	 
	//  function applyFilter() {
	// 	 displayBoxes(document.getElementsByClassName('product-box__item'), false);
	// 	 var type = document.getElementsByClassName('select-control')[0].value;
	// 	 var price = document.getElementsByClassName('select-control')[1].value;
 
	// 	 var elementsToShow = [];
	// 	 var elementsByType = [];
	// 	 if (type === '1') {
	// 		 elementsByType = getElements(document.getElementsByClassName('breakfast'));
	// 	 } else if (type === '2') {
	// 		 elementsByType = getElements(document.getElementsByClassName('first-meal'));
	// 	 } else if (type === '3') {
	// 		 elementsByType = getElements(document.getElementsByClassName('garnish'));
	// 	 } else if (type === '0')  {
	// 		 elementsByType = getElements(document.getElementsByClassName('product-box__item'));
	// 	 }
 
	// 	 elementsByType.forEach(element => {
	// 		 var dishPrice = parseInt(element.getElementsByClassName('product-box__meta')[0].childNodes[1].innerText);
	// 		 if (price == 0) {
	// 			 elementsToShow.push(element);
	// 		 }
	// 		 else if (dishPrice < price) {
	// 			 elementsToShow.push(element);
	// 		 }
	// 	 });
	// 	 displayBoxes(elementsToShow, true);
	//  }
 
	//  function displayBoxes(elements, isShown) {
	// 	 for (var i = 0; i < elements.length; i++) {
	// 		 isShown ? elements[i].classList.remove("hidden-element") : elements[i].classList.add("hidden-element");
	// 	 }
	//  }
 
	//  function getElements(collection) {
	// 	 var elements = [];
	// 	 for (var i = 0; i < collection.length; i++) {
	// 		 elements.push(collection[i]);
	// 	 }
	// 	 return elements;
	//  }


// категории

// var category = document.getElementsByClassName('select-control')[0];
// category.addEventListener("change", function() {
// 	displayCard(document.getElementsByClassName('product-box__item'), true);
// 	if (this.value === '1') {
// 		displayCard(document.getElementsByClassName('breakfast'), false);
// 	} else if (this.value === '2') {
// 		displayCard(document.getElementsByClassName('first-meal'), false);
// 	} else if (this.value === '3') {
// 		displayCard(document.getElementsByClassName('garnish'), false);
// 	} else {
// 		displayCard(document.getElementsByClassName('product-box__item'), false);
// 	}
// });


// // цены
// var categoryPrice = document.getElementsByClassName('select-control')[1];
// categoryPrice.addEventListener("change", function() {
// 	displayCard(document.getElementsByClassName('product-box__item'), false);
// 	var priceVal = document.getElementsByClassName('product-box__meta');
// 	if (this.value == 0) {
// 		displayCard(document.getElementsByClassName('product-box__item'), false);
// 		return;
// 	}
// 	for (var i = 0; i < priceVal.length; i++) {
// 		var priceValue = parseInt(priceVal[i].childNodes[1].innerText)
// 		if (priceValue > this.value) {
// 			priceVal[i].parentNode.classList.add("hidden-element");
// 		}
// 	}
// });

// // с помощью подскази зала делаю функцию, которая принимает 2 аргумента, первый коллекция классов, второй булевый тип
// function displayCard(collectionToHide, isHiden) {
// 	for (var i = 0; i < collectionToHide.length; i++) {
// 		if (isHiden) {
// 			collectionToHide[i].classList.add('hidden-element');
// 		} else {
// 			collectionToHide[i].classList.remove('hidden-element');
// 		}
// 	}
// }
// // var category = document.getElementsByClassName('select-control')[0].children;
// for (var i = 0; i < category.length; i++) {	 
// 	var options = category[i].value;
// 	console.log(options);
// 	if (options === '1'){
// 		if (document.getElementsByClassName('product-box__item breakfast') == undefined)
// 		document.getElementsByClassName('product-box__item').style.display = "none";
// 	}
// }