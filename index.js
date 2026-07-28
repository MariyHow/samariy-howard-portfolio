let isModalOpen = false
let contrastToggle = false
const scaleFactor = 1 / 20

function moveBackground(event) {
    const shapes = document.querySelectorAll(".shape")
    const x = event.clientX * scaleFactor
    const y = event.clientY * scaleFactor
    
    for (let i = 0; i < shapes.length; i++) {
        const isOdd = i % 2 !== 0
        const boolInt = isOdd ? -1 : 1
        shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px)`
    }
}

function toggleContrast() {
    document.body.classList.toggle("dark-theme")
}

function contact(event) {
    event.preventDefault()
    const loading = document.querySelector('.modal__overlay--loading')
    const success = document.querySelector('.modal__overlay--success')
    loading.classList += " modal__overlay--visible"
    emailjs
        .sendForm(
            'service_n2pdg6q',
            'template_wajpt6w',
            event.target,
            '2uRrjzJTPtnVHaOJ_'
        ).then(() => {
            loading.classList.remove("modal__overlay--visible")
            success.classList += " modal__overlay--visible"
        }).catch(() => {
            loading.classList.remove("modal__overlay--visible")
            alert(
                "The email service is temporarily unavailable. Please contact me directly on Samariy619yahoo.com@gmail.com"
            )
        })
}

function toggleModal() {
    if (isModalOpen) {
        isModalOpen = false
        return document.body.classList.remove("modal--open")
    }
    isModalOpen = !isModalOpen
    // toggle modal
    document.body.classList += " modal--open"
}

function toggleExperience(selectedCard) {
    const experienceCard = document.querySelectorAll(".experience__card")
    const selectedCardIsOpen = selectedCard.classList.contains("experience__card--open")

    experienceCard.forEach((card) => {
        card.classList.remove("experience__card--open")
        card.setAttribute("aria-expanded", "false")
    })

    if (!selectedCardIsOpen) {
        selectedCard.classList.add("experience__card--open")
        selectedCard.setAttribute("aria-expanded", "true")
    }
}

function handleExperienceKey(event, selectedCard) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        toggleExperience(selectedCard)
    }
}