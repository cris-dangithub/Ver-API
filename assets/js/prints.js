import isImageValidation from "./imagesValidations.js"

const printContentNoDescendentFromArray = (index, content, imgContent, elementExtension) => {
  if (!imgContent) {
    return `<div class="element noDescendent">[${index}]${content} <i class='typeData'>(${typeof content})</i></div>`
  }
  if (imgContent) {
    return `<div class="element noDescendent"><img src="${content}" alt="${content}"> <i class='typeData'>(${elementExtension})</i></div>`
  }

}

const printContentNoDescendentFromObject = (key, content, imgContent, extension) => {
  if (!imgContent) {
    return `
      <div class="element noDescendent">
        <p>"${key}" ${content} <i class='typeData'>(${typeof content})</i></p> 
      </div>
    `
  }
  if (imgContent) {
    return `
    <div class="element noDescendent">
      "${key}" <img src="${content}" alt="${content}"> <i class='typeData'>(${extension})</i>
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
  if (dataType === 'Array') {
    for (let i = 0; i < content.length; i++) {
      const element = content[i]
      if (element === null || typeof element !== "object") {
        const {validElementExtension, elementExtension} = isImageValidation(element)
        html += printContentNoDescendentFromArray(i, element, validElementExtension, elementExtension)
      }
      if (typeof element === "object") html += printContentDescendent(element, undefined, i) //!
    }
  }
  if (dataType === 'Object') {
    for (let key in content) {
      const element = content[key]
      if (element === null || typeof element !== "object") {
        const {validElementExtension, elementExtension} = isImageValidation(element)
        html += printContentNoDescendentFromObject(key, element, validElementExtension, elementExtension)
      }
      if (element !== null && typeof element === "object") html += printContentDescendent(element, key, undefined) //!
    }
  }
  html += `
    </div>
  </div>`
  return html
}

export {
  printContentNoDescendentFromArray,
  printContentNoDescendentFromObject,
  printContentDescendent
}