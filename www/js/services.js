angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('AvaliacaoService', ['$http' ,function($http){

	URL = "https://avaliacao-30-minutos.herokuapp.com/avaliacoes.json";
	deleteURL = "https://avaliacao-30-minutos.herokuapp.com/avaliacoes/";

	return {
		getAvaliacoes: function(){
			return $http.get(URL).then(function(response){
				avaliacoesData = response.data;
				return avaliacoesData;
			}).catch(function(response){
				return response;
			});
		},
		postAvaliacao: function(avaliacao){

			body = {
	          avaliacao: {
	      			nome: avaliacao.nome,
	       			estrelas : avaliacao.estrelas,
	       			comentario : avaliacao.comentario
     			}
	        }

	        return $http.post(URL, body).then(function(response){
	        	console.log("$http.post: ", response);
				return response;
			}).catch(function(response){
				console.log("$http.catch: ", response);
				return response;
			});

		},
		deleteAvaliacao: function(avaliacao){
			
	        return $http.delete(deleteURL+avaliacao.id).then(function(response){
	        	console.log("$http.delete: ", deleteURL+avaliacao.id, response);
				return response;
			}).catch(function(response){
				console.log("$http.catch: ", response);
				return response;
			});

		}

	}

}]);