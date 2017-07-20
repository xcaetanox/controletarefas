
var tarefasAPP = angular.module('tarefasAPP', ['ngRoute']);
var hostServico = "http://andrecaetano.ddns.net/";//serviço do java 


tarefasAPP.config(function ($routeProvider) {
	$routeProvider


		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'mainController'
		})
		.when('/tarefas', {
			templateUrl: 'pages/tarefas.html',
			controller: 'tarefController'
		});
});


tarefasAPP.controller('mainController', function ($scope, $http) {


	$http.get(hostServico + 'task').success(function (data) {
		$scope.tasks = data._embedded.task;
	});


	$scope.actionTask = function (tarefas, acao) {
		angular.forEach(tarefas, function (value, index) {
			var urlPut = value._links.self.href;
			if (value.taskSelected && acao != "delete") {

				switch (acao) {
					case 'finalizada':
						value.status = "Finalizada";
						break;
					case 'pendente':
						value.status = "Pendente";
						break;
					case 'executando':
						value.status = "Executando";
						break;
					default:

				}

				$http.put(urlPut, angular.toJson(value)).
					success(function (data, status, headers, config) {
						$http.get(hostServico + 'task').success(function (data) {
							$scope.tasks = data._embedded.task;
						});

					}).
					error(function (data, status, headers, config) {
						console.log(data);
					});

			} else if (value.taskSelected) {
				$http.delete(urlPut).then(
					function (response) {
						$http.get(hostServico + 'task').success(function (data) {
							$scope.tasks = data._embedded.task;
						});
					},
					function (response) {

					}
				);
			}




		})

	};

	$scope.formatDate = function(date){
          var dateOut = new Date(date);
          return dateOut;
    };

	$scope.salvaEdicao = function (tarefa) {
		var urlPut = tarefa._links.self.href;

		$http.put(urlPut, angular.toJson(tarefa)).
			success(function (data, status, headers, config) {
				$http.get(hostServico + 'task').success(function (data) {
					$scope.tasks = data._embedded.task;
				});

			}).
			error(function (data, status, headers, config) {
				console.log(data);
			});


	}

	$scope.setTarefaEidtar = function (tarefa) {
		$scope.tarefaEditar = tarefa;
	}



	$scope.taskSelected = function (tarefa) {
		if (tarefa.selected == true) {
			tarefa.selected = fase;
		} else {
			tarefa.selected = false;
		}

	}
});

tarefasAPP.controller('tarefController', function ($scope, $http) {
	$scope.adicionarTarefa = function (tarefa) {
		tarefa.status =  "Criada";
		 tarefa.dataCriacao =  new Date();
		$http.post(hostServico + "task", angular.toJson(tarefa)).
			success(function (data, status, headers, config) {
				$http.get(hostServico + 'task').success(function (data) {
				});
				 window.location.href = '/';

			}).
			error(function (data, status, headers, config) {
				console.log(data);
			});
	};
});