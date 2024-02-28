export default {
	myVar1: [],
	myVar2: {},

	async buscarQRCode (instance, apikey) {

		showModal("qrCode_read")

		storeValue("currentInstance", instance)
		storeValue("currentApikey", apikey)

		request_readQRCode.run(() => {

			const res = request_readQRCode.data

			console.log(res)

			if (res) {
				//storeValue("profile", newProfile)


			}else{
				showAlert("Erro ao buscar linhas", 'error')
			}

		}, (error) => {
			// Se ocorrer um erro durante a execução do request_login
			console.error('Erro durante a execução do request_readQRCode:', error);
			showAlert("Erro ao buscar linhas", 'error')

		})


	},


	async deleteInstance (instance, apikey, index) {

		if(index !== 0){

			storeValue("currentInstance", instance)
			storeValue("currentApikey", apikey)

			request_deleteInstace.run(() => {

				const res = request_deleteInstace.data

				//console.log(res)

				if (res) {
					//storeValue("profile", newProfile)
					showAlert("Instancia deletada com sucesso", 'success')
					request_searchLines.run()

				}else{
					showAlert("Erro ao deletar instância, tente novamnete mais tarde", 'error')
				}

			}, (error) => {
				// Se ocorrer um erro durante a execução do request_login
				console.error('Erro durante a execução do request_deleteInstace:', error);
				showAlert("Erro ao deletar instância, tente novamnete mais tarde", 'error')
				request_searchLines.run()

			})

		}else{

			showAlert('Não é possivel deletar a intância principal', 'error')
		}

	},




	async desconectInstance (instance, apikey) {

		storeValue("currentInstance", instance)
		storeValue("currentApikey", apikey)

		request_desconectInstancia.run(() => {

			const res = request_desconectInstancia.data

			//console.log(res)

			if (res) {
				//storeValue("profile", newProfile)
				showAlert("Instancia desconectada com sucesso", 'success')
				request_searchLines.run()

			}else{
				showAlert("Erro ao desconectar instância, verifique se a instância já não esta desconectada", 'error')
			}

		}, (error) => {
			// Se ocorrer um erro durante a execução do request_login
			console.error('Erro durante a execução do request_desconectInstancia:', error);
			showAlert("Erro ao desconectar instância, verifique se a instância já não esta desconectada", 'error')
			request_searchLines.run()

		})


	},


	async restartInstance (instance, apikey) {


		storeValue("currentInstance", instance)
		storeValue("currentApikey", apikey)

		request_restartInstancia.run(() => {

			const res = request_restartInstancia.data

			//console.log(res)

			if (res) {
				//storeValue("profile", newProfile)
				showAlert("Instancia reiniciado com sucesso", 'success')

			}else{
				showAlert("Erro ao reiniciar instancia", 'error')
			}

		}, (error) => {
			// Se ocorrer um erro durante a execução do request_login
			console.error('Erro durante a execução do request_restartInstancia:', error);
			showAlert("Erro ao reiniciar instancia", 'error')

		})


	},



	async getStatus(){


		request_profile.run(() => {

			const res = request_profile.data

			//console.log(res)

			if (res) {
				//storeValue("profile", newProfile)
				//showAlert("Instancia reiniciado com sucesso", 'success')

				TextStatusTriggerForList.setText(request_profile.data.user_profile.triggerForList.status)
				if(request_profile.data.user_profile.triggerForList.status == "Ativado"){
					TextStatusTriggerForList.setTextColor("#22c55e")
				}else{
					TextStatusTriggerForList.setTextColor("#ff0000")
				}

				TextStatusTriggerForEvents.setText(request_profile.data.user_profile.triggerForEventos.status)
				if(request_profile.data.user_profile.triggerForEventos.status == "Ativado"){
					TextStatusTriggerForEvents.setTextColor("#22c55e")
				}else{
					TextStatusTriggerForEvents.setTextColor("#ff0000")

				}

			}else{
				showAlert("Erro ao consultar os disparadores", 'error')
			}

		}, (error) => {
			// Se ocorrer um erro durante a execução do request_login
			console.error('Erro durante a execução do request_profile:', error);
			showAlert("Erro ao consultar os disparadores", 'error')

		})


	},



	async getProgress(){

		request_getProgressList.run(() => {

			const res = request_getProgressList.data

			//console.log(res)

			if (res) {
				//storeValue("profile", newProfile)
				//showAlert("Instancia reiniciado com sucesso", 'success')
				var total = parseInt(res.logsTableCount) + parseInt(res.triggerCount);

				var progress = res.logsTableCount + " / " + total

				//console.log(progress)

				TextProgressList.setText(progress)


			}else{
				showAlert("Erro ao consultar os disparadores", 'error')
			}

		}, (error) => {
			// Se ocorrer um erro durante a execução do request_login
			console.error('Erro durante a execução do request_profile:', error);
			showAlert("Erro ao consultar os disparadores", 'error')

		});


		request_getProgressEvents.run(() => {

			const res = request_getProgressEvents.data

			//console.log(res)

			if (res) {
				//storeValue("profile", newProfile)
				//showAlert("Instancia reiniciado com sucesso", 'success')


				TextProgressEvents.setText(res.logsTableCount.toString())


			}else{
				showAlert("Erro ao consultar os disparadores", 'error')
			}

		}, (error) => {
			// Se ocorrer um erro durante a execução do request_login
			console.error('Erro durante a execução do request_profile:', error);
			showAlert("Erro ao consultar os disparadores", 'error')

		})


	},


	async  loading(time = 3000) {
		showModal("loading");

		// Configurar um temporizador para fechar o modal após o tempo especificado
		setTimeout(() => {
			closeModal("loading");
		}, time);
	},


		async criarInstancia(name){

		if( name.split(" ").length -1 == 0 && name !== "" ){



			request_newInstance.run(() => {

				const res = request_newInstance.data

				console.log(res)

				if ( res.msg === 'Instância adicionada com sucesso') {

					showAlert('Instância criada com sucesso', 'success');
					closeModal("ModalNewInstance")

				} else if(res.msg === 'Instância já existe'){

					showAlert('Já existe uma instância com esse nome', 'info');

				}else {

					showAlert('Error ao criar instancia', 'error');
				}
			}, (error) => {
				// Se ocorrer um erro durante a execução do request_login
				console.error('Erro durante a execução do request_newInstance.:', error);
				showAlert('Error ao criar instancia', 'error');
			});




		}else{

			showAlert("Nome inválido, não deixe em branco e não use espaços.", 'error')
			return false;
		}


	},
	
	
	
	
	async replaceSpace(){
		
		
		InputNewInstnaiceName.setValue(InputNewInstnaiceName.text.replace(/\s/g, '-')) 


		
	}




}