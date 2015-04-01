app.controller("authorListController", ["$scope", "Authors", "$rootScope", "$modal", "Search",
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

       // Here we listen for when the user wants to preform a search
        $rootScope.$on('authorSearchEvent', function ()
        {
            
            $scope.alerts = [];

            // Send the request to the backend and then show the result on the view
            $scope.authors = Search.index(
            {
                whatToSearchFor: "authors",
                searchValue: $rootScope.searchValue
            },
                function (data)
                {
                    // Success!

                },
            function (error)
            {
                // Failure...
                $scope.alerts.push(
                {
                    type: 'danger',
                    msg: "Failure, the data requested was not retrieved successfully: " +
                        error.status + " " +
                        error.statusText + ""
                });
            });

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

        modalInstance.result.then(function (redTruckWithStuffAndThings)
        {
            if (redTruckWithStuffAndThings.action !== "cancel")
            {
                for (var i = 0; i < $scope.authors.length; i++)
                {
                    if ($scope.authors[i].Id === redTruckWithStuffAndThings.data.Id)
                    {
                        if (redTruckWithStuffAndThings.action === "save")
                        {
                            $scope.authors[i].Name = redTruckWithStuffAndThings.data.Name;
                        }
                        else if (redTruckWithStuffAndThings.action === "delete")
                        {
                            $scope.authors.splice(i, 1);
                        }
                    }
                }
            }
        });

    }
}]);