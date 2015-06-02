###
class Search
  constructor: (@name) ->
    @search_container

  move: (meters) ->
    alert @name + " moved #{meters}m."


function show_loading(){
  $('#loading-container').show();
  var bar = $('#loading-text .bar');
  var timer_id;
  bar.css('width', 5+'%');
  timer_id = window.setInterval(function(){
    var per = parseInt(bar[0].style.width);
    bar.css('width', (per+10)+'%');
    if(per >= 100){
      clearInterval(timer_id)
    }
  }, 10);
}

function hide_loading(){
  $('#loading-container').hide();
}

function search() {
  $('#search_button').button('loading')
  var addressField = document.getElementById('search_address');
  var geocoder = new google.maps.Geocoder();
  show_loading();
  geocoder.geocode(
  {
    'address': addressField.value
  },
  function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var loc = results[0].geometry.location;
      map.setCenter(loc.lat(), loc.lng());
    }
    else {
      alert("Nie znaleziono");
    }
    $('#search_button').button('reset')
    hide_loading();
  }
  );
  return false;
};
###