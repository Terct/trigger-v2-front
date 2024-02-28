export default {

	async searchProfileFunction() {


		request_profile.run(() => {
			const res = request_profile.data

			console.log(res)

			if (res) {

				storeValue("profile", res)
				storeValue("messages", res.user_profile.messages)
				storeValue("events", res.user_profile.triggerForEventos.events)

				//console.log(appsmith.store.events)

				SelectTypoOfShort.setOptions(appsmith.store.profile.user_profile.triggerForEventos.typeOfShot)
				SelectLine.setSelectedOption(appsmith.store.profile.user_profile.triggerForEventos.lineSelected)

				MultiEventos.setSelectedOptions(appsmith.store.profile.user_profile.triggerForEventos.eventsSelecteds)



				SelectTypoOfShort.setSelectedOption(appsmith.store.profile.user_profile.triggerForEventos.labelTypeOfShot)


				TextStatusTrigger.setText(appsmith.store.profile.user_profile.triggerForEventos.status)



				if(appsmith.store.profile.user_profile.triggerForEventos.status == "Ativado"){

					TextStatusTrigger.setTextColor("#22c55e")

				}else{

					TextStatusTrigger.setTextColor("#ff0000")

				}

			} else {

			}

		}, (error) => {
			console.error('Erro durante a execução do request_profile:', error);
		})


		if(appsmith.store.profile.user_profile.triggerForList.labelTypeOfShot === "Fixo"){

			SelectLine.setDisabled(false)

		}else{

			SelectLine.setDisabled(true)

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



					"labelIntervalSelected": appsmith.store.profile.user_profile.triggerForList.labelIntervalSelected,
					"labelTypeOfShot": appsmith.store.profile.user_profile.triggerForList.labelTypeOfShot,
					"labelMessageType": appsmith.store.profile.user_profile.triggerForList.labelMessageType,


					"typebot": appsmith.store.profile.user_profile.triggerForList.typebot,
					"intervalSelected": appsmith.store.profile.user_profile.triggerForList.intervalSelected,
					"messagesSelected": appsmith.store.profile.user_profile.triggerForList.messagesSelected,
					"lineSelected": appsmith.store.profile.user_profile.triggerForList.lineSelected
				},

				"triggerForEventos": {

					"status": "Desativado",

					"typeOfShot": appsmith.store.profile.user_profile.triggerForEventos.typeOfShot,

					"EvntType": appsmith.store.profile.user_profile.triggerForEventos.EvntType,


					//Valores a Editar


					"labelTypeOfShot": SelectTypoOfShort.selectedOptionValue,

					"events": appsmith.store.profile.user_profile.triggerForEventos.events,
					"eventsSelecteds": MultiEventos.selectedOptionLabels,

					"lineSelected": SelectLine.selectedOptionValue,
					"labelMessageType": "Mensagem"


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
				navigateTo("TriggerEvents")

			}else{
				showAlert("Erro ao Salvar", 'error')
			}

		}, (error) => {
			// Se ocorrer um erro durante a execução do request_login
			console.error('Erro durante a execução do request_updateProfile:', error);
			showAlert("Erro ao Salvar", 'error')

		})


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

				var progress = res.logsTableCount.toString()

				TextProgress.setText(progress)

				//TextProgress.setTextColor()

			} else {
				showAlert("Erro ao buscar seu progresso", 'error');
			}

		}, (error) => {
			console.error('Erro durante a execução do request_getProgress:', error);
			showAlert("Erro ao buscar seu progresso", 'error');
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