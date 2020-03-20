sap.ui.define([
    "sap/ui/core/mvc/Controller"
 ], function (Controller) {
    "use strict";
    var that = this,
        domRef;
    return Controller.extend("wvw.controller.App", {
        
        onAfterRendering: function(){
            domRef = this.getView().byId("googleMap").getDomRef();
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
              };
            navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);
        },

        success: function(pos) {

            /*var xhr = new XMLHttpRequest();
            xhr.open('GET', "/supermarktes?long="+pos.coords.latitude+"&lat="+pos.coords.longitude, true);
            xhr.send();

            xhr.addEventListener("readystatechange", function(){
                
            }, false);*/

            var script = document.createElement('script');
                script.onload = function() {
                    var myCenter = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                    var mapProp = {center:myCenter, zoom:13, scrollwheel:true, draggable:true, mapTypeId:google.maps.MapTypeId.ROADMAP};
                    var map = new google.maps.Map(domRef,mapProp);
                    //var marker = new google.maps.Marker({position:myCenter});
                    //marker.setMap(map);
                }
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAT8W6_CJ835UHlpuCjfxcxHrYf7Tecqtk";
            document.body.appendChild(script);
            },

        error : function(err) {
            console.log(`ERROR(${err.code}): ${err.message}`);
        },
    });
 });