
$(document).ready(function() {

	"use strict";

	PageLoad();
	FirstLoad();

});

$(document).on("mousemove", function(e) {
	var a = e.pageX,
			t = e.pageY;
	$("#magic-cursor").css("transform", "translate3d(" + a + "px," + t + "px,0px)");
	$("#magic-cursor").removeClass("hidden-ball");
});
$(".personal").on({
	mouseenter: function(e) {
		$("#magic-cursor").stop().animate({
			width: 86,
			height: 86,
			opacity: .05,
			margin: "-40px 0 0 -40px"
		}, 0)
	},
	mouseleave: function(e) {
		$("#magic-cursor").stop().animate({
			width: 26,
			height: 26,
			opacity:1,
			margin: "-30px 0 0 -30px"
		}, 0)
	}
});

/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {

		if ($("#page-content").hasClass("light-content")) {
			$('.preloader-wrap').addClass("light-content");
		}

		$("body").removeClass("hidden");
		
		var width = 100,
			perfData = window.performance.timing,
			EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
			time = ((EstimatedTime/1000)%50) * 10

		// Loadbar Animation
		$(".loadbar").animate({
			width: width + "%"
		}, time / 0.8);

		// Percentage Increment Animation
		var PercentageID = $("#percent"),
				start = 0,
				end = 100,
				duration = time + 400;
				animateValue(PercentageID, start, end, duration);

		function animateValue(id, start, end, duration) {

			var range = end - start,
			  current = start,
			  increment = end > start? 1 : -1,
			  stepTime = Math.abs(Math.floor(duration / range)),
			  obj = $(id);

			var timer = setInterval(function() {
				current += increment;
				$(obj).text(current);
				if (current == end) {
					clearInterval(timer);
				}
			}, stepTime);
		}

		// Fading Out Loadbar on Finished
		setTimeout(function(){
			$('.loadbar').append('<span class="hold-progress-bar"></span>');
			$('body').append('<audio loop autoplay volume="0" id="audio"><source src="https://b922bde52f23a8481830-83cb7d8d544f653b52d1a1621f05ea9d.ssl.cf3.rackcdn.com/audio/MASTERqwav.mp3" type="audio/mpeg" /></audio>');
			var audio = document.getElementById("audio");
			audio.volume = 0.2;
			TweenMax.to($('.hold-progress-bar'), 1, {force3D:true,width:'100%', delay:0.1, ease:Power2.easeOut, onComplete:function(){
				TweenMax.set($(".trackbar"), {visibility:'hidden', opacity:0});
				$('body').waitForImages({
					finished: function() {

					TweenMax.to($(".percentage"),0.5, {force3D:true, opacity:0, y:-90, delay:0, ease:Power1.easeInOut});
					TweenMax.to($(".headphones, .headphones-text"),0.3, {force3D:true, opacity:0, y:-50, delay:0.2, ease:Power2.easeOut});
					TweenMax.to($(".preloader-wrap"),0.7, {force3D:true, yPercent: -101, delay:0.6, ease:Power2.easeInOut});
					TweenMax.set($(".preloader-wrap"), {visibility:'hidden', delay:1.4, opacity:0});

					setTimeout(function(){

						$('body').waitForImages({
							finished: function() {
								TweenMax.to($("#header-container, #footer-container"), 1, {force3D:true, opacity:1, delay:0.3, ease:Power2.easeOut});
								$('body').removeClass('hidden-ball');
							},
							waitForAll: true
						});

						TweenMax.to($("#main"), 0.2, {force3D:true, opacity:1, delay:0.1, ease:Power2.easeOut});
						if( $('#hero').hasClass("has-image")) {
							TweenMax.to($("#hero-bg-image"), 1, {force3D:true, scale:1.05 , opacity:1, delay:0.2, ease:Power2.easeOut});
							TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: -navtitleheight, opacity:1, delay:0.9, ease:Power2.easeOut});
							TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y:navsubtitleheight, opacity:1, delay:0.95, ease:Power2.easeOut});
							TweenMax.to($(".scroll-down-wrap"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.85, ease:Power2.easeOut});
							TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:1.15, ease:Power2.easeOut});
						} else {
							TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: -navsubtitleheight, opacity:1, delay:0.9, ease:Power2.easeOut});
							TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y: navtitleheight, opacity:1, delay:0.95, ease:Power2.easeOut});
							TweenMax.to($(".post-article-wrap"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.7, ease:Power2.easeOut});
							TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:1.05, ease:Power2.easeOut});
						}

						setTimeout( function(){
							$('body').removeClass("load-project-page");
						} , 600 );

						setTimeout( function(){
							$('body').removeClass("load-next-project");
							$('body').addClass("header-visible");
							$('#showcase-holder').removeClass("disabled");
						} , 1600 );

						setTimeout( function(){
							$('body').removeClass("show-loader")
						} , 800 );

					} , 100 );
				},
			waitForAll: true
			});
			}});
		}, time);
	}// End Page Load

