var _ = require('underscore');

function Util() {}

Util.parseTags = function(body) {
	var whitelistTags = ['br', 'input', 'img', 'script', 'meta'];
	var tags = body.match(/(<([^>]+)>)/ig);
	var tagMap = {};
	
	_.each(tags, function(tag) {
		var strippedTag = tag.slice(1); // remove <
		strippedTag = strippedTag.split(' ')[0]; // extract main tag

		if (strippedTag[strippedTag.length-1] === '>')
			strippedTag = strippedTag.slice(0, strippedTag.length - 1);

		if (strippedTag[0] !== '/') {
			if (tagMap[strippedTag]) {
				tagMap[strippedTag].count++;
			}
			else {
				tagMap[strippedTag] = { count: 1, matched: 0 };
			}
		}
		else {
			var keyTag = strippedTag.slice(1);
			if (tagMap[keyTag]) {
				tagMap[keyTag].matched++;
			}
		}
	});

	var filteredTagMap = {};
	_.each(tagMap, function(tagObject, key) {
		if (!_.contains(whitelistTags, key)) {
			if (tagObject.count === tagObject.matched)
				filteredTagMap[key] = tagObject.count;
		}
	});

	return filteredTagMap;
};

module.exports = Util;