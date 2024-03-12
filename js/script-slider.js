// Example Swiper
const swiper = new Swiper('.examples__slider .swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,
    breakpoints: {
        740: {
            slidesPerView: 3,
        },
        991: {
            spaceBetween: 25,
            slidesPerView: 3
        },
        1400: {
            spaceBetween: 30,
            slidesPerView: 3
        }
    },
    navigation: {
        nextEl: '.examples__slider .swiper-button-next',
        prevEl: '.examples__slider .swiper-button-prev',
    },
});