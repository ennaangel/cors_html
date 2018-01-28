
//Obtain JSON data
var id = "451647"
var xhttp = new XMLHttpRequest();	
	xhttp.open("GET", "https://inspirehep.net/search?p=refersto:recid:"+id+"&of=recjson&ot=title,recid", true); //Use https to solve the mixed content problem
	xhttp.send(null); //make request
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {//wait till response
		var idcite = JSON.parse(xhttp.response); //read in JSON
        	
        	console.log(idcite);
			
		var leng = idcite.length;
		var lenn = leng.toString();
		var beg = document.createTextNode("This article as been cited "+lenn+" times.");
		document.getElementById("Refs451647").appendChild(beg);
		
		console.log("Starting for loop")
		for (var i = 0; i < leng; i++) {	
			Create(idcite[i],i);
			};
		}
		};


	function Create(idcite,i){
		
		var aDiv = document.createElement('div');
		var Title = idcite.title.title
		var atex = document.createTextNode(Title);
		
		//make colour change every second div
		if (i=){
		    aDiv.style.background=:"WhiteSmoke ";
		    }
		
		aDiv.appendChild(atex);
		document.getElementById("Refs451647").appendChild(aDiv);
	}
		
