window.addEventListener('load', function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyAT8W6_CJ835UHlpuCjfxcxHrYf7Tecqtk&callback=initMap';
    document.body.appendChild(script);
});

function initMap() {
    var directionsRenderer = new google.maps.DirectionsRenderer({
        map: map
    });
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('__xmlview0--map'), {
        zoom: 6,
        center: {
            lat: 23.0225,
            lng: 72.5714
        } //Initial Location on Map
    });
        directionsRenderer.setMap(map);
    //directionsRenderer.setPanel(document.getElementById('left-div'));
    //var control = document.getElementById('front-div');
    //control.style.display = 'inline';
    /*map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
        document.getElementById('origin').addEventListener('change', function() {
        distanceCalculator(directionsService, directionsRenderer);
    }, false);

    document.getElementById('destination').addEventListener('click', function() {
        distanceCalculator(directionsService, directionsRenderer);
    }, false);*/
}