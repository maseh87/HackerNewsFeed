angular.module('starter.controllers', [
  'ionic'
])

.controller('DashCtrl', function($scope, $http, $window, $ionicLoading, $ionicModal, $sce) {


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
    var id = $scope.articles[index].value.article_id;
    $scope.article =  'http://localhost:3000/article/'+ id;
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
    url: "http://localhost:3000/articles",
    timeout: 100000
  }).then(function(req) {
    $scope.articles = req.data;
    console.log(req.data);
  })
  .catch(function (error) {
    console.error(error);
  })
  .finally(function () {
    $ionicLoading.hide();
  });
  $scope.loadLink = function(link) {

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
