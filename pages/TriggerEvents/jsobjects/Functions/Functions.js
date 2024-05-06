export default {


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

	async  loading(time = 3000) {
    showModal("loading");
    
    // Configurar um temporizador para fechar o modal após o tempo especificado
    setTimeout(() => {
        closeModal("loading");
    }, time);
},


}