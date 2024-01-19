const appName = "billing";
let typeInput = null;
let validFields= {
    RFC: false,
    'business-name': false,
    'payment-code': false,
    zipcode: false,
    'business-line':false,
    'phone-new': false,
    address: false,
    number: false,
    'number-dep':false,
    neighborhood: false,
    city: false
}

let validFieldsNormal = {
    RFC: false,
    'business-name': false,
    'payment-code': false,
    zipcode: false
}

const fields = [
    { label: 'RFC', name: 'RFC', isRequired: true, type: 'text',regex:'^[A-Z0-9]{13}$', message: "Se debe escribir en mayúsculas y sin espacios ni guiones, Debe incluir homoclave, consta de 13 dígitos"},
    { label: 'Razón social', name: 'business-name', isRequired: true, type: 'text', regex: '^[A-ZÑ ]+$', message: "Se debe escribir en mayúsculas y sin acentos, sin incluir régimen societario o de capital, respetando puntuación."},
    {
        label: 'Método de pago', name: 'payment-code', isRequired: true, type: 'select', options: [
            "01-Efectivo",
            "02-Cheque nominativo",
            "03-Transferencia eléctronica de fondos",
            "04-Tarjeta de crédito",
            "05-Monedero Electrónico",
            "06-Dinero Electrónico",
            "08-Vales de despensa",
            "12-Dación de pagos",
            "13-Pago por subrogación",
            "14-Pago por consignación",
            "15-Condonación",
            "17-Compensación",
            "23-Novación",
            "24-Confusión",
            "25-Remisión de deuda",
            "26-Prescripción o caducidad",
            "27-A satisfacción de acreedor",
            "28-Tarjeta de débito",
            "29-Tarjeta de servicios",
            "30-Aplicación de anticipos",
            "31-Intermediario pagos",
            "99-Por definir"
        ]
    },
    { label: 'Código Postal', name: 'zipcode', isRequired: true, type: 'text', message: "consta de un número de 5 dígitos.", regex:'^.{5}$' },
    { label: 'Datos complementarios', type: 'label' },
    { label: 'Línea de negocio o giro', name: 'business-line', isRequired: true, type: 'text' },
    { label: 'Número teléfono', name: 'phone-new', isRequired: true, type: 'text' },
    { label: 'Dirección', name: 'address', isRequired: true, type: 'text' },
    { label: 'Número', name: 'number', isRequired: true, type: 'text' },
    { label: 'Número de departamento', name: 'number-dep', isRequired: true, type: 'text' },
    { label: 'Colonia', name: 'neighborhood', isRequired: true, type: 'text' },
    { label: 'Ciudad', name: 'city', isRequired: true, type: 'text' }
]

const fieldsNormal = [
    { label: 'RFC', name: 'RFC', isRequired: true, type: 'text',regex:'^[A-Z0-9]{12}$', message: "Se debe escribir en mayúsculas y sin espacios ni guiones, Debe incluir homoclave, consta de 12 dígitos" },
    { label: 'Razón social', name: 'business-name', isRequired: true, regex: '^[A-ZÑ ]+$' ,type: 'text', message: "Se debe escribir en mayúsculas y sin acentos, sin incluir régimen societario o de capital, respetando puntuación." },
    { label: 'Código Postal', name: 'zipcode', isRequired: true, regex:'^.{5}$',type: 'text', message: "consta de un número de 5 dígitos." },
    {
        label: 'Método de pago', name: 'payment-code', isRequired: false, type: 'select', options: [
            "01-Efectivo",
            "02-Cheque nominativo",
            "03-Transferencia eléctronica de fondos",
            "04-Tarjeta de crédito",
            "05-Monedero Electrónico",
            "06-Dinero Electrónico",
            "08-Vales de despensa",
            "12-Dación de pagos",
            "13-Pago por subrogación",
            "14-Pago por consignación",
            "15-Condonación",
            "17-Compensación",
            "23-Novación",
            "24-Confusión",
            "25-Remisión de deuda",
            "26-Prescripción o caducidad",
            "27-A satisfacción de acreedor",
            "28-Tarjeta de débito",
            "29-Tarjeta de servicios",
            "30-Aplicación de anticipos",
            "31-Intermediario pagos",
            "99-Por definir"
        ]
    }
]


