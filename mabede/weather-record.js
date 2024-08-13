class WeatherRecord {
	constructor(moment, temperature, preciProb, windSpeed) {
		this.moment = moment;
		this.temperature = temperature;
		this.preciProb = preciProb;
		this.windSpeed = windSpeed;
	}

	toString = () => `{${this.moment}, ${this.temperature}, ${this.preciProb}, ${this.windSpeed}}`;
}

module.exports = WeatherRecord;
