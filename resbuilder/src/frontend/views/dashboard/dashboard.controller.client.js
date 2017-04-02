/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("DashBoardController", DashBoardController);

    function DashBoardController($sce, $scope, $routeParams, $location) {

        var vm = this;

        function init() {
            vm.isCollapsed = false;
            vm.uid = $routeParams['uid'];
            console.log(vm.userId);

        }

        init();
    }
})();
