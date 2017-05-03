/*jshint esversion: 6 */
((app) => {

    app.component("login", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/templates/login.template.html",
        controller: ['$scope', '$window', function($scope, $window) {
            $scope.action = "Log In";
            $scope.actionMessage="Not Registered? Click Here!";
            $scope.registration = false;

            $scope.changeAction = function(){
                if($scope.action == "Log In"){
                    $scope.action = "Register";
                    $scope.actionMessage="Already Registered? Click Here!";
                    $scope.registration = true;
                }
                else{
                    $scope.action = "Log In";
                    $scope.actionMessage="Not Registered? Click Here!";
                    $scope.registration = false;
                }
            }



            console.log("In Login Component");
            $(window, document, undefined).ready(function() {

              $('input').blur(function() {
                var $this = $(this);
                if ($this.val())
                  $this.addClass('used');
                else
                  $this.removeClass('used');
              });

              var $ripples = $('.ripples');

              $ripples.on('click.Ripples', function(e) {

                var $this = $(this);
                var $offset = $this.parent().offset();
                var $circle = $this.find('.ripplesCircle');

                var x = e.pageX - $offset.left;
                var y = e.pageY - $offset.top;

                $circle.css({
                  top: y + 'px',
                  left: x + 'px'
                });

                $this.addClass('is-active');

              });

              $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
                  $(this).removeClass('is-active');
              });

            });
        }]
    });

})(angular.module('app'));
