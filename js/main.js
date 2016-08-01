// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
    
    //takes keywords and passes them to flickr for photos from tags
    function searchItems(whatTheUserTyped) {
        var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    
        //call the flicker api and get images that match typed keyword
        $.getJSON(flickerAPI, {
            tags: whatTheUserTyped,
            tagmode: "any",
            format: "json"
        })
        .done(function(data) {
            //clear out any previous results
            $('#images').empty();
      
            //update search title to include keywords
            $('h1.search-title').first()[0].innerHTML = "Search for: " + whatTheUserTyped;
        
            //iterate through all images in result and add them to dom 
            $.each( data.items, function( i, item ) {
              
                //create new li to hold image information
                var newListItem = $('<li class="result-img-wrapper">');
                
                // add actual image to container
                var newImgWrapper = $('<div class="image-pic-wrapper">').appendTo(newListItem);
                var newImg = $('<img class="image-pic">').attr( "src", item.media.m).appendTo(newImgWrapper);
                
                //add images details to container
                var newTitle = $('<p class="image-title">').html('<span class="img-heading">Title:</span> ' + item.title).appendTo(newListItem);
                var newDate = $('<p class="image-date">').html('<span class="img-heading">Date Taken:</span> ' + item.date_taken).appendTo(newListItem);
                var newTags = $('<p class="image-tags">').html('<span class="img-heading">Tags:</span> ' + item.tags).appendTo(newListItem);
                var newLink = $('<a>').attr('href', item.link).text('View on Flickr').appendTo(newListItem);

                //add image info container to image list
                newListItem.appendTo( "#images" );
          });
        });
    }
        
    $('button.search').on('click', function(event) {
        //prevent default behavior of submit button
        event.preventDefault();
     
        //get the keyword(s) typed by the user
        var $searchTextInput = $('input.form-control[name="searchText"]');
        var typedKeyWords = $searchTextInput.val();
        searchItems(typedKeyWords);
    });
});    



 
    // Place your code here, inside the document ready handler.

    // Create a function called `searchImages()`. This function will handle the
    // process of taking a user's search terms and sending them to Flickr for a
    // response.

    // Inside the `searchImages()` function, the following things should happen:

        // 1.   Accept a string value called `tags` as an argument. Example:
        //      `var searchPhotos = function(tags){`
        //
        // 2.   Define the location of the Flickr API like this:
        //      `var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";`
        //
        // 3.   Construct a `$.getJSON()` call where you send a request object
        //      including the tags the user submitted, and a `done()` handler
        //      that displays and refreshes the content appropriately.
        //
        // 4.   Update the display to add the images to the list with the id
        //      `#images`.

    // Attach an event to the search button (`button.search`) to execute the
    // search when clicked.

        // When the Search button is clicked, the following should happen:
        //
        // 1.   Prevent the default event execution so the browser doesn't
        //      Example: `event.preventDefault();`
        //
        // 2.   Get the value of the 'input[name="searchText"]' and use that
        //      as the `tags` value you send to `searchImages()`.
        //
        // 3.   Execute the `searchImages()` function to fetch images for the
        //      user.

    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target




