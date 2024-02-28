export default {

	messages: [],



	async serachProfile(){


		request_profile.run(() => {
			if (request_profile.data) {

				storeValue("events", request_profile.data.user_profile.triggerForEventos.events)

				// Faça algo após a remoção bem-sucedida, se necessário.
			} else {
				showAlert("Erro consultar seus eventos", 'error');
			}
		}, (error) => {
			// Se ocorrer um erro durante a execução do request_updateMessages
			console.error('Erro durante a execução do request_updateMessages:', error);
			showAlert("Erro consultar seus eventos", 'error');
		});


	},


	async RemoverEvents(name) {
		const eventosAtuais = appsmith.store.events;

		// Encontra o índice do item com o código fornecido
		const indiceParaRemover = eventosAtuais.findIndex(event => event.name === name);

		if (indiceParaRemover === -1) {
			console.error("Não foi encontrada nenhuma evento com o código fornecido.");
			// Adicione aqui qualquer lógica adicional que você queira executar se a mensagem não for encontrada.
			showAlert("Não foi encontrada evento com o código fornecido", 'error');
			return;
		}

		// Remove o elemento do array
		eventosAtuais.splice(indiceParaRemover, 1);

		console.log(eventosAtuais)
		// Atualiza o valor no armazenamento
		storeValue("events", eventosAtuais);


		request_updateEvents.run(() => {
			if (request_updateEvents.data.message === 'Eventos atualizadas com sucesso') {
				// Faça algo após a remoção bem-sucedida, se necessário.
			} else {
				showAlert("Erro ao modificar a lista de eventos", 'error');
			}
		}, (error) => {

			console.error('Erro durante a execução do request_updateMessages:', error);
			showAlert("Erro ao modificar a lista de eventos", 'error');
		});
	},



	async  loading(time = 3000) {
		showModal("loading");

		// Configurar um temporizador para fechar o modal após o tempo especificado
		setTimeout(() => {
			closeModal("loading");
		}, time);
	},



}
