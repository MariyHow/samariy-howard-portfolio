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
    if (experienceWasDragged) {
        experienceWasDragged = false
        return
    }
    const selectedIndex = Number(selectedCard.dataset.experienceIndex)
    
    if (selectedIndex !== activeExperienceIndex) {
        selectExperience(selectedIndex)
        return
    }
    
    const selectedCardIsOpen = selectedCard.classList.contains("experience__card--open")
    
    closeExperienceDetails()
    
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

const experienceCards = document.querySelectorAll(".experience__card")

let activeExperienceIndex = 0

function updateExperienceCarousel() {
    const totalCards = experienceCards.length

    experienceCards.forEach((card, index) => {
        card.dataset.experienceIndex = index
        card.classList.remove(
            "expereince__card--active",
            "experience__card--previous",
            "experience__card--next",
            "experience__card--hiddden"
        )
        const previousIndex = (activeExperienceIndex - 1 + totalCards) % totalCards
        const nextIndex = (activeExperienceIndex + 1) % totalCards
        if (index === activeExperienceIndex) {
            card.classList.add("experience__card--active")
        }
        else if (index === previousIndex) {
            card.classList.add("experience__card--previous")
        }
        else if (index === nextIndex) {
            card.classList.add("experience__card--next")
        }
        else {
            card.classList.add("experience__card--hidden")
        }
    })
}

const experienceStage = document.querySelector(".experience__stage")

let dragStartX = 0
let dragEndX = 0
let isDraggingExperience = false

function startExperienceDrag(event) {
    isDraggingExperience = true
    dragStartX = event.type.includes("touch") ? event.touches[0].clientX : event.clientX
    dragEndX = dragStartX
}

function moveExperienceDrag(event) {
    if (!isDraggingExperience) return
    dragEndX = event.type.includes("touch") ? event.touches[0].clientX : event.clientX
    if (Math.abs(dragEndX - dragStartX) > 10) {
        experienceWasDragged = true
    }
}

function endExperienceDrag() {
    if (!isDraggingExperience) return
    const dragDistance = dragEndX - dragStartX
    const minimumDragDistance = 60
    if (dragDistance > minimumDragDistance) {
        moveExperience(-1)
    }
    else if (dragDistance < -minimumDragDistance) {
        moveExperience(1)
    }
    isDraggingExperience = false
    dragStartX = 0
    dragEndX = 0
    setTimeout(() => {
        experienceWasDragged = false
    }, 0)
}

experienceStage.addEventListener("mousedown", startExperienceDrag)
experienceStage.addEventListener("mousemove", moveExperienceDrag)
experienceStage.addEventListener("mouseup", endExperienceDrag)
experienceStage.addEventListener("mouseleave", endExperienceDrag)

experienceStage.addEventListener("touchstart", startExperienceDrag)
experienceStage.addEventListener("touchmove", moveExperienceDrag)
experienceStage.addEventListener("touchend", endExperienceDrag)

function moveExperience(direction) {
    const totalCards = experienceCards.length
    activeExperienceIndex = (activeExperienceIndex + direction + totalCards) % totalCards
    closeExperienceDetails()
    updateExperienceCarousel()
}

function selectExperience(index) {
    if (index === activeExperienceIndex) {
        return
    }
    activeExperienceIndex = index
    closeExperienceDetails()
    updateExperienceCarousel()
}

function closeExperienceDetails() {
    experienceCards.forEach((card) => {
        card.classList.remove("experience__card--open")
        card.setAttribute("aria-expanded", "false")
    })
}

updateExperienceCarousel()