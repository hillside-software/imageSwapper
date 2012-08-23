function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() { 
			oldonload();
			func();
		}
	}
}

addLoadEvent(bgSlide);

multiplier = 55; timeout = 8; timeout2 = 3000; count = 1; 
function bgSlide(containerDiv,e,x,xi,io)
{
	var xc = e.style.backgroundPosition; 
	xc = parseInt(xc.substring(0,xc.indexOf('p'))); 
	
	targetX = parseInt(xi) + parseInt(x); 
	
	if(io == "o")
	{
		// we are easing out
		if(x < 0)
		{
			// we are moving negatively along the x-axis
			var deltaX = xi - xc; 
			var percentMoved = (-1)*(deltaX/x); 
			var posX = xc - Math.ceil((1.0-percentMoved) * multiplier); 
			if(posX < targetX) { posX = targetX; } 
		}
		else if(x == 0)
		{
			var posX = xc; 
		}
		else
		{
			var deltaX = xc - xi;  
			var percentMoved = (deltaX/x);
			var posX = xc + Math.ceil((1.0-percentMoved) * multiplier); 
			if(posX > targetX) { posX = targetX; } 
		}
	}
	else
	{
		// we are easing in
		if(x < 0)
		{
			// we are moving negatively along the x-axis
			var deltaX = xi - xc; 
			var percentMoved = (-1)*(deltaX/x); 
			var posX = xc - Math.ceil((percentMoved + .01) * multiplier); 
			if(posX < targetX) { posX = targetX; } 
		}
		else if(x==0)
		{
			var posX = xc; 
		}
		else
		{
			var deltaX = xc - xi; 
			var percentMoved = (deltaX/x); 
			var posX = xc + Math.ceil((percentMoved + .01) * multiplier); 
			if(posX > targetX) { posX = targetX; } 
		} 
	}
	
	e.style.backgroundPosition = posX+"px"; 
	e.style.opacity = percentMoved; 
	
	if(posX == targetX)
	{
		e.style.opacity='1.0'; 
		var swapperDiv = document.getElementById(containerDiv); 
		if(count == 0) var lastCount = imagesArray.length-1; else var lastCount = count-1; 
		swapperDiv.style.backgroundImage="url('"+imagesArray[lastCount]+"')"; 
		swapperDiv.style.backgroundPosition="0px"; 
		
		if(!document.getElementById('theSwapper')) 
		{ 
			var newDiv = document.createElement('div'); 
			newDiv.className="swapper"; 
			newDiv.id="theSwapper"; 
			newDiv.style.position="absolute"; 
			e.appendChild(newDiv); 			
		} 
		else
		{
			var newDiv = document.getElementById('theSwapper'); 
		} 
		var newImage = new Image(); 
		newImage.src = imagesArray[count]; 
		newDiv.style.backgroundImage="url('"+imagesArray[count]+"')"; 
		newDiv.style.backgroundPosition=xi+"px"; 
		newDiv.style.backgroundRepeat="no-repeat"; 
		if(count < imagesArray.length-1) { ++count; } else { count = 0; } 
		timer = setTimeout(function() { bgSlide(newDiv,x,xi,io); }, timeout2); 
	}
	else
	{
		timer = setTimeout(function() { bgSlide(e,x,xi,io); }, timeout); 
	}
}

function imageSwapper(width) 
{ 
	var allDivs = document.getElementsByTagName('div'); 
	for(var i=0; i < allDivs.length; ++i)
	{
		var divElement = allDivs[i]; 
		if(divElement.getAttribute('class') == "swapper") 
		{
			var swapperDiv = divElement;
		} 
	} 
	
	swapperDiv.style.backgroundRepeat="no-repeat"; 
	
	// pre-load first image to get things tarted
	var newImage = new Image(); 
	newImage.src = imagesArray[0]; 
	
	// no assign it to the far right as the background image
	swapperDiv.style.backgroundImage="url('"+imagesArray[0]+"')"; 
	swapperDiv.style.backgroundPosition=width+"px"; 
	
	bgSlide("featSliderShortcode",swapperDiv,(-1*width),width,"o"); 
} 