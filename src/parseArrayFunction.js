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
          if((array[i].Email === array[j].Email)){
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
  console.log(state)
  const stateArray = state.split(',').map(el => {
    states.map(item => {
        if (Object.values(item).indexOf(el) > -1) {
          el = item.abbreviation
        }
        
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
    })
    return array
}

export {parseArrayFunction};