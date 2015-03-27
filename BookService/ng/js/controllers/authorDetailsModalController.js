app.controller("authorDetailsModalController", ["$scope", "$rootScope", "Authors", "$modalInstance", "author",
function ($scope, $rootScope, Authors, $modalInstance, author)
{
    console.log("author is: " + author.Name);
    $scope.author = author;
    $scope.authorError = false;

    
    console.log("Booting up authorDetailsModal successful, awaiting orders.");

    $scope.Delete = function ()
    {
        console.log("author.Id: " + author.Id);
        Authors.destroy(author.Id);
        $modalInstance.close();
    }

    $scope.Save = function()
    {
        $scope.actualObject =
        {
            AuthorID: $scope.author.Id,
            Name: $scope.author.Name
        };

        Authors.update($scope.actualObject,
        function (data)
        {
            console.log("data: " + data);
            //for successful calls
            $modalInstance.close();
        },
        function ()
        {
            //for unsuccessful calls
            console.log("Unable to update author. ");
            $scope.alert = { type: 'danger', msg: 'Unable to apdate author' };
            $scope.bookError = true;
        });
    }

    $scope.Cancel = function ()
    {
        console.log("Self-destruct has been overridden, emergency shut-down in 3... 2.... 1...");
        $modalInstance.close();
    };
}]);