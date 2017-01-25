angular.module('trackApp', [])
  .controller('TrackListController', ['$scope','$http', function($scope,$http) {
    var trackList = this;
    trackList.tracks = [];

    trackList.remaining = function() {
      var count = 0;
      angular.forEach(trackList.tracks, function(track) {
        count += track.done ? 0 : 1;
      });
      return count;
    };

    trackList.getTracks = function() {
        $http.get("http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + trackList.artist + "&track=" + trackList.track + "&api_key=ed77b11b1f0965db65c3144cbffaf27b&format=json").then(function(response) {
            console.log(response);
            for(var i = 0; i < 50; i++) {
                trackList.tracks.push({text:response.data.similartracks.track[i].artist.name + " - " + response.data.similartracks.track[i].name, done:false});
            }
        })
    };

}]);
