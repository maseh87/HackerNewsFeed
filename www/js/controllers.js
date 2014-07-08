angular.module('starter.controllers', [
  'ionic'
])

.controller('DashCtrl', function($scope, $window, $ionicLoading, articles, $ionicPlatform) {

  $scope.articles = articles.stories;
  $scope.openLink = function(index) {
    var article = $scope.articles[index];
    var iframe = $window.open(article.link, '_blank', 'location=no,hidden=yes');
    $ionicLoading.show({
      template: '<i class="icon ion-looping"></i>'
    });

    iframe.addEventListener('loadstop', function() {
      iframe.show();
      $ionicLoading.hide();
    });
    $ionicPlatform.onHardwareBackButton(function(e) {
      e.preventDefault();
      e.stopPropagation();
      iframe.hide();
    });
  };

})

.controller('FriendsCtrl', function($scope, $http, $ionicLoading, Friends) {
  $ionicLoading.show({
    template: '<i class="icon ion-looping"></i>'
  });
  $scope.articles;
  $http({
    method: 'GET',
    url: "https://community-hnify.p.mashape.com/get/newest",
    headers: {
      "X-Mashape-Key": "ezm6j6ZDTTmshfYpcmqam21hJaXGp1taozKjsnkZZpn9dmHahi"
    }
  }).then(function(req) {
    $scope.articles = req.data.stories;
  })
  .finally(function () {
    $ionicLoading.hide();
  });
})

.factory('ArticleFactory', function($http) {
  return {
    getArticles: function() {
      return $http({
        method: "GET",
        url: "https://community-hnify.p.mashape.com/get/best",
        headers: {
          "X-Mashape-Key": "ezm6j6ZDTTmshfYpcmqam21hJaXGp1taozKjsnkZZpn9dmHahi"
        }
      })
      .then(function(response) {
        return response.data;
      });
    }
  };
});
