//FUNÇÃO CONSTRUTORA
import Address from '../models/address.js'
import * as requestService from '../services/request-service.js'

function State() {
    
    this.address = new Address()
    this.btnSave = null
    this.btnClear = null

    this.inputCep = null
    this.inputStreet = null
    this.inputNumber = null
    this.inputCity = null

    this.errorCep = null
    this.errorNumber = null
}

//ATRIBUINDO A FUNÇÃO CONSTRUTORA "State" A UMA CONST
const state = new State()


export function init() {

    state.inputCep = document.forms.newAddress.cep
    state.inputStreet = document.forms.newAddress.street
    state.inputNumber = document.forms.newAddress.number
    state.inputCity = document.forms.newAddress.city

    state.btnSave = document.forms.newAddress.btnSave
    state.btnClear = document.forms.newAddress.btnClear

    state.errorCep = document.querySelector('[data-error="cep"]')
    state.errorNumber = document.querySelector('[data-error="number"]')

    state.btnClear.addEventListener('click',handleBtnClearClick)
    state.inputNumber.addEventListener('change', handleInputNumberChange)
    state.btnSave.addEventListener('click', handleBtnSaveClick)


}

async function handleBtnSaveClick(event) {
    event.preventDefault()
    const result = await requestService.getJson('https://viacep.com.br/ws/01001000/json/')
    console.log(result)
}

function handleBtnClearClick(event){
    event.preventDefault()
    clearForm()
}

function clearForm(){
    state.inputCep.value = null
    state.inputCity.value = null
    state.inputNumber.value = null
    state.inputStreet.value = null

    state.inputCep.focus()
}

function handleInputNumberChange(event) {
    if(event.target.value === '') {
        setFormError('number', 'campo requerido')
    }else{
        setFormError('number', '')
    }
}

function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`)
    element.innerHTML = value
}

