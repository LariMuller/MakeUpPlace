app.controller('CartController', ($scope, $http, AdminService, SessionService)=> {
    $scope.items = []

    function getCart(){
        $http.get('http://localhost:3333/api/carts',{
            headers: {
                authorization: `Bearer ${SessionService.getToken()}`
            }
        }).then((response) =>{
            $scope.items = response.data.items
        })
    }

    $scope.onQuantityChange = (id) => {
        const item = $scope.items.find(item => item.id === id)

        item.quantity = item.quantity < 1 ? 1 : item.quantity

        $scope.total = $scope.items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
    }

    $scope.increase = (id) =>{
        const item = $scope.items.find(item => item.id === id)
        item.quantity++
        $scope.onQuantityChange(id)
    }
    $scope.decrease = (id) =>{
        const item = $scope.items.find(item => item.id === id)
        item.quantity--
        $scope.onQuantityChange(id)
    }

    getCart()
    $scope.total = $scope.items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)

    $scope.backPage = () =>{
        location.href = './productsList.html'
    }
    $scope.closedCart = () => {
        location.href = './closedCartList.html'
    }
})