const FIELD_CFDI = [
    {
        label: 'Código CFDI', name: 'cfdi-code', isRequired: true, type: 'select', options: [
            "G01-Adquisición de mercancías",
            "G02-Devoluciones descuentos o bonificaciones",
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
        ],
        suboptions: [
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '606-Arrendamiento',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'
            ],
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '606-Arrendamiento',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'
            ],
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '606-Arrendamiento',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'
            ],
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '606-Arrendamiento',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'
            ],
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '606-Arrendamiento',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'
            ],
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '606-Arrendamiento',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'
            ],
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '606-Arrendamiento',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'
            ],
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '606-Arrendamiento',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'
            ],
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '606-Arrendamiento',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'
            ],
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '606-Arrendamiento',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'
            ],
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '606-Arrendamiento',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'
            ],
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '606-Arrendamiento',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'
            ],
            [
                '605-Sueldos y Salarios e Ingresos Asimilados a Salarios',
                '606-Arrendamiento',
                '608-Demás ingresos',
                '611-Ingresos por Dividendos (socios y accionistas)',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '614-Ingresos por intereses',
                '607-Régimen de Enajenación o Adquisición de Bienes',
                '615-Régimen de los ingresos por obtención de premios',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
            ],
            [
                '605-Sueldos y Salarios e Ingresos Asimilados a Salarios',
                '606-Arrendamiento',
                '608-Demás ingresos',
                '611-Ingresos por Dividendos (socios y accionistas)',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '614-Ingresos por intereses',
                '607-Régimen de Enajenación o Adquisición de Bienes',
                '615-Régimen de los ingresos por obtención de premios',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
            ],
            [
                '605-Sueldos y Salarios e Ingresos Asimilados a Salarios',
                '606-Arrendamiento',
                '608-Demás ingresos',
                '611-Ingresos por Dividendos (socios y accionistas)',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '614-Ingresos por intereses',
                '607-Régimen de Enajenación o Adquisición de Bienes',
                '615-Régimen de los ingresos por obtención de premios',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
            ],
            [
                '605-Sueldos y Salarios e Ingresos Asimilados a Salarios',
                '606-Arrendamiento',
                '608-Demás ingresos',
                '611-Ingresos por Dividendos (socios y accionistas)',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '614-Ingresos por intereses',
                '607-Régimen de Enajenación o Adquisición de Bienes',
                '615-Régimen de los ingresos por obtención de premios',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
            ],
            [
                '605-Sueldos y Salarios e Ingresos Asimilados a Salarios',
                '606-Arrendamiento',
                '608-Demás ingresos',
                '611-Ingresos por Dividendos (socios y accionistas)',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '614-Ingresos por intereses',
                '607-Régimen de Enajenación o Adquisición de Bienes',
                '615-Régimen de los ingresos por obtención de premios',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
            ],
            [
                '605-Sueldos y Salarios e Ingresos Asimilados a Salarios',
                '606-Arrendamiento',
                '608-Demás ingresos',
                '611-Ingresos por Dividendos (socios y accionistas)',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '614-Ingresos por intereses',
                '607-Régimen de Enajenación o Adquisición de Bienes',
                '615-Régimen de los ingresos por obtención de premios',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
            ],
            [
                '605-Sueldos y Salarios e Ingresos Asimilados a Salarios',
                '606-Arrendamiento',
                '608-Demás ingresos',
                '611-Ingresos por Dividendos (socios y accionistas)',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '614-Ingresos por intereses',
                '607-Régimen de Enajenación o Adquisición de Bienes',
                '615-Régimen de los ingresos por obtención de premios',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
            ],
            [
                '605-Sueldos y Salarios e Ingresos Asimilados a Salarios',
                '606-Arrendamiento',
                '608-Demás ingresos',
                '611-Ingresos por Dividendos (socios y accionistas)',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '614-Ingresos por intereses',
                '607-Régimen de Enajenación o Adquisición de Bienes',
                '615-Régimen de los ingresos por obtención de premios',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
            ],
            [
                '605-Sueldos y Salarios e Ingresos Asimilados a Salarios',
                '606-Arrendamiento',
                '608-Demás ingresos',
                '611-Ingresos por Dividendos (socios y accionistas)',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '614-Ingresos por intereses',
                '607-Régimen de Enajenación o Adquisición de Bienes',
                '615-Régimen de los ingresos por obtención de premios',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
            ],
            [
                '605-Sueldos y Salarios e Ingresos Asimilados a Salarios',
                '606-Arrendamiento',
                '608-Demás ingresos',
                '611-Ingresos por Dividendos (socios y accionistas)',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '614-Ingresos por intereses',
                '607-Régimen de Enajenación o Adquisición de Bienes',
                '615-Régimen de los ingresos por obtención de premios',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
            ],
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '605-Sueldos y Salarios e Ingresos Asimilados a Salarios',
                '606-Arrendamiento',
                '608-Demás ingresos',
                '610-Residentes en el Extranjero sin Establecimiento Permanente en México',
                '611-Ingresos por Dividendos (socios y accionistas)',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '614-Ingresos por intereses',
                '616-Sin obligaciones fiscales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '624-Coordinados',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'

            ],
            [
                '601-General de Ley Personas Morales',
                '603-Personas Morales con Fines no Lucrativos',
                '605-Sueldos y Salarios e Ingresos Asimilados a Salarios',
                '606-Arrendamiento',
                '608-Demás ingresos',
                '610-Residentes en el Extranjero sin Establecimiento Permanente en México',
                '611-Ingresos por Dividendos (socios y accionistas)',
                '612-Personas Físicas con Actividades Empresariales y Profesionales',
                '614-Ingresos por intereses',
                '616-Sin obligaciones fiscales',
                '620-Sociedades Cooperativas de Producción que optan por diferir sus ingresos',
                '621-Incorporación Fiscal',
                '622-Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras',
                '623-Opcional para Grupos de Sociedades',
                '624-Coordinados',
                '625-Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas',
                '626-Régimen Simplificado de Confianza'
            ],
            [
                '605-Sueldos y Salarios e Ingresos Asimilados a Salarios'
            ]
        ]
    }
]

