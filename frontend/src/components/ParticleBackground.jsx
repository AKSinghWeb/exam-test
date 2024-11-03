import React, { useEffect } from 'react';
import './ParticleBackground.css'; // Add styles if needed

const ParticleBackground = () => {
  useEffect(() => {
    // Use the global particlesJS from the CDN
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 100,
            "density": {
              "enable": true,
              "value_area": 641.3648243462092
            }
          },
          "color": {
            "value": "#79f70a"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 1,
              "color": "#79f70a"
            },
            "polygon": {
              "nb_sides": 4
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.9,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 9.744926547616142,
              "size_min": 42.22801503966995,
              "sync": true
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 240.5118091298284,
            "color": "#ffffff",
            "opacity": 0.19620472365193136,
            "width": 1.603412060865523
          },
          "move": {
            "enable": true,
            "speed": 4.810236182596568,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 2164.606282168456,
              "rotateY": 2886.1417095579413
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 243.62316369040352,
              "line_linked": {
                "opacity": 0.71516756881262247
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    }
  }, []);

  return <div id="particles-js"></div>;
};

export default ParticleBackground;
