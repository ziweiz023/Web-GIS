mapboxgl.accessToken = 'pk.eyJ1Ijoieml3ZWkwMjMiLCJhIjoiY204dnc5dXpoMTIwdTJrcTFvdG9xcWcycCJ9.gn8PHOvdBmJ6_U_O1zlvqA';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-74.00276678671813, 40.71402034305055], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 10, // starting zoom
    
});

map.on('load', function() {
    // Add the ArcGIS tile layer as a new source
    map.addSource('art-galleries', {
        type: 'geojson',
        data:'https://data.cityofnewyork.us/resource/43hw-uvdj.geojson'
    });

    // Add a new layer using the source
    map.addLayer({
        id: 'gallery-points',
        type: 'circle',
        source: 'art-galleries',
        paint: {
          'circle-radius': 5,
          'circle-color': [
            'match',
            ['get', 'city'],
            'New York', '#FCAA67',
            'Brooklyn', '#B0413E',
            'Bronx', '#548687',
            'Staten Island', '#473335',
            /* other */ '#CDC6A5'
          ],
          'circle-stroke-color': '#000',
          'circle-stroke-width': 0.5
        }
      });
});

// Add popups on click
map.on('click', 'gallery-points', (event) => {
    const props = event.features[0].properties;
    const coords = event.features[0].geometry.coordinates;
    const name = props.name || "Unnamed Gallery";
    const address = props.address1 || "No address available";
    const phone = props.tel || "No phone listed";

        new mapboxgl.Popup()
        .setLngLat(coords)
        .setHTML(`<strong>${name}</strong><br>${address}<br><em>${phone}</em>`)
        .addTo(map);
      });

      // Change the cursor to a pointer when hovering over points
      map.on('mouseenter', 'gallery-points', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'gallery-points', () => {
        map.getCanvas().style.cursor = '';
      });


// const slider = $("#light-slider");

// function getRandomColor() {
//     // Generate a random hex color
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//     }
      
// slider.on("input", function () {
//     const randomColor = getRandomColor();
//     $(".grid-container h1").css("color", randomColor);
//     $("#lightbulb").css("stroke", randomColor);
// });
  
$(document).ready(function () {
    var h1 = $(".grid-container h1");
    var text = h1.text();
    h1.empty();
    $.each(text.split(''), function(index, letter) {
      h1.append($("<span>").text(letter));
    });
  });


const slider = $("#light-slider");

function getRandomColor() {
    // Generate a random hex color
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  
slider.on("input", function () {
    $(".grid-container h1 span").each(function() {
      $(this).css("color", getRandomColor());
    });
    $("#lightbulb").css("stroke", getRandomColor());
});


// $(document).ready(function () {
//     const slider = $("#light-slider");

//     // Function to update the background and styles based on slider value
//     function updateLighting(value) {
//         const brightness = value / 100; // Normalize to 0.0 - 1.0

//         // Calculate background color based on brightness
//         const color = `rgb(${255 * brightness}, ${255 * brightness}, ${brightness * 200})`;

//         // Update the background color
//         $("body").css("background-color", color);

//         // Update lightbulb and text color based on brightness
//         let lightbulbColor, textColor;
//         if (brightness < 0.3) {
//             lightbulbColor = "white";
//             textColor = "white";
//         } else if (brightness < 0.7) {
//             lightbulbColor = "black";
//             textColor = "#DCDCDC";
//         } else {
//             lightbulbColor = "red";
//             textColor = "black";
//         }
//         $("#lightbulb").css("stroke", lightbulbColor);
//         $("h2").css("color", textColor);

//         // Update slider thumb and track color
//         slider.css({
//             "background": `linear-gradient(to right, ${lightbulbColor} 0%, ${lightbulbColor} ${value}%, #ddd ${value}%, #ddd 100%)`
//         });
//     }

//     // Initialize the lighting based on the slider's initial value
//     const initialValue = slider.val(); // Get the initial slider value
//     updateLighting(initialValue);

//     // Update lighting dynamically as the slider value changes
//     slider.on("input", function () {
//         const value = $(this).val(); // Get the slider value
//         updateLighting(value);
//     });
// });

