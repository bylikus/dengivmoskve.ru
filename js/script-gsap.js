// Cars On Scroll Animation
let isFlashed = false
gsap.to('.hero__img', {
    scrollTrigger: {
        trigger: '.hero__container',
        toggleActions: "restart pause reverse pause",
        start: "top top",
        end: "top top",
        onUpdate: () => {
            if (!isFlashed) {
                gsap.set('.hero__img', { attr: { src: 'media/about/hero-image-flash.png' } })
                isFlashed = true
                setTimeout(() => {
                    gsap.set('.hero__img', { attr: { src: 'media/about/hero-image.png' } })
                    isFlashed = false
                }, 300)
            }
        }
    },
})
gsap.to('.benefits__bg-image', {
    scrollTrigger: {
        trigger: '.benefits',
        toggleActions: "restart pause reverse pause",
        start: "top center",
        end: "bottom",
        scrub: 1,
    },
    x: 0,
    y: 0,
})
gsap.to('.terms__bg-image', {
    scrollTrigger: {
        trigger: '.terms',
        toggleActions: "restart pause reverse pause",
        start: "top center",
        end: "bottom",
        scrub: 1,
    },
    top: '20%',
})