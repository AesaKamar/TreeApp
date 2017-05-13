/*jshint esversion: 6 */
((app) => {

    app.component("gallery", {

        bindings: {
            onInit: "&",
            screen: "<"
        },
        templateUrl: "_app/templates/gallery.template.html",
        styles: ['div { background-color: #fdfdfd; }'],
        controller: ['$scope', function($scope) {
            $scope.Images = [
                {
                    'id' : 1,
                    'url' : "http://georgetownradio.com/wp/wp-content/uploads/2012/11/Action+Bronson+Bronson.jpg"
                },
                {
                    'id' : 2,
                    'url' : "http://georgetownradio.com/wp/wp-content/uploads/2012/11/Action+Bronson+Bronson.jpg"
                },
                {
                    'id' : 3,
                    'url' : "http://georgetownradio.com/wp/wp-content/uploads/2012/11/Action+Bronson+Bronson.jpg"
                },
                {
                    'id' : 4,
                    'url' : "http://georgetownradio.com/wp/wp-content/uploads/2012/11/Action+Bronson+Bronson.jpg"
                },
                {
                    'id' : 5,
                    'url' : "http://georgetownradio.com/wp/wp-content/uploads/2012/11/Action+Bronson+Bronson.jpg"
                },
                {
                    'id' : 6,
                    'url' : "http://georgetownradio.com/wp/wp-content/uploads/2012/11/Action+Bronson+Bronson.jpg"
                },
                {
                    'id' : 7,
                    'url' : "http://georgetownradio.com/wp/wp-content/uploads/2012/11/Action+Bronson+Bronson.jpg"
                },
                {
                    'id' : 8,
                    'url' : "http://georgetownradio.com/wp/wp-content/uploads/2012/11/Action+Bronson+Bronson.jpg"
                }
            ];

            // initial image index
            $scope._Index = 0;
            // if a current image is the same as requested image
            $scope.isActive = function (index) {
                return $scope._Index === index;
            };
            // show prev image
            $scope.showPrev = function () {
                $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.Images.length - 1;
            };
            // show next image
            $scope.showNext = function () {
                $scope._Index = ($scope._Index < $scope.Images.length - 1) ? ++$scope._Index : 0;
            };
            // show a certain image
            $scope.showPhoto = function (index) {
                $scope._Index = index;
            };

            console.log("In gallery Component");
        }]
    });

})(angular.module('app'));
