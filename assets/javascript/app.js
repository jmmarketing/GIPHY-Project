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

    // --------------- On Click Function to Add Input Field to Array for Create Buttons Function-------
    $("#gif-input-button").on("click", function (event) {
        event.preventDefault();
        var addCharacter = $("#character-add-input").val().trim();
        console.log(addCharacter);
        characters.push(addCharacter);
        createButtons();
        $("#character-add-input").val("")
     
    });

    // --------------- Function to Create Buttons ----------------
    function createButtons() {
        $("#button-list").empty();

        // ------------- Local Storage -------------
        localStorage.setItem("arrayCharacters", JSON.stringify(characters));
        var newCharacters = JSON.parse(localStorage.getItem("arrayCharacters"));
        //------------------------------------------
        console.log(newCharacters.length);

        for (var i = 0; i < newCharacters.length; i++) {
            var movieButton = $("<button>");
            movieButton.attr("class", "btn btn-secondary mx-1 my-1");
            movieButton.attr("data-name", newCharacters[i]);
            movieButton.attr("id", "quick-button");
            movieButton.text(newCharacters[i]);
            $("#button-list").append(movieButton);
        }
    };

    // --------------------- Generate GIFs on Button Click -----------------------
    //----------------------------------------------------------------------------
    $(document).on("click", "#quick-button", function () {
        var person = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=cshvEUcxDKKEJn7eiyRt3ooPG6TAGXFn&limit=10";

        $("#gif-results").empty();
        $("#get-more").empty();

        // ----------- AJAX Call to Giphy -------------
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                console.log(results);

                for (var j = 0; j < results.length; j++) {
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

        // ------------- Add Load More Button to Bottom of Results ----------
        var loadMoreButton = $("<button>");
        loadMoreButton.attr("class", "btn btn-outline-primary btn-block my-4")
            .attr("data-name", person)
            .attr("data-offset", "10") // <-- important for the Load More Button
            .attr("id", "load-more-gifs")
            .text("Load More GIFs");
        $("#get-more").append(loadMoreButton);

    });

    // -------------- Function to Change Gif to Animate/Still ---------

    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }

        if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    })

    // --------------------- ADD 10 MORE GIFS ON CLICK -----------------------
    //-------------------------------------------------------------------------
    $(document).on("click", "#load-more-gifs", function () {
        var person = $(this).attr("data-name");
        var offset = parseInt($(this).attr("data-offset")) + 10;  // <--- Added this to offset so you dont get the same X# of posts again. 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            person + "&api_key=cshvEUcxDKKEJn7eiyRt3ooPG6TAGXFn&limit=10&offset=" + offset + "";

        // $("#gif-results").empty(); <--- Need to remove this so it doesnt keep reloading (ie Bad UX)
        $("#get-more").empty();

        // ----------- AJAX Call to Giphy -------------
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                console.log(results);

                for (var j = 0; j < results.length; j++) {
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

        // ------------- Add Load More Button to Bottom of Results ----------
        var loadMoreButton = $("<button>");
        loadMoreButton.attr("class", "btn btn-outline-primary btn-block my-4")
            .attr("data-name", person)
            .attr("data-offset", offset)
            .attr("id", "load-more-gifs")
            .text("Load 10 More GIFs");
        $("#get-more").append(loadMoreButton);

    });




    //------------ Create the initial Sample Buttons --------------
    createButtons();
})