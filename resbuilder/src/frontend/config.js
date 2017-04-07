(function() {
    angular
        .module("ResumeBuilder")
        .config(Config);

    function Config($routeProvider, $httpProvider) {
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
                controller: "MessageListController",
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
            .when("/user/dashboard/resumes", {
                templateUrl: "views/resumes/resumes.view.client.html",
                controller: "ResumesController",
                controllerAs: "model"
            })
            .when("/user/:uid/dashboard/resumeData", {
                templateUrl: "views/resume-data/resume-data.view.client.html",
                controller: "ResumeDataController",
                controllerAs: "model"
            })
            .when("/user/dashboard/resumeEdit", {
                templateUrl: "views/resume-edit/resume-edit.view.client.html",
                controller: "ResumeEditController",
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
            .when("/user/:uid/workexp/:wid", {
                templateUrl: "views/user/user.work.edit.view.client.html",
                controller: "EditWorkExpController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:widgetid", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:widgetid/flickr", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrController",
                controllerAs: "model"
            })
            .otherwise({redirectTo : '/login'});

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
    }
})();
