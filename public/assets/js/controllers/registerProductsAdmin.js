app.controller('AdminCreateProduct', ($scope, $http, SessionService)=> {
    $scope.name = ''
    $scope.description = ''
    $scope.price = 'R$ 0,00'
    $scope.imageUrl = ''

    $scope.formatPrice = () => {
        const price = Number($scope.price.replace(/\D/g, '')).toString()
        let priceStr = price.padStart(3, "0")
        let priceArr = priceStr.split('')
        priceArr.splice(priceArr.length - 2,0,",")
        $scope.price = 'R$' + priceArr.join('')

    }


    $scope.registerProduct = ()=>{
        if (!$scope.name || !$scope.description || !$scope.price || !$scope.imageUrl){
            return alert("Digite em todos os campos.")
        }
        $http.post("http://localhost:3333/api/products", 
        {
            name: $scope.name,
            description: $scope.description,
            price: Number($scope.price.replace(/\D/g, '')) /100,
            imageUrl: $scope.imageUrl
        }, {
            headers: {
                Authorization: `Bearer ${SessionService.getToken()}`
            }
        })
        .then(() => {
            alert("Produto Registrado")
            location.href = './productsList.html'
        }, () => {
            alert("Aconteceu algum erro")
        })
    }

    $scope.backPage = () =>{
        location.href = './productsList.html'
    }

    SessionService.verifyLogin()
    SessionService.createVerifyLoginInterval()
    $scope.logout = SessionService.logout
})