app.controller('closedCartController', ($scope, $http, AdminService, SessionService)=> {
    $scope.carts = []

    $scope.getClosedCarts = () =>{
        $http.get('http://localhost:3333/api/carts/closed',{
            headers: {
                authorization: `Bearer ${SessionService.getToken()}`
            }
        }).then((response) => {
            $scope.carts = response.data.map((cart)=>{
              const date = new Date(cart.closedAt);
              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth() + 1).padStart(2, '0')
              const year = date.getFullYear()
              const hours = String(date.getHours()).padStart(2,'0')
              const minutes = String(date.getMinutes()).padStart(2,'0')
  
              return {
                ...cart,
                id: String(cart.id).padStart(4, '0'),
                closedAt: `${day}/${month}/${year} ${hours}:${minutes}`,
              }
            });
          });
      };


    $scope.backPage = () =>{
        location.href = './cartList.html'
    }
    $scope.getClosedCarts()
})