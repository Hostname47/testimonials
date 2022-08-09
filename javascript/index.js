import testimonials from "./testimonials.js";

/**
 * Testimonials box will take the height of the longest testimonial
 */

testimonials.forEach(testimonial => {
    let container = document.querySelector('#testimonials-box .container');
    let component = document.querySelector('.testimonial-component-skeleton').cloneNode(true);

    /** put testimonial data to component */
    

    component.classList.remove('none');
    component.classList.remove('testimonial-component-skeleton');
    container.append(component);
});