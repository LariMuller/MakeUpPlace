app.controller('closedCartController', ($scope, $http, AdminService, SessionService)=> {

    $scope.backPage = () =>{
        location.href = './cartList.html'
    }
    $scope.logout = () => {
        localStorage.removeItem('token')
        location.href = './index.html'
    }
})