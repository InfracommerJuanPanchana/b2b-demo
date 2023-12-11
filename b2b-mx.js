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
  { label: 'Código CFDI', name: 'cfdi-code', isRequired: true, type: 'select', options: [
    "G01-Adquisición de mercancías",
    "G02-Devoluciones, descuentos o bonificaciones",
    "G03-Gastos en general",
    "I01-Construcciones",
    "I02-Mobilario y equipo de oficina por inversiones",
    "I03-Equipo de transporte",
    "I04-Equipo de cómputo y accesorios",
    "I05-Dados, troqueles, moldes, matrices y herramental",
    "I06-Comunicaciones telefónicas",
    "I07-Comunicaciones satelitales",
    "I08-Otra maquinaria y equipo",
    "D01-Honorarios médicos, dentales y gastos hospitalarios",
    "D02-Gastos médicos por incapacidad o discapacidad",
    "D03-Gastos funerales",
    "D04-Donativos",
    "D05-Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)",
    "D06-Aportaciones voluntarias al SAR",
    "D07-Primas por seguros de gastos médicos",
    "D08-Gastos de transportación escolar obligatoria",
    "D09-Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones",
    "D10-Pagos por servicios educativos (colegiaturas)",
    "P01-Por definir",
    "S01-Sin Efectos Fiscales",
    "CP01-Pagos",
    "CN01-Nómina"
  ] },
  { label: 'Régimen Fiscal', name: 'tax-regime', isRequired: true, type: 'select', options: [
    '601-General de Ley Personas Morales',
    '603-Personas Morales con Fines no Lucrativos',
    '605-Sueldos y Salarios e Ingresos Asimilados a Salarios',
    '606-Arrendamiento',
    '607-Régimen de Enajenación o Adquisición de Bienes',
    '608-Demás ingresos',
    '610-Residentes en el Extranjero sin Establecimiento Permanente en México',
    '611-Ingresos por Dividendos (socios y accionistas)',
    '612-Personas Físicas con Actividades Empresariales y Profesionales',
    '614-Ingresos por intereses',
    '615-Régimen de los ingresos por obtención de premios',
    '616-Sin obligaciones fiscales',
    '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
    '621-Incorporación Fiscal',
    '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
    '623-Opcional para Grupos de Sociedades',
    '624-Coordinados',
    '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
    '626-Régimen Simplificado de Confianza'
  ] },
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

            if (item.type === "select") {
              return `<p class="${item.name} input text containerInputCustom">
              <label for="${item.name}"  class="labelInputCustom">${item.label}</label>
              <select>
                ${item.options.map(option => {
                  return `<option value="${option}">${option}</option>`
                })}
              </select>
            </p>`
            }

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
