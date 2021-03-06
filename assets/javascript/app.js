$(document).ready(function (){
    console.log("running");
    //Objectives
    // Think deeply about what this model does, figure out what gif maker does differently.
    // Add static buttons to top of page that generate 10 gifs when clicked.
    // Correctly tie user gen buttons to API.
    gif = [];
    gifs = [];
    // displayGif function re-renders the HTML to display the appropriate content
    var mainLoop = function ajaxLoop() {

        var gif = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
            // Entering first Object for easier iterating...
            var results = response.data;
            //Iterating through returned data to build images / appending them to page.
            for (var i = 0; i < results.length; i++) {
                //Making it family-friendly!
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var gifDiv = $("<div>");

                    //Show rating block
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(p);

                    // Creating the Image itself...
                    var genGif = $("<img>");
                    genGif.attr("src", results[i].images.fixed_height_still.url);

                    // adding static
                    genGif.attr("data-still", results[i].images.fixed_height_still.url);

                    genGif.attr("data-animate", results[i].images.fixed_height.url);

                    genGif.attr("data-state", "still");

                    gifDiv.append(genGif);

                    $("#gif-view-inside").prepend(gifDiv);
                }; // closing ratings req.
            }; // closing for loop.
        }) //closing response function
    };

    // $('button').on('click', ajaxLoop());


    // Function for displaying gif data
  function renderButtons() {

    for (var i = 0; i < gifs.length; i++) {

      var a = $("<button>");
      // Adding a data-attribute
      a.attr("data-name", gifs[i]);
      // Providing the initial button text
      a.text(gifs[i]);
      // Adding the button to the gen-buttons-view div
      $("#gen-buttons-view").append(a);
    }
};
      // This function handles events where a user gen gif button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();
        console.log(gif);
        // Adding gif from the textbox to our array
        gifs.push(gif);
        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
      });

      // PAUSING AND UNPAUSING GIFs...
    var displayGif = function animate(event) {
        event.preventDefault();
        console.log("State change active!");
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    };


        // WE need one for the gifs to pause.unpause
        // one to generate gifs
        // one for the button already on the page
        // gif buttons on page


    $(document).on("click", "img", displayGif);
    $(document).on("click", "button", mainLoop);
    //   // Calling the renderButtons function to display the intial buttons
    //   renderButtons();
}); // End Document Ready..
