app.controller('HomeController', ($scope, $http, AdminService, SessionService)=> {
    $scope.products = []

    $scope.getAllProducts = () =>{
        const token = localStorage.getItem('token')

        $http.get('http://localhost:3333/api/products',).then((response)=>{
            $scope.products = response.data;
        })
    }
    $scope.cartList = () =>{
        location.href = "./cartList.html"
    }
    
    $scope.logout = () => {
        localStorage.removeItem('token')
        location.href = './index.html'
    }

    $scope.isAdmin = AdminService.isAdmin()

    $scope.getAllProducts()
})