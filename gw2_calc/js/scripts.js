//Define the items
var infu = [
	nine = {
		upgr:"+9",
		id: "49432",
		n: 1,
		base: 0
},
	seven = {
		upgr:"+7",
		id: "49430",
		n: 4,
		base: 448
},
	five = {
		upgr:"+5",
		id: "49428",
		n: 16,
		base: 2240
},
	three = {
		upgr:"+3",
		id: "49426",
		n: 64,
		base: 9424
},
	one = {
		upgr:"+1",
		id: "49424",
		n: 256,
		base: 38144
}
];

//loop over the items
for (var i = 0; i < infu.length; i++) {	
	Costs(infu[i]);
	
};

// Start of cost function
	function Costs(item) {
		var id = item.id
		var xhttp = new XMLHttpRequest();	
			xhttp.open("GET", "https://api.guildwars2.com/v2/commerce/prices/"+id, true);
			xhttp.send(null); //make request
			xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {//wait till response

				var gwdat 
				gwdat = JSON.parse(xhttp.response); //read in JSON
				
				console.log(gwdat);
				var cos = gwdat.sells.unit_price;
				var mon = item.n* cos + item.base; //calculating price
				console.log(cos);
				console.log(mon);
				
				Create(item,mon,cos)
				
			  }
			 };
		
		
	}
	
//Create div function
	function Create(item,mon,cos){
		
		var aDiv = document.createElement('div');
		aDiv.id = item.upgr;
		aDiv.className = "oneupgr"
		
		var atex = document.createTextNode("Cost one "+ item.upgr + " is " + cos + ", Total cost will be " + mon);
		aDiv.appendChild(atex);
		
		document.getElementById("moneyz").appendChild(aDiv);
		
	}