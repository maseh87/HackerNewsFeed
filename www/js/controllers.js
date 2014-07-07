angular.module('starter.controllers', [
  'ionic'
])

.controller('DashCtrl', function($scope, $http, $window, $ionicLoading, $ionicModal) {
  $ionicModal.fromTemplateUrl('/templates/tab-account.html', function(modal) {
    $scope.linkModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.name = 'mase';
  });
  $scope.openModal = function(index) {
    $scope.modal.show();
    $scope.index = index;
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

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
    console.log(req.data.stories);
    $scope.articles = req.data.stories;
  })
  .finally(function () {
    $ionicLoading.hide();
  });
  $scope.loadLink = function(link) {
    console.log(link);
    // $http({
    // method: 'GET',
    // url: link,
    // headers: {
    //   "X-Mashape-Key": "ezm6j6ZDTTmshfYpcmqam21hJaXGp1taozKjsnkZZpn9dmHahi"
    // }
    // }).then(function(req) {
    //   console.log(req.data);
    // })
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
});
