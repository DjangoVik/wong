(function ($) {
  $(document).ready(function() {
    //menu
    $('.burger_btn').on('click', function () {
      $(this).toggleClass('open');
      $('.menu_wrapper').toggleClass('open');
      $('body, html').toggleClass('fixed');
    });

    //anchor to next section
    if($('.next_section').length > 0){
      $('.next_section').each(function(){
        var anchor = $(this).parents('section').next().attr('id');
        $(this).attr('href', '#'+anchor+'');
      });
    }

    $('a').on('click', function (e) {
      var link = $(this).attr('href');
      var symbol = link.substr(0, 1);
      //var headerHeight = $('header').outerHeight();
      if (symbol == '#') {
        e.preventDefault();
        var top = $(link).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);			
      }
    });

    //tabs
    $('.tab_switcher').on('click', function(){
      var index = $(this).index();
      $('.tab_switcher').removeClass('active');
      $(this).addClass('active');
      $('.tab_item').hide();
      $('.tab_item').eq(index).fadeIn();
      if(index == 1){
        initSlider('.video_slider .swiper-container');
        setPosition();
      }
      if(index == 2){
        $(this).parents('section').addClass('change_bg');
        AOS.init({disable: 'mobile'});
      }else{
        $(this).parents('section').removeClass('change_bg');
      }
    })

    //init functions
    setReviewsMargin();
    setTransform();
    AOS.init({disable: 'mobile'});    
  });

  $(window).on('resize', function(){
    setReviewsMargin();
    setTransform();
    setPosition();
  });

  //FUNCTIONS
  //init sliders
  function initSlider(selector) {
    var swiper = new Swiper(selector, {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

   //set transform for intro image on about page
   function setTransform(){
    var windowWidth = $(window).width();
    if(windowWidth > 1440){
      var transform = (windowWidth - 1440)/2;
      $('.transform_photo').css('transform', 'translateX('+ transform +'px)')
    }
  }

   //set margin-top for second element on review item
   function setReviewsMargin(){
    if($('.reviews_item').length > 0){
      $('.reviews_item').each(function(index){
        var image = $(this).find('.image');
        var content = $(this).find('.content');
        var imageHeight = image.height();
        var contentHeight = content.outerHeight();
        image.css('margin-top', '-'+ imageHeight/2 +'px')
        content.css('margin-top', '-'+ contentHeight/2 +'px')
      });
      $('.reviews_item:nth-of-type(2n+1)').find('.image').attr('style','');
      $('.reviews_item:nth-of-type(2n)').find('.content').attr('style','');
    }
  }

  //set position for swiper pagination
  function setPosition(){
    var videoSlider = $('.video_slider');
    if(videoSlider){
      var slideHeight = videoSlider.find('.video_box').height();
      if($(window).width() > 576){
        var corrector = '2rem'
      }else{
        var corrector = '1rem'
      }
      videoSlider.find('.swiper-pagination').css('top', 'calc('+ slideHeight +'px - '+ corrector +'');
      var btns = videoSlider.find('.swiper-btn');
      var btnHeight = btns.height()/2;
      var btnsPos = slideHeight / 2 - btnHeight / 2;
      console.log(btnsPos);
      btns.css('top', ''+ btnsPos +'px');
    }
  }

})(jQuery);


