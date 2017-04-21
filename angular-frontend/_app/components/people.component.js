/*jshint esversion: 6 */
((app) => {

    app.component("people", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/templates/people.template.html",
        controller: ['$window', '$scope', 'Person', function($window, $scope, Person) {
            $scope.person = {
                first_name: '',
                middle_name:'',
                last_name:'',
            };
            $scope.message = "";
            $scope.submit = function(){
                if($scope.first_name && $scope.last_name){
                    $scope.person['first_name'] = $scope.first_name;
                    $scope.person['middle_name'] = '';
                    if($scope.middle_name){
                        $scope.person['middle_name'] = $scope.middle_name;
                    }
                    $scope.person['last_name'] = $scope.last_name;
                    $scope.message = "Person Added!";
                    Person.save($scope.person);
                }
                else{
                    $scope.message = "Submission failed"
                }
            }
            console.log("In People Component");
        }]
    });

})(angular.module('app'));
