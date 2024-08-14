class WeatherRecord {
	constructor(moment, temperature, preciProb, windSpeed) {
		this.moment = moment;
		this.temperature = temperature;
		this.preciProb = preciProb;
		this.windSpeed = windSpeed;
	}

	toString = () => `WeatherRecord\n{\n\tmoment: ${this.moment},\n\ttemperature: ${this.temperature},\n\tpreciProb: ${this.preciProb},\n\twindSpeed: ${this.windSpeed}\n}`;
}

module.exports = WeatherRecord;