window.onload = function () {
    onMutation();
    setTimeout(() => {
        onDefaultInformation();
    }, 2000);
}


const onDefaultInformation = () => {
    if (vtexjs) {
        const countryCode = vtexjs?.checkout?.orderForm?.storePreferencesData?.countryCode;
        const customData = vtexjs?.checkout?.orderForm?.customData?.customApps || [];
        if (!customData.length) {
            vtexjs.checkout.setCustomData({ field: "isCorporateOms", app: appName, value: "false" })
            vtexjs.checkout.setCustomData({ field: "Country-Code", app: appName, value: countryCode })
            vtexjs.checkout.setCustomData({ field: "CFDI-required", app: appName, value: "false" })
            vtexjs.checkout.setCustomData({ field: "state", app: appName, value: countryCode })
        }
    }
}

const onMutation = () => {
    const bodyElement = document.querySelector('body')

    const observer = new MutationObserver((mutationRecords) => {
        try {
            // setFormCustom();
            onAttachmentB2BButton();
        } catch (error) { }
    })

    observer.observe(bodyElement, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
    })
}

const onAttachmentB2BButton = () => {
    const profileContainer = $(".form-step.box-edit > .box-client-info > .row-fluid");
    const b2bButton = $("#b2b-form-container");

    if (profileContainer && profileContainer.length && !b2bButton.length) {
        $(".corporate-hide-link").css("display", "none")
        $(".form-step.box-edit > .box-client-info > .row-fluid").append(`
            <div id="b2b-form-container">
                <div>
                    <span>¿Requieres Factura?</span>
                    <div style="display:flex;margin-top:10px">
                        <p style="display:flex;align-items: center;">
                            <input type="radio" id="CFDI-si" value="true" name="cfdi" style="margin-top: 0"/>
                            <label for="CFDI-si" style="line-height: 3px;margin-left: 5px;">Si</label>
                        </p>
                        <p style="display:flex;align-items: center;margin-left: 15px;">
                            <input type="radio" id="CFDI-no" value="false" name="cfdi" style="margin-top: 0"/>
                            <label for="CFDI-no" style="line-height: 3px;margin-left: 5px;">No</label>
                        </p>
                    </div>
                </div>
            </div>
 
        `);

        $("#CFDI-no").click()

        $('input[name="cfdi"]').change(function () {
            if ($(this).is(":checked")) {
                var val = eval($(this).val());
                const buttonb2bform = $("#button-b2b-form");
                vtexjs.checkout.setCustomData({ field: "CFDI-required", app: appName, value: val })
                if (val) {
                    $('#go-to-shipping, #go-to-payment').prop('disabled', true)
                    const fieldsToMap = FIELD_CFDI.map((item) => {
                        return `<p class="${item.name} input text containerInputCustom">
                        <label for="${item.name}"  class="labelInputCustom">${item.label}</label>
                        <select name="${item.name}" id="${item.name}" onChange="onChangeB2bCFDI('${item.name}')">
                            <option disabled selected>Seleccione</option>
                          ${item.options.map(option => {
                            return `<option value="${option}">${option}</option>`
                        })}
                        </select>
                      </p>`
                    })

                    setTimeout(() => {
                        $("#b2b-form-container").after(`<div class="container-custom-data-form">
                            ${fieldsToMap.toString().replace(/,/g, '')}
                            <p class="tax-regime input text containerInputCustom">
                                <label for="tax-regime"  class="labelInputCustom">Régimen Fiscal</label>
                                <select name="tax-regime" id="tax-regime" onChange="onChangeB2bRegimen('tax-regime')">
                                    <option disabled selected>Seleccione</option>
                                </select>
                            </p>
                        </div>`)
                    }, 100);

                    if (buttonb2bform && buttonb2bform.length) {
                        $("#button-b2b-form").html(`
                            <div class="container-custom-data-form-facturacion">
                                <span>¿Tipo de persona?</span>
                                <div style="display:flex;margin-top:10px">
                                    <p style="display:flex;align-items: center;">
                                        <input type="radio" id="corporative-si" value="true" name="corporative" style="margin-top: 0"/>
                                        <label for="corporative-si" style="line-height: 3px;margin-left: 5px;">Moral</label>
                                    </p>
                                    <p style="display:flex;align-items: center;margin-left: 15px;">
                                        <input type="radio" id="corporative-no" value="false" name="corporative" style="margin-top: 0"/>
                                        <label for="corporative-no" style="line-height: 3px;margin-left: 5px;">Física</label>
                                    </p>
                                </div>
                            </div>
                        `)
                    } else {
                        $("#b2b-form-container").after(`
                            <div id="button-b2b-form" style="margin-top:10px;cursor:pointer">
                                <div>
                                    <span>¿Tipo de persona?</span>
                                    <div style="display:flex;margin-top:10px">
                                        <p style="display:flex;align-items: center;">
                                            <input type="radio" id="corporative-si" value="true" name="corporative" style="margin-top: 0"/>
                                            <label for="corporative-si" style="line-height: 3px;margin-left: 5px;">Moral</label>
                                        </p>
                                        <p style="display:flex;align-items: center;margin-left: 15px;">
                                            <input type="radio" id="corporative-no" value="false" name="corporative" style="margin-top: 0"/>
                                            <label for="corporative-no" style="line-height: 3px;margin-left: 5px;">Física</label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        `)
                    }
    
                    $('input[name="corporative"]').change(function () {
                        if ($(this).is(":checked")) {
                            var val = eval($(this).val());
                            vtexjs.checkout.setCustomData({ field: "isCorporateOms", app: appName, value: val })
                            typeInput = val ? "Moral" : "Fisica";
                            if (val) {
                                setFormCustom();
                            } else {
                                setFormCustomDefault();
                            }
                        }
                    })

                } else {
                    $('#go-to-shipping, #go-to-payment').prop('disabled', false)
                    $("#button-b2b-form").length && $("#button-b2b-form").remove();
                    $(".container-custom-data-form").remove();
                    removeCustomData("zipcode");
                    removeCustomData("tax-regime");
                    removeCustomData("phone-new");
                    removeCustomData("payment-code");
                    removeCustomData("number-dep");
                    removeCustomData("number");
                    removeCustomData("neighborhood");
                    removeCustomData("isCorporateOms");
                    removeCustomData("city");
                    removeCustomData("cfdi-code");
                    removeCustomData("business-name");
                    removeCustomData("business-line");
                    removeCustomData("address");
                    removeCustomData("RFC");
                    vtexjs.checkout.setCustomData({ field: "CFDI-required", app: appName, value: "false" })
                    
                }
            }
        })

    }
}

