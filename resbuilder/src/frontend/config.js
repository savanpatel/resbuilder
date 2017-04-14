(function() {
    angular
        .module("ResumeBuilder")
        .config(Config);

    function Config($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';


        $routeProvider
            .when("/", {
                templateUrl: "views/login/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/register/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/recruiter-register", {
                templateUrl: "views/register/recruiter-register.view.client.html",
                controller: "RecruiterRegisterController",
                controllerAs: "model"
            })
            .when("/recruiter/:rid/dashboard", {
                templateUrl: "views/dashboard/recruiter-dashboard.view.client.html",
                controller: "RecruiterDashBoardController",
                controllerAs: "model"
            })
            .when("/recruiter/:rid/profile", {
                templateUrl: "views/recruiter/recruiter.basicprofile.edit.view.client.html",
                controller: "RecruiterBasicProfileEditController",
                controllerAs: "model"
            })
            .when("/recruiter/:rid/messages", {
                templateUrl: "views/message/recruiter.message.list.view.client.html",
                controller: "RecruiterMessageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/messages", {
                templateUrl: "views/message/user.message.list.view.client.html",
                controller: "UserMessageListController",
                controllerAs: "model"
            })
            .when("/recruiter/:rid/:uid/:firstName/:companyName/newmessage", {
                templateUrl: "views/message/recruiter.message.send.view.client.html",
                controller: "MessageSendController",
                controllerAs: "model"
            })
            .when("/user/:uid/dashboard", {
                templateUrl: "views/dashboard/dashboard.view.client.html",
                controller: "DashBoardController",
                controllerAs: "model"
            })
            .when("/user/:uid/savejob", {
                templateUrl: "views/user/savejob.view.client.html",
                controller: "SaveJobController",
                controllerAs: "model"
            })
            .when("/user/:uid/savejob/:jid", {
                templateUrl: "views/user/savejob.edit.view.client.html",
                controller: "SaveJobEditController",
                controllerAs: "model"
            })
            .when("/user/resumes/:uid", {
                templateUrl: "views/resumes/resumes.view.client.html",
                controller: "ResumesController",
                controllerAs: "model"
            })
            .when("/user/:uid/dashboard/resumeData", {
                templateUrl: "views/resume-data/resume-data.view.client.html",
                controller: "ResumeDataController",
                controllerAs: "model"
            })
            .when("/user/:uid/dashboard/resumeEdit/:resumeid", {
                templateUrl: "views/resume-edit/resume-edit.view.client.html",
                controller: "ResumeEditController",
                controllerAs: "model"
            })
            .when("/admin/:aid/user/:uid/basicprofile", {
                templateUrl: "views/admin/admin.manage.user-edit.client.html",
                controller: "BasicProfileAdminEditController",
                controllerAs: "model"
            })
            .when("/admin/:aid/recruiter/:rid/basicprofile", {
                templateUrl: "views/admin/admin.manage.recruiter-edit.client.html",
                controller: "RecruiterBasicProfileAdminEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/basicprofile", {
                templateUrl: "views/user/user.basicprofile.edit.view.client.html",
                controller: "BasicProfileEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/education", {
                templateUrl: "views/user/user.education.list.view.client.html",
                controller: "EducationController",
                controllerAs: "model"
            })
            .when("/user/:uid/education/:eid", {
                templateUrl: "views/user/user.education.edit.view.client.html",
                controller: "EditEducationController",
                controllerAs: "model"
            })
            .when("/user/:uid/project", {
                templateUrl: "views/user/user.project.list.view.client.html",
                controller: "ProjectController",
                controllerAs: "model"
            })
            .when("/user/:uid/project/:pid", {
                templateUrl: "views/user/user.project.edit.view.client.html",
                controller: "EditProjectController",
                controllerAs: "model"
            })
            .when("/user/:uid/workexp", {
                templateUrl: "views/user/user.work.list.view.client.html",
                controller: "WorkExpController",
                controllerAs: "model"
            })
            .when("/user/:uid/contact", {
                templateUrl: "views/user/user.contact.view.client.html",
                controller: "UserContactController",
                controllerAs: "model"
            })
            .when("/recruiter/:rid/contact", {
                templateUrl: "views/recruiter/recruiter.contact.view.client.html",
                controller: "RecruiterContactController",
                controllerAs: "model"
            })
            .when("/user/:uid/workexp/:wid", {
                templateUrl: "views/user/user.work.edit.view.client.html",
                controller: "EditWorkExpController",
                controllerAs: "model"
            })
            .when("/admin/:aid/dashboard", {
                templateUrl: "views/dashboard/admin.dashboard.view.client.html",
                controller: "AdminDashBoardController",
                controllerAs: "model"
            })
            .when("/admin/:aid/user", {
                templateUrl: "views/admin/admin.manage.user.view.client.html",
                controller: "AdminManageUserController",
                controllerAs: "model"
            })
            .when("/admin/:aid/recruiter", {
                templateUrl: "views/admin/admin.manage.user.view.client.html",
                controller: "AdminManageRecruiterController",
                controllerAs: "model"
            })
            .when("/admin/:aid/message", {
                templateUrl: "views/admin/admin.message.list.view.client.html",
                controller: "AdminMessageController",
                controllerAs: "model"
            })
            .when("/unauthorized", {
                templateUrl: "views/errors/unauthorized.view.client.html",
            })
            .otherwise({redirectTo : '/login'});


    }
})();
