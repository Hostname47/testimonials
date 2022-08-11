import testimonials from "./testimonials.js";

testimonials.forEach(testimonial => {
    let container = document.querySelector('#testimonials-box .container');
    let component = document.querySelector('.testimonial-component-skeleton').cloneNode(true);

    /** put testimonial data to component */
    let avatar = component.querySelector('.avatar');
    avatar.src = testimonial.avatar;
    avatar.alt = testimonial.name;
    avatar.parentNode.href = testimonial.avatar;
    component.querySelector('.name').textContent = testimonial.name;
    component.querySelector('.designation').textContent = testimonial.designation;
    component.querySelector('.message').textContent = testimonial.message;

    component.classList.remove(...['testimonial-component-skeleton', 'none']);
    container.append(component);
});

/**
 * Testimonials box needs to set height because the container inside of it is absolute positioned
 * so we need to set the height explicitly
 */
document.querySelector('#testimonials-box').style.height = `${document.querySelector('#testimonials-box .container').offsetHeight}px`;

document.querySelectorAll('.testimonial-nav-button').forEach(nav => {
    nav.addEventListener('click', (event) => {
        let direction = nav.dataset.direction;
        let container = document.querySelector('#testimonials-box .container');
        let offset = document.querySelector('.testimonial-component').offsetWidth;

        let styles = window.getComputedStyle(container);
        let left = parseInt(styles.getPropertyValue('left'));
        let right = parseInt(styles.getPropertyValue('right'));
        let gap = parseInt(styles.getPropertyValue('gap'));
        if(direction == 'left') {
            if(left >= 0) return;
            let moveBy = left + offset + gap;
            container.style.left = `${moveBy}px`;
        } else {
            if(right >= 0) return;
            let moveBy = left - offset - gap;
            container.style.left = `${moveBy}px`;
        }
    });
});