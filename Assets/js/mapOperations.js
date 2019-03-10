/*
  Au chargement de la carte, activation des différents services
*/
window.onload = function () {
  var map = mapManager();
  droppable(map);
  //wifi(map); // inutilisée car demande trop de ressources
  localisationManager(map);
  localisationManager(map);
  markerManager(map);
  metroManager(map);
  enableClose();
}

/*
  Initialisation de la map
*/
function mapManager() {
  var map = L.map('mapid').setView([45.853459, 2.349312], 3); // position initiale
  L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(map);
  var geocoder = L.geocoderBAN({ collapsed: false, style: 'searchBar' }).addTo(map);
  var lightAll = new L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png').addTo(map);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'PING'}).addTo(map);
  return map;
}

/*
  Ajout d'un marker à la position x, y
*/
function addMarker(map, x, y) {
  var icon = L.icon({
      iconUrl: '../Assets/img/marker.svg',
      iconSize:     [60, 50],
      shadowSize:   [50, 64],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor:  [-3, -76]
  });
  L.marker([x, y], {icon: icon}).addTo(map);
  map.panTo(new L.LatLng(x, y));

  $.ajax({
      type: 'GET',
      url: "http://nominatim.openstreetmap.org/reverse",
      dataType: 'jsonp',
      jsonpCallback: 'data',
      data: { format: "json", limit: 1,lat: x,lon: y,json_callback: 'data' },
    success: function (data){
      var paysVisite ='';
      paysVisite = data["address"]['country'];

      $('#countryValue').html("<span class = 'btn-link'><i class='fas fa-map-pin'></i> &nbsp;&nbsp;Pays sélectionné: </span>" + paysVisite);
      $('#latValue').html("<span class = 'btn-link'>Latitude: </span>: " + x);
      $('#lonValue').html("<span class = 'btn-link'>Longitude: </span>: " + y);
      $( ".valueElement" ).first().show( "fast", function showNext() {
        $( this ).next( ".valueElement" ).show( "fast", showNext );
      });
    }
  });
}

/*
  Au moment du drop sur la carte
*/
function droppable(map) {
  //Rendre draggable les div des pays
  $( "#France" ).draggable({ revert: "valid"});
  $( "#Canada" ).draggable({ revert: "valid" });
  $( "#Italie" ).draggable({ revert: "valid" });
  $( "#Belgique" ).draggable({ revert: "valid" });
  $( "#Japan" ).draggable({ revert: "valid" });
  $( "#United-Kingdom" ).draggable({ revert: "valid" });
  $( "#United-States" ).draggable({ revert: "valid" });
  $( "#Colombia" ).draggable({ revert: "valid" });
  $( "#Peru" ).draggable({ revert: "valid" });
  $( "#Sri-Lanka" ).draggable({ revert: "valid" });

   $( "#mapid" ).droppable({
    drop: function( event, ui ) {
      var IdPays = ui.draggable.attr("id");
      var chaine="";
      chaine+="Pays : "+IdPays+"</br>";
      //Récupérer coordonnées du pays
      $.ajax({
          type: 'GET',
          url: "http://nominatim.openstreetmap.org/search",
          dataType: 'jsonp',
          jsonpCallback: 'data',
          data: { format: "json", limit: 1,country: IdPays, json_callback: 'data' },
          error: function(xhr, status, error) {
            alert("ERROR "+error);
          },
          success: function(data){
        //recuperer les coordonnées (lati, longi) du pays dans les données json provenant du serveur
          var lati = '';
          var longi = '';
          $.each(data, function() {
            lati = this['lat'] ;
            longi = this['lon'] ;
        });
          //affichage des infos
          chaine+="Latitude : "+lati+"</br>";
          chaine+="Longitute : "+longi+"</br>";
          $( "#info" ).html(chaine);
          //MAJ de la map � la position (lati, longi) du pays
          map.panTo(new L.LatLng(lati, longi));
          }
      });
    }
  });

  //Sur le click de la map, ajout d'un marqueur sur la carte avec le nom du pays
  map.on('click', onClick);
  function onClick(e) {
    //recherche le pays sur lequel on a clické
    //Requete AJAX pour r�cup�rer les infos du pays sur le point o� on a cliqu� (lati, longi)
    $.ajax({
        type: 'GET',
        url: "http://nominatim.openstreetmap.org/reverse",
        dataType: 'jsonp',
        jsonpCallback: 'data',
        data: { format: "json", limit: 1,lat: e.latlng.lat,lon: e.latlng.lng,json_callback: 'data' },
        error: function(xhr, status, error) {
          alert("ERROR "+error);
        },
      success: 	function (data){
        var paysVisite ='';
        paysVisite = data["address"]['country'] ;

      if ($('#running').html() == "1") { // JEU LANCE
        if (paysVisite == $('.randomCountry').html()) {
          //alert("c'est le bon");
          $('.countdown').css("display", "none");
          $('.message').html("Bravo, vous avez réussi !");
          $('.message').css("color", "green");
        }
        else {
          //alert("c'est faux");
          $('.countdown').css("display", "none");
          $('.message').html("Vous choisi le mauvais pays !");
          $('.message').css("color", "red");
        }
          $('#countryValue').html("<span class = 'btn-link'><i class='fas fa-map-pin'></i> &nbsp;&nbsp;Pays sélectionné: </span>" + paysVisite);
          $('#latValue').html("<span class = 'btn-link'>Latitude: </span>: " + e.latlng.lat);
          $('#lonValue').html("<span class = 'btn-link'>Longitude: </span>: " + e.latlng.lng);

          $( ".valueElement" ).first().show( "fast", function showNext() {

            $( this ).next( ".valueElement" ).show( "fast", showNext );
          });
      }
      else { // JEU NON LANCE
        var icon = L.icon({
            iconUrl: '../Assets/img/marker.svg',
            iconSize:     [60, 50],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor:  [-3, -76]
        });
        //L.marker([x, y], {icon: icon})
        L.marker(e.latlng).addTo(map).bindPopup("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng+" Pays : "+paysVisite).openPopup();
        L.circle(e.latlng, 1).addTo(map);
      }
      }
    });
  }
}

/*
  Fenêtre de gestion des markers
*/
function markerManager(map) {
  // Ajout d'un marker
  $('#addMarker').click(function() {
    var x = $('#inputX').val();
    var y = $('#inputY').val();
    addMarker(map, x, y);
    $('#closeValues').click(function() {
      $( ".valueElement" ).hide( 1000 );
    });
  });
}

/*
  Localisation IP + placement d'un marker
*/
function localisationManager(map) {
  $('#localisationBtn').on('click', function(){
    map.locate({setView: true, maxZoom: 15});
    getIPAdress();
  });
  map.on('locationfound', onLocationFound);
  function onLocationFound(e) {
      L.marker(e.latlng).addTo(map);

      $.ajax({
          type: 'GET',
          url: "http://nominatim.openstreetmap.org/reverse",
          dataType: 'jsonp',
          jsonpCallback: 'data',
          data: { format: "json", limit: 1,lat: e.latlng.lat,lon: e.latlng.lng,json_callback: 'data' },
        success: 	function (data){
          var paysVisite ='';
          paysVisite = data["address"]['country'] ;

          L.marker(e.latlng).addTo(map).bindPopup("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng+" Pays : "+paysVisite).openPopup();
          L.circle(e.latlng, 1).addTo(map);

          $('#countryValue').html("<span class = 'btn-link'><i style = 'color: #EB6864 !important;' class='fas fa-map-pin red'></i> &nbsp;&nbsp;Pays sélectionné: </span>" + paysVisite);
          $('#latValue').html("<span class = 'btn-link'>Latitude: </span>: " + e.latlng.lat);
          $('#lonValue').html("<span class = 'btn-link'>Longitude: </span>: " + e.latlng.lng);

          getIPAdress();

          $( ".valueElement" ).first().show( "fast", function showNext() {
            $( this ).next( ".valueElement" ).show( "fast", showNext );
          });
        }
      });
  }
}

/*
  Au clic sur le bouton de localisation des metros
*/
function metroManager(map) {
  $('#metrosBtn').click(function() {
    metroStations(map);
  })
}

/*
  Localisation IP + placement d'un marker
*/
function getIPAdress() {
  $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
    console.log(JSON.stringify(data, null, 2));
    $('#ipAdress').html("<span class = 'btn-link'> Adresse IP: </span>" + data.geobytesremoteip);
    $('#city').html("<span class = 'btn-link'> Ville: </span>" + data.geobytescity);
  });
}

