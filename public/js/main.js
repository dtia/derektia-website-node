function getPage() {
	var xmlhttp = null;
	var url = $('#url').val();
	
	$.ajax({
		type: "POST",
		url: '/content',
		data: {
			url: url
		},
		success: function(data) {
			setHTML(data);
		}
	});
}

function setHTML(data) {
	generateTagTable(data.tagMap);
	generateSourceWithHighlightTags(data.tagMap, data.source);
}

function generateTagTable(tagMap) {
	var tableObject = $('#tagmap');

	Object.keys(tagMap).forEach(function(tag) {
		var row = $('<tr>');
		var tagObject = $('<td>').text(tag);
		var countObject = $('<td>').text(tagMap[tag]);
		row.append(tagObject).append(countObject);
		tableObject.append(row);
	});

	$('#tagmap').html(tableObject.html());
}

function generateSourceWithHighlightTags(tagMap, source) {
	
	Object.keys(tagMap).forEach(function(tag) {


		// var thisIndex = source.indexOf(escapedTag);
		// var indexStart = 0;

		// var escapedTag = '<' + tag + '>';
		// var wrappedTag = '<span class="' + tag + '">' + escapedTag + '</span>';
		// source = source.replace(escapedTag, wrappedTag);



		// while(thisIndex > -1 && thisIndex < source.length) {
		// 	indexStart = 0;
		// 	var escapedTag = escape('<' + tag + '>');
		// 	thisIndex = source.indexOf(escapedTag, indexStart);

		// 	// detach first half of string
		// 	var firstHalf = source.slice(indexStart, thisIndex);
		// 	// concat <span> with escaped tag
		// 	var wrappedTag = '<span>' + escapedTag + '</span>';
		// 	console.log(wrappedTag);
		// 	var secondHalf = source.slice(thisIndex+escapedTag.length);
		// 	source = firstHalf + wrappedTag + secondHalf;

		// 	indexStart = thisIndex + escapedTag.length;
		// 	console.log('index start', indexStart);
		// 	console.log('thisindex', thisIndex);
		// 	//console.log(source);
		// }
	});

	//console.log(source);
	
	$('#source').text(source);
}