const setFormCustomDefault = () => {
    if (window.location.hash === '#/profile') {
        setTimeout(() => {
            const corporateInfoBox = $('#button-b2b-form')
            const formCustom = $('.container-custom-data-form-element')
          
            if (corporateInfoBox.length) {
                const fieldsToMap = fieldsNormal.map((item) => {
                    if (item.type === "select") {
                        return `<p class="${item.name} input text containerInputCustom">
                <label for="${item.name}"  class="labelInputCustom">${item.label}</label>
                <select name="${item.name}" id="${item.name}" onChange="onChangeB2b('${item.name}')">
                    <option disabled selected>Seleccione</option>
                  ${item.options.map(option => {
                            return `<option value="${option}">${option}</option>`
                        })}
                </select>
              </p>`
                    }

                    return `<p class="${item.name} input text containerInputCustom">
              <label for="${item.name}"  class="labelInputCustom">${item.label}</label>
              <input type="${item.type}" id="${item.name}" class="input-xlarge" name="${item.name}" onBlur="onBlurB2bForm('${item.name}')"/>
              <span class="input-b2b-error"></span>
              ${item?.message ? `<span>${item?.message}</span>` : ""}
            </p>`
                })
                
                if (formCustom && formCustom.length) {
                    $(".container-custom-data-form-element").html(fieldsToMap.toString().replace(/,/g, ''))
                } else {
                    corporateInfoBox.append(
                        `<div class="container-custom-data-form-element">${fieldsToMap.toString().replace(/,/g, '')}</div>`
                    )
                }

            }
        }, 500)
    }
}

