class MabedeError {
	constructor(statusCode, content) {
		this.statusCode = statusCode;
		this.content = content;
	}

	toString = () => `[${this.statusCode}] ${this.content}`;
}

module.exports = MabedeError;
