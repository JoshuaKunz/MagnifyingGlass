// Don't run this code until the page content has finished loading
// $(selector).method();
//$(document).ready(function() {});

// Use the shortcut for the above code...
$(function () {

    var nativeWidth = 0,
        nativeHeight = 0,
        $magnifyDiv = $('.magnify'),
        $smallImage = $('.small');

    // Only after the actual dimensions of our image are available
    // will our script show the "zoomed" version of the image.
    //
    // Since nativeWidth and nativeHeight start at 0, we need
    // to obtain the image's actual dimensions after it has 
    // finished loading.
    //
    // Let's reload the image into a new object so we can get
    // its unmodified dimensions...
    var imageObject = new Image();

    // Preload the large version of the image
    imageObject.src = $smallImage.attr('src');

    console.log(imageObject.src + "\nThe width of imageObject is " + imageObject.width + "\nThe height is " + imageObject.height);

    // We need to wait until the new image has finished loading.
    //
    // Could do this in jQuery using the ready() method again
    //    eg $(imageObject).ready(function() {});
    //
    // OR just do it in plain JavaScript
    //
    // older event handling way: imageObject.onload = function() {};
    //
    imageObject.addEventListener('load', function () {

        // Create needed variables
        var magnifyOffset,
            mouseX,
            mouseY,
            $glass = $('.large'),
            //glassWidth = document.querySelector('.large').width,
            glassWidth = $glass.width(),
            glassHeight = $glass.height(),
            smallImageWidth = $smallImage.width(),
            smallImageHeight = $smallImage.height(),
            halfGlassWidth = glassWidth / 2,
            halfGlassHeight = glassHeight / 2,
            backgroundX,
            backgroundY,
            posX,
            posY;

        console.log('glassWidth = ' + glassWidth + '\nglassHeight = ' + glassHeight);

        // Remember the native dimensions
        nativeWidth = imageObject.width;
        nativeHeight = imageObject.height;

        // When the user moves the mouse anywhere within div.magnify
        // do the following...
        $magnifyDiv.mousemove(function (e) {

            // Get the coordinates of our container element 
            // (div.magnify) relative to the edges of the page
            magnifyOffset = $magnifyDiv.offset();

            console.log('left offset = ' + magnifyOffset.left + '\ntop offset = ' + magnifyOffset.top);

            // Subtract the top and left offset values to get our 
            // true mouse position relative to the top and left 
            // edges of div.magnify.
            mouseX = e.pageX - magnifyOffset.left;
            mouseY = e.pageY - magnifyOffset.top;

            console.log('mouse X = ' + mouseX + '\nmouse Y = ' + mouseY);

            // Fade in the magnifying glass when over div.magnify
            $glass.stop(true).fadeIn(25);

            // Make the magnifying glass follow the mouse.
            //
            // Do calculations to "zoom" to the correct position
            // in the larger background image of our glass that
            // corresponds to where the mouse pointer is on the
            // smaller image.

            // Set up to center the glass over the mouse pointer
            posX = mouseX - halfGlassWidth;
            posY = mouseY - halfGlassHeight;

            backgroundX = Math.round(mouseX / smallImageWidth *
                nativeWidth - halfGlassWidth) * -1;

            backgroundY = Math.round(mouseY / smallImageHeight *
                nativeHeight - halfGlassHeight) * -1;



            // Move the glass by setting its top and left CSS properties
            $glass.css({
                left: posX,
                top: posY,
                backgroundPosition: backgroundX + 'px ' + backgroundY + 'px'
            });

            // Fade out the mag glass when the mouse leaves 
            // div.magnify based on edge values (borders)
            if (mouseX <= 0 || mouseX >= smallImageWidth) {
                $glass.stop(true).fadeOut(1);
            } else if (mouseY <= 0 || mouseY >= smallImageHeight) {
                $glass.stop(true).fadeOut(1);
            }
        });
    });
});