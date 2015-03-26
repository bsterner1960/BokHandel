app.controller("authorListController", ["$scope", "Authors", "$rootScope", "$modal", "Search",
    function ($scope, Authors, $rootScope, $modal, Search)
{

    $scope.authors = Authors.index();

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
    }
}]);