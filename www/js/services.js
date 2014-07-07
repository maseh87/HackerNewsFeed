angular.module('starter.services', [])

.factory('Friends', function() {

  var page = function() {

  };

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
