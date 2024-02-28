export default {

	data: [],

	async setOpeningHours(){


		var data = {
			"triggerForEvents": {
				"status": SwitchTriggerForEvents.value,
				"timesOfDay": {
					"start": InputTriggerForEventsStart.text,
					"end": InputTriggerForEventsEnd.text
				},
				"daysOfWeeks": CheckboxGroupTriggerForEvents.selectedValues
			},
			"triggerForList": {
				"status": SwitchTriggerForList.value,
				"timesOfDay": {
					"start": InputTriggerForListStart.text,
					"end": InputTriggerForListEnd.text
				},
				"daysOfWeeks": CheckboxGroupTriggerForEvents.selectedValues
			}
		}

		//console.log(data)
		this.data = data


		request_updateOpeningHours.run(() => {
			if (request_updateOpeningHours.data.message === 'Opening_hours atualizadas com sucesso') {
				
				showAlert("Horário de funcionamento atualizado com sucesso.", 'success');
				// Faça algo após a remoção bem-sucedida, se necessário.
			} else {
				showAlert("Erro ao modificar a setar horario de funcionamento", 'error');
			}
		}, (error) => {

			console.error('Erro durante a execução do request_updateOpeningHours:', error);
			showAlert("Erro ao modificar a setar horario de funcionamento", 'error');
		});




	}



}
