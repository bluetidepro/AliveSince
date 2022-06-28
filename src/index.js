import url from 'url';
import 'url-search-params-polyfill';
import isEmpty from 'validator/es/lib/isEmpty'
import isNumeric from 'validator/es/lib/isNumeric'
// import escape from 'validator/es/lib/escape'
import DOMPurify from 'dompurify'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

const startUrl = url.parse(window.location.href, true)
const urlParams = new URLSearchParams(startUrl.search)

const forms = document.body.querySelectorAll('[data-form]')

const inputError = (input) => {
	input.value = ""
    const nextElementSiblingEl = input.nextElementSibling
    const error = input.parentNode.parentNode.querySelector('.error-msg')

    error.classList.remove('hidden')
    error.classList.add('block')

    nextElementSiblingEl.classList.remove('hidden')
    nextElementSiblingEl.classList.add('flex')

	input.classList.remove('focus:ring-indigo-500', 'focus:border-indigo-500', 'border-gray-300')
	input.classList.add('border-red-300', 'text-red-900', 'placeholder-red-300', 'focus:ring-red-500', 'focus:border-red-500', 'dirty')
}

forms.forEach((form) => {
	const submitBtn = form.querySelector('[data-submit-input]')
	const nameInput = form.querySelector('[data-name-input]')
	const dayInput = form.querySelector('[data-day-input]')
	const yearInput = form.querySelector('[data-year-input]')
	const monthInput = form.querySelector('[data-month-input]')
	const results = document.getElementById('results')
  	const formElements = [nameInput, dayInput, yearInput, monthInput]
	let myInterval = false

	const getName = DOMPurify.sanitize(urlParams.get('name'))
	const getMonth = DOMPurify.sanitize(urlParams.get('month'))
	const getYear = DOMPurify.sanitize(urlParams.get('year'))
	const getDay = DOMPurify.sanitize(urlParams.get('day'))

	if (getName) {
		nameInput.value = getName
	}
	if (getMonth) {
		monthInput.value = getMonth
	}
	if (getYear) {
		yearInput.value = getYear
	}
	if (getDay) {
		dayInput.value = getDay
	}

	form.addEventListener('submit', (event) => {
	    results.classList.remove('block')
	    results.classList.add('hidden')
		event.preventDefault()
		const name = nameInput.value.trim() + ''
		let day = dayInput.value.trim() + ''
		let year = yearInput.value.trim() + ''
		const month = monthInput.value.trim() + ''
		let valid = true

		console.log(myInterval, 'myInterval')

		if (myInterval) {
			clearInterval(myInterval)
		}

		if (isEmpty(name)) {
			urlParams.set('name', '')
			console.log('Name or about field is empty')
			valid = false
			inputError(nameInput)
		}

		if (isEmpty(month)) {
			urlParams.set('month', '')
			console.log('month is empty')
			valid = false
			inputError(monthInput)
		}

		if (isEmpty(day) || !isNumeric(day) || day.length !== 2 || Number(day) > 31 || Number(day) <= 0) {
			if (day.length === 1 && Number(day) < 10 && Number(day) > 0) {
				console.log('day')
				day = '0' + day
			} else {
				console.log('day wrong')
				urlParams.set('day', '')
				valid = false
				inputError(dayInput)
			}
		}

		if (isEmpty(year) || !isNumeric(year) || year.length !== 4 || Number(year) > new Date().getFullYear()) {
			console.log('year wrong')
			urlParams.set('year', '')
			valid = false
			inputError(yearInput)
		}

		if (valid) {
		    results.classList.remove('hidden')
		    results.classList.add('block')
			urlParams.set('name', name)
			urlParams.set('month', month)
			urlParams.set('year', year)
			urlParams.set('day', day)

			document.body.querySelector('[data-results-nickname]').innerText = name

			console.log(month, 'month2')
			console.log(year, 'year2')
			console.log(day, 'day2')
			console.log(name, 'name2')

			var yearOfBirth = moment([Number(year), (Number(month) - 1), Number(day)])
			console.log(yearOfBirth, 'yearOfBirth')
			var now = moment()
			console.log(now, 'now')

			// Calculate the difference in seconds
			var difference = now.diff(yearOfBirth) 
			console.log(difference, 'difference')

			// Make duration object
			console.log(parseFloat(Math.floor(moment.duration(difference).as('seconds'))).toLocaleString('en'), 'seconds')
			console.log(parseFloat(Math.floor(moment.duration(difference).as('minutes'))).toLocaleString('en'), 'minutes')
			console.log(parseFloat(Math.floor(moment.duration(difference).as('hours'))).toLocaleString('en'), 'hours')
			console.log(parseFloat(Math.floor(moment.duration(difference).as('days'))).toLocaleString('en'), 'days')
			console.log(parseFloat(Math.floor(moment.duration(difference).as('weeks'))).toLocaleString('en'), 'weeks')
			console.log(parseFloat(Math.floor(moment.duration(difference).as('months'))).toLocaleString('en'), 'months')
			console.log(parseFloat(Math.floor(moment.duration(difference).as('years'))).toLocaleString('en'), 'years')
			
			myInterval = setInterval(function(){
				var now = moment()
				var difference = now.diff(yearOfBirth)
				document.body.querySelector('[data-results-milliseconds]').innerText = parseFloat(Math.floor(moment.duration(difference).as('milliseconds'))).toLocaleString('en')
				document.body.querySelector('[data-results-seconds]').innerText = parseFloat(Math.floor(moment.duration(difference).as('seconds'))).toLocaleString('en')
				document.body.querySelector('[data-results-minutes]').innerText = parseFloat(Math.floor(moment.duration(difference).as('minutes'))).toLocaleString('en')
				document.body.querySelector('[data-results-hours]').innerText = parseFloat(Math.floor(moment.duration(difference).as('hours'))).toLocaleString('en')
				document.body.querySelector('[data-results-days]').innerText = parseFloat(Math.floor(moment.duration(difference).as('days'))).toLocaleString('en')
			}, 100)
			document.body.querySelector('[data-results-milliseconds]').innerText = parseFloat(Math.floor(moment.duration(difference).as('milliseconds'))).toLocaleString('en')
			document.body.querySelector('[data-results-seconds]').innerText = parseFloat(Math.floor(moment.duration(difference).as('seconds'))).toLocaleString('en')
			document.body.querySelector('[data-results-minutes]').innerText = parseFloat(Math.floor(moment.duration(difference).as('minutes'))).toLocaleString('en')
			document.body.querySelector('[data-results-hours]').innerText = parseFloat(Math.floor(moment.duration(difference).as('hours'))).toLocaleString('en')
			document.body.querySelector('[data-results-days]').innerText = parseFloat(Math.floor(moment.duration(difference).as('days'))).toLocaleString('en')
			document.body.querySelector('[data-results-weeks]').innerText = parseFloat(Math.floor(moment.duration(difference).as('weeks'))).toLocaleString('en')
			document.body.querySelector('[data-results-months]').innerText = parseFloat(Math.floor(moment.duration(difference).as('months'))).toLocaleString('en')
			document.body.querySelector('[data-results-years]').innerText = parseFloat(Math.floor(moment.duration(difference).as('years'))).toLocaleString('en')
			document.body.querySelector('[data-results-date]').innerText = yearOfBirth.format("dddd, MMMM Do, YYYY")

			let myAge = Number(moment.duration(difference).as('years'));

			if months 12-24
				months - 12 / 12 * 9 + 15
			if months less than 12
				months / 12 * 9
			if months more than 24
				months - 24 / 12 * 5 + 24

			months is less than 180
				months / 15
			months is more than 180 but less 288
				108 / 9
				// months / 9
			remaining months / 5

			--- 

			372 months - 180 (192)
				12 months
			192 - 108
				12 months
			84
				1.4

			DOG YEARS:
			if months under 180
				months / 180
			if months 180 - 288
				months - 180 / 108 + 1
			if months over 288
				months - 288 / 60 + 2

			if a dog was alive for 31 yrs, it 

			// Defining early years. The first two human years of a dog's life count as 10.5 dog years each
			let earlyYears = 2
			earlyYears *= 10.5

			// Defining later years. Each human year following counts as 4 dog years
			let laterYears = myAge - 2
			laterYears *= 4

			// Calculating my age in dog years
			let myAgeInDogYears = earlyYears + laterYears

			document.body.querySelector('[data-results-dog-years]').innerText = parseFloat(Math.floor(myAgeInDogYears)).toLocaleString('en')

			// Displaying my name and age in dog years
			console.log(`I am ${myAgeInDogYears} years old in dog years.`);

			document.body.querySelector('[data-tweet]').innerHTML = `<a href="https://twitter.com/share" class="twitter-share-button" data-url="${document.URL}" data-via="bluetidepro" data-related="bluetidepro" data-text="${name} has been #AliveSince ${yearOfBirth.format("dddd, MMMM Do, YYYY")}! Find out how that breaks down...">Tweet</a>`

			const existingScript = document.getElementById('twitterJs')

			if (existingScript) {
				existingScript.remove()
			}

			const script = document.createElement('script')
			script.src = 'https://platform.twitter.com/widgets.js'
			script.id = 'twitterJs'
			document.body.appendChild(script)
		}
		
		window.history.replaceState({}, '', `${startUrl.pathname}?${urlParams}`)

		return false
	})

	if (getName && getMonth && getYear && getDay) {
		submitBtn.click()
	}

	formElements.forEach((formElement) => {
		// Remove dirty class if present during input change
		formElement.addEventListener('input', (event) => {
			const target = event.target
			const classes = target.classList
			const isDirty = classes.contains('dirty')
			if (isDirty) {
				classes.remove('border-red-300', 'text-red-900', 'placeholder-red-300', 'focus:ring-red-500', 'focus:border-red-500', 'dirty')
				classes.add('focus:ring-indigo-500', 'focus:border-indigo-500', 'border-gray-300')

			    const nextElementSiblingEl = target.nextElementSibling
			    const error = target.parentNode.parentNode.querySelector('.error-msg')
			    
			    error.classList.remove('block')
			    error.classList.add('hidden')

			    nextElementSiblingEl.classList.remove('flex')
			    nextElementSiblingEl.classList.add('hidden')
			}
		})
	})
})
