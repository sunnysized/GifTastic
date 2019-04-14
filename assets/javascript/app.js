$(document).ready(function () {

	var topics = ["Ariana Grande", "Neha Kakkar", "Lindsey Stirling", "Mickey Singh", "Migos", "The Weeknd"];
	var artistImage;

	function createButton() {
		for (var i = 0; i < topics.length; i++) 
		{
			artists = $("<button>");
			$(".container").append(artists);
			artists.attr({
				"class": "btn",
				"data-artist-name": topics[i]
			});
			artists.text(topics[i]);
				console.log(topics); 
		}
	};

	createButton();
	$("#new-artist").on("click", function (event) {
		event.preventDefault();
		$(".create-button").empty();

		var newArtist = $("#artist").val().trim();
		topics.push(newArtist);
		createButton();

	});

	$(document).on("click", ".btn", function () {

		var artists = $(this).attr("data-artist-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artists + "&api_key=gOhT5yVr007PciFEeeVBlG3xEWywuguj&limit=10";


		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function (response) {
			var results = response.data;

			for (var i = 0; i < results.length; i++) {

				var gifDiv = $("<div>");
				var rating = results[i].rating;
				var p = $("<p>").text("Rating: " + rating);

				artistImage = $("<img>");
				artistImage.attr({
					"src": results[i].images.original_still.url,
					"data-animate": results[i].images.original.url,
					"data-still": results[i].images.original_still.url,
					"data-state": "still",
					"class": "gif"
				});
				gifDiv.prepend(p);
				gifDiv.prepend(artistImage);
				$(".gifs").prepend(gifDiv);
			};
			gifDiv.prepend(artistImage);
		});
	});

	$(document).on("click", ".gif", function () {

		var state = $(this).attr("data-state");

		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});
});