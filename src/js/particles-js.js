'use strict';

// ParticlesJS defined in particles.js node module
/* global particlesJS */
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } }, // eslint-disable-line camelcase
        color: { value: '#f4a93b' },
        shape: {
            type: 'circle',
            stroke: { width: 0.35, color: '#f4a93b' },
            polygon: { nb_sides: 4 }, // eslint-disable-line camelcase
            // image: { src: '', width: 100, height: 100 },
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }, // eslint-disable-line camelcase
        },
        size: {
            value: 4,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }, // eslint-disable-line camelcase
        },
        line_linked: { // eslint-disable-line camelcase
            enable: true,
            distance: 150,
            color: '#232323',
            opacity: 0.5,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out', // eslint-disable-line camelcase
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
    },
    interactivity: {
        detect_on: 'canvas', // eslint-disable-line camelcase
        events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: false, mode: 'push' },
            resize: true,
        },
        modes: {
            grab: { distance: 300, line_linked: { opacity: 0.5 } }, // eslint-disable-line camelcase
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 }, // eslint-disable-line camelcase
            remove: { particles_nb: 2 }, // eslint-disable-line camelcase
        },
    },
    // retina detection has known issues in chrome
    retina_detect: false, // eslint-disable-line camelcase
});
