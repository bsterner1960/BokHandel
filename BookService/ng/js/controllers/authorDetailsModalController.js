app.controller("authorDetailsModalController", ["$scope", "$rootScope", "Authors", "$modalInstance", "author",
function ($scope, $rootScope, Authors, $modalInstance, author)
{
    console.log("author is: " + author.Name);
    $scope.author = author;
    $scope.authorError = false;

    
    console.log("Booting up authorDetailsModal successful, awaiting orders.");

    $scope.deletionObject =
    {
        Id: author.Id
    };



    $scope.Delete = function ()
    {
        console.log("author.Id" + author.Id);
        Authors.destroy($scope.deletionObject,
        function (data)
        {
            //Success call
            console.log("Target successfully terminated, searching for new targets... " + data);
            $modalInstance.close(data);
        },
        function (error)
        {
            // Error call
            console.log("Unable to terminate target. Target appears to be angry, suggestion: RUN! " + error);
        });
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
            $modalInstance.close(data);
        },
        function (error)
        {
            //for unsuccessful calls
            console.log("Unable to update author. ");
            $scope.alert = { type: 'danger', msg: 'Unable to apdate author' };
            $scope.bookError = true;
        });
    }

    $scope.Cancel = function (data)
    {
        console.log("Self-destruct has been overridden, emergency shut-down in 3... 2.... 1...");
        $modalInstance.close(data);
    };
}]);