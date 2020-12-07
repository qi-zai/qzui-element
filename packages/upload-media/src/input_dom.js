let inputEl = null

if (!inputEl) {
  inputEl = document.createElement('input')
  inputEl.setAttribute('type', 'file')
}

export default function(callback, accept) {
  inputEl.setAttribute('accept', accept)
  if (callback)
    inputEl.onchange = () => {
      callback(inputEl.files[0])
      inputEl.value = null
    }
  inputEl.click()
}
