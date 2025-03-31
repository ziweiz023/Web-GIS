mapboxgl.accessToken = 'pk.eyJ1Ijoieml3ZWkwMjMiLCJhIjoiY204dnc5dXpoMTIwdTJrcTFvdG9xcWcycCJ9.gn8PHOvdBmJ6_U_O1zlvqA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v11',
    center: [-74.00276678671813, 40.71402034305055], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 11 // starting zoom
});

map.on('load', function() {
    // Add the ArcGIS tile layer as a new source
    map.addSource('floodplain', {
        type: 'raster',
        tiles: [
            'https://tiles.arcgis.com/tiles/GfwWNkhOj9bNBqoJ/arcgis/rest/services/Future_Floodplain_2050s/MapServer/tile/{z}/{y}/{x}'
        ],
        tileSize: 256
    });

    // Add a new layer using the source
    map.addLayer({
        id: 'floodplain-layer',
        type: 'raster',
        source: 'floodplain',
        paint: {
            // Adjust the opacity of the layer
            'raster-opacity': 0.8
        }
    });
});
  

$(document).ready(function () {
    const slider = $("#light-slider");

    // Function to update the background and styles based on slider value
    function updateLighting(value) {
        const brightness = value / 100; // Normalize to 0.0 - 1.0

        // Calculate background color based on brightness
        const color = `rgb(${255 * brightness}, ${255 * brightness}, ${brightness * 200})`;

        // Update the background color
        $("body").css("background-color", color);

        // Update lightbulb and text color based on brightness
        let lightbulbColor, textColor;
        if (brightness < 0.3) {
            lightbulbColor = "white";
            textColor = "white";
        } else if (brightness < 0.7) {
            lightbulbColor = "black";
            textColor = "#DCDCDC";
        } else {
            lightbulbColor = "red";
            textColor = "black";
        }
        $("#lightbulb").css("stroke", lightbulbColor);
        $("h2").css("color", textColor);

        // Update slider thumb and track color
        slider.css({
            "background": `linear-gradient(to right, ${lightbulbColor} 0%, ${lightbulbColor} ${value}%, #ddd ${value}%, #ddd 100%)`
        });
    }

    // Initialize the lighting based on the slider's initial value
    const initialValue = slider.val(); // Get the initial slider value
    updateLighting(initialValue);

    // Update lighting dynamically as the slider value changes
    slider.on("input", function () {
        const value = $(this).val(); // Get the slider value
        updateLighting(value);
    });
});