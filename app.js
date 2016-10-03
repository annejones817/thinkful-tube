$(document).ready(function(event){
	var baseURL = 'https://www.googleapis.com/youtube/v3/search';

	function getResultsFromApi(search, callback) {
		var query = {
			q: search, 
			part: 'snippet',
			key: 'AIzaSyCoPg8hHzaPJWNZUb-NCk9lLeZZ1qosBRk'
		}
		$.getJSON(baseURL, query, callback);
	}

	function displayResults(data) {
		$('h1').text('Results');
		$('form').remove();
		var resultsHTML = '';
		if (data.items) {
			data.items.forEach(function(item) {
				resultsHTML += '<div class="result-item"><h2>' + item.snippet.title + 
				'</h2><a target="_blank" href="https://www.youtube.com/watch?v=' + item.id.videoId +
				'"><img src="' + item.snippet.thumbnails.medium.url 
				+ '"></a><p class="channel-link"><a target="_blank" href="https://www.youtube.com/channel/'
				+ item.snippet.channelId +'">See More Videos From This Channel</a></p></div>'});
			 } else {
				resultsHTML = '<p>Sorry, there are no vidoes that match your search</p>'
			}
		$('main').append(resultsHTML);
	}

	$('.youtube-search').submit(function(event){
		event.preventDefault();
		var search = $(this).find('input').val();
		getResultsFromApi(search, displayResults);
	});

});