

var id = "451647"
var xhttp = new XMLHttpRequest();	
			xhttp.open("GET", "http://inspirehep.net/search?p=refersto:recid:"+id+"&of=recjson&ot=recid", true);
			xhttp.send(null); //make request
			xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {//wait till response

				var idcite 
        idcite = JSON.parse(xhttp.response); //read in JSON
        
        console.log(idcite);
			}
