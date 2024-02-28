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
				"daysOfWeeks": CheckboxGroupTriggerForList.selectedValues
			}
		}

		//console.log(data)
		this.data = data


		request_updateOpeningHours.run(() => {
			if (request_updateOpeningHours.data.message === 'Opening_hours atualizadas com sucesso') {

				showAlert("Horário de funcionamento atualizado com sucesso.", 'success');
				// Faça algo após a remoção bem-sucedida, se necessário.
			} else {
				showAlert("Erro ao modificar o horario de funcionamento", 'error');
			}
		}, (error) => {

			console.error('Erro durante a execução do request_updateOpeningHours:', error);
			showAlert("Erro ao modificar o horario de funcionamento", 'error');
		});


	},



	async search_OpeningHours(){

		request_getOpeningHours.run(() => {

			if (request_getOpeningHours.data) {

				SwitchTriggerForEvents.setValue(request_getOpeningHours.data.triggerForEvents.status)

				InputTriggerForEventsStart.setValue(request_getOpeningHours.data.triggerForEvents.timesOfDay.start)
				InputTriggerForEventsEnd.setValue(request_getOpeningHours.data.triggerForEvents.timesOfDay.end)

				CheckboxGroupTriggerForEvents.setSelectedOptions(request_getOpeningHours.data.triggerForEvents.daysOfWeeks)


				SwitchTriggerForList.setValue(request_getOpeningHours.data.triggerForList.status)

				InputTriggerForListStart.setValue(request_getOpeningHours.data.triggerForList.timesOfDay.start)
				InputTriggerForListEnd.setValue(request_getOpeningHours.data.triggerForList.timesOfDay.end)

				CheckboxGroupTriggerForList.setSelectedOptions(request_getOpeningHours.data.triggerForList.daysOfWeeks)

			} else {
				showAlert("Erro ao buscar horario de funcionamento", 'error');
			}
		}, (error) => {

			console.error('Erro durante a execução do request_getOpeningHours:', error);
			showAlert("Erro ao buscar horario de funcionamento", 'error');
		});



	}



}
