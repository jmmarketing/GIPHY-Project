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

   $( document ).ready(function() {
   
    var inputCharacters = ["Michael Scott", "Pickle Rick", "Andy Dwyer"];



    // --------------- Function to Create Buttons ----------------
    function createButtons(){
        $("#button-list").empty();

        for (var i = 0; i < inputCharacters.length; i++){
            var movieButton = $("<button>");
            movieButton.attr("class", "btn btn-secondary mx-1");
            movieButton.attr("data-name", inputCharacters[i]);
            movieButton.text(inputCharacters[i]);
            $("#button-list").append(movieButton);
        }
    }

    // --------------- Function Add Buttons from Input Field -------

    createButtons();
   })