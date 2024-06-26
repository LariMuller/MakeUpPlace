app.controller('HomeController', ($scope, $http, AdminService, SessionService)=> {
    $scope.products = []

    $scope.getAllProducts = () =>{
        const token = localStorage.getItem('token')

        $http.get('http://localhost:3333/api/products',).then((response)=>{
            $scope.products = response.data;
        })
    }

    $scope.addToCart = (productId) =>{
        $http.post('http://localhost:3333/api/carts', {
            productId
        }, {
            headers: {
                Authorization: `Bearer: ${SessionService.getToken()}`
            }
        })
        window.alert("Produto adicionado no carrinho")
    }

    $scope.cartList = () =>{
        location.href = "./cartList.html"
    }
    
    $scope.logout = () => {
        localStorage.removeItem('token')
        location.href = './index.html'
    }

    SessionService.verifyLogin(false)
    $scope.logout = SessionService.logout
    $scope.isAuthenticated = SessionService.isAuthenticated()
    $scope.isAdmin = AdminService.isAdmin();
    $scope.getAllProducts()
    SessionService.createVerifyLoginInterval(()=>{
        SessionService.verifyLogin(false)
        $scope.isAuthenticated = SessionService.isAuthenticated()
        $scope.isAdmin = AdminService.isAdmin();
        console.log("isAuthenticated", $scope.isAuthenticated)
        $scope.$apply()
    })
})