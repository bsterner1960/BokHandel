﻿app.controller("authorListController", ["$scope", "Authors", "$rootScope", "$modal", "Search",
    function ($scope, Authors, $rootScope, $modal, Search)
{

        $scope.endMessage = "muffin";

        $scope.authors = Authors.index(function (data)
        {
            //success call
            $scope.endMessage = "Loading complete, signing off.";
        },
        function (error)
        {
            //failed call
            $scope.endMessage = "Loading failed, self-destruct imminent, preparing emergency escape pods...";
        });
    
    var doneInitializing;

    $rootScope.$watch("authorSearchValue", function (data)
    {
        if (doneInitializing == true)
        {
            console.log("doneInitializing is true!");
        }
        else
        {
            //console.log("Running for the first time!");
            doneInitializing = true;
        }
    });

    

    $scope.viewAuthorDetails = function (author)
    {
        console.log("Initiating view author details sequence, standby...");

        console.log("author: " + author.Name);

        //opening a new modal instance
        var modalInstance = $modal.open(
        {
            templateUrl: 'partials/authorDetailsModal.html',
            controller: 'authorDetailsModalController',
            resolve:
            {
                author: function ()
                {
                    return author;
                }
            }
        });


        modalInstance.result.then(function (data) {
            console.log(data);

            for (var i = 0; i < $scope.authors.length; i++) {
                console.log("Looping: " + $scope.authors[i].Id);
                if ($scope.authors[i].Id === data.Id) {
                    console.log("Found it: " + $scope.authors[i].Id);
                    $scope.authors.splice(i, 1);
                }
            }
        });
    }
}]);