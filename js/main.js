jQuery(function($){
	
	/************************* 
	 Functions
	**************************/
	
	function carouselPhotos(idcarousel) {
      $(idcarousel).flexslider({
        animation: "slide",
        animationLoop: false,
        directionNav: true,
        controlNav: false,
        itemWidth: 150,
        itemMargin: 0,
        minItems: 2,
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

			$(".tabs > ul > li").removeClass("is-active"); //Remove any "active" class
			$(this).addClass("is-active"); //Add "active" class to selected tab
			$(".tab-gallery").hide(); //Hide all tab content
	
			var activeTab = $(this).find("a").attr("href");
			$(activeTab).fadeIn(); //Fade in the active ID content
			return false;
		});
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
		tabsCarousel();
		form();
		
   	});


});