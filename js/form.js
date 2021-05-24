var propertyForm={
	inputs:document.querySelectorAll("input.validate"),
	valuegiven: null,
	regExpression: null,
	validuser:false,
	validmail:false,
	validpassword: false,
	termsvalidation: null,


}

var methodForm={
	CompleteForm(){

		for (var i=0; i< propertyForm.inputs.length; i++){
			propertyForm.inputs[i].addEventListener("focus",methodForm.inFocus);
			propertyForm.inputs[i].addEventListener("blur", methodForm.outFocus);
			propertyForm.inputs[i].addEventListener("change", methodForm.change);
		}

	},
	inFocus: function(input){
		console.log (input.target.value);
		// propertyForm.valuegiven= input.target.value;
		console.log("propertyForm.valuegiven",propertyForm.valuegiven);

		if (input.target.value==""){

			document.querySelector("[for="+input.target.id+"] .mandatory").style.opacity=1;
			document.querySelector("#"+ input.target.id).style.background="yellow";
		} 
	},
	outFocus: function (input){
		
		document.querySelector("#"+ input.target.id).style.background="white";
		document.querySelector("[for="+input.target.id+"] .mandatory").style.opacity=0;
		
	},
	change: function (input){
		propertyForm.valuegiven= input.target.value;
		if (propertyForm.valuegiven!=0){
			switch(input.target.id){
				case "user":
					if (propertyForm.valuegiven.length<3 || propertyForm.valuegiven.length>8){
						alert("L'username deve contenere tra 3 e 8 caratteri");
						propertyForm.validuser=false;
					}else{
						propertyForm.validuser=true;
					}
				break;
				case "password":
					propertyForm.regExpression=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/;
					if (!propertyForm.regExpression.test(propertyForm.valuegiven)){
						alert("La password deve avere tra 8 e 14 caratteri."+ 
							" E contenere almeno un digito, una maioscola ed una minoscola.");
						propertyForm.validpassword=false;
					}else{
						propertyForm.validpassword=true;
					}
				break;
				case "email":
					propertyForm.regExpression= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
					if (!propertyForm.regExpression.test(propertyForm.valuegiven)){
						alert("La mail non sta correttamente scritta.");
						propertyForm.validmail=false;
					}else{
						propertyForm.validmail=true;
					}
				break;
				
			}
		}

	},
	FormValidation: function(){
		propertyForm.termsvalidation= document.querySelector("#conditions").checked;

		if(!propertyForm.validuser || !propertyForm.validpassword || !propertyForm.validmail){
			// document.querySelector ("#Send").innerHTML= '<span style="color:red">Completare i campi obbligatori</span';

			return false;

		}else if (!propertyForm.termsvalidation){
		
			document.querySelector("#Send").innerHTML = '<span style="color:red">¡*Per favore acettare termini</span>';
			// alert("Per inviare il formulario devi garantire non inviare questioni confidenziali nel messaggio");
			return false;
		}else {
			return true;
		}
	}

}
methodForm.CompleteForm();