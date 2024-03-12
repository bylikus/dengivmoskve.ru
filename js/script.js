// Header Burger

const headerBurger = document.querySelector('.header__burger')

const headerBurgerLink = document.querySelectorAll('.header__wrapper-burger a')

if (headerBurger) {

    headerBurger.addEventListener('click', () => {

        document.body.classList.toggle('burger')

    });

    headerBurgerLink.forEach((el) => {

        el.addEventListener('click', () => {

            document.body.classList.toggle('burger')

        })

    });

}





// Calculator

const inputMoneyRange = document.querySelector('.custom-range-slider input[data-type="money"]')

function numberWithSpaces(x) {

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

}

function onlyNumbersFunc(x) {
    return x.replace(/[^\d]/g, "")
}

function numberIntervalFunc(x) {
    if (x > +inputMoneyRange.getAttribute('max')) {
        return x.toString().substring(0, x.length - 1)
    } else {
        return x
    }
}

function monthsFormatter(value) {

    if (value > 11) {

        const year = Math.trunc(value / 12)

        const months = value % 12

        let result = ''

        if (year === 1) {

            result += year + ' год '

        } else if (year === 5) {

            result += year + ' лет '

        } else {

            result += year + ' года '

        }

        if (months > 0) {

            if (months === 1) {

                result += months + ' месяц'

            } else if (months < 5) {

                result += months + ' месяца'

            } else {

                result += months + ' месяцев'

            }

        }

        return result

    } else {

        if (value < 5) {

            return value + ' месяца'

        } else {

            return value + ' месяцев'

        }

    }

}

const calculatorItems = document.querySelectorAll('.calculator__item')

const calculatorTotalLoan = document.querySelector('#calculatorTotalLoan')

const calculatorTotalBid = document.querySelector('#calculatorTotalBid')

const calculatorTotalPerMonthPayment = document.querySelector('#calculatorTotalPerMonthPayment')

const totalBid = 3 // Ставка 3%

let totalLoan = 0 // Выдадим займ

let totalPerMonthPayment = 0 // Ежемесячный платеж от

calculatorTotalBid.innerText = totalBid + '%'

function totalLoanCalculation(carPrice) {

    totalLoan = +carPrice / 100 * 90

    totalPerMonthPayment = totalLoan / 100 * totalBid

    calculatorTotalLoan.innerText = numberWithSpaces(Math.round(totalLoan)) + ' ₽'

    calculatorTotalPerMonthPayment.innerText = numberWithSpaces(Math.round(totalPerMonthPayment)) + ' ₽'

}

