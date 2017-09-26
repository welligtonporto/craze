/*
 * Craze (v1.0.0): testimonials.js
 */

var testimonials = function () {
	// Settings default
	var selectorContainer = document.getElementsByClassName("o-testimonials"),
		selectorListOfItems = document.getElementsByClassName("o-testimonials__items"),
		selectorItem = document.getElementsByClassName("o-testimonials__item"),
		selectorDots = document.getElementsByClassName("o-testimonials__nav-dot"),
		classDotsNavActive = "a-dots--active",
		speedOfTransition = "300ms",
		timeOut = 4000;

	// Global vars & settings
	var totalItems = selectorItem.length,
		widthEachItem,
		waitingForNextItem;

	selectorListOfItems[0].style.transition=("transform " + speedOfTransition); // Set transition speed 

	// Init slide
	var contructSlide = function (){
		widthEachItem = selectorContainer[0].offsetWidth; // Calculate width of each item
		var widthOfAllItems = widthEachItem * totalItems; // Calculate width of all items
		
		selectorListOfItems[0].style.width=(widthOfAllItems+"px"); // Set width to items list

		// Set width to each item
		for (var indexEachItem = 0; indexEachItem < totalItems; indexEachItem++) {
			selectorItem[indexEachItem].style.width=(widthEachItem+"px");
		}
	};

	contructSlide();
	
	// Automatic navigation 
	var autoNavigation = function (indexItemToGo){
		if (indexItemToGo == null) {
			indexItemToGo = 1; // For the first "goToItem"
		}

		waitingForNextItem = setTimeout(function(){
			if (indexItemToGo == totalItems) {
				indexItemToGo = 0; // Set first item if is the last item
			}

			goToItem(indexItemToGo);
		}, timeOut);
	};

	autoNavigation();

	// Manual navigation 
	var goToItem = function (indexItemToGo){
		clearTimeout(waitingForNextItem);

		// Move slide
		moveSlideTo = -(indexItemToGo * widthEachItem); // Calc the value for animate
		selectorListOfItems[0].style.transform="translate("+moveSlideTo+"px)"; // Animate

		// Control dots
		for (var indexEachItemNav = 0; indexEachItemNav < totalItems; indexEachItemNav++) {
			selectorDots[indexEachItemNav].classList.remove(classDotsNavActive); // Remove class active on each dots
		}

		selectorDots[indexItemToGo].className += " " + classDotsNavActive; // Add active on this dots

		// Prepare for next item
		indexItemToGo += 1;
		autoNavigation(indexItemToGo);
	};

	// Responsive options
	var changeViewPort = function () {
		var waitingResize,
			initialWidthViewPort = window.innerWidth,
			newWidthViewPort;

		window.onresize = function(){
			clearTimeout(waitingResize); // Timeout for load function when resize is completed

			waitingResize = setTimeout(function() {
				newWidthViewPort = window.innerWidth;

				if ( initialWidthViewPort != newWidthViewPort ){ // Verify if width was changed
					contructSlide();
					goToItem(0);

					initialWidthViewPort = newWidthViewPort;
				}
			}, 250);
		};
	}();

	return {
		goToItem: goToItem
	};
}();