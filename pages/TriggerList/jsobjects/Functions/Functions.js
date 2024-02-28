export default {


	async searchProfileFunction() {


		request_profile.run(() => {
			const res = request_profile.data

			console.log(res)

			if (res) {

				storeValue("profile", res)
				storeValue("messages", res.user_profile.messages)

				selectInterval.setOptions(appsmith.store.profile.user_profile.triggerForList.interval)			
				InputInterval.setValue(appsmith.store.profile.user_profile.triggerForList.intervalSelected)

				SelectTypoOfShort.setOptions(appsmith.store.profile.user_profile.triggerForList.typeOfShot)
				SelectLine.setSelectedOption(appsmith.store.profile.user_profile.triggerForList.lineSelected)

				SelectTypeMessage.setOptions(appsmith.store.profile.user_profile.triggerForList.messageType)
				MultiSelectMessages.setSelectedOptions(appsmith.store.profile.user_profile.triggerForList.messagesSelected)

				InputTypebot.setValue(appsmith.store.profile.user_profile.triggerForList.typebot)

				TextStatusTrigger.setText(appsmith.store.profile.user_profile.triggerForList.status)

				selectInterval.setSelectedOption(appsmith.store.profile.user_profile.triggerForList.labelIntervalSelected)
				SelectTypeMessage.setSelectedOption(appsmith.store.profile.user_profile.triggerForList.labelMessageType)
				SelectTypoOfShort.setSelectedOption(appsmith.store.profile.user_profile.triggerForList.labelTypeOfShot)




				if(appsmith.store.profile.user_profile.triggerForList.status == "Ativado"){

					TextStatusTrigger.setTextColor("#22c55e")

				}else{

					TextStatusTrigger.setTextColor("#ff0000")

				}

			} else {

			}

		}, (error) => {
			console.error('Erro durante a execução do request_profile:', error);
		})


		if(appsmith.store.profile.user_profile.triggerForList.labelMessageType === "Mensagem"){

			MultiSelectMessages.setDisabled(false)
			InputTypebot.setDisabled(true)

		}else{

			MultiSelectMessages.setDisabled(true)
			InputTypebot.setDisabled(false)

		}

		if(appsmith.store.profile.user_profile.triggerForList.labelTypeOfShot === "Fixo"){

			SelectLine.setDisabled(false)

		}else{

			SelectLine.setDisabled(true)

		}


	},


	async verificarTipoMensagem(){

		//console.log(SelectTypeMessage.selectedOptionValue)

		if(SelectTypeMessage.selectedOptionValue === "Mensagem"){

			MultiSelectMessages.setDisabled(false)
			InputTypebot.setDisabled(true)

		}else{

			MultiSelectMessages.setDisabled(true)
			InputTypebot.setDisabled(false)

		}



	},


	async verificarTipoDisparo(){

		if(SelectTypoOfShort.selectedOptionValue === "Fixo"){

			SelectLine.setDisabled(false)

		}else{

			SelectLine.setDisabled(true)

		}

	},


	async salvarPerfil(){

		appsmith.store.profile.user_profile.triggerForList.interval

		let newProfile = [


			{
				"triggerForList": {
					"status": "Desativado",
					"interval": appsmith.store.profile.user_profile.triggerForList.interval,

					"typeOfShot": appsmith.store.profile.user_profile.triggerForList.typeOfShot,

					"messageType": appsmith.store.profile.user_profile.triggerForList.messageType,

					//Valores a Editar

					"labelIntervalSelected": selectInterval.selectedOptionValue,
					"labelTypeOfShot": SelectTypoOfShort.selectedOptionValue,
					"labelMessageType": SelectTypeMessage.selectedOptionValue,


					"typebot": InputTypebot.text,
					"intervalSelected": InputInterval.text,
					"messagesSelected": MultiSelectMessages.selectedOptionValues,
					"lineSelected": SelectLine.selectedOptionValue
				},

				"triggerForEventos": {

					"status": "Desativado",

					"interval": appsmith.store.profile.user_profile.triggerForEventos.interval,

					"typeOfShot": appsmith.store.profile.user_profile.triggerForEventos.typeOfShot,

					"EvntType": appsmith.store.profile.user_profile.triggerForEventos.EvntType,

					"labelIntervalSelected": appsmith.store.profile.user_profile.triggerForEventos.labelIntervalSelected,
					"labelTypeOfShot": appsmith.store.profile.user_profile.triggerForEventos.labelTypeOfShot,
					"labelMessageType": appsmith.store.profile.user_profile.triggerForEventos.labelMessageType,


					"intervalSelected": appsmith.store.profile.user_profile.triggerForEventos.intervalSelected,
					"events": appsmith.store.profile.user_profile.triggerForEventos.events,
					"lineSelected": appsmith.store.profile.user_profile.triggerForEventos.lineSelected

				},
				"messages": appsmith.store.messages

			}

		]

		storeValue("newProfile", newProfile)

		//console.log(newProfile)


		request_updateProfile.run(() => {

			const res = request_updateProfile.data

			if (res.message === "Perfil atualizado com sucesso") {
				//storeValue("profile", newProfile)

				showAlert("Configurações salvas com seucesso")
				navigateTo("TriggerList")

			}else{
				showAlert("Erro ao Salvar", 'error')
			}

		}, (error) => {
			// Se ocorrer um erro durante a execução do request_login
			console.error('Erro durante a execução do request_updateProfile:', error);
			showAlert("Erro ao Salvar", 'error')

		})


	},



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