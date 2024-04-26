export default {

	data: [],


	async preencherFormula(combine, newFormula){

		var oldFormula = InpCondicion_Rules.text

		if (oldFormula.length === 0){
			InpCondicion_Rules.setValue(newFormula)
		}
		else{
			InpCondicion_Rules.setValue( oldFormula + " " + combine + " " + newFormula )
		}
	}



}
