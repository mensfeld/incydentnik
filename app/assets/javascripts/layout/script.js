/*
 * All the plugins init are in this file
 **/
var map;

function save_incident(type, lat, lng){
$.ajax({
    type: "POST",
    url: '/incidents',
    data: { incident: { type: type, lat: lat, lng: lng } },
    success: function(){},
    dataType: 'js'
  });
}

$(document).ready(function() {
  
  // activate the second carousel
  $('#slider-carousel').carousel();
  $('#testimonials-carousel').carousel();
  
  // init the google map plugin
  map = new GMaps({
    el: '#map',
    lat: 50.062752,
    lng: 19.938898
  });
  map.setContextMenu({
    control: 'map',
    options: [{
      title: 'Przest\u0119pczość',
      name: 'add_crime',
      action: function(e){
        var pinColor = "FF0000";
        var pinImage = new google.maps.MarkerImage("/assets/crime.png",
          new google.maps.Size(21, 34),
          new google.maps.Point(0,0),
          new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
          new google.maps.Size(40, 37),
          new google.maps.Point(0, 0),
          new google.maps.Point(12, 35));

        save_incident('crime', e.latLng.lat(), e.latLng.lng())

        this.addMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          title: 'Przest\u0119pczość',
          icon: pinImage,
          shadow: pinShadow
        });
        this.hideContextMenu();
      }
    },{
      title: 'Nieprzyjazna przestrze\u0144',
      name: 'add_zaniedbanie',
      action: function(e){
        var pinColor = "047235";
        var pinImage = new google.maps.MarkerImage("/assets/neglect.png",
          new google.maps.Size(21, 34),
          new google.maps.Point(0,0),
          new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
          new google.maps.Size(40, 37),
          new google.maps.Point(0, 0),
          new google.maps.Point(12, 35));

        save_incident('neglect', e.latLng.lat(), e.latLng.lng())

        this.addMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          title: 'Zaniedbania',
          icon: pinImage,
          shadow: pinShadow
        });
        this.hideContextMenu();
      }
    },{
      title: 'Brak o\u015bwietlenia',
      name: 'add_ligth',
      action: function(e){
        var pinColor = "DCDCDC";
        var pinImage = new google.maps.MarkerImage("/assets/light.png",
          new google.maps.Size(21, 34),
          new google.maps.Point(0,0),
          new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
          new google.maps.Size(40, 37),
          new google.maps.Point(0, 0),
          new google.maps.Point(12, 35));

        save_incident('light', e.latLng.lat(), e.latLng.lng())

        this.addMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          title: 'Zaniedbania',
          icon: pinImage,
          shadow: pinShadow
        });
        this.hideContextMenu();
      }
    },{
      title: 'Libacje',
      name: 'add_party',
      action: function(e){
        var pinColor = "FFFF00";
        var pinImage = new google.maps.MarkerImage("/assets/libation.png",
          new google.maps.Size(21, 34),
          new google.maps.Point(0,0),
          new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
          new google.maps.Size(40, 37),
          new google.maps.Point(0, 0),
          new google.maps.Point(12, 35));

        save_incident('libation', e.latLng.lat(), e.latLng.lng())

        this.addMarker({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          title: 'Zaniedbania',
          icon: pinImage,
          shadow: pinShadow
        });
        this.hideContextMenu();
      }
    },{
      title: 'Wyśrodkuj tutaj',
      name: 'center_here',
      action: function(e){
        this.setCenter(e.latLng.lat(), e.latLng.lng());
      }
    }, {
      title: 'Anuluj',
      name: 'cancel',
      action: function(e){
        this.hideContextMenu()
      }
    }]
  });


  
  // sliding contact form
  $('.contact-form-btn').click( function(){
    if($(this).hasClass('closes')) {
      $('.contact-form-inner').slideDown();
      $(this).removeClass('closes').addClass('open');
    } else {
      $('.contact-form-inner').slideUp();
      $(this).removeClass('open').addClass('closes');
    }
  });
  
  // ajax contact form
  $('#contact-form').submit(function(){
    $.post('contact-form.php', $(this).serialize(), function(data){
      $('#contact-form').html(data);
      $('#contact-form input, #contact-form textarea').val('');
    });				
    return false;
  });

  // ajax subscription
  $('#subsc-form').submit(function(){
    $.post('subscription.php', $(this).serialize(), function(data){
    
      $('.subscribe-wrapper > *').fadeIn();
      $('.subscribe-wrapper').html(data);
      $('#subsc-form input').val('');
    });				
    return false;
  });
});

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

$(document).ready(function(){
show_loading();
})

$(window).load(function(){
  hide_loading();
  $('#loading-text').show();
})