/**
 * home
 */

//banner.slider
jQuery(function() {
    jQuery("#slideshow").cycle({
        fx: 'scrollHorz',
        timeout: 6000,   
    	pager: '#nav'
    });
});

jQuery(document).ready(function() {

    //abas
    jQuery(".tab_content").hide();
    jQuery("ul.tabs li:first").addClass("active").show();
    jQuery(".tab_content:first").show();

    jQuery("ul.tabs li").click(function() {
        jQuery("ul.tabs li").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".tab_content").hide();
        var activeTab = jQuery(this).find("a").attr("href");
        jQuery(activeTab).fadeIn();
        return false;
    });

    
});