const setFormCustom = () => {
    if (window.location.hash === '#/profile') {
        setTimeout(() => {
            const corporateInfoBox = $('#button-b2b-form')
            const formCustom = $('.container-custom-data-form-element')
            const buttonContinue = $('#go-to-shipping')

            console.log("corporateInfoBox", corporateInfoBox.length ,formCustom.length)
          
            if (corporateInfoBox.length) {
                const fieldsToMap = fields.map((item) => {
                    if (item.type === "select") {
                        return `<p class="${item.name} input text containerInputCustom">
                <label for="${item.name}"  class="labelInputCustom">${item.label}</label>
                <select name="${item.name}" id="${item.name}" onChange="onChangeB2b('${item.name}')">
                    <option disabled selected>Seleccione</option>
                  ${item.options.map(option => {
                            return `<option value="${option}">${option}</option>`
                        })}
                </select>
              </p>`
                    }

                    if (item.type === "label") {
                        return `
                            <p class="${item.label} input text containerInputCustom">
                                <label>${item.label}</label>
                            </p>
                        `
                    }

                    return `<p class="${item.name} input text containerInputCustom">
              <label for="${item.name}"  class="labelInputCustom">${item.label}</label>
              <input type="${item.type}" id="${item.name}" class="input-xlarge" name="${item.name}" onBlur="onBlurB2bForm('${item.name}')"/>
              <span class="input-b2b-error"></span>
              ${item?.message ? `<span>${item?.message}</span>` : ""}
            </p>`
                })
                
                if (formCustom && formCustom.length) {
                    $(".container-custom-data-form-element").html(fieldsToMap.toString().replace(/,/g, ''))
                } else {
                    corporateInfoBox.append(
                        `<div class="container-custom-data-form-element">${fieldsToMap.toString().replace(/,/g, '')}</div>`
                    )
                }
            }
        }, 500)
    }
}

const onChangeB2bRegimen = (id) => {
    var selectElement = document.getElementById(id);
    var opcionSeleccionada = selectElement.options[selectElement.selectedIndex].value;
    if (opcionSeleccionada) {
        vtexjs.checkout.setCustomData({ field: id, app: appName, value: opcionSeleccionada.split('-')[0] })
    }
}

