/**
 * Created by panktibhalani on 3/28/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("ResumeDataController", ResumeDataController);

    function ResumeDataController($sce, $scope, $location) {

        var vm = this;
        vm.isCollapsed = false;

        vm.languages=["C", "C++", "Java"];
        vm.technologies = ["AngularJS","NodeJS"];
        vm.database = ["MongoDB","SQL"]
        vm.software = ["WebStorm"]
        vm.os = ["Linux","Windows"]
    }
    vm.project =
        {
            technologies : ["AngularJS","NodeJS","ExpressJS","Mongo"]
        };

    vm.work =
        {
            technologies : ["AngularJS","NodeJS","ExpressJS","Mongo"]
        };

})();