if (calculatorItems.length > 0) {

    calculatorItems.forEach(el => {

        const rangeSlider = el.querySelector('input[type="range"]')

        const rangeSliderPreview = el.querySelector('.calculator__item-inner p')

        const rangeSliderInputPreview = el.querySelector('.calculator__item-inner input[type="text"]')

        const sliderDataType = rangeSlider.getAttribute('data-type')

        const sliderRedLine = el.querySelector('.custom-range-slider div')

        sliderRedLine.style.width = (+rangeSlider.value - rangeSlider.getAttribute('min')) * 100 / (rangeSlider.getAttribute('max') - rangeSlider.getAttribute('min')) + '%'



        if (sliderDataType === 'money') {
            rangeSliderInputPreview.value = numberWithSpaces(rangeSlider.value) + ' ₽';

            totalLoanCalculation(rangeSlider.value)

            rangeSliderInputPreview.onfocus = function() {
                this.value = this.value.replaceAll(' ₽', '')
            }
            rangeSliderInputPreview.addEventListener('focusout', function() {
                if (+this.value.replaceAll(' ', '') < +inputMoneyRange.getAttribute('min')) {
                    this.value = numberWithSpaces(+inputMoneyRange.getAttribute('min'))
                    rangeSlider.value = +inputMoneyRange.getAttribute('min')
                    sliderRedLine.style.width = (+rangeSlider.value - rangeSlider.getAttribute('min')) * 100 / (rangeSlider.getAttribute('max') - rangeSlider.getAttribute('min')) + '%'
                    totalLoanCalculation(+inputMoneyRange.getAttribute('min'))
                }
                this.value = this.value + ' ₽'
            })
            rangeSliderInputPreview.oninput = function() {
                let onlyNumbers = onlyNumbersFunc(this.value.replaceAll(' ', ''))
                let numbersLess = numberIntervalFunc(onlyNumbers)
                if (numbersLess) {
                    this.value = numberWithSpaces(numbersLess)
                    if (numbersLess >= +inputMoneyRange.getAttribute('min')) {
                        rangeSlider.value = numbersLess
                        sliderRedLine.style.width = (+rangeSlider.value - rangeSlider.getAttribute('min')) * 100 / (rangeSlider.getAttribute('max') - rangeSlider.getAttribute('min')) + '%'
                        totalLoanCalculation(numbersLess)
                    }
                } else {
                    this.value = ''
                }
            }

            rangeSlider.oninput = function() {

                rangeSliderInputPreview.value = numberWithSpaces(this.value) + ' ₽';

                sliderRedLine.style.width = (+this.value - this.getAttribute('min')) * 100 / (this.getAttribute('max') - this.getAttribute('min')) + '%'

                totalLoanCalculation(this.value)

            }

        } else if (sliderDataType === 'months') {

            rangeSliderPreview.innerHTML = monthsFormatter(rangeSlider.value);

            rangeSlider.oninput = function() {

                rangeSliderPreview.innerHTML = monthsFormatter(this.value);

                sliderRedLine.style.width = (+this.value - this.getAttribute('min')) * 100 / (this.getAttribute('max') - this.getAttribute('min')) + '%'

            }

        }

    })

}




// Terms Dropdowns

let termsItems = document.querySelectorAll('.terms__item')

termsItems.forEach(el => {

    el.addEventListener("click", function() {

        this.classList.toggle("active");

        if (this.style.maxHeight) {

            this.style.maxHeight = null;

        } else {

            this.style.maxHeight = this.scrollHeight + "px";

        }

    })

})





// Contact Popup

const popupContact = document.querySelector('#popupContact')

const popupInner = popupContact.querySelector('.popup__inner')

const popupHeader = popupContact.querySelector('.popup-header')

const popupContactTrigger = document.querySelectorAll('.popup-contact-trigger')

function openContactPopup(popupType) {

    if (popupType) {

        if (popupType === 'get-money') {

            popupHeader.innerText = 'Получите деньги на выгодных условиях'

        } else if (popupType === 'call-back') {

            popupHeader.innerText = 'Заказ обратного звонка'

        } else if (popupType === 'leave-request') {

            popupHeader.innerText = 'Оставить заявку'

        } else if (popupType === 'get-money-calc') {

            popupHeader.innerText = 'Получите деньги на выгодных условиях'

        }
        popupContact.querySelector('.contact-form').setAttribute('data-type', popupType)

    }

    document.body.classList.add("contact");

}

if (popupContactTrigger.length > 0) {

    popupContactTrigger.forEach(el => {

        el.addEventListener('click', () => {

            openContactPopup(el.getAttribute('data-type'))

        })

    })

}

function closeContactPopup() {

    document.body.classList.remove("contact");

    document.body.classList.remove("contact-success");

    const contactFormInputs = popupContact.querySelectorAll('.contact-form__input')

    if (contactFormInputs.length > 0) {

        contactFormInputs.forEach(el => {

            el.value = ''

            if (el.parentElement.querySelector('.contact-form__input-error')) {

                el.parentElement.querySelector('.contact-form__input-error').remove()

            }

        })

    }

    popupContact.querySelector('.contact-form').removeAttribute('data-type')

}

popupContact.addEventListener('click', (e) => {

    if (!popupInner.contains(e.target) && !document.body.classList.contains('_sending-contact')) {

        closeContactPopup()

    }

})





// Phone Mask

const inputsPhone = document.querySelectorAll(".contact-form__input-phone");

