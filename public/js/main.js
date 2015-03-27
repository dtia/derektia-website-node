var lastHighlightedTag;

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
		var tagObject = $('<td onClick=highlightTag("'+ tag +'")>').text(tag);
		var countObject = $('<td>').text(tagMap[tag]);
		row.append(tagObject).append(countObject);
		tableObject.append(row);
	});

	$('#tagmap').html(tableObject.html());
}

function generateSourceWithHighlightTags(tagMap, source) {
	
	Object.keys(tagMap).forEach(function(tag) {
		var searchTag = '<' + tag + '>';
		var wrappedTag = '|SPLITME|<span class="' + tag + '"> ' + encodeURI(searchTag) + ' </span>|SPLITME|';
		source = source.replace(searchTag, wrappedTag);
	});

	var splitLines = source.split('|SPLITME|');
	var sourceElement = $('#source');
	splitLines.forEach(function(line, index) {
		if (index % 2 === 1) {
			sourceElement.append(line);
		}
		else {
			var text = document.createTextNode(line);
			sourceElement.append(text);
		}
	});
	
	$('#source').html(sourceElement.html());
}

function highlightTag(tag) {
	var tagObjects = $('#source').find('.' + tag);
	for (var i=0; i < tagObjects.length; i++) {
		$(tagObjects[i]).addClass('highlight');
	}
	unhighlightTag(lastHighlightedTag);
	lastHighlightedTag = tag;
}

function unhighlightTag(tag) {
	if (tag) {
		var tagObjects = $('#source').find('.' + tag);
		for (var i=0; i < tagObjects.length; i++) {
			$(tagObjects[i]).removeClass('highlight');
		}	
	}
}