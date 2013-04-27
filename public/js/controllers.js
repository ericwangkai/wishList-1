'use strict';

               /* Controllers */

/*
function NavBarController($scope) {
    $scope.onLogin = function()
    {
        // a direct window.location to overcome Angular intercepting your call!
        window.location = "/auth/twitter";
    }

    $scope.onRegisterLogin = function () {
		
    }
}
*/


function LoginController($scope, $http) {

  $scope.onLogin = function (user) {
	
    $http.post('/login', {
      email: user.email,
      password: user.password
    }).
    success(function(data, status, headers, config) {
      alert(JSON.stringify(data));
	  alert(JSON.stringify(status));
	  alert(JSON.stringify(headers));
	  alert(JSON.stringify(config));
    });
  };
}

function RegisterController($scope, $http){
	$scope.onRegister = function (user) {
	$http.post('/register', {
      email: user.email,
      password1: user.password1,
	  passowrd2: user.passowrd2
    }).
    success(function(data, status, headers, config) {
      localStorage.Is_Login = data.successful;
	  localStorage.USER_ID = data.userId;
	  localStorage.USER_EMAIL = data.email;
    });
  };
}
