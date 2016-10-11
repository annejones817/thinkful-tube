$(document).ready(function(event){
	

	function getResultsFromApi(search, callback) {
		var baseURL = 'https://www.googleapis.com/youtube/v3/search';
		var query = {
			q: search, 
			part: 'snippet',
			key: 'AIzaSyCoPg8hHzaPJWNZUb-NCk9lLeZZ1qosBRk'
		}
		$.getJSON(baseURL, query, callback);
	}

	var videoResult = function(title, id, imageSource, channel) {
		this.title=title; 
		this.id=id; 
		this.imageSource=imageSource; 
		this.videoUrl='https://www.youtube.com/watch?v=' + id; 
		this.channelUrl='https://www.youtube.com/channel/' + channel

	}

	function createVideoResults(data) {
		var videoResults = [];
		for (var i=0; i<data.items.length; i++) {
			 videoResults[i] = new videoResult(data.items[i].snippet.title, 
				data.items[i].id.videoId,
				data.items[i].snippet.thumbnails.medium.url, 
				data.items[i].snippet.channelId);
		}
		console.log(videoResults);
		displayResults(videoResults);
	}

	function displayResults(videoResults) {
		$('h1').text('Results');
		$('form').remove();
		var resultsHTML = '';
		if (videoResults.length) {
			videoResults.forEach(function(item){
			resultsHTML += '<div class="result-item"><h2>' + item.title + 
				'</h2><a target="_blank" href="' + item.videoURL +
				'"><img src="' + item.imageSource 
				+ '"></a><p class="channel-link"><a target="_blank" href="'
				+ item.channelUrl +'">See More Videos From This Channel</a></p></div>'	
			});
		}
		/*if (data.items) {
			data.items.forEach(function(item) {
				resultsHTML += '<div class="result-item"><h2>' + item.snippet.title + 
				'</h2><a target="_blank" href="https://www.youtube.com/watch?v=' + item.id.videoId +
				'"><img src="' + item.snippet.thumbnails.medium.url 
				+ '"></a><p class="channel-link"><a target="_blank" href="https://www.youtube.com/channel/'
				+ item.snippet.channelId +'">See More Videos From This Channel</a></p></div>'});
			 }*/ else {
				resultsHTML = '<p>Sorry, there are no vidoes that match your search</p>'
			}
		$('main').append(resultsHTML);
	}

	$('.youtube-search').submit(function(event){
		event.preventDefault();
		var search = $(this).find('input').val();
		getResultsFromApi(search, createVideoResults);
	});

});