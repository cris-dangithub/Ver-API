const isImageValidation = (element) => {
  if (typeof element !== "string") {
    const validElementExtension = false
    const elementExtension = ""
    return {validElementExtension, elementExtension}
  }
  console.log("entra");
  const extensionsAvalible = [
    "jpg", "jpg", "jpeg", "jpe", "jif", "jfif", "jfi",
    "png",
    "gif",
    "svg"
  ]
  const elementExtension = element.split(".")[element.split(".").length - 1]
  const validElementExtension = extensionsAvalible.includes(elementExtension)
  return {validElementExtension, elementExtension}
}

export default isImageValidation