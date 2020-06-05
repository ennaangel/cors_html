var tulls = [
	{name: "Chon-Ji",
	combos: ["Low block, step, punch"]
	},
	{name: "Dan-Gun",
	combos : ["Low block, step, punch","Rising block, rising block, rising block","Double block, step, punch","Shuto, step, punch"]	
	},
	{name: "Do-San",
	combos : ["Middle block, reverse punch","Finger thurst with support, release, back fist","Double middle block, teep, two punches"]
	},
	{name : "Won-Hyo",
	combos:["Double block, inward shuto, punch","Knifehand guard, Knifehand guard, Knifehand guard, fingerthurst with support","Circle block, teep, reverse punch"]
	},
	{name: "Yul-Gok",
	combos: ["Sidekick, elbow","Middle block, teep, two punches", "Hook grip, hook grip, punch", "Double block, fingerthurst with support", "Middle block, reverse punch"]
	},
	{name: "Joong-Gun",
	combos :["Backfist, release, reverse punch", "Supported middle block, punch, side-kick","Guard, double push block","Guard, double push block, hook"]
	},
	{name: "Toi-Gye",
	combos :["Jump, cross-block low in X-stance, supported middle block"]
	},
	{name: "Hwa-Rang",
	combos : ["Hammerfist, step, punch","Middle+Low block twice"]			
	},
	{name: "Choong-Moo",
	combos :["Low thrust, low block + backfist"]
	},
	{name: "Po-Un",
	combos: ["Horse stances","Horse stance, pull to hip, sideways doubel punch","Horse stance block, X-stance low block, horse stance guard","Horse stance middle+Low block twice","Horsestance pull to hip, supported punch"]
	},
	{name: "Kwan-Gae",
	combos: ["Circling opnening move"]
	},
	{name: "Choong-Jang",
	combos: ["Horse stance middle+Low block twice"]
	},
	{name: "Sam-Il",
	combos: ["Sidekick, elbow"]
	},
	{name: "Yoo-Sin",
	combos: ["Cross-block low, knifehand cross-block high, punch","Horse stance, supported middle block, sweep, supported middle block, sweep","Middle block, reverse punch, hook in tall stance"]
	}
];

var katas = [
	{name: "Heian Shodan",
	combos : ["Low block, step, punch", "Hammerfist, step, punch","Rising block, rising block, rising block"]	
	},
	{name: "Heian Nidan",
	combos : ["Double block, inward shuto, punch","Knifehand guard, Knifehand guard, Knifehand guard, fingerthurst with support","Circle block, teep, reverse punch"]		
	},
	{name: "Heian Sandan",
	combos : ["Middle+Low block twice", "Finger thurst with support, release, back fist","Horse stance, punch backwards"]			
	},
	{name: "Heian Yondan",
	combos: ["Sidekick, elbow"]
	},
	{name: "Heian Godan",
	combos: ["Middle block, reverse punch, hook in tall stance", "Cross-block low, knifehand cross-block high, punch","Low thrust, low block + backfist","Jump, cross-block low in X-stance, supported middle block"]
	},
	{name: "Tekki Shodan",
	combos: ["Horse stance, supported middle block, sweep, supported middle block, sweep","Horse stances","Horse stance, pull to hip, sideways doubel punch"]
	},
	{name: "Tekki Nidan",
	combos: ["Horse stance block, X-stance low block, horse stance guard"]
	},
	{name: "Tekki Sandan",
	combos: ["Horse stance middle+Low block twice","Horsestance pull to hip, supported punch"]
	},
	{name: "Kanku Dai",
	combos: ["Circling opnening move","Knifehand guard, Knifehand guard, Knifehand guard, fingerthurst with support","Low thrust, low block","Sidekick, elbow","Middle block, reverse punch"]
	}

];

//--------------------Filling the selector with option
selector = document.getElementById("tullselector")
for (tull in tulls){
	console.log(tulls[tull].name)
	option = document.createElement("option");
	option.value = tulls[tull].name
	option.text = tulls[tull].name
	selector.add(option);
}

selector2 = document.getElementById("kataselector")
for (kata in katas){
	console.log(katas[kata].name)
	optionk = document.createElement("option");
	optionk.value = katas[kata].name
	optionk.text = katas[kata].name
	selector2.add(optionk);
}

//---------------------- On click
function checkit(x){
	//tulls
	if (x==1){
		ind = selector.selectedIndex;
		shape = tulls[ind];
		combowindow = document.getElementById("rcombo");
		shapes = katas
		var comboid = "tullcombos"
		var shapeid = "dkatas"
	}
	
		//tulls
	if (x==2){
		ind = selector2.selectedIndex;
		shape = katas[ind];
		combowindow = document.getElementById("rkatacombo");
		shapes = tulls
		var comboid = "tkatacombos"
		var shapeid = "dtulls"
	}
	
	name = shape.name;
	
	// general;
	var divcombos = document.createElement("div");
	divcombos.innerText = "Combinations are: "
	divcombos.id = comboid
	divcombos.className += "combos"
	
	
	//looping trough combos
	for (i in shape.combos){
		var combination = shape.combos[i]
		console.log(combination);
		var divcombocont = document.createElement("div");
		var divcombo = document.createElement("div");
		divcombo.innerText = combination;
		divcombo.className += "combo"
		divcombocont.appendChild(divcombo);
	
		
		//Checking otjer forms/shapes
		var divshapes = document.createElement("div");
		for (j in shapes){
			if (shapes[j].combos.indexOf(combination) >= 0){
				console.log(shapes[j].name)
				var shape2 =  document.createElement("div");
				shape2.innerText = shapes[j].name
				divshapes.appendChild(shape2);
			}
		divshapes.id = shapeid
		divcombocont.appendChild(divshapes);
		}
		
	divcombos.appendChild(divcombocont);
	}
	
	combowindow.lastChild.remove()
	combowindow.appendChild(divcombos)
	}; 

