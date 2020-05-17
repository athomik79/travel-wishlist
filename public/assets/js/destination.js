document.getElementById('results').style.display = 'none';
/**
 * This function autocompletes search bar terms
 *
 * @param {string} activatePlacesSearch - A string param
 */
function activatePlacesSearch() {
  const input = document.getElementById('search_term');
  const autocomplete = new google.maps.places.Autocomplete(input);
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
  $('#results').addClass('show');
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
    const queryURL = 'https://www.triposo.com/api/20200405/poi.json?location_id='+city+'&count=10&fields=id,name,images,score,snippet&account=ORID4DVT&fields=all&token=9mzqr3x3hr2juisyaz7mfqmsezfooz85';
    const poiURL = 'https://www.triposo.com/api/20200405/poi.json?location_id='+city+'&tag_labels=sightseeing&order_by=-score&count=10&account=ORID4DVT&fields=all&token=9mzqr3x3hr2juisyaz7mfqmsezfooz85';

    $.ajax({
      url: queryURL,
      method: 'GET',
      dataType: 'json',
    }).then(function(json) {
      console.log(json);
      console.log(json.results[0].snippet);
      //  console.log(json.response[0].snippet);
      //  var city = input;
      const snippet = json.results[0].snippet;
      const imageURL = json.results[0].images[0].sizes.thumbnail.url;
      const sectionBody = json.results[0].content.sections[0].body;
      const d = $('<li>');
      const h = $('<h3>');
      const p = $('<p>');
      const g = $('<p>');
      const image = $('<img>').attr('src', imageURL);
      // var image = $("<img style='float:right'"). attr("src", imageURL);
      p.append(snippet);
      $('#home').append(p);
      d.append(sectionBody);
      $('#profile').append(d);
      g.append(image);
      $('#image-display').append(g);
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
      //  console.log(json.response[0].snippet);
      //  var city = input;
      const name = json.results[0].name;
      const p = $('<p>');
      //   var image = $("<img>").attr("src", imageURL);
      p.append(name);
      $('#messages').append(p);
    });
  }
  document.getElementById('search_term').value = '';
});
// }).then(response => {
//   console.log(response);
// });
