const app = angular.module('MakeupPlace-App', [])
app.controller("RegisterController", ($scope, $http)=>{
    $scope.name = ''
    $scope.email = ''
    $scope.password = ''
    $scope.confirmPassword = ''
    $scope.loading = false

    $scope.handleSubmit = () =>{
        if ($scope.password !== $scope.confirmPassword){
            return
        }

        $scope.loading = true

        $http.post('http://localhost:3333/api/users', {
            name: $scope.name,
            email: $scope.email,
            password: $scope.password
        }).then(() =>{
            $scope.loading = false
            location.href = "./index.html"
        }), () =>{
            $scope.loading = false
        }

    }
})