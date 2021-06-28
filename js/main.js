jQuery(function($){
	
	/************************* 
	 Variables
	**************************/
	
	var browserwidth;
	var smallwidth = 415;
	
	function getbrowserwidth(){
		browserwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
		return browserwidth;
	}
	
	/************************* 
	 Functions
	**************************/
	
	function carouselPhotos(idcarousel) {
      $(idcarousel).flexslider({
        animation: "slide",
        animationLoop: false,
        slideshow: false,
        directionNav: true,
        controlNav: false,
        itemWidth: 320,
        itemMargin: 0,
        minItems: 1,
        maxItems: 3,
        start: function(){
	        $(".tab-gallery:not(:first-child)").hide();
        }
      });
    }
   
    
    function tabsCarousel(){

	    carouselPhotos('#carousel-1');
		carouselPhotos('#carousel-2');
		carouselPhotos('#carousel-3');
	    
	    $(".tabs ul li:first").addClass("is-active").show();
	    $(".tab-gallery:first").show();
	    
	    $(".title-tab").click(function(e) {	

			$(".tabs > ul > li").removeClass("is-active");
			$(this).addClass("is-active");
			$(".tab-gallery").hide();
	
			var activeTab = $(this).find("a").attr("href");
			$(activeTab).fadeIn();
			return false;
		});
    }
    
    function carouselReviews(idcarousel) {

		if(browserwidth < smallwidth) {
			 $(idcarousel).flexslider({
			    smoothHeight: true,
				animation: "slide",
				animationLoop: false,
				directionNav: false,
				controlNav: true,
				selector: ".slides > .slide-container"
			});
			
		} else {
	      $(idcarousel).flexslider({
	        animation: "slide",
	        animationLoop: false,
	        directionNav: false,
	        controlNav: true,
	        selector: ".slides > .slide-container",
	      });
         
       }
    }
    
    function form() {
	    var form = $('#form'),
	      email = $('#email'),
	      name = $('#name'),
	      phone = $('#phone'),
	      info = $('#info'),
	      message = $('#message'),
	      loader = $('#loader'),
	      subject = $('#subject'),
	      submit = $("#submit");
	      
	      form.on('input', '#email, #subject, #phone, #message', function() {
		    $(this).css('border-color', '');
		    info.html('').slideUp();
		  });
	      
	      submit.on('click', function(e) {
		    e.preventDefault();
		    if(validate()) {
		      $.ajax({
		        type: "POST",
		        url: "mailer.php",
		        data: form.serialize(),
		        dataType: "json"
		      }).done(function(data) {
		        if(data.success) {
		          email.val('');
		          phone.val('');
		          subject.val('');
		          message.val('');
		          info.html('Message sent!').slideDown().siblings().slideUp();
		        } else {
		          loader.html('Could not send mail! Please try again later.').slideDown();
		        }
		      });
		    } else {
			    loader.html('Enter a valid information').slideDown().siblings().slideUp();
		    }
		  });
    }
    
    function validate() {
	    
	     var email = $('#email'),
	      subject = $('#subject'),
	      phone = $('#phone'),
	      message = $('#message');
	      
	    var valid = true;
	    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	    
	    if(!regex.test(email.val())) {
	      email.css('border-color', 'red');
	      valid = false;
	    }
	    if($.trim(subject.val()) === "") {
	      subject.css('border-color', 'red');
	      valid = false;
	    }
	    if($.trim(phone.val()) === "") {
	      phone.css('border-color', 'red');
	      valid = false;
	    }
	    if($.trim(message.val()) === "") {
	      message.css('border-color', 'red');
	      valid = false;
	    }
	    
	    return valid;
	}
	
	/************************* 
	 Execution
	**************************/

	$(document).ready(function(){
		getbrowserwidth();
		carouselReviews('#clients');
		tabsCarousel();
		form();
		ScrollReveal().reveal('.image-brand');	
		ScrollReveal().reveal('.section-about');
		ScrollReveal().reveal('.section-services');
		ScrollReveal().reveal('.section-social');
   	});


});