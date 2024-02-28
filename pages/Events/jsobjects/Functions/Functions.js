export default {

	webhooksDate: [],
	webhooksDateTransformed: [],
	webhooksDateLabels: [],
	testeText:"",
	newEvent: {},

	async connectWebSocketOpen() {

		const socket = new WebSocket(`wss://d24xbzj6-61516.brs.devtunnels.ms/${appsmith.store.webhookId}`);

		socket.onopen = () => {
			console.log('Conexão estabelecida com sucesso.');
		};

		socket.onmessage = (event) => {
			const data = event.data;

			// Verificando se há dados recebidos
			if (data) {
				try {
					const parsedData = JSON.parse(data);

					//console.log('Dados recebidos:', parsedData);


					// Chamando a função para modificar o JSON e obter params e body
					const { params, body } = this.modificarJSON(parsedData);

					var dataModiqued = []

					if (params && body) {
						//console.log('Params:', params);
						//console.log('Body:', body);
						dataModiqued.push(params)
						dataModiqued.push(body)

						//console.log(dataModiqued)

						this.webhooksDate = dataModiqued

						const arrayLabels = this.criarArrayLabelValue(body)
						this.transformJSON(dataModiqued[1])

						//console.log(arrayLabels)
						this.webhooksDateLabels = arrayLabels

						closeModal("ModalListingWehooks")
						SelectIndentificador.setDisabled(false);
						SelectTypePhone.setDisabled(false);
						SelectValuePhone.setDisabled(false);
						InputValorCondicao.setDisabled(false);
						ButtonSave.setDisabled(false);
						ButtonTestSend.setDisabled(false);
						SwitchCondicional.setDisabled(false);

						RichTextEvent.setDisabled(false);
						SelectTypeTrigger.setDisabled(false)

					} else {
						console.error('Erro ao modificar o JSON.');
					}

				} catch (error) {
					console.error('Erro ao analisar os dados JSON:', error);
				}
			} else {
				console.warn('Dados recebidos estão vazios.');
			}
		};

		socket.onerror = (error) => {
			console.error('Erro na conexão WebSocket:', error);
		};

		socket.onclose = () => {

			ImageListingEvents.setImage("https://img.freepik.com/vetores-premium/nenhum-resultado-pesquisa-ilustracao-plana_418302-99.jpg")
			TextNotFound.setVisibility(true);
			ButtonTentarNovamente.setDisabled(false);
			console.log('Conexão fechada.');

		};


	},


	async buscarWebooks() {

		request_searchWebhookId.run(() => {

			if (request_searchWebhookId.data) {

				storeValue("webhookId", request_searchWebhookId.data.webhook_id)

			}else{
				showAlert("Erro ao buscar webhooks", 'error')
			}

		}, (error) => {
			// Se ocorrer um erro durante a execução do request_login
			console.error('Erro durante a execução do request_searchWebhookIde:', error);
			showAlert("Erro ao buscar webhooks", 'error')

		})

	},

	modificarJSON(data) {
		const params = [];
		const body = [];

		// Função para converter objetos aninhados em subitens planos
		const flattenObject = (obj, parentKey = '') => {
			let flattened = {};
			for (const [key, value] of Object.entries(obj)) {
				const nestedKey = parentKey ? `${parentKey}.${key}` : key;
				if (Array.isArray(value)) {
					value.forEach((item, index) => {
						if (typeof item === 'object' && item !== null) {
							const flattenedItem = flattenObject(item, `${nestedKey}.${index}`);
							flattened = { ...flattened, ...flattenedItem };
						} else {
							flattened[`${nestedKey}.${index}`] = String(item);
						}
					});
				} else if (typeof value === 'object' && value !== null) {
					const flattenedNested = flattenObject(value, nestedKey);
					flattened = { ...flattened, ...flattenedNested };
				} else {
					flattened[nestedKey] = String(value);
				}
			}
			return flattened;
		};

		// Iterar sobre os itens do array
		data.forEach((item, index) => {
			// Iterar sobre as chaves e valores de cada item
			const flatItem = flattenObject(item);
			const flatKeys = Object.keys(flatItem);
			const flatValues = Object.values(flatItem);
			if (index === 0) {
				params.push(flatItem);
			} else {
				flatKeys.forEach((key, i) => {
					body.push({ [key]: flatValues[i] });
				});
			}
		});

		// Retornar os arrays Params e Body
		return { params, body };
	},


	criarArrayLabelValue(body) {
		const labelValueArray = [];
		body.forEach(item => {
			const key = Object.keys(item)[0];
			const value = Object.keys(item)[0];
			labelValueArray.push({ label: key, value });
		});
		return labelValueArray;
	},


	async EnviarTeste() {

		var conditionStatus = SwitchCondicional.isDisabled;
		var conditionIdentifier = SelectIndentificador.selectedOptionValue;
		var conditionValue = InputValorCondicao.text;
		var conditionIdentifierValue;
		var textTestSelected = RichTextEvent.text;
		var triggerType = SelectTypeTrigger.selectedOptionValue


		if (conditionStatus) {
			//console.log(this.webhooksDate[1]);
			// Verificar se o nome do item está presente no objeto
			for (var i = 0; i < this.webhooksDate[1].length; i++) {
				var obj = this.webhooksDate[1][i];
				if (conditionIdentifier in obj) {
					const valorItem = obj[conditionIdentifier];
					console.log(`O valor do item '${conditionIdentifier}' é: ${valorItem}`);
					//conditionIdentifier = valorItem;
					conditionIdentifierValue = valorItem;
					//return; // Se encontrado, sai da função

				}
			}

			if(!conditionIdentifierValue){
				console.log(`O item '${conditionIdentifier}' não foi encontrado no JSON.`);
				showAlert("Teste Negado, a condição não foi verdadeira",'error')
				return;
			}


			if(conditionIdentifierValue == conditionValue){

			}else{

				showAlert("Teste Negado, a condição não foi verdadeira",'error')
				return;

			}

		}

		// Verificar se há variáveis no texto
		var matches = textTestSelected.match(/\{[^\{\}]+\}/g);

		if (matches) {
			for (var i = 0; i < matches.length; i++) {
				var variableName = matches[i].slice(1, -1); // Remover as chaves das variáveis
				var variableValue = ""; // Definir o valor da variável como vazio por padrão
				// Verificar se a variável está presente no objeto webhooksDate
				for (var j = 0; j < this.webhooksDate[1].length; j++) {
					var obj = this.webhooksDate[1][j];
					if (variableName in obj) {
						variableValue = obj[variableName];
						break;
					}
				}
				// Substituir a variável pelo seu valor no texto
				textTestSelected = textTestSelected.replace(matches[i], variableValue);
			}
		}
		// Agora textTestSelected contém o texto com as variáveis substituídas por seus valores correspondentes
		//nsole.log(textTestSelected);


		this.testeText = textTestSelected


		request_sendTest.run(() => {

			if (request_sendTest.data) {

				showAlert("Teste enviado com sucesso", 'success')

			}else{
				showAlert("Erro ao enviar o envio teste", 'error')
			}

		}, (error) => {
			// Se ocorrer um erro durante a execução do request_login
			console.error('Erro durante a execução do request_searchWebhookIde:', error);
			showAlert("Erro ao enviar o envio teste", 'error')

		})



	},

	async criarEventos(name) {

		if ( name.split(" ").length -1 == 0 && name !== ""  ) {

			var newEvent = {
				"name": InputEventName.text,
				"condition": SwitchCondicional.isDisabled,
				"conditionIdentifier": SelectIndentificador.selectedOptionLabel,
				"conditionValue": InputValorCondicao.text,
				"typeTrigger": SelectTypeTrigger.selectedOptionValue,
				"typebotUrl": InputUrlFluxo.text,
				"selectedVariavles": MultiSelectVariableTypebot.selectedOptionLabels,
				"text": RichTextEvent.text,
				"typeNumber": SelectTypePhone.selectedOptionValue,
				"number": SelectValuePhone.selectedOptionLabel

			}

			var events = appsmith.store.events

			events.push(newEvent)

			storeValue("events", events)
			this.newEvent = events


			request_saveEvents.run(() => {

				if (request_saveEvents.data) {

					showAlert("Evento salvo com sucesso", 'success')

				}else{
					showAlert("Erro ao salvar o evento", 'error')
				}

			}, (error) => {
				// Se ocorrer um erro durante a execução do request_login
				console.error('Erro durante a execução do request_saveEvents:', error);
				showAlert("Erro ao salvar o evento", 'error')

			})


		}else{

			showAlert("Nome inválido, não deixe em branco e não use espaços.", 'error')

		}

	},


	async  loading(time = 3000) {
		showModal("loading");

		// Configurar um temporizador para fechar o modal após o tempo especificado
		setTimeout(() => {
			closeModal("loading");
		}, time);
	},

	async transformJSON(originalJSON) {

		const transformedJSON = originalJSON.map(item => {
			const key = Object.keys(item)[0];
			const value = item[key];

			return { label: key, name: key, value };
		});
		//console.log(transformedJSON)
		this.webhooksDateTransformed = transformedJSON
		return transformedJSON;
	},

	verificarTipo(){


		if(SelectTypeTrigger.selectedOptionValue === 'mensagem'){

			RichTextEvent.setDisabled(false);
			ContainerMessage.setVisibility(true)

			MultiSelectVariableTypebot.setDisabled(true);
			InputUrlFluxo.setDisabled(true);
			ContainerFluxo.setVisibility(false)

		}else{

			RichTextEvent.setDisabled(true);
			ContainerMessage.setVisibility(false)


			MultiSelectVariableTypebot.setDisabled(false);
			InputUrlFluxo.setDisabled(false);
			ContainerFluxo.setVisibility(true)

		}

	},



}