/*--------------------------------------------------
Function First Load
---------------------------------------------------*/

	function FirstLoad() {

		if ($("body").hasClass("smooth-scroll")) {
			var elem = document.querySelector("#content-scroll");
			var scrollbar = Scrollbar.init(elem,
			{
				renderByPixels: true,
				damping:0.05
			});
		}

		$("html,body").animate({scrollTop: 0}, 1);

		if ($("#page-content").hasClass("light-content")) {
			$("main, nav").css('background-color', '#111');
			$('#magic-cursor').addClass('light-content');
			if( $('#hero').length > 0 ){
				if( $('#hero').hasClass("has-image")) {
					$("header").css('background-color', 'transparent');
				} else {
					$("header").css('background-color', 'transparent');
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		} else {
			$("main").css('background-color', '#fff');
			$("nav").css('background-color', '#0f1010');
			$('#magic-cursor').removeClass('light-content');
			if( $('#hero').length > 0 ){
				if( $('#hero').hasClass("has-image")) {
					$("header").css('background-color', 'transparent');
				} else {
					$("header").css('background-color', 'transparent');
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		}

		$('.section-image').each(function() {
			var image = $(this).data('src');
			$(this).css({'background-image': 'url(' + image + ')'});
		});

		$('.item').each(function() {
			var image = $(this).find('.item-image').data('src');
			$(this).find('.item-image').css({'background-image': 'url(' + image + ')'});
		});

		$('.thumb-page').each(function() {
			var image = $(this).data('src');
			$(this).css({'background-image': 'url(' + image + ')'});
		});

		$('.video-cover').each(function() {
			var image = $(this).data('src');
			$(this).css({'background-image': 'url(' + image + ')'});
		});

		//Load Default Page
		$('a.ajax-link').on('click', function() {
			$("body").addClass("show-loader");
			$(".flexnav").removeClass("flexnav-show");
			$('#menu-burger').removeClass("open");
			var tlMenu = new TimelineLite();
			$(".fullscreen-menu .menu-timeline").each(function(index, element) {
				tlMenu.to(element, 0.25, {y:-30, opacity:0, ease:Power2.easeIn}, index * 0.03)
			});
			TweenMax.to('#ball', 0.3,{borderWidth:"2px",scale:1,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});
			if( $('#showcase-holder').length > 0 ){
				TweenMax.to($(".swiper-pagination-bullet-active .subtitle"), 0.4, {force3D:true, opacity:0, delay:0.1, ease:Power2.easeOut});
				TweenMax.to($(".swiper-pagination-bullet-active .title"), 0.4, {force3D:true, opacity:0, delay:0.1, ease:Power2.easeOut});
				TweenMax.to($(".footer-button-wrap"), 0.4, {force3D:true, opacity:0, delay:0.1, ease:Power2.easeOut});
				TweenMax.to($(".showcase-counter, .swiper-pagination-bullet-active .counter, .arrows-wrap"), 0.3, {force3D:true, opacity:0, delay:0.1, ease:Power2.easeOut});
				TweenMax.to($("#main"), 0.3, {opacity:0, delay:0.4, ease:Power0.ease});
			} else {
				TweenMax.to($("#main"), 0.3, {opacity:0, delay:0.1, ease:Power0.ease});
			}
			TweenMax.to($("#footer-container"), 0.3, {opacity:0, ease:Power0.ease});
			TweenMax.to($("#showcase-carousel .swiper-slide-active"), 0.4, {force3D:true, x:-250, opacity:0, delay:0.05, ease:Power3.easeIn  });
			TweenMax.to($("#showcase-carousel .swiper-slide-active").next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.1, ease:Power3.easeIn  });
			TweenMax.to($("#showcase-carousel .swiper-slide-active").next().next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.15, ease:Power3.easeIn  });
			TweenMax.to($("#showcase-carousel"), 0.5, {force3D:true, opacity:0, delay:0.1, ease:Power1.easeInOut  });

			TweenMax.to($("#large-showcase-carousel .swiper-slide-active").prev(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.05, ease:Power3.easeIn  });
			TweenMax.to($("#large-showcase-carousel .swiper-slide-active"), 0.4, {force3D:true, x:-250, opacity:0, delay:0.1, ease:Power3.easeIn  });
			TweenMax.to($("#large-showcase-carousel .swiper-slide-active").next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.15, ease:Power3.easeIn  });
			TweenMax.to($("#large-showcase-carousel"), 0.5, {force3D:true, opacity:0, delay:0.1, ease:Power1.easeInOut  });
		});

		//Load Page From Menu
		$('nav .ajax-link').on('click', function() {
			var tl = new TimelineLite();
			$(".menu-timeline").each(function(index, element) {
				tl.to(element, 0.25, {y:-80, opacity:0, ease:Power1.easeIn }, index * 0.05)
			});
		});

		$('#burger-wrapper').on('click', function() {
			$('#menu-burger, nav').toggleClass('open');
			setTimeout( function(){
				if ($('#menu-burger').hasClass("open")) {
					$('header').addClass('over-sidebar');
					if (!$('#page-content').hasClass("light-content")) {
						$('#magic-cursor').addClass('light-content');
						$('#header-container').addClass('light-content');
					}
					//Fade In Navigation Lists
					var tlMenu = new TimelineLite();
					tlMenu.set($(".menu-timeline"), {y: 80, opacity:0});
					$(".menu-timeline").each(function(index, element) {
						tlMenu.to(element, 0.5, {y:0, opacity:1, delay:0.4, ease:Power2.easeOut}, index * 0.1)
					});

				} else {
					//Fade Out Navigation Lists
					var tlMenu = new TimelineLite();
					$(".menu-timeline").each(function(index, element) {
						tlMenu.to(element, 0.25, {y:-80, opacity:0, ease:Power2.easeIn}, index * 0.05)
					});
					if (!$('#page-content').hasClass("light-content")) {
						setTimeout( function(){
							$('#magic-cursor').removeClass('light-content');
							$('#header-container').removeClass('light-content');
						} , 500 );
					}
					setTimeout( function(){
						$(".touch-button.active").trigger("click");
						$('header').removeClass('over-sidebar');
					} , 500 );
				}
			} , 20 );
		});

		$(".icon-wrap").on('click', function() {
			var audio = document.getElementById("audio");
			$('body').toggleClass("mute");
			$(this).toggleClass("disabled");
			if ($(this).hasClass('disabled')) {
				$('.button-text span').text($('.button-text span').data('off'));
				$('.button-text span').attr("data-off", $('.button-text span').data('on'));
				$('.button-text span').attr("data-on", $('.button-text span').text());
				audio.volume = 0;
				audio.pause();
			} else {
				$('.button-text span').text($('.button-text span').data('on'));
				$('.button-text span').attr("data-on", $('.button-text span').data('on'));
				$('.button-text span').attr("data-off", $('.button-text span').data('off'));
				audio.volume = 0.2;
				audio.play();
			}
		});

		// Page  Navigation Events
		$('.next-ajax-link-page').on('click', function() {
			$("body").addClass("load-next-page");
			$("body").addClass("show-loader");
			var pageheight = $(".scroll-content").height()
			if ($("body").hasClass("smooth-scroll")) {
				TweenMax.to(scrollbar, 0.5, {scrollTop :pageheight, ease:Power4.easeIn});
			} else {
                TweenMax.to(window, 0.5, {scrollTo :$("footer").offset().top, ease:Power4.easeIn});
            }
			TweenMax.to('#ball', 0.3,{borderWidth:"2px",scale:1,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});
			if ($('#project-nav').hasClass("light-content")) {
				setTimeout(function(){
					$('body').addClass('light-content');
				} , 300 );
			}
			if ($("body").hasClass("smooth-scroll")) {
				if ($(window).width() >= 1466) {
				   var navmove = $("#content-scroll").height() - $("#hero").height() - 92 - $("footer").height()
				}
				else {
				   var navmove = $("#content-scroll").height() - $("#hero").height() - 72 - $("footer").height()
				}
			} else {
				if ($(window).width() >= 1466) {
				   var navmove = window.innerHeight - $("#hero").height() - 92 - $("footer").height()
				}
				else {
				   var navmove = window.innerHeight - $("#hero").height() - 72 - $("footer").height()
				}
			}
			var navtitleheight = $(".page-title").height()
			var navsubtitlemove = $(".page-subtitle").height() + navtitleheight
			var navsubtitleheight = $(".page-subtitle").height()

			TweenMax.to($(".next-page-title"), 0.6, {force3D:true, yPercent:-10,delay:0, ease:Power2.easeInOut});
			if ($('.next-page-title .inner').hasClass("text-align-center")) {
				TweenMax.to($(".page-subtitle"), 0.3, {force3D:true, opacity:0, scale:0.5, delay:0, ease:Power2.easeOut});
			} else {
				TweenMax.to($(".page-subtitle"), 0.3, {force3D:true, opacity:0, scale:1, delay:0, ease:Power2.easeOut});
			}
			TweenMax.to($(".page-title"), 0.6, {force3D:true, y: -navtitleheight, delay:0.1, ease:Power2.easeInOut});
			TweenMax.set($(".page-subtitle"), {opacity:0, scale:1, y: navsubtitlemove, delay:0.4});
			TweenMax.set($(".subtitle-info"), {opacity:0, delay:0.4});
			TweenMax.set($(".subtitle-name"), {opacity:1, delay:0.4});
			TweenMax.to($(".page-subtitle"), 0.3, {force3D:true, opacity:1, scale:1, y:navsubtitleheight, delay:0.4, ease:Power2.easeOut});
			TweenMax.to($("#main-page-content, #hero"), 0.3, {opacity:0});
			TweenMax.to($("#page-nav"), 0.6, {y: - navmove, ease:Power2.easeInOut});
			TweenMax.to($("footer"), 0.3, {opacity:0, delay:0.2, ease:Power2.easeInOut});
		});

		// Project Navigation Events
		$('.next-ajax-link-project').on('click', function() {
			$("body").addClass("load-next-project");
			$("body").addClass("show-loader");
			var pageheight = $(".scroll-content").height()
			if ($("body").hasClass("smooth-scroll")) {
				TweenMax.to(scrollbar, 0.5, {scrollTop :pageheight, ease:Power4.easeIn});
			} else {
        TweenMax.to(window, 0.5, {scrollTo :$("footer").offset().top, ease:Power4.easeIn});
      }
			TweenMax.to('#ball', 0.3,{borderWidth:"2px",scale:1,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});
			if ($('#project-nav').hasClass("light-content")) {
				setTimeout(function(){
					$('body').addClass('light-content');
				} , 300 );
			}
			var navtitleheight = $(".hero-title").height()
			var navsubtitleheight = $(".hero-subtitle").height()
			TweenMax.to($(".next-project-title"), 0.6, {force3D:true, yPercent:-10,delay:0, ease:Power2.easeInOut});
			TweenMax.to($(".main-subtitle"), 0.3, {force3D:true, opacity:0, scale:0.5, delay:0, ease:Power2.easeOut});
			TweenMax.to($(".main-title"), 0.6, {force3D:true, y:-navtitleheight, delay:0.1, ease:Power2.easeInOut});
			TweenMax.set($(".main-subtitle"), {opacity:0, scale:1, y: 150, delay:0.4});
			TweenMax.set($(".subtitle-info"), {opacity:0, delay:0.4});
			TweenMax.set($(".subtitle-name"), {opacity:1, delay:0.4});
			TweenMax.to($(".main-subtitle"), 0.3, {force3D:true, opacity:1, scale:1, y:navsubtitleheight, delay:0.4, ease:Power2.easeOut});
			TweenMax.to($("#main-page-content"), 0.3, {opacity:0});
			setTimeout(function(){
				TweenMax.to($("#project-nav"), 0.6, {height:"100vh", ease:Power2.easeInOut});
				TweenMax.to($(".next-project-image"), 0.6, {top:"0", y: 0, ease:Power2.easeInOut});
				TweenMax.to($("footer"), 0.3, {opacity:0, ease:Power2.easeInOut});
			} , 50 );
		});


		// Tilt Showcase Wrapper
		if( $('#hero').hasClass("has-image")) {
			var timeout;
			$(window).resize(changePersective);
			changePersective();
			function changePersective(){
				TweenMax.set('#hero-bg-wrapper', {perspective: $('body').width()});
			}
			$('#hero').mousemove(function(e){
				if(timeout) clearTimeout(timeout);
				setTimeout(callParallaxHero.bind(null, e));
			});
			function callParallaxHero(e){
				parallaxItHero(e, '#hero-bg-image', 0); //5
				moveItHero(e, '#hero-bg-image', - 30); //80
			}
			function parallaxItHero(e, target, movement){
				var $this = $('#hero-bg-wrapper');
				var relX = e.pageX - $this.offset().left;
				var relY = e.pageY - $this.offset().top;
				TweenMax.to(target, 1, {
					rotationY: (relX - $this.width()/1.5) / $this.width() * movement,
					rotationX: (relY - $this.height()/2) / $this.height() * movement,
				})
			}
			function moveItHero(e, target, movement){
				var $this = $('#hero-bg-wrapper');
				var relX = e.pageX - $this.offset().left;
				var relY = e.pageY - $this.offset().top;
				TweenMax.to(target, 1, {
					x: (relX - $this.width()/2) / $this.width() * movement,
					y: (relY - $this.height()/2) / $this.height() * movement,
				})
			}
		}

		var heroparallax = TweenMax.to('#hero-image-parallax', 1, {top:"20%", ease:Linear.easeNone});
		var captionParallax = TweenMax.to('.has-image #hero-caption', 0.5, {top:"25%", ease:Linear.easeNone});

		var controller = new ScrollMagic.Controller();

		var heroScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'100%'
		})
		.setTween(heroparallax)
		.addTo(controller);

		var captionScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'100%'
		})
		.setTween(captionParallax)
		.addTo(controller);

		if ($("body").hasClass("smooth-scroll")) {
			scrollbar.addListener(() => {
				heroScene.refresh()
				captionScene.refresh()
			});
		}

		// 	parallax image
		$(".has-parallax").each( function () {
			var $this = $(this);
			var $thisHeight = $(this).height();
			var bg = $this.find("img");

			// Add tweenmax for backgroundParallax
			var parallax = TweenMax.fromTo( bg, 1, {y: '-20%'}, {y: '10%',ease:Linear.easeNone});

			// Create scrollmagic scene
			var parallaxScene = new ScrollMagic.Scene({
				triggerElement: this, // <-- Use this to select current element
				triggerHook: 1,
				duration:'300%'
			})
			.setTween(parallax)
			.addTo(controller);

			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					parallaxScene.refresh()
				});
			}

		});

		// animate each
		$('.has-animation').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();

			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);

			scene.triggerHook(1)

			scene.on('enter', function(){
				$this.delay($this.attr('data-delay')).queue(function(next){
					TweenMax.to($this, 0.6, {force3D:true, opacity:1, y:0, scale:1, delay:0.1, ease:Power2.easeOut});
					next();
				});
			});

			scene.on('leave', function(event){
				$this.removeClass('active');
			});

			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})

		$('.has-mask').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});

		$('.has-mask span').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});

		$('.has-mask').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();

			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);

			scene.triggerHook(1)

			scene.on('enter', function(){

				var tl = new TimelineLite();

				$this.find('span > span').each(function(index, element) {
					tl.to(element, 0.6, {y:0, opacity:1, delay:0.1, ease:Power2.easeOut}, index * 0.03)
				});

			});

			scene.on('leave', function(event){
				$this.removeClass('active');
			});

			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})

		$('.item-appear').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();

			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);

			scene.triggerHook(1)

			scene.on('enter', function(){
				$this.addClass('active');
			});

			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})


	}// End First Load


