import {useState, useCallback} from 'react';
import {EMAIL_REGEX} from "../utils/constants";

export default function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(false);

  function checkValidity(errors) {
    return Object.keys(errors).every((error) => {
      return errors[error] === '';
    })
  }

  function handleChange(event) {
    const {name, value} = event.target
    setValues({...values, [name]: value });
    if (name === 'email') {
      if (EMAIL_REGEX.test(value)) {
        setIsValid(event.target.closest('form').checkValidity());
        setErrors({...errors, [name]: event.target.validationMessage});
      } else {
        setIsValid(false);
        setErrors({...errors, email: 'Email некорректный'})
      }
    } else {
      setErrors({...errors, [name]: event.target.validationMessage});
      setIsValid(checkValidity({...errors, [name]: event.target.validationMessage}) && event.target.closest('form').checkValidity());
    }
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}

