/*
------------ Psuedo Code ---------------
+ On Page Load
    - Buttons are Dnynamically loaded to page
        - Button Text is pulled from a predetermined Array
            - For Loop to filter through and add. 
    - Search Bar Shows with a Submit button. 

+ When Animal Button is clicked
    - Previous Selected Animal photos are cleared out
    - 9 Static Photos are Displayed on the Page 
            - Need to include static_url, animated_url, and image_state as attributes
            - For loop of the data set pulled 
            - Flex Wrap?
        - Each photo will have the Rating of the Photo also show. 

+ When any static picture is clicked
    - Image will change to animated
        - by using the animated_url attribute
+ When any animated picture is clicked
    - Image will change to static
        - by using the static_url attribute

+ When Add Animal Field is Filled & Submit button is Clicked
    - New Animal is added to array. 
    - Buttons are dynamically reloaded to page. 
    - Text field is cleared out. 


    */

$(document).ready(function () {

    // ------------- Global Variables ----------------

    var characters = ["Michael Scott", "Pickle Rick", "Andy Dwyer"];



    // --------------- Function to Create Buttons ----------------
    function createButtons() {
        $("#button-list").empty();

        for (var i = 0; i < characters.length; i++) {
            var movieButton = $("<button>");
            movieButton.attr("class", "btn btn-secondary mx-1 my-1");
            movieButton.attr("data-name", characters[i]);
            movieButton.attr("id", "quick-button");
            movieButton.text(characters[i]);
            $("#button-list").append(movieButton);
        }
    };

    // --------------- Function Add Buttons from Input Field on Click-------
    $("#gif-input-button").on("click", function (event) {
        event.preventDefault();
        var addCharacter = $("#character-add-input").val().trim();
        console.log(addCharacter);
        characters.push(addCharacter);
        createButtons();
        $("#character-add-input").val("")
    });

// --------------------- Generate GIFs on Button Click -----------------------
    $(document).on("click", "#quick-button", function(){
        var person = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=cshvEUcxDKKEJn7eiyRt3ooPG6TAGXFn&limit=10";

        $("#gif-results").empty();

        // ----------- AJAX Call to Giphy -------------
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response){
                var results = response.data;
                console.log(results);

                for (var j = 0; j < results.length; j++){
                    var picDiv = $("<div>");
                    var p = $("<p>");
                    var stillImage = results[j].images.fixed_height_still.url;
                    var gifImage = results[j].images.fixed_height.url;

                    picDiv.attr("class", "float-left");
                    p.attr("class", "text-center");
                    p.text("This Picture Is Rated: " + results[j].rating.toUpperCase());

                    var picImg = $("<img>");
                    picImg.attr("src", stillImage)
                        .attr("data-state", "still")
                        .attr("data-still", stillImage)
                        .attr("data-animate", gifImage)
                        .attr("class", "gif rounded mx-2 my-2");
                    
                    picDiv.append(picImg).append(p);

                    $("#gif-results").append(picDiv);

                }
            })
        
    });

    // -------------- Function to Change Gif to Animate/Still ---------

    $(document).on("click", ".gif", function(){
        var state = $(this).attr("data-state");

        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }

        if (state === "animate"){
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    })

    createButtons();
})