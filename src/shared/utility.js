export const updateObject = (oldObject, UpdatedProperties) => {
    return {
        ...oldObject,
        ...UpdatedProperties
    }
}

export const checkValidity = (value,rules) => {

    let isValid = true;

if(rules.required){
    isValid = value.trim() !== '' && isValid;
}
// add other rules
if(rules.isEmail){
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
}

if(rules.minLength){
    isValid = value.length >= rules.minLength && isValid;
}

if(rules.maxlength){
    isValid = value.length <= rules.maxlength && isValid;
}
return isValid;

}