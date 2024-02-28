export default {

	messages: [],




	async CriarMensagem() {


		if( name.split(" ").length -1 == 0 && name !== "" ){	

			const novoCodigo = InputCreatMessageName.text;
			const novaMensagem = {
				"name": InputCreatMessageName.text,
				"code": novoCodigo,
				"value": RichTextCreatMessageContent.text
			};

			const mensagensAtuais = appsmith.store.messages;

			// Verifica se já existe uma mensagem com o mesmo código
			const mensagemExistente = mensagensAtuais.find(mensagem => mensagem.code === novoCodigo);

			if (mensagemExistente) {
				console.error("Já existe uma mensagem com o mesmo código. Por favor, escolha um código único.");
				// Adicione aqui qualquer lógica adicional que você queira executar em caso de código duplicado.
				showAlert("o nome da mensagem já existe", 'error')
				return;
			}

			// Adiciona o novo elemento ao array
			mensagensAtuais.push(novaMensagem);

			// Atualiza o valor no armazenamento
			storeValue("messages", mensagensAtuais);


			request_updateMessages.run(() => {

				if (request_updateMessages.data.message === 'Mensagens atualizadas com sucesso') {



				}else{
					showAlert("Erro ao modificar a lista de menssages", 'error')
				}

			}, (error) => {
				// Se ocorrer um erro durante a execução do request_login
				console.error('Erro durante a execução do request_updateMessages:', error);
				showAlert("Erro ao modificar a lista de menssages", 'error')

			})

			showAlert("Nome inválido, não deixe em branco e não use espaços.", 'error')
			return false;
		}



	},

	async RemoverMensagem(codigo) {
		const mensagensAtuais = appsmith.store.messages;

		// Encontra o índice do item com o código fornecido
		const indiceParaRemover = mensagensAtuais.findIndex(mensagem => mensagem.code === codigo);

		if (indiceParaRemover === -1) {
			console.error("Não foi encontrada nenhuma mensagem com o código fornecido.");
			// Adicione aqui qualquer lógica adicional que você queira executar se a mensagem não for encontrada.
			showAlert("Não foi encontrada nenhuma mensagem com o código fornecido", 'error');
			return;
		}

		// Remove o elemento do array
		mensagensAtuais.splice(indiceParaRemover, 1);

		// Atualiza o valor no armazenamento
		storeValue("messages", mensagensAtuais);

		// Executa o request para atualizar as mensagens
		request_updateMessages.run(() => {
			if (request_updateMessages.data.message === 'Mensagens atualizadas com sucesso') {
				// Faça algo após a remoção bem-sucedida, se necessário.
			} else {
				showAlert("Erro ao modificar a lista de mensagens", 'error');
			}
		}, (error) => {
			// Se ocorrer um erro durante a execução do request_updateMessages
			console.error('Erro durante a execução do request_updateMessages:', error);
			showAlert("Erro ao modificar a lista de mensagens", 'error');
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
