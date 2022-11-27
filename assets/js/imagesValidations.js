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

export default isImageValidation