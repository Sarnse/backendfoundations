 var gameState;

gameState = {
	year : 0,
	starved : 0,
	newcomers : 0,
	population : 0,
	acres : 0,
	bushels : 0,
	harvest : 0,
	rats : 0,
	price : 0,
	internalAcres : 0,
	internalBushels : 0,
	totalStarved: 0
};

function minimum(firstValue, secondValue, thirdValue) {
	if (firstValue <= secondValue) {
		if (firstValue <= thirdValue) {
			return firstValue;
		} else {
			return thirdValue;
		}
	} else if (secondValue <= thirdValue) {
		return secondValue;
	} else {
		return thirdValue;
	}
}

function getSlider(sliderId) {
	return document.getElementById(sliderId);
}

function updateSliderValueOutput(sliderId, outputElementId) {
	document.getElementById(outputElementId).innerHTML = document.getElementById(sliderId).value;
}

function writeGameState() {
	document.getElementById("year").innerHTML = "The report for year: " + gameState.year;
	document.getElementById("starved").innerHTML = "Starved: " + gameState.starved;
	document.getElementById("newcomers").innerHTML = "Newcomers: " + gameState.newcomers;
	document.getElementById("population").innerHTML = "Population: " + gameState.population;
	document.getElementById("acres").innerHTML = "Acres: " + gameState.acres;
	document.getElementById("bushels").innerHTML = "Bushels: " + gameState.bushels;
	document.getElementById("harvest").innerHTML = "Harvest: " + gameState.harvest;
	document.getElementById("rats").innerHTML = "Rats: " + gameState.rats;
	document.getElementById("price").innerHTML = "Price: " + gameState.price;

	updateSliderValueOutput("sliderAcrestosellbuy", "outputAcrestosellbuy");
	updateSliderValueOutput("sliderFeedpeople", "outputFeedpeople");
	updateSliderValueOutput("sliderPlantwithseed", "outputPlantwithseed");
}

function gameStart() {
	gameState.year = 1;
	gameState.starved = 0;
	gameState.newcomers = 5;
	gameState.population = 100;
	gameState.acres = 1000;
	gameState.bushels = 2800;
	gameState.harvest = 3;
	gameState.rats = 200;
	gameState.price = randomNumber(10) + 16;
	gameState.internalAcres = gameState.acres;
	gameState.internalBushels = gameState.bushels;
	gameState.totalStarved = 0;

	var acresSlider = getSlider("sliderAcrestosellbuy");
	acresSlider.min = -gameState.acres;
	acresSlider.max = Math.floor(gameState.internalBushels / gameState.price);
	acresSlider.value = 0;
	acresSlider.step = 1;

	var feedSlider = getSlider("sliderFeedpeople");
	feedSlider.min = 0;
	feedSlider.max = gameState.internalBushels;
	feedSlider.value = 0;
	feedSlider.step = 1;

	var plantSlider = getSlider("sliderPlantwithseed");
	plantSlider.min = 0;
	plantSlider.max = minimum(gameState.internalAcres, 10 * gameState.population, gameState.internalBushels);
	plantSlider.value = 0;
	plantSlider.step = 1;

	writeGameState();
}

function updateInternalAcres() {
	gameState.internalAcres = gameState.acres + parseInt(getSlider("sliderAcrestosellbuy").value);
}

function updateInternalBushels() {
	var acresToSellOrBuy = parseInt(getSlider("sliderAcrestosellbuy").value);
	var bushelsForFeeding = parseInt(getSlider("sliderFeedpeople").value);
	var bushelsForPlanting = parseInt(getSlider("sliderPlantwithseed").value);
	gameState.internalBushels = gameState.bushels - acresToSellOrBuy * gameState.price - bushelsForFeeding - bushelsForPlanting;
}

function updateMaximumAcresToSellBuy() {
	var acresSlider = getSlider("sliderAcrestosellbuy");
	acresSlider.max = Math.floor(gameState.internalBushels / gameState.price) + parseInt(acresSlider.value);
}

function updateMaximumFeedPeople() {
	var feedSlider = getSlider("sliderFeedpeople");
	feedSlider.max = gameState.internalBushels + parseInt(feedSlider.value);
}

function updateMaximumPlantWithSeed() {
	var plantSlider = getSlider("sliderPlantwithseed");
	plantSlider.max = minimum(gameState.internalAcres, 10 * gameState.population, gameState.internalBushels + parseInt(plantSlider.value));
}

function onChangeAcres(elementId) {
	if (elementId === "minusbuttonAcrestosellbuy") {
		getSlider("sliderAcrestosellbuy").value = parseInt(getSlider("sliderAcrestosellbuy").value) - 1;
	} else if (elementId === "plusbuttonAcrestosellbuy") {
		getSlider("sliderAcrestosellbuy").value = parseInt(getSlider("sliderAcrestosellbuy").value) + 1;
	}
	updateSliderValueOutput("sliderAcrestosellbuy", "outputAcrestosellbuy");
	updateInternalAcres();
	updateInternalBushels();
	updateMaximumFeedPeople();
	updateMaximumPlantWithSeed();
}

