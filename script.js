
document.addEventListener('DOMContentLoaded', ()=>{
	const savedData = localStorage.getItem('weatherData');
	if(savedData){
		showWeatherInfo(JSON.parse(savedData));
	}
})



form.addEventListener('submit', async (e) => {
	e.preventDefault();

	const apiCity = cityInput.value;

	try {
		const response = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${apiCity}`
		);
		if (!response.ok) {
			throw new Error('Error');
		}

		const data = await response.json();

		localStorage.setItem('weatherData', JSON.stringify(data));

		showWeatherInfo(data);
	} catch (err) {
		alert('Error')
		console.error(err);
	}
});



// showWeatherInfo

function showWeatherInfo(data){
	const weatherInfo = document.getElementById('weatherInfo');

	const iconUrl = data.current.condition.icon.startsWith('//')
		? 'https:' + data.current.condition.icon
		: data.current.condition.icon;

	weatherInfo.innerHTML =
	`<div class="weather-card">
		<div class="weather-card__info">
		<h2>${data.location.name}</h2>
		<p><span class="thermometer"></span> ${data.current.temp_c}</p>
		<p><span class="wind"></span>${data.current.wind_kph}</p>
		<p><span class="cloud"></span>${data.current.cloud}</p>
		</div>
		<div class="weather-card__img">
			<img src="${iconUrl}" alt='icon'>
		</div>
	</div>`
}


//createSnowflake


function createSnowflake() {
	const snowflake = document.createElement("div");
	snowflake.className = 'snowflake';
	snowflake.textContent = '❄';
	snowflake.style.left = Math.random() * 100 + 'vw' 
	snowflake.style.animationDuration = Math.random() * 3 + 7 + 's' 
	snowflake.style.fontSize = Math.random() * 10 + 10 + 'px' 
	document.querySelector('.snowflakes').appendChild(snowflake);
	setTimeout(() => snowflake.remove(), 10000) 

}
setInterval(createSnowflake, 300);



const grinch = document.querySelector('.grinch');


//getRandomPosition

function getRandomPosition(){
	const padding = 150;
	const y = Math.random() * (window.innerHeight - padding);
	const x = Math.random() * (window.innerWidth - padding);
	return {x , y};
};



grinch.addEventListener('mouseenter', ()=>{
	const {x , y} = getRandomPosition();
	grinch.style.left = `${x}px`;
	grinch.style.top = `${y}px`;
	grinch.style.right = 'auto';
	grinch.style.bottom = 'auto';

	grinch.style.transform = `scale(0.95) rotate(${Math.random() * 20 - 10}deg)`;
});






