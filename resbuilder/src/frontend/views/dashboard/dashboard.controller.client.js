/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("DashBoardController", DashBoardController);

    function DashBoardController($sce, $scope, $location) {

        var vm = this;
        vm.isCollapsed = false;

        console.log("load pdf")
        $scope.pdfName = 'Resume';
        $scope.pdfUrl = 'views/dashboard/Pankti-Bhalani-Resume.pdf';



        $scope.onProgress = function (progressData) {
            console.log(progressData);
        };

        $scope.onError = function(error) {
            console.log(error);
        }

    }
})();
