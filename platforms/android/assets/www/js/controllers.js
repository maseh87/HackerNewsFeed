angular.module('starter.controllers', [
  'ionic.contrib.ui.cards',
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
})

.directive('headerShrink', function($document) {
  var fadeAmt;

  var shrink = function(header, content, amt, max) {
    amt = Math.min(44, amt);
    fadeAmt = 1 - amt / 44;
    ionic.requestAnimationFrame(function() {
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
      for(var i = 0, j = header.children.length; i < j; i++) {
        header.children[i].style.opacity = fadeAmt;
      }
    });
  };

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var starty = $scope.$eval($attr.headerShrink) || 0;
      var shrinkAmt;

      var header = $document[0].body.querySelector('.bar-header');
      var headerHeight = header.offsetHeight;

      $element.bind('scroll', function(e) {
        if(e.detail.scrollTop > starty) {
          // Start shrinking
          shrinkAmt = headerHeight - Math.max(0, (starty + headerHeight) - e.detail.scrollTop);
          shrink(header, $element[0], shrinkAmt, headerHeight);
        } else {
          shrink(header, $element[0], 0, headerHeight);
        }
      });
    }
  }
})


