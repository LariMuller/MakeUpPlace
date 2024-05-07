app.controller('AdminUpdateController', ($scope, $http, SessionService)=> {
    $scope.name = ''
    $scope.description = ''
    $scope.price = 'R$ 0,00'
    $scope.imageUrl = ''

    function getProduct(){
        const searchParams = new URLSearchParams(location.search)
        const productId = searchParams.get('productId')

        $http.get('http://localhost:3333/api/products/' + productId).then(response =>{
            $scope.name = response.data.name
            $scope.description = response.data.description
            $scope.price = (response.data.price).toFixed(2)
            $scope.formatPrice()
            $scope.imageUrl = response.data.imageUrl
        })
    }
    getProduct()

    $scope.formatPrice = () => {
        const price = Number($scope.price.replace(/\D/g, '')).toString()
        let priceStr = price.padStart(3, "0")
        let priceArr = priceStr.split('')
        priceArr.splice(priceArr.length - 2,0,",")
        $scope.price = 'R$' + priceArr.join('')
    }

    $scope.updateProduct = ()=>{
        const searchParams = new URLSearchParams(location.search)
        const productId = searchParams.get('productId')
        if (!$scope.name || !$scope.description || !$scope.price || !$scope.imageUrl){
            return alert("Digite em todos os campos.")
        }
        $http.patch("http://localhost:3333/api/products/" + productId, 
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
            alert("Produto Atualizado")
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