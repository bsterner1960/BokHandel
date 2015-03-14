app.controller("uiController", ["$scope", "$modal", "$routeParams", function ($scope, $modal, $routeParams) {
    console.log("uiController is alive!");

    //$routeParams is a JS object that is automatically filled with
    //any parameters and their values from the current URL
    console.log("routeParams: ", $routeParams);

    //for alert directives
    $scope.alerts = [
        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];

    $scope.closeAlert = function (index) {
        console.log("closed alert index: ", index);
        $scope.alerts.splice(index, 1);
    };


    //for pagination directives
    $scope.bigTotalItems = 111;
    $scope.bigCurrentPage = 2;
    $scope.itemsPP = 20;

    $scope.$watch("bigCurrentPage", function (newValue, oldValue) {
        console.log("bigCurrentPage: ", newValue);
        var showIndex = ($scope.bigCurrentPage - 1) * $scope.itemsPP;
        console.log("showIndex: " + showIndex + " - " + (showIndex + $scope.itemsPP - 1));
    })


    //for bootstrap modal views(!)
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {
        //using the $modal service to open a new modal
        var modalInstance = $modal.open({
            templateUrl: 'partials/modal.html', //partial to use
            controller: 'modalController', //controller to use
            size: size, //size is optional
            resolve: { //send in some data to the modalController using resolve (not needed!)
                items: function () {
                    return $scope.items;
                }
            }
        });

        //then wait for the modal to close/dismiss and act on the outcome 
        //depending on which of the two was used
        modalInstance.result.then(function (selectedItem) {
            //this function is called if $modalInstance.close() is used and receives
            //any data send through the .close() method
            console.log("ui Modal closed: ", selectedItem);
            $scope.selected = selectedItem;
        }, function () {
            //this function is called if $modalInstance.dismiss() is used
            console.log('Modal dismissed at: ' + new Date());
        });
    };
}]);

app.controller("modalController", ["$scope", "$modalInstance", "items", function ($scope, $modalInstance, items) {
    //items injected using resolve in main view controller
    $scope.items = items;
    //make an item selected by default
    $scope.selected = {
        item: $scope.items[0]
    };

    //if the user clicks "ok", call the $modalInstance.close() method and send data 
    //back to the main view
    $scope.ok = function () {
        console.log("modal Modal closed: ", $scope.selected.item);
        $modalInstance.close($scope.selected.item);
    };
    //if the user clicks "cancel", call the $modalInstance.dismiss() method
    $scope.cancel = function () {
        console.log("modal Modal dismissed ");
        $modalInstance.dismiss('cancel');
    };
}]);