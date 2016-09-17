
	function Costs() {
		var xhtml = new XMLHttpRequest();
			xhtml.open("GET", "https://api.guildwars2.com/v2/commerce/prices/19684", true);
			console.log(xhtml)
		var gwdat = xhtml.responseText;
		
		console.log(gwdat);
		var cos = gwdat.sells.unit_price;
		var mon = 5* cos;
		console.log(cos);
		console.log(mon);
		return mon;
	}
	
	document.getElementById("moneyz").innerHTML = Costs();
	
