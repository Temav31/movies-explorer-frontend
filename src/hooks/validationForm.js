import React, { useState, useCallback } from 'react';
const ValidationForm = (data = {}) => {
	const [formValid, setFormValid] = useState(false);
	const [dataUser, setDataUser] = useState(data);
	const [errorsText, setErrorsText] = useState({});
	// проверка изменений
	const handleChangeLogin = (event) => {
		const { name, value } = event.target;
		setDataUser({ ...dataUser, [name]: value });
		setErrorsText({ ...errorsText, [name]: event.target.validationMessage });
		const target = event.target;
		const data = target.closest("form").checkValidity();
		setFormValid(data);
		console.log(formValid);
	}
	const clearForm = useCallback(
		(clearData = {}, clearValid = false) => {
			setFormValid(clearValid);
			setErrorsText(clearData);
			setDataUser(false);
		},
		[setDataUser, setErrorsText, setFormValid]
	);
	return { formValid, handleChangeLogin, clearForm, dataUser, errorsText }
}
export default ValidationForm;