const onChangeB2bCFDI = (id) => {
    var selectElement = document.getElementById(id);
    var opcionSeleccionada = selectElement.options[selectElement.selectedIndex].value;
    if (opcionSeleccionada) {

        const selectedElement = FIELD_CFDI[0].options.findIndex(o => o === opcionSeleccionada);
        const selectedSub = FIELD_CFDI[0].suboptions[selectedElement];
        console.log("selectedElement", selectedSub, opcionSeleccionada)

        const selectedSubOptions = selectedSub.map(s => {
            return `<option value="${s}">${s}</option>`
        })

        $("#tax-regime").html(`
            <option disabled selected>Seleccione</option>
            ${selectedSubOptions.join('')}
        `)
        vtexjs.checkout.setCustomData({ field: id, app: appName, value: opcionSeleccionada.split('-')[0] })
    }
}

const onChangeB2b = (id) => {
    var selectElement = document.getElementById(id);
    var opcionSeleccionada = selectElement.options[selectElement.selectedIndex].value;
    if (opcionSeleccionada) {
        vtexjs.checkout.setCustomData({ field: id, app: appName, value: opcionSeleccionada.split('-')[0] })
    }
}

const onValidateInput = (id) => {
    // const value = $(`#${id}`).val();
    console.log("value",id)
}

const onValidateButton = () => {
    if (type === "Moral") {
        console.log("validFields",validFields)
    } else {
        console.log("validFieldsNormal",validFieldsNormal)
    }
}

const onBlurB2bForm = (name) => {
    const buttonContinue = $('#go-to-shipping')
    const element = $(`#${name}`)
    const type = fields.find((e) => e.name === name)?.type
    const isRequired = fields.find((e) => e.name === name)?.isRequired    

    if (type === 'checkbox') {
        const isChecked = $('#CFDI-required').is(':checked')

        if (isChecked) {
            vtexjs.checkout
                .setCustomData({ field: name, app: appName, value: 'true' })
        } else {
            if (element.length && !$(`.${name} .errorCustom`).length && isRequired) {
                $(`.${name}`).append(`<div class="help error errorCustom">Este campo es obligatorio</div>`)
            }
            vtexjs.checkout
                .setCustomData({ field: name, app: appName, value: 'false' })
        }
    } else {
        const value = element.val()

        const errorCustom = $(`.${name} .errorCustom`)

        if (value) {
            if (errorCustom.length) {
                errorCustom.hide()
            }

            if (typeInput === "Moral") {
                const isError = fieldsNormal.some(f => {
                    const regexTest = new RegExp(f.regex);
                    if (f.name === name && !!(f.regex && !regexTest.test($(`#${f.name}`).val()))) return true;
                    if (f.name === name && !f.isRequired) return false;
                    return f.name === name && !$(`#${f.name}`).val()
                })      

                if (!isError) {
                    $('#go-to-shipping, #go-to-payment').removeProp('disabled')
                    $(`#${name} + .input-b2b-error`).html('')
                } else {
                    $(`#${name} + .input-b2b-error`).html('<span style="color: red">Campo incompleto</span><br/>')
                    $('#go-to-shipping, #go-to-payment').prop('disabled', true)
                }
            } else {
                const isError = fieldsNormal.some(f => {
                    const regexTest = new RegExp(f.regex);
                    if (f.name === name && !!(f.regex && !regexTest.test($(`#${f.name}`).val()))) return true;
                    if (f.name === name && !f.isRequired) return false;
                    return f.name === name && !$(`#${f.name}`).val()
                })                

                if (!isError) {
                    $('#go-to-shipping, #go-to-payment').removeProp('disabled')
                    $(`#${name} + .input-b2b-error`).html('')
                } else {
                    $('#go-to-shipping, #go-to-payment').prop('disabled', true)
                    $(`#${name} + .input-b2b-error`).html('<span style="color: red">Campo incompleto</span><br/>')
                }
            }
            vtexjs.checkout.setCustomData({ field: name, app: appName, value })
        } else {
            if (element.length && !$(`.${name} .errorCustom`).length && isRequired) {
                $(`.${name}`).append(`<div class="help error errorCustom">Este campo es obligatorio</div>`)
            }

            removeCustomData(name)
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

const removeCustomData = (name) => {
    const orderFormId = vtexjs?.checkout?.orderFormId
    fetch(`/api/checkout/pub/orderForm/${orderFormId}/customData/${appName}/${name}`, {
        method: 'DELETE'
    })
}
