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


// jQuery code to change the color of the SVG element
const slider = $("#light-slider");

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

slider.on("input", function () {
  const randomColor = getRandomColor();
  $("#art").css({
    stroke: randomColor,
    fill: randomColor
  });
});




