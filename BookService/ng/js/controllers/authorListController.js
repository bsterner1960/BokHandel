app.controller("authorListController", ["$scope", "Authors", "$rootScope", "$modal", "SearchAuthor",
    function ($scope, Authors, $rootScope, $modal, SearchAuthor)
{
        $scope.alerts = [];
        
        $scope.startMessage = "Loading...";

        // Loads all of the authors!
        $scope.loadEverything = function ()
        {
            $scope.authors = SearchAuthor.index({ whatToSearchFor: "authors", searchValue: null },
            function ()
            {
                // Success!
                $scope.startMessage = "Authors";
            },
            function ()
            {
                // Failure...
                $scope.alerts.push(
                {
                    type: 'danger',
                    msg: "Loading failed, self-destruct imminent, preparing emergency escape pods...: " +
                    error.status + " " +
                    error.statusText + ""
                });

                $scope.startMessage = "Failed to load.";
            });
        }

        $scope.loadEverything();


        $rootScope.$on('updateAuthors', function ()
        {
            $scope.loadEverything();
        });
    

        $scope.closeAlert = function (index)
        {
            $scope.alerts.splice(index, 1);
        };

       // Here we listen for when the user wants to preform a search
        $rootScope.$on('authorSearchEvent', function ()
        {
            
            $scope.alerts = [];

            // Send the request to the backend and then show the result on the view
            $scope.authors = SearchAuthor.index(
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
        //console.log("Initiating view author details sequence, standby...");

        //console.log("author: " + author.Name);

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

        modalInstance.result.then(function (myReturnObject)
        {
            if (myReturnObject.action !== "cancel")
            {
                for (var i = 0; i < $scope.authors.length; i++)
                {
                    if ($scope.authors[i].Id === myReturnObject.data.Id)
                    {
                        if (myReturnObject.action === "save")
                        {
                            $scope.authors[i].Name = myReturnObject.data.Name;
                        }
                        else if (myReturnObject.action === "delete")
                        {
                            $scope.authors.splice(i, 1);
                        }
                    }
                }
            }
        });

    }
}]);