inputsPhone.forEach(el => {

    el.addEventListener("input", (e) => {

        const value = el.value.replace(/\D+/g, "");

        const numberLength = 11;

        let result = '';

        for (let i = 0; i < value.length && i < numberLength; i++) {

            switch (i) {

                case 0:

                    result = `+7 (`

                    continue;

                case 4:

                    result += ") ";

                    break;

                case 7:

                    result += " ";

                    break;

                case 9:

                    result += " ";

                    break;

                default:

                    break;

            }

            result += value[i];

        }

        if (el.value.length === 1 && result) {
            el.value = result + el.value;
        } else {
            el.value = result;
        }

    });

})





// Contact Popup Submit

const contactForm = document.querySelectorAll('form.contact-form')

contactForm.forEach(el => {

    el.addEventListener('submit', async(e) => {

        e.preventDefault()

        function createElementFromHTML(htmlString) {

            var div = document.createElement('div');

            div.innerHTML = htmlString.trim();

            return div.firstChild;

        }

        const inputErrorName = createElementFromHTML(`<span class="contact-form__input-error">*Заполните поле</span>`)

        const inputErrorPhone = createElementFromHTML(`<span class="contact-form__input-error">*Заполните поле</span>`)

        const inputName = el.querySelector('.contact-form__input-name')

        const inputPhone = el.querySelector('.contact-form__input-phone')

        function validate() {

            let nameValidate = false

            let phoneValidate = false

            if (inputName) {

                if (!inputName.value) {

                    if (!inputName.parentElement.querySelector('.contact-form__input-error')) {

                        inputName.parentElement.appendChild(inputErrorName);

                    }

                    nameValidate = false

                } else if (inputName.value) {

                    if (inputName.parentElement.querySelector('.contact-form__input-error')) {

                        inputName.parentElement.querySelector('.contact-form__input-error').remove()

                    }

                    nameValidate = true

                }

            }

            if (inputPhone) {

                if ((!inputPhone.value || inputPhone.value.length !== 18)) {

                    if (!inputPhone.parentElement.querySelector('.contact-form__input-error')) {

                        inputPhone.parentElement.appendChild(inputErrorPhone);

                    }

                    phoneValidate = false

                } else if (inputPhone.value && inputPhone.value.length === 18) {

                    if (inputPhone.parentElement.querySelector('.contact-form__input-error')) {

                        inputPhone.parentElement.querySelector('.contact-form__input-error').remove()

                    }

                    phoneValidate = true

                }

            }

            return nameValidate && phoneValidate

        }

        if (validate()) {

            const contactType = el.getAttribute('data-type')

            if (contactType === 'get-money-panel') {

                openContactPopup('get-money')

                const popupInputName = popupContact.querySelector('input[name="name"]')

                const popupInputPhone = popupContact.querySelector('input[name="phone"]')

                popupInputName.value = el.querySelector('input[name="name"]').value

                popupInputPhone.value = el.querySelector('input[name="phone"]').value

                el.reset();

            } else {

                const formData = new FormData();

                formData.append('name', inputName.value)

                formData.append('phone', inputPhone.value)

                if (contactType === 'get-money-calc') {

                    const carPriceInput = document.querySelector('.calculator__item-inner input[type="text"]')

                    const monthsRangeInput = document.querySelector('.calculator__item input[name="months"]')

                    formData.append('money', carPriceInput.value)

                    formData.append('months', monthsRangeInput.value)

                    formData.append('loan', numberWithSpaces(totalLoan))

                    formData.append('bid', totalBid)

                    formData.append('monthPayment', numberWithSpaces(totalPerMonthPayment))

                    formData.append('nameForm', 'Калькулятор Займа')

                } else if (contactType === 'leave-request') {
                    formData.append('nameForm', 'Оставить заявку')
                } else if (contactType === 'call-back') {
                    formData.append('nameForm', 'Обратный звонок')
                } else {
                    formData.append('nameForm', 'Получить деньги')
                }

                document.body.classList.add('_sending-contact');

                let response = await fetch('js/sendmail.php', {

                    method: 'POST',

                    body: formData

                });

                if (response.ok) {

                    el.reset()

                    document.body.classList.remove('_sending-contact');

                    document.body.classList.add('contact-success')

                } else {

                    document.body.classList.remove('_sending-contact');

                    alert('Что-то пошло не так. Попробуйте ещё раз!')

                }


            }

        }

    })

})