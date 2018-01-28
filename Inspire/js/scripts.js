
//Obtain JSON data
var id = "451647"
var xhttp = new XMLHttpRequest();	
	xhttp.open("GET", "https://inspirehep.net/search?p=refersto:recid:"+id+"&of=recjson&ot=title,recid,publication_info", true); //Use https to solve the mixed content problem
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

//Function that creates the div for every article
	function Create(idcite,i){
		
		var aDiv = document.createElement('div');
		
		var Title = idcite.title.title;
		var year = idcite.publication_info.year;
		var atit = document.createTextNode(Title);
		var ayear = document.createTextNode(year);
		console.log(i)
		
		//make colour change every second div
		if (i%2 == 0){
		    aDiv.style.background="WhiteSmoke ";
		    }
		
		aDiv.innerHTML = Title;
		document.getElementById("Refs451647").appendChild(aDiv);
	}
		
