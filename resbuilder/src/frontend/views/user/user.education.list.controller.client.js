
(function () {

    angular
        .module("ResumeBuilder")
        .controller("EducationController", EducationController);

    function EducationController($scope, $location) {
        var vm = this;
        function init() {
            $scope.isCollapsed = false;
            vm.user = {
                username:'savanpatel3',
                email:'savanpatel3@gmail.com',
                address:'75 Saint Alphansus Street, 1115 Citiview at Longwood Apartments, Boston MA 02120, USA',
                firstName:'Savan',
                lastName:'Patel',
                contact:8577076117,
                githubUrl:'https://www.github.com/savanpatel',
                personalWebsite:'http://www.savanpatel.in',
                isPublic:true
            };

        }


        init();

    }
})();