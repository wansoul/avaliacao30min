angular.module('app.controllers', [])
  
.controller('avaliaO30minCtrl', ['$scope', '$state', '$stateParams', 
'AvaliacaoService', '$ionicLoading', '$ionicModal', '$ionicPopup',
'$ionicAuth', '$ionicUser',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, AvaliacaoService, $ionicLoading, $ionicModal, $ionicPopup, $ionicAuth, $ionicUser) {
	/* LOADING FUNCTION */
	$scope.showLoading = function() {
		$ionicLoading.show()
	};
	$scope.hideLoading = function(){
		$ionicLoading.hide();
	};
	/* END - LOADING FUNCTION */

	$scope.avaliacao = null;

	console.log("$ionicUser: ", $ionicUser);

	$scope.logout = function(){
		$ionicAuth.logout();
		console.log("Logout");
		$state.go('login');
	}


	$scope.setStars = function(avaliacao, n){
		console.log("setStars("+n+")");
		avaliacao.estrelas = n;
	}


	$scope.atualizar = function(){

		if(!$ionicUser.id){
			$state.go('login');
		}
		$scope.user = $ionicUser.details;

		$scope.showLoading();
		AvaliacaoService.getAvaliacoes()
		.then(function(avaliacoesData){
			$scope.listaAvaliacoes = avaliacoesData;
			$scope.hideLoading();
		});
		$scope.$broadcast('scroll.refreshComplete');
	}
	$scope.atualizar();



	$scope.postAvaliacao = function(avaliacao){

		if(avaliacao == null || 
		   avaliacao.nome == null || 
		   avaliacao.estrelas == null || 
		   avaliacao.comentario == null){

			var alertPopup = $ionicPopup.alert({
					title: 'Coisas primeiras primeiro',
					template: 'Preencha todos os campos!'
			});

			alertPopup.then(function(res) {
				
			});
			return;
		}
		console.log("Postar: ", avaliacao);

		$scope.showLoading();
		AvaliacaoService.postAvaliacao(avaliacao)
		.then(function(response){
			$scope.hideAvaliacaoModal();
			$scope.atualizar();
		});

	}	



	$scope.deletarAvaliacao = function(avaliacao){
		console.log("Deletar: ", avaliacao);
		
		var confirmPopup = $ionicPopup.confirm({
			title: 'Deletar Avaliação',
			template: 'Tem certeza que deseja deletar a avaliação de '+avaliacao.nome+'?'
		});

		confirmPopup.then(function(res) {
		    if(res) {
		       
		    	$scope.showLoading();
				AvaliacaoService.deleteAvaliacao(avaliacao)
				.then(function(response){
					$scope.atualizar();
				});

		    } else {
		       return;
		    }
		});
 
	}


	/*#### MODAL ######*/
	$ionicModal.fromTemplateUrl('modal-template.html', function(modal) {
		$scope.avaliacaoModal = modal;
	}, {
		scope: $scope
	});

	$scope.showAvaliacaoModal = function(){
		$scope.avaliacaoModal.show();
	}

	$scope.hideAvaliacaoModal = function(){
		$scope.avaliacaoModal.hide();
	}

}])




.controller('loginCtrl', ['$scope', '$state', '$stateParams', 
 '$ionicLoading', '$ionicPopup', '$ionicAuth', '$ionicUser',
function ($scope, $state,  $stateParams, $ionicLoading, $ionicPopup, $ionicAuth, $ionicUser) {

	/* LOADING FUNCTION */
	$scope.showLoading = function() {
		$ionicLoading.show()
	};
	$scope.hideLoading = function(){
		$ionicLoading.hide();
	};
	/* END - LOADING FUNCTION */

	$scope.logar = function(usuario){

		if(usuario == null ||
			usuario.email == null || 
			usuario.senha == null){

			var alertPopup = $ionicPopup.alert({
					title: 'Coisas primeiras primeiro',
					template: 'Preencha todos os campos!'
			});

			alertPopup.then(function(res){});
			return;
		}

		console.log("logar > user: ", usuario);

		var details = {
			'email': usuario.email, 
			'password': usuario.senha
		};

		$scope.showLoading();
		$ionicAuth.login('basic', details, {'remember': false})
		.then(function(){
			$state.go('avaliaO30min');
			$scope.hideLoading();
		});
		

	}

	$scope.criarConta = function(usuario){

		if(usuario == null || 
			usuario.username == null ||
			usuario.email == null || 
			usuario.senha == null){

			var alertPopup = $ionicPopup.alert({
					title: 'Coisas primeiras primeiro',
					template: 'Preencha todos os campos!'
			});

			alertPopup.then(function(res){});
			return;
		}

		$scope.showLoading();
		console.log("criarConta > user: ", usuario);

		var gravatarImage = "https://www.gravatar.com/avatar/" + md5(usuario.email);

		var details = {
			'email': usuario.email, 
			'password': usuario.senha, 
			'username': usuario.username,
			'image': gravatarImage
		};

		$ionicAuth.signup(details).then(function() {
		  // `$ionicUser` is now registered
		  alert("Usuário cadastrado com sucesso!");
		  $scope.createAccount = false;
		  $state.go('avaliaO30min');
		  $scope.hideLoading();
		}, function(err) {
			for (var e of err.details) {
				if (e === 'conflict_email') {
					alert('Email já cadastrado.');
				} else if (e === 'conflict_username') {
					alert('Nome de usuário já cadastrado.');
				} else if (e === 'invalid_email') {
					alert('Email inválido.');
				} else {
					alert("Algo errado não deu certo! Tente novamente.");
				}
			}
			$scope.hideLoading();
		});
		

	}

}])
