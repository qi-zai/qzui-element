let inputEl = null

export default function(callback, accept) {
  if (!inputEl) {
    inputEl = document.createElement('input')
    inputEl.setAttribute('type', 'file')
  }

  inputEl.setAttribute('accept', accept)
  if (callback)
    inputEl.onchange = () => {
      callback(inputEl.files[0])
      inputEl.value = null
    }
  inputEl.click()
}
