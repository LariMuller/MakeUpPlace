app.controller('closedCartController', ($scope, $http, AdminService, SessionService)=> {

    $scope.backPage = () =>{
        location.href = './cartList.html'
    }
})