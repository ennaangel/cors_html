var E =50;
var F =10;
var G =20;
var H =80;

var loc = "equil";

function starter(){
	var E = Number(document.getElementById("1inp").value);
	var F = Number(document.getElementById("3inp").value);
	var G = Number(document.getElementById("5inp").value);
	var H = Number(document.getElementById("7inp").value);
	var p2 = calculatep(E,F,G,H);
	var np2 = 1-p2
	console.log(p2);
	
	var A = Number(document.getElementById("0inp").value);
	var B = Number(document.getElementById("2inp").value);
	var C = Number(document.getElementById("4inp").value);
	var D = Number(document.getElementById("6inp").value);
	var p1 = calculatep(A,C,B,D);
	var np1 = 1-p1
	console.log(p1);	
	
	document.getElementById("p1I").innerHTML = "P = "+parseFloat(p1).toFixed(3)
	document.getElementById("p1II").innerHTML = "(1-P) = "+parseFloat(np1).toFixed(3)
	document.getElementById("p2I").innerHTML = "Q = "+parseFloat(p2).toFixed(3)
	document.getElementById("p2II").innerHTML = "(1-Q) = "+parseFloat(np2).toFixed(3)
	
	}

	function calculatep(E,F,G,H){
		var x = H-F;
		console.log(x);
		var y = E + H-F-G;
		console.log(y);
		var p = (H-F)/(E+H-F-G);
		return p
	};
	
	