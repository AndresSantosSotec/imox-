(function ($) {
    "use strict";
////////////////////////////////////////////////////////////////////////
// 01. Screen Width
var device_width = window.screen.width;

////////////////////////////////////////////////////////////////////////
// 02. Meanmenu
$('#mobile-menu').meanmenu({
	meanMenuContainer: '.mobile-menu',
	meanScreenWidth: "192"
});

////////////////////////////////////////////////////////////////////////
// 03. Mobile Side Menu
$('.zq_header_icon').on('click', function () {
	$('.side-info').addClass('info-open');
	$('.offcanvas-overlay').addClass('overlay-open');
})

$('.side-info-close,.offcanvas-overlay').on('click', function () {
	$('.side-info').removeClass('info-open');
	$('.offcanvas-overlay').removeClass('overlay-open');
});


////////////////////////////////////////////////////////////////////////
// 04. nice select
$('.has-nice-select ,.has-nice-select-2').niceSelect();

////////////////////////////////////////////////////////////////////////
// 05. data background
$("[data-background]").each(function(){
	$(this).css("background-image","url("+$(this).attr("data-background") + ") ")
});


/////////////////////////////////////////////////////////////////////////
// 02. Menu Text Rolling

document.querySelectorAll('.eu_header_nav_menu ul > li > a').forEach(button => button.innerHTML = '<div class="menu-text"><span>' + button.textContent.split('').join('</span><span>') + '</span></div>');

setTimeout(() => {
  var menu_text = document.querySelectorAll(".menu-text span")
  menu_text.forEach((item) => {
    var font_sizes = window.getComputedStyle(item, null);
    let font_size = font_sizes.getPropertyValue("font-size");
    let size_in_number = parseInt(font_size.replace("px", ""));
    let new_size = parseInt(size_in_number / 3)
    new_size = new_size + "px"
    if (item.innerHTML == " ") {
      item.style.width = new_size
    }
  })
}, 1000)

/////////////////////////////////////////////////////
// 03. Cursor Animations
  var client_cursor = document.getElementById("client_cursor");
  function mousemoveHandler(e) {
    try {
      const target = e.target;

      let tl = gsap.timeline({
        defaults: {
          x: e.clientX,
          y: e.clientY,
        }
      })
      let t2 = gsap.timeline({
        defaults: {
          x: e.clientX,
          y: e.clientY,
        }
      })

      // Main Cursor Moving 
      tl.to(".cursor1", {
        ease: "power2.out"
      })
        .to(".cursor2", {
          ease: "power2.out"
        }, "-=0.4")

    } catch (error) {
      console.log(error)
    }

  }
  document.addEventListener("mousemove", mousemoveHandler);

//////////////////////////////////////////////////////////////////////////////////
// 04. Active GSAP
  if (document.querySelector("#has_smooth").classList.contains("has-smooth")) {
    const smoother = ScrollSmoother.create({
      smooth: 1.35,
      effects: device_width < 1025 ? false : true,
      smoothTouch: 0.1,
      normalizeScroll: false,
      ignoreMobileResize: true,
    });
  }

////////////////////////////////////////////////////////////////////////////////
// 05. Section Heading Animation

let headingTimeline = gsap.timeline()

let subTitleContainer = new SplitText(".tp_subtitle_anim", { type: "chars" });
let subTitleChar = subTitleContainer.chars 
headingTimeline.from(subTitleChar, {
  x: 20,
  ease: "back.out",
  opacity: 0,
  duration: 1,
  stagger: 0.1
});

let TitleContainer = new SplitText(".tp_title_anim", { type: "chars, words" });
let TitleChar = TitleContainer.words 
headingTimeline.from(TitleChar, {
    x: 100,
    y: 0,
    z: -200,
    autoAlpha: 0,
    duration: 2,
    stagger: 0.2
},"-=2");

let descriptionContainer = new SplitText(".tp_desc_anim", { type: "chars, words" });
let descriptionChar = descriptionContainer.words 
headingTimeline.from(descriptionChar, {
    x: 50,
    autoAlpha: 0,
    duration: 1,
    stagger: 0.05
},"-=2"); 

////////////////////////////////////////////////////////////////////////////////
// 06. Image SlideUp

gsap.set(".tp_image_slideUp", { y: 100, opacity: 0 });
gsap.to(".tp_image_slideUp", {
    scrollTrigger: {
    trigger: ".tp_image_slideUp",
    start: "top center+=300",
    markers: false
    },
    y: 0,
    opacity: 1,
    ease: "power2.out",
    duration: 1.5,
    delay: 0.3,
    stagger: {
    each: 0.2
    }
});


// team active 2
const teamActiveOne = new Swiper(".h2_team-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	centeredSlides: true,
	loop: true,
	navigation: {
		nextEl: ".h2_team-prev",
		prevEl: ".h2_team-next",
		},
		breakpoints: {
		0: {
			slidesPerView: 1,
			},
		576: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 3
		},
		1400: {
			slidesPerView: 3 
		}
	}
});


