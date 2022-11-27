/* ===== IMPORTACIONES ===== */
import { printContentNoDescendent, printContentDescendent } from './assets/js/prints.js'
import isImageValidation from './assets/js/imagesValidations.js'

/* ===== PETICION A LA API ===== */
async function getData(url) {
  try {
    const data = await fetch(url)
    const res = await data.json()
    console.log(res);
    App([res])
  }
  catch (error) {
    alert(`No se ha completado la petición. ${error}`)
    table.innerHTML = ''
  }
}

/* ===== App Inicial ===== */
function App(mainArray) {
  let mainHtml = ``
  for (let element of mainArray) {
    if (typeof element !== "object") {
      const isImage = isImageValidation(element)
      if (isImage) {
        mainHtml += printContentNoDescendent(element, true)
      } else {
        mainHtml += printContentNoDescendent(element, false)
      }
    }
    if (typeof element === "object") mainHtml += printContentDescendent(element)
  }
  table.innerHTML = mainHtml
}

/* ===== EJECUCIÓN DEL CÓDIGO ===== */
const form = document.querySelector('form')
const table = document.querySelector('.table')

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const API_url = (e.target.apiLink.value)
  getData(API_url)
})