function onChangeFeeding(elementId) {
	if (elementId === "minusbuttonFeedpeople") {
		getSlider("sliderFeedpeople").value = parseInt(getSlider("sliderFeedpeople").value) - 1;
	} else if (elementId === "plusbuttonFeedpeople") {
		getSlider("sliderFeedpeople").value = parseInt(getSlider("sliderFeedpeople").value) + 1;
	}
	updateSliderValueOutput("sliderFeedpeople", "outputFeedpeople");
	updateInternalBushels();
	updateMaximumAcresToSellBuy();
	updateMaximumPlantWithSeed();
}

function onChangePlanting(elementId) {
	if (elementId === "minusbuttonPlantwithseed") {
		getSlider("sliderPlantwithseed").value = parseInt(getSlider("sliderPlantwithseed").value) - 1;
	} else if (elementId === "plusbuttonPlantwithseed") {
		getSlider("sliderPlantwithseed").value = parseInt(getSlider("sliderPlantwithseed").value) + 1;
	}
	updateSliderValueOutput("sliderPlantwithseed", "outputPlantwithseed");
	updateInternalBushels();
	updateMaximumAcresToSellBuy();
	updateMaximumFeedPeople();
}

function randomNumber(maxValue) {
	var number = Math.floor(Math.random() * maxValue + 1);
	return number;
}

function plague() {
	var plagueOccurs;
	if (randomNumber(100) <= 15) {
		plagueOccurs = true;
	} else {
		plagueOccurs = false;
	}
	return plagueOccurs;
}

function ratsProblem() {
	var ratsProblemOccurs;
	if (randomNumber(10) <= 4) {
		ratsProblemOccurs = true;
	} else {
		ratsProblemOccurs = false;
	}
	return ratsProblemOccurs;
}

function bushelsEatenByRats() {
	var bushelsEaten;
	if (ratsProblem()) {
		bushelsEaten = Math.floor((randomNumber(3) / 10) * gameState.bushels);
	} else {
		bushelsEaten = 0;
	}
	return bushelsEaten;
}

function harvestPerAcre() {
	var harvest = randomNumber(8);
	return harvest;
}



function calculateStarvedPeople() {
	var numberPeopleStarved = gameState.population - Math.floor(parseInt(getSlider("sliderFeedpeople").value) / 20);
	if (numberPeopleStarved <= 0) {
		return 0;
	} else {
		return numberPeopleStarved;
	}
}

function calculateNewcomers() {
	return Math.floor((20 * gameState.internalAcres + gameState.internalBushels) / (100 * gameState.population)) + 1;
}


function tooManyPeopleStarved() {
	var originalPopulation = gameState.population + gameState.starved - gameState.newcomers;
	if (Math.floor((gameState.starved / originalPopulation) * 100) > 45) {
		return true;
	} else {
		return false;
	}
}


function finishTurn() {
	if (plague()) {
		alert("A horrible plague occured!\n" + "Half of your population died.");
		gameState.population = Math.floor(gameState.population / 2);
	}
	gameState.starved = calculateStarvedPeople();
	gameState.totalStarved = gameState.totalStarved + gameState.starved;
	gameState.newcomers = calculateNewcomers();
	gameState.population = gameState.population - gameState.starved + gameState.newcomers;
	gameState.harvest = harvestPerAcre();
	gameState.bushels = gameState.internalBushels + gameState.harvest * parseInt(getSlider("sliderPlantwithseed").value);
	gameState.rats = bushelsEatenByRats();
	gameState.bushels = gameState.bushels - gameState.rats;
	gameState.internalBushels = gameState.bushels;
	gameState.price = randomNumber(10) + 16;
	gameState.acres = gameState.internalAcres;

	if (gameState.year < 10 && !tooManyPeopleStarved()) {
		gameState.year++;

		var acresSlider = getSlider("sliderAcrestosellbuy");
		acresSlider.min = -gameState.acres;
		acresSlider.max = Math.floor(gameState.internalBushels / gameState.price);
		acresSlider.value = 0;
		acresSlider.step = 1;

		var feedSlider = getSlider("sliderFeedpeople");
		feedSlider.min = 0;
		feedSlider.max = gameState.internalBushels;
		feedSlider.value = 0;
		feedSlider.step = 1;

		var plantSlider = getSlider("sliderPlantwithseed");
		plantSlider.min = 0;
		plantSlider.max = minimum(gameState.internalAcres, 10 * gameState.population, gameState.internalBushels);
		plantSlider.value = 0;
		plantSlider.step = 1;

		writeGameState();
	} else if (tooManyPeopleStarved()) {
		alert("You have starved over 45% of the population!\n" + "You have been kicked out of office.\n" + "Try again.");
		gameStart();
	} else {
		var averagePeopleStarved = Math.floor(gameState.totalStarved / 10);
		var acrePerPerson = Math.floor(gameState.acres / gameState.population);
		alert("Overall performance\n" + "Average people starved per year: " + averagePeopleStarved + "\n" + "Population: " + gameState.population + "\n" + "Acres per person: " + acrePerPerson);
		gameStart();
	}
}
