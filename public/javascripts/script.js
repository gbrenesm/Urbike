mapboxgl.accessToken =
    "pk.eyJ1Ijoiam9zc2R6IiwiYSI6ImNrMGR4cWk2djBhbWszY3F2b3N4bDBqZTUifQ.ByHk_m_uZOjYaruW6T8Wig";

var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-99.20838419233156, 19.431614946413415],
    zoom: 13
});

(async () => {
  const res = await fetch(
    "https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=ciclovias&q=&facet=estado&facet=nombre&facet=vialidad&facet=tipo_ic&facet=tipo_via&facet=instancia"
  );
  const { records } = await res.json();
  var canvas = map.getCanvasContainer();
  const [start] = records[0].fields.geo_shape.coordinates;
  const end =
    records[0].fields.geo_shape.coordinates[
      records[0].fields.geo_shape.coordinates.length - 1
    ];
  start.pop();
  end.pop();
  console.log(start, end);

  function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    var url =
      "https://api.mapbox.com/directions/v5/mapbox/cycling/" +
      start[0] +
      "," +
      start[1] +
      ";" +
      end[0] +
      "," +
      end[1] +
      "?steps=true&geometries=geojson&access_token=" +
      mapboxgl.accessToken;

    // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onload = function () {
      var json = JSON.parse(req.response);
      var data = json.routes[0];
      var route = data.geometry.coordinates;
      var geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route
        }
      };
      // if the route already exists on the map, reset it using setData
      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
      } else {
        // otherwise, make a new request
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: geojson
              }
            }
          },
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75
          }
        });
      }
      // add turn instructions here at the end
      var instructions = document.getElementById("instructions");
      var steps = data.legs[0].steps;

      var tripInstructions = [];
      for (var i = 0; i < steps.length; i++) {
        tripInstructions.push("<br><li>" + steps[i].maneuver.instruction) +
          "</li>";
        instructions.innerHTML =
          '<br><span class="duration">Trip duration: ' +
          Math.floor(data.duration / 60) +
          " min 🚴 </span>" +
          tripInstructions;
      }
    };
    req.send();
  }

  map.on("load", function () {
    // make an initial directions request that
    // starts and ends at the same location
    getRoute(start);

    // Add starting point to the map
    map.addLayer({
      id: "point",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: start
              }
            }
          ]
        }
      },
      paint: {
        "circle-radius": 2,
        "circle-color": "#3887be"
      }
    });
    
    var coordsObj = records[0].fields.geo_shape.coordinates[
      records[0].fields.geo_shape.coordinates.length - 1
    ];;
  canvas.style.cursor = '';
  var coords = Object.keys(coordsObj).map(function(key) {
    return coordsObj[key];
  });
  var end = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: coords
      }
    }
    ]
  };
  if (map.getLayer('end')) {
    map.getSource('end').setData(end);
  } else {
    map.addLayer({
      id: 'end',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: coords
            }
          }]
        }
      },
      paint: {
        'circle-radius': 2,
        'circle-color': '#f30'
      }
    });
  }
  getRoute(coords);
    // this is where the code from the next step will go
    


    map.on("load", function () {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: records[0].fields.geo_shape.coordinates
          }
        }
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#888",
          "line-width": 8
        }
      });
    });
  });
})();
