// copied/adapted from https://codepen.io/sarahwfox/pen/pNrYGb
var imgUrl = chrome.extension.getURL('clayton.png');
var backgroundUrl = "url('" + imgUrl + "')";

var sparkles=100;// increase of decrease for number of sparkles falling

var x=ox=400;
var y=oy=300;
var shigh=350;
var sleft=sdown=0;
var star=new Array();
var starv=new Array();
var starx=new Array();
var stary=new Array();

window.onload=function() { if (document.getElementById) {
	var i, rats;
	for (var i=0; i<sparkles; i++) {
		starv[i]=0;
		var rats=createDiv(25, 16);
		rats.style.backgroundColor="transparent";
		rats.style.visibility="hidden";
    rats.style.zIndex="999999999999999999999";
    rats.style.backgroundSize ="cover";
    rats.style.backgroundImage=backgroundUrl;
		document.body.appendChild(star[i]=rats);
	}
	sparkle();
}}

function sparkle() {
	var c;
	if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {
		ox=x;
		oy=y;
		for (c=0; c<sparkles; c++) if (!starv[c]) {
			star[c].style.left=(starx[c]=x)+"px";
			star[c].style.top=(stary[c]=y+1)+"px";
			star[c].style.visibility="visible";
			starv[c]=50;
			break;
		}
	}
	for (c=0; c<sparkles; c++) {
		if (starv[c]) update_star(c);
	}
	setTimeout(sparkle, 40);
}

function update_star(i) {
	if (starv[i]) {
		stary[i]+=1+Math.random()*3;
		starx[i]+=(i%5-2)/5;
		if (stary[i]<shigh+sdown) {
			star[i].style.top=stary[i]+"px";
			star[i].style.left=starx[i]+"px";
		}
		else {
			star[i].style.visibility="hidden";
			starv[i]=0;
			return;
		}
	}
	else {
		star[i].style.visibility="hidden";
	}
}


document.onmousemove=mouse;
function mouse(e) {
	if (e) {
		y=e.pageY;
		x=e.pageX;
	}
	else {
		set_scroll();
		y=event.y+sdown;
		x=event.x+sleft;
	}
}

window.onscroll=set_scroll;
function set_scroll() {
	if (typeof(self.pageYOffset)=='number') {
		sdown=self.pageYOffset;
		sleft=self.pageXOffset;
	}
	else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
		sdown=document.body.scrollTop;
		sleft=document.body.scrollLeft;
	}
	else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
		sleft=document.documentElement.scrollLeft;
		sdown=document.documentElement.scrollTop;
	}
	else {
		sdown=0;
		sleft=0;
	}
}

function createDiv(height, width) {
	var div=document.createElement("div");
	div.style.position="absolute";
	div.style.height=height+"px";
	div.style.width=width+"px";
	div.style.overflow="hidden";
	return (div);
}
