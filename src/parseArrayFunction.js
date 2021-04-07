import states from 'states-us';
import moment from 'moment';

const setDuplicateWith = (array) => {
    for(let i =0; i< array.length; i++){
      for(let j = 0; j<array.length;j++){
        if(j < i && i !== j){
          if((array[i].Phone === array[j].Phone)){
            array[i]['Duplicate with']['ids'].push(array[j]['ID'])
            array[j]['Duplicate with']['ids'].push(array[i]['ID'])
            array[i].errors.push('phone')
            array[j].errors.push('phone')
          }
          if((array[i].Email.toLowerCase() === array[j].Email.toLowerCase())){
            array[i]['Duplicate with']['ids'].push(array[j]['ID'])
            array[j]['Duplicate with']['ids'].push(array[i]['ID'])
            array[i].errors.push('email')
            array[j].errors.push('email')
          }
        }
      }
    }
    return array
}

const validateEmail = (email) => {
  const rgx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  return rgx.test(email)
}
const validateAge = (age) => {
  return age.isInteger || age >= 21
}
const validateExp = (exp,age) => {
  return exp.isInteger || age >= exp
}
const validateYearIncome = (income) => {
  income = Number.parseFloat(income)
  if(typeof income === 'number'){
      return income >= 0
  }
  return false
}



const changeState = (state) => {
  const stateArray = state.split(',').map(el => {
    states.map(item => {
        if (Object.values(item).indexOf(el) > -1) {
          el = item.abbreviation
        }
        return el
    })
    return el
  })
  return stateArray.join("|")
}

const validateState = (state) => {
  return (/([A-Z]{2}\|?)+/).test(state)
}

const validateExpDate = (date) => {
  if(moment(date, ["YYYY-MM-DD","MM/DD/YYYY"],true).isValid() || moment().diff(moment(date, ["YYYY-MM-DD","MM/DD/YYYY"]) >= 0)){
    return true
  }else{
    return false
  }   
}

const validateChildren = (children) => {
  return (/(TRUE|FALSE)/).test(children)
}

const changePhone = (phone) => {
  if(phone.length === 10){
    phone = `+1${phone}`
  }else if(phone.length === 11){
    phone = `+${phone}`
  }
  return phone
}
const validatePhone = (phone) => {
  return (/^(1|([+]1)*)[0-9]{10}$/).test(phone)
}
const validateLicense = (license) => {
  return (/^\w{6}$/).test(license)
}
const parseArrayFunction = (array) =>{
    array = setDuplicateWith(array)
    array.map(el => {
      el['License states'] = changeState(el['License states'])
      if(!validateEmail(el.Email.trim())){
        el.errors.push('email')
      }
      if(!validateAge(el.Age.trim())){
        el.errors.push('Age')
      }
      if(!validateExp(el.Experience,el.Age)){
        el.errors.push('Exp')
      }
      if(!validateYearIncome(el['Yearly Income'].trim())){
        el.errors.push('Income')
      }
      if(!validateState(el['License states'].trim())){
        el.errors.push('State')
      }
      if(!validateExpDate(el['Expiration date'].trim())){
        el.errors.push('ExpDate')
      }
      if(!validatePhone(el['Phone'])){
        el.errors.push('phone')
      }else{
        el['Phone'] = changePhone(el['Phone'].trim())
      }
      if(!validateChildren(el['Has children'])){
        if(el['Has children'].trim().length === 0){
          el['Has children'] = 'FALSE'
        }else{
          el.errors.push('Children')
        }
      }
      if(!validateLicense(el['License number'].trim())){
        el.errors.push('License')
      }
      return el
    })
    return array
}

export {parseArrayFunction};