
var app = angular.module('ResumeBuilder');

app.controller('YesNoController', ['$scope','s_w', 'close', function($scope,s_w, close) {

    var old_items = []
    var new_items = []
    $scope.status = []
    $scope.items = null;
    var id1 = "";
    var idIndex = null;
    var item = null;
    var id2 = "";
    $scope.add1 = add1;
    $scope.delete1 = delete1
    function init() {
        if(s_w === 0)
        {
            new_items = $scope.resumeEducation1;

            $scope.title = "Configure Education"
            old_items = $scope.school

            var school1 = []
            for(var i =0;i<$scope.school.length;i++)
            {

                school1.push($scope.school[i].school);
            }

            $scope.items = school1;

        }
        else if(s_w === 1)
        {
            new_items = $scope.resumeProject1;
            $scope.title = "Configure Projects"
            old_items = $scope.project
            var project1 = []
            for(var i =0;i<$scope.project.length;i++)
            {
                project1.push($scope.project[i].title);
            }
            $scope.items = project1;
        }
        else if(s_w === 2)
        {
            new_items = $scope.resumeWork1;
            $scope.title = "Configure Work"
            old_items = $scope.work
            var work1 = []
            for(var i =0;i<$scope.work.length;i++)
            {
                work1.push($scope.work[i].companyName);
            }
            $scope.items = work1;
        }

        for(var i=0;i<old_items.length;i++) {
            if(new_items.indexOf(old_items[i]) > -1) {
                $scope.status[i] = "Added"
            }
            else
            {
                $scope.status[i] = "Removed"
            }
        }
    }

    init()

    $(document).ready(function() {


        for(var i=0;i<old_items.length;i++) {

            id1 = "anchor_plus" + i.toString();
            id2 = "anchor_minus" + i.toString();
            var e1 = document.getElementById(id1);
            var e2 = document.getElementById(id2);

            var index = -1;
            for(var j=0;j<new_items.length;j++)
            {
                if(s_w === 0) {
                    if (old_items[i].school === new_items[j].school) {
                        index = j;
                        break;
                    }
                }
                else if(s_w === 1) {
                    if (old_items[i].title === new_items[j].title) {
                        index = j;
                        break;
                    }
                }
                else if(s_w === 2) {
                    if (old_items[i].companyName === new_items[j].companyName) {
                        index = j;
                        break;
                    }
                }
            }

            if(index > -1) {

                $scope.status[i] = "Added"
                e1.style.display = 'none';
                e2.style.display = 'block';
            }
            else {

                $scope.status[i] = "Removed"
                e1.style.display = 'block';
                e2.style.display = 'none';
            }
        }
    });

    function add1(item,idIndex)
    {

        var index1 = -1;
        for(var i = 0;i<old_items.length;i++)
        {

            if(s_w === 0) {
                if (item === old_items[i].school) {
                    index1 = i;
                    break;
                }
            }
            else if(s_w === 1) {
                if (item === old_items[i].title) {
                    index1 = i;
                    break;
                }
            }
            else if(s_w === 2) {

                if (item === old_items[i].companyName) {
                    index1 = i;
                    break;
                }
            }

        }

        new_items.push(old_items[index1])
        id1 = "anchor_plus" + idIndex.toString();
        id2 = "anchor_minus" + idIndex.toString();
        var e1 = document.getElementById(id1);
        var e2 = document.getElementById(id2);
        e1.style.display = 'none';
        e2.style.display = 'block';
    }

    function delete1(item,idIndex)
    {


        var index;
        for(var i = 0;i<new_items.length;i++) {

            if(s_w === 0) {
                if (item === new_items[i].school) {
                    index = i;
                    break;
                }
            }
            else if(s_w === 1) {
                if (item === new_items[i].title) {
                    index = i;
                    break;
                }
                else if(s_w === 2) {
                    if (item === new_items[i].companyName) {
                        index = i;
                        break;
                    }
                }
            }
        }

        var index2;
        for(var i = 0;i<old_items.length;i++) {

            if (s_w === 0) {
                if (item === old_items[i].school) {
                    index2 = i;
                    break;
                }
            }
            else if (s_w === 1) {
                if (item === old_items[i].title) {
                    index2 = i;
                    break;
                }
                else if (s_w === 2) {
                    if (item === old_items[i].companyName) {
                        index2 = i;
                        break;
                    }
                }
            }
        }

        new_items.splice(index, 1);
        $scope.status[index2] = "Removed"

        id1 = "anchor_plus" + idIndex.toString();
        id2 = "anchor_minus" + idIndex.toString();

        var e1 = document.getElementById(id1);
        var e2 = document.getElementById(id2);

        e1.style.display = 'block';
        e2.style.display = 'none';
    }

    $scope.close = function() {
        close(new_items, 1000);
    };




}]);