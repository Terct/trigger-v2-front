export default {


	async CriarMensagem(name) {


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

			//console.log(mensagensAtuais);

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


		}else{

			showAlert("Nome inválido, não deixe em branco e não use espaços.", 'error')
			return false;
		}


	},


	async  loading(time = 3000) {
		showModal("loading");

		// Configurar um temporizador para fechar o modal após o tempo especificado
		setTimeout(() => {
			closeModal("loading");
		}, time);
	},


	async buscarLinhas() {
		request_searchLines.run(() => {
			const res = request_searchLines.data;

			if (res) {
				const modifiedRes = res.map(item => ({
					...item,
					label: `${item.name} - ${item.statusBR}`,
					value: item.instance
				}));

				// Agora, modifiedRes tem os novos campos "label" e "value" adicionados a cada item.
				//console.log(modifiedRes);

				storeValue("lines", modifiedRes)

				//return modifiedRes


			} else {
				showAlert("Erro ao buscar linhas", 'error');
			}

		}, (error) => {
			console.error('Erro durante a execução do request_searchLines:', error);
			showAlert("Erro ao buscar linhas", 'error');
		});
	},


	async buscarProgresso() {
		request_getProgress.run(() => {
			const res = request_getProgress.data;

			if (res) {

				var total = parseInt(res.logsTableCount) + parseInt(res.triggerCount);

				var progress = res.logsTableCount + " / " + total

				//console.log(progress)
				TextQtdsItens.setText(total.toString())
				TextProgress.setText(progress)


				//TextProgress.setTextColor()

			} else {
				showAlert("Erro ao buscar seu progresso", 'error');
			}

		}, (error) => {
			console.error('Erro durante a execução do request_getProgress:', error);
			showAlert("Erro ao buscar seu progresso", 'error');
		});
	}


}