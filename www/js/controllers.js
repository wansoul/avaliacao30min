angular.module('app.controllers', [])
  
.controller('avaliaO30minCtrl', ['$scope', '$stateParams', 
'AvaliacaoService', '$ionicLoading', '$ionicModal', '$ionicPopup',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, AvaliacaoService, $ionicLoading, $ionicModal, $ionicPopup) {

	/* LOADING FUNCTION */
	$scope.showLoading = function() {
		$ionicLoading.show()
	};
	$scope.hideLoading = function(){
		$ionicLoading.hide();
	};
	/* END - LOADING FUNCTION */

	$scope.atualizar = function(){
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
		console.log("Postar: ", avaliacao);

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
