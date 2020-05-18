/* eslint-disable no-unused-vars */
// document.getElementById('results').style.display = 'none';
/**
 * This function autocompletes search bar terms
 *
 * @param {string} activatePlacesSearch - A string param
 */
function activatePlacesSearch() {
  const options = {
    types: ['geocode'],
  };
  const input = document.getElementById('search_term');
  const autocomplete = new google.maps.places.Autocomplete(input, options);
}

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  // $(".create-form").on("submit", function(event) {
  //   event.preventDefault();
  $('#wish').on('click', function(event) {
    event.preventDefault();
    const newdestination = {
      destination_name: $('#search_term')
          .val()
          .trim(),
      travelled: 0,
    };
    // Send the POST request.
    $.ajax('/api/destinations', {
      type: 'POST',
      data: newdestination,
    }).then(function() {
      console.log('Added new destination');
      // Reload the page to get the updated list
      location.reload();
    });
  });
  $('.destination-btn').on('click', function(event) {
    event.preventDefault();
    const id = $(this).data('id');
    const travelledState = {
      travelled: 1,
    };
    // Send the PUT request.
    $.ajax('/api/destinations/' + id, {
      type: 'PUT',
      data: travelledState,
    }).then(function() {
      console.log('destination travelled', travelledState);
      // Reload the page to get the updated list
      location.reload();
    });
  });
  $('.trashdestination').on('click', function(event) {
    event.preventDefault();
    const id = $(this).data('id');
    // Send the DELETE request.
    $.ajax({
      type: 'DELETE',
      url: '/api/destinations/' + id,
    }).then(location.reload());
  });
});

// inserted for location description table
$(document).ready(function() {
  $('#myTab li:eq(0) a').tab('show'); // show 2nd tab on page load
});
// $("#results").empty();
$('#search').click(function(event) {
  console.log($('#select').attr('id'));
  // $('#results').addClass('show');
  // document.getElementById("results").style.display = "block";
  event.preventDefault();
  const entry = $('#search_term').val().split(',')[0].split(' ');
  const result = [];
  for (let i = 0; i < entry.length; i++) {
    const value = entry[i].charAt(0).toUpperCase() + entry[i].slice(1);
    result.push(value);
    console.log(value);
  };
  const city = result.join('_');
  // .split(",")[0];
  // console.log(entry);
  // var city = entry.charAt(0).toUpperCase() + entry.slice(1);
  // console.log(city)
  if (city) {
    // eslint-disable-next-line no-var
    var queryURL = 'https://www.triposo.com/api/20200405/location.json?id='+city+'&account=ORID4DVT&token=9mzqr3x3hr2juisyaz7mfqmsezfooz85&fields=all';
    // eslint-disable-next-line no-var
    var poiURL = 'https://www.triposo.com/api/20200405/poi.json?location_id='+city+'&tag_labels=sightseeing&order_by=-score&count=10&account=ORID4DVT&fields=all&token=9mzqr3x3hr2juisyaz7mfqmsezfooz85';
  }

  $.ajax({
    url: queryURL,
    method: 'GET',
    dataType: 'json',
  }).then(function(json) {
    console.log(json);
    console.log(json.results[0].snippet);
    //  console.log(json.response[0].snippet);
    //  var city = input;
    const imageURL = json.results[0].images[1].sizes.thumbnail.url;
    const image = $('<img>').attr('src', imageURL);

    const intro = json.results[0].intro;
    // var thumbURL = json.results[0].images[0].sizes.thumbnail.url;
    const d = $('<div>');
    const h = $('<h3>');
    const p = $('<p>');
    const g = $('<p>');
    // var g = $("<p>");
    //  var image = $("<img style='float:right'"). attr("src", imageURL);
    $('#home').html('');
    p.append(intro);
    $('#home').append(p);
    g.append(image);
    $('#image-display').append(g);


    // var thumbnail = $("<img>").attr("src", thumbURL);
    // d.append(thumbnail);
    // $("#image-display").append(d);


    // Loop for image on home tab
    // for (var i = 0; i < 1; i++) {
    // var imageURL = json.results[0].images[0].sizes.thumbnail.url;
    // var image = $('<img>').attr('src', imageURL);
    // var g = $('<p>');
    g.append(image);
    $('#home').append(g);
    // $("#image-display").append(g);
    // }
    $('#profile').html('');
    // Loop for info for Background tab
    for (let i = 0; i < 10; i++) {
      const sectionBody = json.results[0].content.sections[i].body;
      const d = $('<p>');
      d.append(sectionBody);
      $('#profile').append(d);
    }
    // Loop for photos page
    $('#picture').html('');
    for (let i = 0; i < json.results[0].images.length; i++) {
      const image = $('<img>').attr(
          'src',
          json.results[0].images[i].sizes.thumbnail.url,
      );
      const f = $('#picture');
      f.append(image);
    }
    // updates City name each time a new search is performed
    $('#city').html('');

    // Name of city selection at the top of destination info div
    h.append(city);
    $('#city').append(h);
  });
  $.ajax({
    url: poiURL,
    method: 'GET',
    dataType: 'json',
  }).then(function(json) {
    console.log(json);
    console.log(json.results[0]);
    if (json.results < [0]) {
      alert('No results found for this city. Enter in new destination.');
      location.reload();
    };
    // Loop for captions of photos
    for (let i = 0; i < 1; i++) {
      const name = json.results[0].name;
      const p = $('<p>');
      p.append(name);
      $('#messages').append(p);
    }
    // Loop for Photos tab
    // for (var i = 0; i < 10; i++) {
    // var image2URL = json.results[0].images[i].sizes.medium.url;
    //  var d = $("<p>");
    //  var image2 = $("<img>").attr("src", image2URL);
    //  d.append(image2);
    //  $("#picture").append(d);
    //  }


    const image = $('<img>').attr('src', image2URL);

    p.append(image);
    $('#picture').append(p);
  });
// document.getElementById("search_term").value = "";
});
// }).then(response => {
//   console.log(response);
// });
