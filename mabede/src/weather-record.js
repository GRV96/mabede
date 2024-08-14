class WeatherRecord {
	constructor(moment, temperature, preciProb, windSpeed) {
		this.moment = moment;
		this.temperature = temperature;
		this.preciProb = preciProb;
		this.windSpeed = windSpeed;
	}

	toString = () => `WeatherRecord\n${JSON.stringify(this, null, 4)}`;
}

module.exports = WeatherRecord;