// team active 5
const teamActiveTwo = new Swiper(".h5_team-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	navigation: {
		nextEl: ".h5_team-prev",
		prevEl: ".h5_team-next",
		},
		breakpoints: {
		0: {
			slidesPerView: 1,
			},
		576: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 3
		},
		1400: {
			slidesPerView: 3 
		}
	}
});
// team active inner
const teamActiveThree = new Swiper(".inner_team-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	navigation: {
		nextEl: ".inner_team-prev",
		prevEl: ".inner_team-next",
		},
		breakpoints: {
		0: {
			slidesPerView: 1,
			},
		576: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 2,
		},
		1200: {
			slidesPerView: 2
		},
		1400: {
			slidesPerView: 2
		}
	}
});

// brand active 1
const brandActiveOne = new Swiper(".h1_brand-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 800,
	},
	breakpoints: {
		0: {
			slidesPerView: 1,
			},
		576: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
		992: {
			slidesPerView: 5,
		},
		1200: {
			slidesPerView: 6
		},
		1400: {
			slidesPerView: 6
		}
	}
});

// brand active 2
const brandActiveTwo = new Swiper(".h2_brand-active", {
	slidesPerView: 1,
	spaceBetween: 20,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 800,
	},
		breakpoints: {
		0: {
			slidesPerView: 1,
		},
		481: {
			slidesPerView: 2,
		},
		576: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 4
		},
		1400: {
			slidesPerView: 4
		}
	}
});

// brand active 3
const brandActiveThree = new Swiper(".h3_brand-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 800,
	},
		breakpoints: {
		0: {
			slidesPerView: 1,
		},
		481: {
			slidesPerView: 2,
		},
		576: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
		992: {
			slidesPerView: 5,
		},
		1200: {
			slidesPerView: 6
		},
		1400: {
			slidesPerView: 6
		}
	}
});

// brand active 4
const brandActiveFour = new Swiper(".h4_brand-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 800,
	},
		breakpoints: {
		0: {
			slidesPerView: 1,
			},
		481: {
			slidesPerView: 2,
		},
		576: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
		992: {
			slidesPerView: 5,
		},
		1200: {
			slidesPerView: 6
		},
		1400: {
			slidesPerView: 6
		}
	}
});

// brand active 5
const brandActiveFive = new Swiper(".h5_brand-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 800,
	},
		breakpoints: {
		0: {
			slidesPerView: 1,
			},
		576: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
		992: {
			slidesPerView: 5,
		},
		1200: {
			slidesPerView: 6
		},
		1400: {
			slidesPerView: 6
		}
	}
});


// testimonial active 1
const testimonialActive = new Swiper(".testimonial-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 800,
	},
	navigation: {
		nextEl: ".testimonial-prev",
		prevEl: ".testimonial-next",
		},
		breakpoints: {
		0: {
			slidesPerView: 1,
		},
		481: {
			slidesPerView: 1,
		},
		576: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 1,
		},
		992: {
			slidesPerView: 1,
		},
		1200: {
			slidesPerView: 1
		},
		1400: {
			slidesPerView: 1
		}
	}
});

