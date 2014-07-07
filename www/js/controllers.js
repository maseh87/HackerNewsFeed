angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $window, $ionicLoading) {
  $ionicLoading.show({
      template: '<i class="icon ion-looping"></i>'
  });
  $scope.articles;
  $http({
    method: 'GET',
    url: "https://community-hnify.p.mashape.com/get/best",
    headers: {
      "X-Mashape-Key": "ezm6j6ZDTTmshfYpcmqam21hJaXGp1taozKjsnkZZpn9dmHahi"
    }
  }).then(function(req) {
    $scope.articles = req.data.stories;
  })
  .finally(function () {
    $ionicLoading.hide();
  })
  $scope.loadLink = function(link) {

    console.log(link);
    $window.open(link, '_self', location='yes');

  };
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
