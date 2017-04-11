/**
 * Created by panktibhalani on 3/28/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("ResumeDataController", ResumeDataController);

    function ResumeDataController($scope, $routeParams,
                                  $location, WorkExpService,
                                  ModalService, EducationService,
                                  ProjectService, ResumeDataService,
                                  UserService) {

        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.isCollapsed = false;
            vm.uid = $routeParams['uid'];
            var url = ResumeDataService.getUrl();

            var promise = ResumeDataService.getResumeData(vm.uid,url);
            promise.success(onGettingResumeData)
            promise.error(OnErrorGettingResumeData)
            $scope.yesNoResult = null;
            vm.getResumePdf = getResumePdf;

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

        function logout() {

            var promise = UserService.logout(vm.uid);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }

        function getAllEducationDetails(educationList) {
            $scope.school = educationList;
        }

        function getAllProjectDetails(projectList) {
            $scope.project = projectList;
        }

        function getAllWorkExpDetails(workList) {
            $scope.work = workList;
        }

        function getResumePdf() {

            var resumeData = {
                "user": vm.userList,
                "technical":vm.technicalSkillList,
                "work":vm.workExpList,
                "project":vm.projectList,
                "education":vm.educationList
            }

            var promise = ResumeDataService.getResumePDF(vm.uid,resumeData);

            promise
                .success(renderResume)
                .error(errorRenderingResume)

        }
        
        function renderResume(resume) {
            $location.url('/user/'+ vm.uid +'/dashboard/resumeEdit/'+resume._id);
        }
        
        function errorRenderingResume(error) {
            vm.error = error;
            if(error == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }

        function onGettingResumeData(data) {

            console.log(data);

            vm.educationList = data['education'];
            vm.projectList = data['project'];
            vm.workExpList = data['work'];
            vm.userList = data['user'];
            vm.technicalSkillList = data['technical'];

            $scope.resumeEducation1 = vm.educationList;
            $scope.resumeProject1 = vm.projectList;
            $scope.resumeWork1 = vm.workExpList;


            vm.languages = data['technical']['languages']
            vm.technologies = data['technical']['technologies']
            vm.database = data['technical']['database']
            vm.software = data['technical']['softwares']
            vm.os = data['technical']['operatingSystems']
        }
        function OnErrorGettingResumeData(err) {
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }
        
        function getError(err) {
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
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


                });
            });

        }

        function onLogoutSuccess(response) {
            $location.url("/");
        }

        function onLogoutError(err) {

            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            } else{
                $location.url("/");
            }
        }
    }
})();