/*--------------------------------------------------
Function Lazy Load
---------------------------------------------------*/

	function LazyLoad() {

		if ($("body").hasClass("smooth-scroll")) {
			var elem = document.querySelector("#content-scroll");
			var scrollbar = Scrollbar.init(elem,
			{
				renderByPixels: true,
				damping:0.05
			});
		}

		$('body').waitForImages({
			finished: function() {
				$('body').removeClass('loading')
				setTimeout( function(){
					$('body').removeClass('hidden').removeClass('scale-up').removeClass('scale-none');
				} , 1500 );
			},
			waitForAll: true
		});

		$('body').waitForImages({
			finished: function() {
				TweenMax.to($("#header-container"), 1, {force3D:true, opacity:1, ease:Power2.easeOut});
			},
			waitForAll: true
		});

		TweenMax.to($("#main"), 0.2, {force3D:true, opacity:1, delay:0.1, ease:Power2.easeOut});

		var navtitleheight = $(".hero-title").height()
		var navsubtitleheight = $(".hero-subtitle").height()

		if( $('#hero').hasClass("has-image")) {
			if( $('body').hasClass("load-project-thumb")) {
				TweenMax.to($("#hero-bg-image"), 0, {force3D:true, scale:1.05 , opacity:1, delay:0, ease:Power2.easeOut});
				TweenMax.to($(".hero-title"), 0.4, {force3D:true, y:-navtitleheight, opacity:1, delay:0.5, ease:Power2.easeOut});
				TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y:navsubtitleheight, opacity:1, delay:0.6, ease:Power2.easeOut});
			} else {
				TweenMax.to($("#hero-bg-image"), 0, {force3D:true, scale:1.05 , opacity:1, delay:0, ease:Power2.easeOut});
				TweenMax.to($(".hero-title"), 0, {force3D:true, y:-navtitleheight, opacity:1, delay:0, ease:Power2.easeOut});
				TweenMax.to($(".hero-subtitle"), 0, {force3D:true, y:navsubtitleheight, opacity:1, delay:0, ease:Power2.easeOut});
			}
			TweenMax.to($(".scroll-down-wrap"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.85, ease:Power2.easeOut});
			TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:0.95, ease:Power2.easeOut});
		} else {
			TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: -navsubtitleheight, opacity:1, delay:0.1, ease:Power2.easeOut});
			TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y: navtitleheight, opacity:1, delay:0.15, ease:Power2.easeOut});
			TweenMax.to($(".post-article-wrap"), 0.4, {force3D:true, y: 0, opacity:1, ease:Power2.easeOut});
			TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:0.15, ease:Power2.easeOut});
		}

		if ($('#hero-bg-image').hasClass("light-content")) {
			$('#hero-caption').addClass('light-content');
			setTimeout(function(){
				$('#magic-cursor').addClass('light-content');
			} , 700 );
			setTimeout(function(){
				$('#header-container').addClass('light-content');
			} , 600 );
		}

		// Fading In Small Carousel elements on Finised
		var tlCarousel = new TimelineLite();
		tlCarousel.set($("#showcase-carousel .swiper-slide"), {x: 300, opacity:0});
		$("#showcase-carousel .swiper-slide").each(function(index, element) {
			tlCarousel.to(element, 1.4, {x:0, opacity:1, delay:0.7, ease:Power3.easeOut}, index * 0.1)
		});
		// Fading In Large Carousel elements on Finised
		var tlCarousel = new TimelineLite();
		tlCarousel.set($("#large-showcase-carousel .swiper-slide"), {x: 300, opacity:0});
		$("#large-showcase-carousel .swiper-slide").each(function(index, element) {
			tlCarousel.to(element, 1.4, {x:0, opacity:1, delay:0.7, ease:Power3.easeOut}, index * 0.1)
		});
		TweenMax.set($(".swiper-scrollbar"), {scaleX: 0,});
		TweenMax.to($(".swiper-scrollbar"), 1.2, {force3D:true, scaleX: 1, delay:0.7, ease:Power2.easeOut});

		TweenMax.to($("#footer-container"), 1, {force3D:true, opacity:1, delay:0.4, ease:Power2.easeOut});

		if( $('.load-project-thumb').length > 0 ){
			setTimeout( function(){
				$('#hero-bg-wrapper').find('video').each(function() {
					$(this).get(0).play();
				});
				$('.thumb-container').remove();
				if( $('#project-nav').length > 0 ){
					TweenMax.to(scrollbar, 1.5, {scrollTo:180, delay:0.6, ease:Power4.easeInOut});
				}
			} , 200 );
		} else {
			$('#hero-bg-wrapper').find('video').each(function() {
				$(this).get(0).play();
			});
			if( $('#project-nav').length > 0 ){
				if ($("body").hasClass("smooth-scroll")) {
					TweenMax.to(scrollbar, 1.5, {scrollTo:180, delay:0.3, ease:Power4.easeInOut});
				} else {
					TweenMax.to(window, 1.5, {scrollTo:180, delay:0.3, ease:Power4.easeInOut});
				}
			}
		}

		setTimeout( function(){
			$('body').removeClass("load-project-thumb").removeClass("load-project-page").removeClass("load-next-project").removeClass("show-loader").removeClass("load-next-page");
		} , 800 );

		setTimeout( function(){
			$('#showcase-holder').removeClass("disabled");
		} , 1900 );


		if ($('body').hasClass('mute')) {
			$(".icon-wrap").addClass("disabled");
			$('.button-text span').text($('.button-text span').data('off'));
			$('.button-text span').attr("data-off", $('.button-text span').data('on'));
			$('.button-text span').attr("data-on", $('.button-text span').text());
		} else {
			$('.button-text span').text($('.button-text span').data('on'));
			$('.button-text span').attr("data-on", $('.button-text span').data('on'));
			$('.button-text span').attr("data-off", $('.button-text span').data('off'));
		}
	}// End Lazy Load

/*--------------------------------------------------
Function Lightbox
---------------------------------------------------*/

	function Lightbox() {

		$('.image-link').magnificPopup({
		  	type: 'image',
			mainClass: 'mfp-with-zoom',
			gallery: {
			  enabled:true
			},
			zoom: {
				enabled: true,
				duration: 300,
				easing: 'ease-in-out',
				opener: function(openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});

		$(".image-link").mouseenter(function(e) {
			TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 1.8});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
		});

		$(".image-link").mouseleave(function(e) {
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1,  x: -15, y: -15});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});

	}//End Lightbox
