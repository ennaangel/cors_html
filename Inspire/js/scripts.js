
//Obtain JSON data
var id = "451647"

//Function that gives the cite list in cites451647
var xhttp2 = new XMLHttpRequest();	
	console.log("Doing cite thingy")
	xhttp2.open("GET", "https://inspirehep.net/record/"+id+"?of=recjson&ot=title,recid,authors,reference", true); //Use https to solve the mixed content problem
	xhttp2.send(null); //make request
	xhttp2.onreadystatechange = function() {
		if (xhttp2.readyState == 4 && xhttp2.status == 200) {//wait till response
		var adcite = JSON.parse(xhttp2.response); //read in JSON
        	var dcite = adcite[0].reference
        	console.log(dcite);
		
		var loc2 = "cites451647"
		var dleng = dcite.length;
		var dlenn = dleng.toString();
		var dbeg = document.createTextNode("This article cites "+dlenn+" times.");
		document.getElementById(loc2).appendChild(dbeg);
		
		console.log("Starting for loop")
		for (var j = 1; j < dleng; j++) {//starting at j=1 as first article has not title	
			Create(dcite[j],j,loc2);
			};
		}
		};

//Pulling people that refered to article with this id and showing them.
var xhttp = new XMLHttpRequest();	
	xhttp.open("GET", "https://inspirehep.net/search?p=refersto:recid:"+id+"&of=recjson&ot=title,recid,authors", true); //Use https to solve the mixed content problem
	xhttp.send(null); //make request
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {//wait till response
		var idcite = JSON.parse(xhttp.response); //read in JSON
        	
        	console.log(idcite);
		
		var loc1 = "Refs451647"
		var leng = idcite.length;
		var lenn = leng.toString();
		var beg = document.createTextNode("This article as been cited "+lenn+" times.");
		document.getElementById(loc1).appendChild(beg);
		
		console.log("Starting for loop")
		for (var i = 0; i < leng; i++) {	
			Create(idcite[i],i,loc1);
			};
		}
		};





//Function that creates the div for every article
	function Create(cite,i,loc){
		
		var aDiv = document.createElement('div');
			var aaDiv = document.createElement('div');
			var abDiv = document.createElement('div');
		var Title = cite.title.title;
		var auth = cite.authors[0].full_name;

		aDiv.appendChild(aaDiv)
		aDiv.appendChild(abDiv)
		
		var rec = String(cite.recid)
		var urlll = '<a href="http://inspirehep.net/record/"'+rec + '">'+Title+'</a>'
		aaDiv.innerHTML = urlll;
			aaDiv.style.float="left";
			aaDiv.style.width="70%";
		abDiv.innerHTML = auth;
			abDiv.style.float="left";
		console.log(i)
		
		//make colour change every second div (kan vast cleaner)
		if (i%2 == 0){
		    	aaDiv.style.background="WhiteSmoke ";
			abDiv.style.background="WhiteSmoke ";
			aDiv.style.background="WhiteSmoke ";
		    }
		

		document.getElementById(loc).appendChild(aDiv);
	};


