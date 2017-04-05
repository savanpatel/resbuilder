/**
 * Created by panktibhalani on 3/28/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("ResumeDataController", ResumeDataController);

    function ResumeDataController($sce, $scope,$routeParams, $location,$uibModal,$log,WorkExpService,ModalService,EducationService,ProjectService,ResumeDataService) {

        var vm = this;
        function init() {

            vm.isCollapsed = false;
            vm.uid = $routeParams['uid'];
            var url = ResumeDataService.getUrl();
            var promise = ResumeDataService.getResumeData(vm.uid,url);
            promise.success(onGettingResumeData)
            promise.error(OnErrorGettingResumeData)
            $scope.yesNoResult = null;

            var promiseEdu = EducationService.findEducationForUser(vm.uid);
            promiseEdu.success(getAllEducationDetails)
            promiseEdu.error(getError)

            var promisePro = ProjectService.findProjectListForUser(vm.uid);
            promisePro.success(getAllProjectDetails)
            promisePro.error(getError)

            var promiseWork = WorkExpService.findWorkExpForUser(vm.uid);
            promiseWork.success(getAllWorkExpDetails)
            promiseWork.error(getError)

            $scope.work = ["Essar", "L&T", "Accenture", "Infosys"]
            $scope.showYesNo = showModal;
            vm.arrayToString = arrayToString;
        }

        init();

        function getAllEducationDetails(educationList) {
            var edu = []
            for(var i = 0;i<educationList.length;i++)
            {
                edu.push(educationList[i].school)
            }
            $scope.school = edu;
        }

        function getAllProjectDetails(projectList) {
            var pro = []
            for(var i = 0;i<projectList.length;i++)
            {
                pro.push(projectList[i].title)
            }
            $scope.project = pro;
        }

        function getAllWorkExpDetails(workList) {
            var wor = []
            for(var i = 0;i<workList.length;i++)
            {
                wor.push(workList[i].companyName)
            }
            $scope.work = wor;
        }

        function onGettingResumeData(data) {

            console.log(data)
            vm.educationList = data['education']
            vm.projectList = data['project']
            vm.workExpList = data['work']
            vm.languages = data['technical']['languages']
            vm.technologies = data['technical']['technologies']
            vm.database = data['technical']['database']
            vm.software = data['technical']['softwares']
            vm.os = data['technical']['operatingSystems']
        }
        function OnErrorGettingResumeData() {
            console.log("Error")
        }
        
        function getError() {
            console.log("Error")
        }

        function arrayToString(array) {
            return array.join(', ');
        }
        function showModal(sw) {
            console.log(sw)
            ModalService.showModal({
                templateUrl: "views/resume-data/yesno.html",
                controller: "YesNoController",
                scope: $scope,
                inputs: {
                    s_w: sw
                }
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    console.log(result)
                });
            });

        }
    }
})();