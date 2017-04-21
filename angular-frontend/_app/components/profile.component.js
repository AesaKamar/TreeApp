/*jshint esversion: 6 */
((app) => {

    app.component("profile", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/templates/profile.template.html",
        controller: ['$window', '$scope', function($window, $scope) {
            this.$onInit = function() {
                $scope.userInformation = {email: "DarthPlagueis@gmail.com", password: "hunter2"}
            }

            $scope.changePass = false;
            $scope.changeEmail = false;
            $scope.newPass = "";
            $scope.newEmail = "";
            $scope.message = "";
            $scope.val = 0;

            $scope.submitPass = function(){
                if ($scope.newPass === $scope.userInformation.password){
                    $scope.message = "New password must be different than your existing password."
                }

                else if ($scope.newPass.length < 8){
                    $scope.message = "Password must be at least 8 characters long.";
                }
                else{
                    $scope.message = "Password Changed!";
                    $scope.userInformation.password = $scope.newPass;
                }
            }

            $scope.submitEmail = function(){
                if ($scope.newEmail === $scope.userInformation.email){
                    $scope.message = "New email must be different than your existing email."
                }
                else{
                    $scope.message = "Email Changed!";
                    $scope.userInformation.email = $scope.newEmail;
                }
            }

            $scope.toggle = function(num){
                if ($scope.val === num){
                    $scope.changeEmail = false;
                    $scope.changePass = false;
                    $scope.val = 0;
                }
                else if (num === 1){
                    $scope.changeEmail = true;
                    $scope.changePass = false;
                    $scope.val = num;
                }
                else if (num === 2){
                    $scope.changeEmail = false;
                    $scope.changePass = true;
                    $scope.val = num;
                }
                $scope.message="";
            }

            console.log("In Profile Component");
        }]
    });

})(angular.module('app'));
