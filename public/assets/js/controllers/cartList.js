app.controller('CartController', ($scope, $http, AdminService, SessionService)=> {

    $scope.backPage = () =>{
        location.href = './productsList.html'
    }
    $scope.closedCart = () => {
        location.href = './closedCartList.html'
    }
})