// testimonial active 2
const testimonialActiveOne = new Swiper(".h2_testimonial-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 800,
	},
	navigation: {
		nextEl: ".h2_testimonial-prev",
		prevEl: ".h2_testimonial-next",
		},
		breakpoints: {
		0: {
			slidesPerView: 1,
		},
		481: {
			slidesPerView: 1,
		},
		576: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 2,
		},
		1200: {
			slidesPerView: 3
		},
		1400: {
			slidesPerView: 3
		},
		1600: {
			slidesPerView: 4 
		}
	}
});


// testimonial active 5
const testimonialActiveThree = new Swiper(".h5_testimonial-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 800,
	},

	// loop: true,
	// speed: 10000,
	// freeMode: true,
	// allowTouchMove: false,
	// disableOnInteraction: true,
	// preventInteractionOnTransition:true,
	// autoplay: {
	// 	delay: 1,
	// },
	navigation: {
		nextEl: ".h5_testimonial-prev",
		prevEl: ".h5_testimonial-next",
		},
		breakpoints: {
		0: {
			slidesPerView: 1,
		},
		481: {
			slidesPerView: 1,
		},
		576: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 3
		},
		1400: {
			slidesPerView: 4
		}
	}
});


// service active 1
const serviceActiveOne = new Swiper(".h3_service-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 1000,
	},
	navigation: {
		nextEl: ".h3_service-prev",
		prevEl: ".h3_service-next",
		},
		breakpoints: {
		0: {
			slidesPerView: 1,
		},
		481: {
			slidesPerView: 1,
		},
		576: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 3
		},
		1400: {
			slidesPerView: 3
		}
	}
});

// service active 2
const serviceActiveTwo = new Swiper(".h5_service-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 1000,
	},
	navigation: {
		nextEl: ".h5_service-prev",
		prevEl: ".h5_service-next",
		},
		breakpoints: {
		0: {
			slidesPerView: 1,
		},
		481: {
			slidesPerView: 1,
		},
		576: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 3
		},
		1400: {
			slidesPerView: 3
		}
	}
});

// project active 1
const projectActiveOne = new Swiper(".h3_project-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 800,
	},
	navigation: {
		nextEl: ".h3_project-prev",
		prevEl: ".h3_project-next",
		},
		breakpoints: {
		0: {
			slidesPerView: 1,
		},
		481: {
			slidesPerView: 1,
		},
		576: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 3,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 4
		},
		1400: {
			slidesPerView: 4
		}
	}
});

// project active 2
const projectActiveTwo = new Swiper(".h4_project-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 800,
	},
	navigation: {
		nextEl: ".h4_project-prev",
		prevEl: ".h4_project-next",
		},
		breakpoints: {
		0: {
			slidesPerView: 1,
		},
		481: {
			slidesPerView: 1,
		},
		576: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 4
		},
		1400: {
			slidesPerView: 4
		}
	}
});


// project active 3
const projectActiveThree = new Swiper(".h5_project-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 800,
	},
	navigation: {
		nextEl: ".h5_project-prev",
		prevEl: ".h5_project-next",
		},
		breakpoints: {
		0: {
			slidesPerView: 1,
		},
		481: {
			slidesPerView: 1,
		},
		576: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 4
		},
		1400: {
			slidesPerView: 4
		}
	}
});




// testimonial 9 

var testimonial_thumbs = new Swiper(".h3_testimonial-thumbs", {
	loop: true,
	spaceBetween: 30,
	slidesPerView: 1,
	freeMode: false,
	centeredSlides: true,
	watchSlidesProgress: true,
	allowTouchMove: false,
	breakpoints: {
		0: {
			slidesPerView: 2,
			centeredSlides: false,
			},
		481: {
			slidesPerView: 3,
		},
		576: {
			slidesPerView: 3,
		},
		768: {
			slidesPerView: 3,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 3
		},
	}
  });
