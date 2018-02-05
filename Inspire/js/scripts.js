
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
		var loc3 = "geninfo"
		var dleng = dcite.length;
		var dlenn = dleng.toString();
		var dbeg = document.createTextNode("This article cites "+dlenn+" times.");
		document.getElementById(loc2).appendChild(dbeg);
			
		//General info
		var info = document.createElement('div');
			info.innerHTML = "The article: " + adcite[0].title.title + " has the id: " String(adcite[0].recid);
			document.getElementById(loc1).appendChild(info);
		
		console.log("Starting for loop")
		for (var j = 0; j < dleng; j++) {//starting at j=1 as first article has not title
			console.log(dcite[j])
			Create(dcite[j],j,loc2,2);
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
			console.log(idcite[i])
			Create(idcite[i],i,loc1,1);
			};
		}
		};





//Function that creates the div for every article
	function Create(cite,i,loc,n){
		
		var aDiv = document.createElement('div'); //creates box and ads small boxes
			var aaDiv = document.createElement('div');
			var abDiv = document.createElement('div');
			var anDiv = document.createElement('div');
		if (n==1){
			var Title = cite.title.title;
			var auth = cite.authors[0].full_name;
		} else{
			var Title = cite.title;
			var auth = cite.authors;
		}
		console.log(Title)	
		console.log(auth)
		
		aDiv.appendChild(anDiv)
		aDiv.appendChild(aaDiv)
		aDiv.appendChild(abDiv)
		
		anDiv.style.width="5%";
		anDiv.style.float="left";
		
		if (n ==1){
				var rec = String(cite.recid)
				var urlll = '<a href="http://inspirehep.net/record/"'+rec + '">'+Title+'</a>'
				aaDiv.style.width="70%";
				abDiv.style.width="24%";
			}else{
				var urlll = Title
				aaDiv.style.width="50%";
				abDiv.style.width="44%";
				}
			anDiv.innerHTML = String(i+1)
			aaDiv.innerHTML = urlll;
			aaDiv.style.float="left";
			abDiv.innerHTML = auth;
			abDiv.style.float="left";
			aDiv.style.overflow= "auto";

		console.log(i)
		
		//make colour change every second div (kan vast cleaner)
		if (i%2 == 0){
		    	aaDiv.style.background="WhiteSmoke ";
			abDiv.style.background="WhiteSmoke ";
			aDiv.style.background="WhiteSmoke ";
			anDiv.style.background="WhiteSmoke ";
		    }
		

		document.getElementById(loc).appendChild(aDiv);
	};


