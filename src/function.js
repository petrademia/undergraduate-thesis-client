$( document ).ready(function() {
    
	$("#btn-keyword-search").click( function() {
		
		var keyword = $("input[name='input-keyword-search']").val();
		var count = $("input[name='input-tweet-count']").val();
		
		$.ajax({
			
			type: "POST",
			url: "http://127.0.0.1:5000/crawl",
			data: {
				'keyword' : keyword,
				'count' : count
			},
			success: function(data) {
				$.ajax({
					type: "POST",
					url: "http://127.0.0.1:5000/fetch",
					data: {
						'keyword' : keyword
					},
					success: function(data) {
						data.forEach( function(record) {
							
						} )
					}
				})
			}
			
		});
		
		$.ajax({
			type: "POST",
			url: "http://127.0.0.1:5000/fetch",
			data: {
				'keyword' : keyword
			},
			success: function(data) {
				console.log(data);
				data.forEach( function(el) {
					
					$("#span-content-id").text(el.id);
					
					var div = document.getElementById('div-predicted-image-category');
					div.innerHTML = 'Predicted Image Category: ' + (el.predicted_image_category ? el.predicted_image_category : '-');
					
					var div = document.getElementById('probability-predicted-image');
					div.innerHTML = 'Predicted Image Probability: ' + (el.probability_image ? el.probability_image : '-');
					
					var div = document.getElementById('div-predicted-text-category');
					div.innerHTML = 'Predicted Text Category: ' + (el.predicted_text_string ? el.predicted_text_string : '-');
					
					var div = document.getElementById('probability-predicted-text');
					div.innerHTML = 'Predicted Text Probability: ' + (el.probability_text ? el.probability_text : '-');
					
					$("#h2-processed-tweet").text(el.processed_tweet);
					
					$("#h2-original-tweet").text(el.original_tweet);
					
					$("#div-single-content").clone().attr('style', '').appendTo($("#div-collection-content"));
				});
			}
		});
		
		
	});
	
});