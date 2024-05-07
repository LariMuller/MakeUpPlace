const app = angular.module('MakeupPlace-App', [])

app.controller("LoginController", ($scope, $http)=>{
    $scope.email = ''
    $scope.password = ''
    $scope.loading = false
    $scope.loginError = false

    $scope.handleSubmit = () =>{
        $scope.loading = true

        $http.post('http://localhost:3333/api/session', {
            email: $scope.email,
            password: $scope.password
        }).then((response) =>{
            localStorage.setItem('token', response.data.token)
            $scope.loading = false
            location.href = "./productsList.html"
        }), () =>{
            $scope.loginError = true
        }
    }
    $scope.verifyLogin = () =>{
        const token = localStorage.getItem('token')

        if (token){
        location.href = "./productList.html"
        }
    }
    $scope.verifyLogin()
})
