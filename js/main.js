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
	
	
	/************************* 
	 Execution
	**************************/

	$(document).ready(function(){
		tabsCarousel();
		
   	});


});