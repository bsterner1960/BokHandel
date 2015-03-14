app.controller("uiController", ["$scope", function ($scope)
{
    console.log("uiController is alive!");



    //For alert directives
    $scope.alerts = [
      { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
      { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.closeAlert = function (index) {
        Console.log("closed alert index: ", index);
        $scope.alerts.splice(index, 1);
    };

    // for bootstrap modal views(!)
    $scope.items = ['item1', 'item2', 'item3'];

    var modalInstance = $modal.open({
        templateUrl: 'partials/modal.html',
        controller: 'modalController',
        size: size,
        resolve: {
            items: function () {
                return $scope.items;
            }
        }
    });

    modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
    }, function () {
        $log.info('Modal dismissed at: ' + new Date());
    });


    //For pagination directives
    $scope.bigTotalItems = 111;
    $scope.bigCurrentPage = 2;

    $scope.watch("bigCurrentPage", function (newValue, oldValue)
    {
        console.log("bigCurrentPage: ", newValue);
    });

    $scope.allPartials =
    [
        {
            template: 'partials/bookform.html',
            controller: "bookformController"
        }
    ];

    $scope.partialPath = $scope.allPartials[0];

}]);


    app.controller("modalController", ["$scope", "$modalInstance", "items", function ($scope, $modalInstance, items) 
    {
        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);