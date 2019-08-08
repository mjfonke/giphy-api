
var emotionArr = ["happy", "bored", "sad", "stressed", "confident", "love", "excited", "awkward", "lol"];

function displayImg() {

    var emotion = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=aXmMbPBNO37tquVrNctuDBeK6VNPKNcK&limit=10"
    
    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response) {

        $("#image-view").empty();

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                
            var gifDiv = $("<div>");
            gifDiv.addClass("wrapper");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            p.addClass("rating-text");
            var img = $("<img>");
            img.addClass("gif");
            img.attr("src", results[i].images.fixed_height.url);
            img.attr("data-still", results[i].images.fixed_height_still.url);
            img.attr("data-animate", results[i].images.fixed_height.url);
            img.attr("data-state", "still");
            gifDiv.append(p);
            gifDiv.append(img);
            $("#image-view").prepend(gifDiv);
            }
             
        }

        });

    }
    

    function buttons() {
       
        $("#button-view").empty();

        for (var i = 0; i < emotionArr.length; i++) {
            var addButton = $("<button>");
            addButton.addClass("emo-btn");
            addButton.attr("data-name", emotionArr[i]);
            addButton.text(emotionArr[i]);
            $("#button-view").append(addButton);
        }
    }

    $("#emo-submit").on("click", function(event) {
        event.preventDefault();

        var input = $("#emo-input").val().trim();

        emotionArr.push(input);

        buttons();

    });

    buttons();

    $(document).on("click", ".emo-btn", displayImg);

    $(document).on("click", ".gif", function() {
        
        
        var state = $(this).attr("data-state");
        

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

        
    });
   

    

