angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {

  $scope.articles;
  $http({
    method: 'GET',
    url: "https://community-hnify.p.mashape.com/get/best",
    headers: {
      "X-Mashape-Key": "ezm6j6ZDTTmshfYpcmqam21hJaXGp1taozKjsnkZZpn9dmHahi"
    }
  }).then(function(req) {
    console.log(req);
    $scope.articles = req.data.stories;
  });
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
