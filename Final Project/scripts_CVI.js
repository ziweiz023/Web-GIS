mapboxgl.accessToken = 'pk.eyJ1Ijoieml3ZWkwMjMiLCJhIjoiY204dnc5dXpoMTIwdTJrcTFvdG9xcWcycCJ9.gn8PHOvdBmJ6_U_O1zlvqA';

const map = new mapboxgl.Map({
  container: 'map-CVI', // container ID
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-73.97234, 40.69522], // starting position [lng, lat]. 
  zoom: 9.6,
  minZoom: 9.5,
  maxZoom: 10.5
});

map.on('load', function () {
    map.addSource('CVI-index', {
      type: 'geojson',
      data: './Neighborhood_all_index.geojson',

    });

    map.addLayer({
      'id': 'CVI-index-layer',
      'type': 'fill',
      'source': 'CVI-index',
      paint: {
        'fill-color': [
          'step', ['get', 'CVI - Mean (Rank)'],
          '#1a9641',       // Class 1: best (green)
          53, '#a6d96a',   // Class 2
          105, '#ffffbf',  // Class 3 (mid)
          157, '#fdae61',  // Class 4
          209, '#d7191c',  // Class 5
          262, '#7f0000'   // Class 6: worst (dark red)
        ],
        'fill-opacity': 0.8
      }
    });
});
