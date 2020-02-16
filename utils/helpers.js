module.exports = {
	toRegExp(str) {
		if (str[0] === "/" && str[str.length - 1] === "/") {
			return new RegExp(str.slice(1, -1));
		}
		const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		return new RegExp(escaped);
	},
	startsWith(str, prefix) {
		return str && str.indexOf(prefix) === 0;
	}
};
