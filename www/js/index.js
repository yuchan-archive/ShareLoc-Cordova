/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);

    if(id === 'deviceready'){
      // onSuccess Callback
      // This method accepts a Position object, which contains the
      // current GPS coordinates
      //
      var onSuccess = function(position) {
        if (device.platform === 'browser') {
          var longitude = position.coords.longitude;
          var latitude = position.coords.latitude;
          var latLong = new google.maps.LatLng(latitude, longitude);

          var mapOptions = {
            center: latLong,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
          var marker = new google.maps.Marker({
            position: latLong,
            map: map,
            title: 'my location'
          });
        }else{
          var div = document.getElementById("map_canvas");
          var map = plugin.google.maps.Map.getMap(div);
        }
      };

      // onError Callback receives a PositionError object
      //
      function onError(error) {
        navigator.notification.alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n', null, "App", "OK");
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }
};

app.initialize();
