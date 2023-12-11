const fields = [
  { label: 'RFC', name: 'RFC', isRequired: true, type: 'text' },
  { label: 'Razón social', name: 'business-name', isRequired: true, type: 'text' },
  { label: 'Línea de negocio o giro', name: 'business-line', isRequired: false, type: 'text' },
  { label: 'Dirección', name: 'address', isRequired: false, type: 'text' },
  { label: 'Numero', name: 'number', isRequired: false, type: 'text' },
  { label: 'Número de departamento', name: 'number-dep', isRequired: false, type: 'text' },
  { label: 'País', name: 'state', isRequired: false, type: 'text' },
  { label: 'Complemento', name: 'neighborhood', isRequired: false, type: 'text' },
  { label: 'Ciudad', name: 'city', isRequired: false, type: 'text' },
  { label: 'Código Postal', name: 'zipcode', isRequired: true, type: 'text' },
  { label: 'Método de pago', name: 'payment-code', isRequired: true, type: 'text' },
  { label: 'Código CFDI', name: 'cfdi-code', isRequired: true, type: 'text' },
  { label: 'Régimen Fiscal', name: 'tax-regime', isRequired: true, type: 'text' },
  { label: 'Anexo', name: 'anexo', isRequired: false, type: 'text' },
  { label: 'Pedidos', name: 'pedidos', isRequired: false, type: 'text' },
  { label: 'Código del país', name: 'Country-Code', isRequired: true, type: 'text' },
  { label: 'Requiere CFDI', name: 'CFDI-required', isRequired: false, type: 'checkbox', options: ['1', '2', '3'] },
]

window.onload = function () {
  onMutation()
}

const onMutation = () => {
  const bodyElement = document.querySelector('body')

  const observer = new MutationObserver((mutationRecords) => {
    try {
      setFormCustom()
    } catch (error) {}
  })

  observer.observe(bodyElement, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  })
}

const setFormCustom = () => {
  if (window.location.hash === '#/profile') {
    setTimeout(() => {
      const isCompany = $('.corporate-title').hasClass('visible')
      const corporateInfoBox = $('.corporate-info-box')
      const formCustom = $('.container-custom-data-form')
      const buttonContinue = $('#go-to-shipping')

      if (isCompany) {
        if (buttonContinue.length && validateErrors()) {
          buttonContinue.css('pointer-events', 'none')
          buttonContinue.css('opacity', 0.5)
        }

        if (corporateInfoBox.length && !formCustom.length) {
          const fieldsToMap = fields.map((item) => {
            return `<p class="${item.name} input text containerInputCustom">
            <label for="${item.name}"  class="labelInputCustom">${item.label}</label>
            <input type="${item.type}" id="${item.name}" class="input-xlarge" name="${item.name}" onBlur="onBlur('${item.name}')"/>
          </p>`
          })

          corporateInfoBox.append(
            `<div class="container-custom-data-form">${fieldsToMap.toString().replace(/,/g, '')}</div>`
          )
        }
      } else {
        buttonContinue.css('pointer-events', 'all')
        buttonContinue.css('opacity', 1)
      }
    }, 500)
  }
}

const onBlur = (name) => {
  const buttonContinue = $('#go-to-shipping')
  const element = $(`#${name}`)
  const type = fields.find((e) => e.name === name)?.type
  const isRequired = fields.find((e) => e.name === name)?.isRequired

  if (type === 'checkbox') {
    const isChecked = $('#CFDI-required').is(':checked')

    if (isChecked) {
      vtexjs.checkout
        .setCustomData({ field: name, app: 'billing', value: 'true' })
        .then(() => vtexjs.checkout.getOrderForm())
    } else {
      if (element.length && !$(`.${name} .errorCustom`).length && isRequired) {
        $(`.${name}`).append(`<div class="help error errorCustom">Este campo es obligatorio</div>`)
      }
      vtexjs.checkout
        .setCustomData({ field: name, app: 'billing', value: 'false' })
        .then(() => vtexjs.checkout.getOrderForm())
    }
  } else {
    const value = element.val()

    const errorCustom = $(`.${name} .errorCustom`)

    if (value) {
      if (errorCustom.length) {
        errorCustom.hide()
      }
      vtexjs.checkout.setCustomData({ field: name, app: 'billing', value }).then(() => vtexjs.checkout.getOrderForm())
    } else {
      if (element.length && !$(`.${name} .errorCustom`).length && isRequired) {
        $(`.${name}`).append(`<div class="help error errorCustom">Este campo es obligatorio</div>`)
      }
    }
  }

  if (!validateErrors()) {
    buttonContinue.css('pointer-events', 'all')
    buttonContinue.css('opacity', 1)
  }
}

const validateErrors = () => {
  const errors = fields.map((item) => {
    const nameInput = item.name
    const isRequiredInput = item.isRequired
    const valueInput = $(`#${nameInput}`).val()

    if (!isRequiredInput) return false

    return !valueInput
  })

  const existError = errors.some(function (valor) {
    return valor === true
  })

  return existError
}
