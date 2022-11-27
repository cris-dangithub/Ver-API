/* ===== FUNCIONES ===== */
const isImageValidation = (element) => {
  if (typeof element !== "string") return false
  const extensionsAvalible = [
    "jpg", "jpg", "jpeg", "jpe", "jif", "jfif", "jfi",
    "png",
    "gif"
  ]
  const elementExtension = element.split(".")[element.split(".").length - 1]
  const validElementExtension = extensionsAvalible.includes(elementExtension)

  return validElementExtension
}

const printContentNoDescendent = (content, imgContent) => {
  if (!imgContent) {
    return `<div class="element">${content} <i class='typeData'>(${typeof content})</i></div>`
  }
  if (imgContent) {
    return `<div class="element"><img src="${content}" alt="${content}"></div>`
  }

}

const printContentNoDescendentFromObject = (key, content, imgContent) => {
  if (!imgContent) {
    return `
      <div class="element">
        <p>"${key}" ${content} <i class='typeData'>(${typeof content})</i></p>
      </div>
    `
  }
  if (imgContent) {
    return `
    <div class="element">
      "${key}" <img src="${content}" alt="${content}">
    </div>
    `
  }
}


const printContentDescendent = (content, key, position) => {
  const dataType = Array.isArray(content) ? 'Array' : 'Object'
  let html
  if (position !== undefined) {
    html = `
    <div class="element descendent">
      <abbr title="[${position}]: ${dataType}">
        <div class="descendent__father father">
          <p>[${position}] <u>${dataType}</u></p>
        </div>
      </abbr>
      <div class="descendent__childrens">
    `
  } else {
    html = `
    <div class="element descendent">
      <abbr title="'${key}': ${dataType}">
        <div class="descendent__father father">
          <p>"${key}" <u>${dataType}</u></p>
        </div>
      </abbr>
      <div class="descendent__childrens">
    `
  }


  /* Pintando hijos */
  if (dataType === 'Array') {
    for (let i = 0; i < content.length; i++) {
      const element = content[i]
      if (typeof element !== "object") {
        const isImage = isImageValidation(element)
        if (isImage) {
          html += printContentNoDescendent(element, true)
        } else {
          html += printContentNoDescendent(element, false)
        }
      }
      if (typeof element === "object") html += printContentDescendent(element, undefined, i) //!
    }
  }
  if (dataType === 'Object') {
    for (let key in content) {
      element = content[key]
      if (typeof element !== "object") {
        const isImage = isImageValidation(element)
        if (isImage) {
          html += printContentNoDescendentFromObject(key, element, true)
        } else {
          html += printContentNoDescendentFromObject(key, element, false)
        }
      }

      if (typeof element === "object") html += printContentDescendent(element, key) //!
    }
  }









  html += `
    </div>
  </div>`
  return html
}


/* ===== PETICION A LA API ===== */
const API_url = ""

async function getData(url) {
  try {
    const data = await fetch(url)
    const res = await data.json()
    console.log(res);
    App([res])
  } catch (error) {
    alert(`No se ha completado la petición. ${error}`)
    table.innerHTML = ''
  }

}


/* ===== App Principal ===== */
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