
var emotionArr = ["wow", "oops", "embarrassed", "stressed", "aww", "nervous", "inlove", "bored"];

function displayImg() {

    var emotion = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=aXmMbPBNO37tquVrNctuDBeK6VNPKNcK&limit=10"
    console.log(" this???  " + this)
    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
                
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var img = $("<img>");
            img.attr("src", results[i].images.fixed_height.url);
            gifDiv.append(p);
            gifDiv.append(img);
            $("#image-view").prepend(gifDiv);

             
        }

            console.log(queryURL)

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

        tvArr.push(input);

        buttons();

    });

    $(document).on("click", ".emo-btn", displayImg);

    buttons();


