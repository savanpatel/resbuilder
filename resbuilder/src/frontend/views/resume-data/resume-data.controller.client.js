/**
 * Created by panktibhalani on 3/28/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("ResumeDataController", ResumeDataController)

    function ResumeDataController($sce, $scope, $location,$uibModal,$log,ModalService) {

        var vm = this;
        vm.isCollapsed = false;

        $scope.items = ['item1', 'item2', 'item3'];
        vm.languages = ["C", "C++", "Java"];
        vm.technologies = ["AngularJS", "NodeJS"];
        vm.database = ["MongoDB", "SQL"]
        vm.software = ["WebStorm"]
        vm.os = ["Linux", "Windows"]

        vm.project =
            {
                technologies: ["AngularJS", "NodeJS", "ExpressJS", "Mongo"]
            };

        vm.work =
            {
                technologies: ["AngularJS", "NodeJS", "ExpressJS", "Mongo"]
            };

        $scope.yesNoResult = null;


        $scope.project = ["ResumeBuilder","WebAppMaker","SearchEngine","PacMan"]
        $scope.school = ["Northeastern","Dharmsinh","Nirma"]
        $scope.work = ["Essar","L&T","Accenture","Infosys"]


        $scope.showYesNo = function(sw) {
                console.log(sw)
                ModalService.showModal({
                    templateUrl: "views/resume-data/yesno.html",
                    controller: "YesNoController",
                    scope:$scope,
                    inputs:{
                        s_w: sw
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        console.log(result)
                    });
                });
        };




    }


    



})();