//   var testimonialActiveNine = new Swiper(".h9_testimonial-active", {
// 	slidesPerView: 1,
// 	spaceBetween: 0,
// 	loop: true,
// 	speed: 2000,
// 	thumbs: {
// 	  swiper: testimonial_thumbs,
// 	},
// 	pagination: {
// 		el: ".h9_testimonial-pagination",
// 		clickable: true,
// 	},
// 	navigation: {
// 		nextEl: ".h9_testimonial-prev",
// 		prevEl: ".h9_testimonial-next",
// 	},
// });


// testimonial active 1
const testimonialActiveTwo = new Swiper(".h3_testimonial-active", {
	slidesPerView: 1,
	spaceBetween: 30,
	loop: true,
	speed: 2000,
	autoplay: {
		delay: 800,
	},
	thumbs: {
		swiper: testimonial_thumbs,
	},
	navigation: {
		nextEl: ".h3_testimonial-prev",
		prevEl: ".h3_testimonial-next",
		},
		breakpoints: {
		0: {
			slidesPerView: 1,
		},
		481: {
			slidesPerView: 1,
		},
		576: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 1,
		},
		992: {
			slidesPerView: 1,
		},
		1200: {
			slidesPerView: 1
		},
		1400: {
			slidesPerView: 1
		}
	}
});



////////////////////////////////////////////////////////////////////////
// 04. choose Active 3
const h4_chooseActive = new Swiper(".h4_choose-active", {
	slidesPerView: 3,
	spaceBetween: 15,
	loop: true,
	speed: 5000,
	allowTouchMove: false,
	direction: "vertical",
	autoplay: {
		delay: 1,
	},
	breakpoints: {
		0: {
			slidesPerView: 1,
			},
		576: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 1,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 3
		}
	}
});


////////////////////////////////////////////////////////////////////////
// 05. choose Active 2
const h4_chooseActive2 = new Swiper(".h4_choose-active-2", {
	slidesPerView: 3,
	spaceBetween: 15,
	loop: true,
	speed: 5000,
	direction: "vertical",
	allowTouchMove: false,
	autoplay: {
		delay: 1,
		reverseDirection: true,
	},
	breakpoints: {
		0: {
			slidesPerView: 1,
			},
		576: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 1,
		},
		992: {
			slidesPerView: 3,
		},
		1200: {
			slidesPerView: 3
		}
	}
});

// Search Header
$('.zq_search_popup').on('click', function() {
	$('body').addClass('search-active');
})
$(".ba-search-popup .ba-color-layer").on("click", function () {
	$("body").removeClass("search-active");
});



/* =============================================================================
--------------------------------  Navbar Menu   --------------------------------
============================================================================= */


$('.zq_menuIcon').on('click', function () {

	$('.zq_mobile_menu').addClass("open");

	$('.zq_mobile_menu').animate({ left: 0 });

});

$('.zq_mobile_menu .close-menu, .one-scroll .menu-navbar .main-menu > li').on('click', function () {

	$('.zq_mobile_menu').removeClass("open").delay(300).animate({ left: "-100%" });
	$('.zq_mobile_menu .menu-navbar .main-menu .dmenu').removeClass("dopen");
	$('.zq_mobile_menu .menu-navbar .main-menu .sub-menu').slideUp();

});

$('.zq_mobile_menu .menu-navbar .main-menu > li').on('mouseenter', function () {
	$(this).removeClass('hoverd').siblings().addClass('hoverd');
});

$('.zq_mobile_menu .menu-navbar .main-menu > li').on('mouseleave', function () {
	$(this).removeClass('hoverd').siblings().removeClass('hoverd');
});


$('.main-menu > li .dmenu').on('click', function () {
	$(this).parent().parent().find(".sub-menu").toggleClass("sub-open").slideToggle();
	$(this).toggleClass("dopen");
});




})(jQuery);