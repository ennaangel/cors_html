
//Obtain JSON data
var id = "451647"
var xhttp = new XMLHttpRequest();	
			xhttp.open("GET", "https://inspirehep.net/search?p=refersto:recid:"+id+"&of=recjson&ot=title,recid", true); //Use https to solve the mixed content problem
			xhttp.send(null); //make request
			xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {//wait till response

				var idcite 
        idcite = JSON.parse(xhttp.response); //read in JSON
        
        console.log(idcite);
			}
			};

for (var i = 0; i < idcite.length; i++) {	
	Create(idcite[i]);
	
};

	function Create(idcite){
		
		var aDiv = document.createElement('div');
		var Title = idcite.title.title
		
		var atex = document.createTextNode(Title);
		aDiv.appendChild(atex);
		
		document.getElementById("Refs451647").appendChild(aDiv);
		
