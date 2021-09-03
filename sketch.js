let weekDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let monthString = ["Janurary", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let bg;
let weather;
let gotWeather = false

function preload() {
	font = loadFont('avenir-next-lt-pro-demi.otf')
	dayBackground = loadImage("day.jpeg")
	eveningBackground = loadImage("evening.jpeg")
	nightBackground = loadImage("night.jpeg")
}

function setup() {
	let cnv = createCanvas(windowWidth, windowHeight);
	cnv.style('display', 'block');
	textFont(font)
	bg = [dayBackground, eveningBackground, nightBackground]


	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(showPosition);
	}

	function showPosition(position) {
		if (!gotWeather) {
			console.log("Latitude: " + position.coords.latitude + "\nLongitude: " + position.coords.longitude);
			APIKEY = "9da74ee5dd55228e5a73697139ccfaf7"

			let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${APIKEY}`;

			httpGet(url, 'json', true, function (response) {
				weather = response;
				console.log("GOT A RESPONSE")
				console.log(weather)
			});
			gotWeather = true;
		}

	}
}


function draw() {
	if (hour() > 20) {
		background(nightBackground)
	} else if (hour() > 16) {
		background(eveningBackground)
	} else {
		background(dayBackground)
	}

	textAlign(CENTER)
	let time = `${floor(hour() / 10)}${hour() % 10}:${floor(minute() / 10)}${minute() % 10}:${floor(second() / 10)}${second() % 10}`
	fill(206, 216, 227)
	fill(255)
	textSize(70)
	text(time, width / 2, 250)

	textAlign(LEFT)
	textSize(40)
	let now = new Date();
	let dayOfWeek = now.getDay()
	let date = `${weekDay[dayOfWeek]} ${day()} ${monthString[month()]}`
	text(date, 50, height - 100)

	if (weather) {
		textAlign(RIGHT);

		textSize(40)
		text(`${floor(weather.main.temp - 273)}°C`, width - 40, 60)
		textSize(20)
		text(`${weather.name}`, width - 40, 80)
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
  }