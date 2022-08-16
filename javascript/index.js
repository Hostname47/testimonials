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

let navLock = true;
document.querySelectorAll('.testimonial-nav-button').forEach(nav => {
    nav.addEventListener('click', (event) => {
        if(!navLock) return;
        navLock = false;
        /**
         * Since the container is moved with animation that takes 400ms we need to release
         * the lock 400ms th click handler to prevent race condition when user click twice
         */
         setTimeout(() => {
            navLock = true;
        }, 400);

        let direction = nav.dataset.direction;
        let container = document.querySelector('#testimonials-box .container');
        let offset = document.querySelector('.testimonial-component').offsetWidth;

        let styles = window.getComputedStyle(container);
        let left = parseInt(styles.getPropertyValue('left'));
        let right = parseInt(styles.getPropertyValue('right'));
        let gap = parseInt(styles.getPropertyValue('gap'));
        if(direction == 'left') {
            if(left < 0)
                container.style.left = `${left + offset + gap}px`;
        } else {
            if(right < 0)
                container.style.left = `${left - offset - gap}px`;
        }
    });
});

document.querySelectorAll('.navigation-type').forEach((button) => {
    button.addEventListener('click', function() {
        if(this.dataset.selected == 1) return;

        let type = this.dataset.type;
        let navsButton = document.querySelector('#arrow-buttons-navigation');
        let dragButton = document.querySelector('#drag-and-drop-navigation');
        let selection = document.querySelector('#testimonials-section .navigation-types-box .selection');
        let container = document.querySelector('#testimonials-box .container');
        
        if(type == 'arrow-buttons') {
            navsButton.dataset.selected = 1;
            dragButton.dataset.selected = 0;
            selection.style.left = '0px';
            // Display navigation buttons
            document.querySelectorAll('.testimonial-nav-button').forEach((button) => { button.classList.remove('hidden-visibility') });
            // Detach draging effect from container
            detachDragEffect(container);
        } else {
            navsButton.dataset.selected = 0;
            dragButton.dataset.selected = 1;
            selection.style.left = '32px';
            // Hide navigation buttons
            document.querySelectorAll('.testimonial-nav-button').forEach((button) => { button.classList.add('hidden-visibility') });
            // Attach draging effect to container
            attachDragEffect(container);
        }
    });
});

function attachDragEffect(container) {
    container.classList.add('grabbable');
    container.classList.remove('annimation-04s');
    
    ['mousedown', 'touchstart'].forEach( event => 
        container.addEventListener(event, pickup, true)
    );
    
    ['mousemove', 'touchmove'].forEach( event => 
        container.addEventListener(event, move, true)
    );

    ['mouseup', 'touchend'].forEach( event => 
        container.addEventListener(event, drop, true)
    );
}

function detachDragEffect(container) {
    container.classList.remove('grabbable');
    container.classList.add('annimation-04s');

    ['mousedown', 'touchstart'].forEach( event => 
        container.removeEventListener(event, pickup, true)
    );
    
    ['mousemove', 'touchmove'].forEach( event => 
        container.removeEventListener(event, move, true)
    );

    ['mouseup', 'touchend'].forEach( event => 
        container.removeEventListener(event, drop, true)
    );
}

let isDown = false;
let mouse = {
    leftWhenPickup: 0,
    xPositionWhenPickup: 0
};

function pickup(event) {
    mouse.leftWhenPickup = parseInt(window.getComputedStyle(event.currentTarget).getPropertyValue('left'));
    mouse.xPositionWhenPickup = event.clientX;
    
    isDown = true;
}

function move(event) {
    if(isDown) {
        let container = event.currentTarget;
        let styles = window.getComputedStyle(container);
        let left = mouse.leftWhenPickup + event.clientX - mouse.xPositionWhenPickup;
        let right = parseInt(styles.getPropertyValue('right'));
        
        if(left > 0) {
            container.style.left = 0;
        } else if(right > 0) {
            container.style.right = 0;
        } else {
            container.style.left = `${left}px`;
        }
    }
}

function drop(event) {
    isDown = false;
}
