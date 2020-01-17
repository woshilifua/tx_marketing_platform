export function createForm(form) {
  let formatForm = new FormData()
  Object.keys(form).forEach(key => {
    formatForm.append(key, form[key])
  })
  return formatForm
}