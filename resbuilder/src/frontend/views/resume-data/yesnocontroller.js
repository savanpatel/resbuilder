/**
 * Created by panktibhalani on 3/30/17.
 */


var app = angular.module('ResumeBuilder');

app.controller('YesNoController', ['$scope','s_w', 'close', function($scope,s_w, close) {

    var new_items = []
    var old_items = []
    $scope.status = []
    $scope.items = null;
    var id1 = "";
    var idIndex = null;
    var item = null;
    var id2 = "";
    if(s_w === 0)
    {

        $scope.title = "Configure Education"

        old_items = $scope.school
        $scope.items = $scope.school;

        for(i=0;i<old_items.length;i++)
        {
            $scope.status[i] = "Removed"
        }
        console.log(status)

    }
    else if(s_w === 1)
    {
        $scope.title = "Configure Projects"

        old_items = $scope.project
        $scope.items = $scope.project;

        for(i=0;i<old_items.length;i++)
        {
            $scope.status[i] = "Removed"

        }

    }
    else if(s_w === 2)
    {
        $scope.title = "Configure Work"

        old_items = $scope.work

        $scope.items = $scope.work;
        for(i=0;i<old_items.length;i++)
        {
            $scope.status[i] = "Removed"
        }
    }



    $scope.add1 = function(item,idIndex)
    {
        new_items.push(item)
        var index = old_items.indexOf(item)
        $scope.status[index] = "Added"

        id1 = "anchor_plus" + idIndex.toString();
        id2 = "anchor_minus" + idIndex.toString();
        var e1 = document.getElementById(id1);
        var e2 = document.getElementById(id2);
        e1.style.display = 'none';
        e2.style.display = 'block';
    }
    $scope.delete1 = function(item,idIndex)
    {
        var index =new_items.indexOf(item);
        var index2 = old_items.indexOf(item)
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
        close(new_items, 500);
    };




}]);