/*
  Marker sur tous les metros parisiens, i < 3000 pour éviter de faire planter le navigateur
*/
function metroStations(map) {
  var cpt = 0;
  $.getJSON('../Assets/data/stations.json', function(data) {
    for (var i = 0; i < 3000;i++) {
      console.log(typeof(data.stations[i].LATITUDE));
      if (parseInt(data.stations[i].LATITUDE) >= 47.5) {
        if (parseInt(data.stations[i].LATITUDE) < 49) {
          if (parseInt(data.stations[i].LONGITUDE) <= 2) {
            if (parseInt(data.stations[i].LONGITUDE) >= 1.47) {
              cpt++;
              var tmpLat = data.stations[i].LATITUDE;
              var tmpLon = data.stations[i].LONGITUDE;
              tmpLat = tmpLat.replace(',', '.');
              tmpLon = tmpLon.replace(',', '.');
              addMarker(map, tmpLat, tmpLon);
            }
          }
        }
      }
    }
    $('#nbStations').html("Nombre de stations sélectionnées: " +cpt);
    map.setView([48.85116185716921, 2.3428344726562504], 4); // vue d'ensemble
  });
}

function enableClose() {
  $('#closeValues').click(function() {
    $( ".valueElement" ).hide( 1000 );
  });
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

// Inutilisée ici, permet de localiser les wifi aux US
function wifi(map) {
  $.getJSON("https://data.hartford.gov/resource/daux-ukcc.geojson?&$$app_token=QVVY3I72SVPbxBYlTM8fA7eet", function(data) {
    $.each( data, function( key, val ) {
      var geoJsonLayer = L.geoJson(data, {
        pointToLayer: function( feature, latlng) {
          var marker = L.marker(latlng);
          marker.bindPopup(feature.properties.blms_dba);
          return marker;
        }
      }).addTo(map);
    });
  });
}

// Inutilisée ici, permet de faire le tour du monde sur la carte
function tourDuMonde(map) {
  for (var i = 0; i < 20; i+=2) {
      map.panTo(new L.LatLng(i, i));
      sleep(1000);
  }
  map.panTo(new L.LatLng(5, 10));
    sleep(1000);
  map.panTo(new L.LatLng(5, 15));
    sleep(1000);
  map.panTo(new L.LatLng(5, 20));
}
