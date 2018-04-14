$( document ).ready(function() {
    
	$("#btn-keyword-search").click( function() {
		
		var keyword = $("input[name='input-keyword-search']").val();
		var count = $("input[name='input-tweet-count']").val();
		
		// $.ajax({
					// type: "POST",
					// url: "http://127.0.0.1:5000/fetch",
					// data: {
						// 'keyword' : keyword
					// },
					// success: function(data) {
						// data.forEach( function(record) {
							// console.log(record);
						// } )
					// }
				// });
		
		
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
							
							var predictedImageCategory = record.predicted_image_string ? record.predicted_image_string : "-";
							$("#h1-predicted-image-category").text(predictedImageCategory);
							
							$("#span-image-category").text(predictedImageCategory);
							
							var predictedImageProbability = record.probability_image ? record.probability_image : "-";
							$("#h2-predicted-image-probability").text(predictedImageProbability);
							
							
							var imageUrl = record.image_url ? record.image_url : "http://d2pa5gi5n2e1an.cloudfront.net/id/images/common/no_image_l.gif";
							$("#anchor-image").attr("href", imageUrl);
							$("#img-image").attr("src", imageUrl);
							
							$("#p-processed-tweet").text(record.processed_tweet);
							$("#p-em-original-tweet").text(record.original_tweet);
							
							$("#h1-predicted-text-category").text(record.predicted_text_string);
							
							$("#span-text-category").text(record.predicted_text_string);
							
							$("#h2-predicted-text-probability").text(record.probability_text);
							
							$("#div-single-content").clone().attr("style", "").appendTo("#div-collection-content");
							
						} )
					}
				})
			}
			
		});
		
		
	});
	
});