var sceneScale = 1;
var mobileWidthUnder = false;
var wasOnEnd = false;
//***************
//*PARALAX MOVE

var firstRun = true;
var anim_buble2animated = false;
var anim_buble2text = false;
var anim_preload2 = false;
var anim_slide1 = false;
var anim_direction = "down";
var mobilMenuColor = "default";
var homepage = false;
var hOldRed = 52;
var hOldWhite = 52;
if ($('body').hasClass('homepage')) {
    homepage = true;
}


var ParallaxScroll = {
    /* PUBLIC VARIABLES */
    round: 1000,

    /* PUBLIC FUNCTIONS */
    init: function () {
        //this._log("init");
        if (this._inited) {
            this._inited = true;
            return;
        }
        this._requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (/* function */ callback, /* DOMElement */ element) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
        this._onScroll(true);
    },

    /* PRIVATE VARIABLES */
    _inited: false,
    _requestAnimationFrame: null,

    /* PRIVATE FUNCTIONS */
    _onScroll: function (noSmooth) {

        ////$('#test').html( $('.wrapper__scrollContent').scrollTop() )

        //If is Desktop version on
        if (mobileWidthUnder === false) {
            if (homepage) {
                homepage_keyframe_animations();
            }
            if ($('body').hasClass('text-paralax')) {
                initParalaxOnMove();
            }


            scr_scrollbar_.update();


        } else {
            //If is Mobile version on
            $('.wrapper__pages, .page-item').each(function () {
                $(this).removeAttr('style');
            });
            killParalaxOnMove();

            /*
            if ($('body').hasClass('text-paralax')) {
                initParalaxOnMove();
            }
            */

            //menu-posun
            if (( $(window).scrollTop() > 5 )) {
                if (!$('body').hasClass('notTop')) {
                    $('body').addClass('notTop');
                }
            } else {
                if ($('body').hasClass('notTop')) {
                    $('body').removeClass('notTop');
                }
            }

            if (homepage) {


                /*
                 * red menu show
                 */

                var mobMenu = $('.main-menu__nav-top');
                var whiteMenu = $('#whiteMenu');
                var hWhite = 52 - ( $(window).scrollTop() - $('#menuColorChangerWhite').offset().top  );

                if (hWhite < 0) {
                    hWhite = 0;
                } else if (hWhite > 52) {
                    hWhite = 52;
                }
                if (hOldWhite !== hWhite) {
                    whiteMenu.css({'height': hWhite + 'px'});
                    hOldWhite = hWhite;
                }

                /*
                 * White menu show.end
                 */


                /*
                 * red menu show
                 */

                var whiteMenu2 = $('#whiteMenu2');
                var hRed = 52 - ( $(window).scrollTop() - $('#menuColorChanger').offset().top + 52  );

                if (hRed < 0) {
                    hRed = 0;
                } else if (hRed > 52) {
                    hRed = 52;
                }
                if (hOldRed !== hRed) {
                    whiteMenu2.css({'height': hRed + 'px'});
                    hOldRed = hRed;
                }

                /*
                 * red menu show.end
                 */


            }
        }

        if (window.requestAnimationFrame) {
            window.requestAnimationFrame($.proxy(this._onScroll, this, false));
        }
        else {
            this._requestAnimationFrame($.proxy(this._onScroll, this, false));
        }

    }
};
function getAktualPosition(frame_aktual, frame_start, frame_end, num_start, num_end) {
    var frameLength = Math.abs(frame_end - frame_start);
    var positionPercent = (frame_aktual - frame_start) / frameLength;
    var animationLength = Math.abs(num_start - num_end);
    var animationAktNow = Math.abs(animationLength * positionPercent);
    var animationAkt = 0;
    if (num_start < num_end) {
        animationAkt = num_start + animationAktNow;
    } else {
        animationAkt = num_start - animationAktNow;
    }
    return animationAkt;
}

function homepage_keyframe_animations() {

    var scroll = progressTop;
    var sirka = $(window).width();
    var vyska = $(window).height();


    //window.scrollTo(0, 0-scroll)

    // var aktScrollSmoot = scrollAkt*-1;

    //BUBLE1 ANIMATION
    //-------------------------------------------------------------------------------------------
    (function () {
        var speed = 0.8;
        var posX = 0;
        var posY = 0;
        var element = $('#buble1');
        var rot = 0;
        var miniposunY = 30
        var opa = 0;

        if (firstRun) {
            speed = 0;
        }

        if (scroll >= 2) {
            scr_buble1.returnRotation();
            rot = 0;
            opa = 1;
        }
        if (scroll < 2) {
            posX = sirka / 2 - 5;
            posY = vyska / 2 + 5 + miniposunY;
            rot = 0;
            opa = 1;
        } else if ((scroll >= 2) && (scroll < 90)) {
            posX = getAktualPosition(scroll, 2, 90, sirka / 2 - 5, sirka / 2 - 160);
            posY = getAktualPosition(scroll, 2, 90, vyska / 2 + 5 + miniposunY, vyska / 2 - 65 + miniposunY);
            rot = 0;
            opa = 1;
        } else if ((scroll >= 90) && (scroll < 205)) {
            posX = sirka / 2 - 160;
            posY = vyska / 2 - 65 + miniposunY;
            rot = 0;
            opa = 1;
        } else if ((scroll >= 205) && (scroll < 270)) {
            posX = sirka / 2 - 160;
            posY = vyska / 2 - 65 + miniposunY;
            rot = getAktualPosition(scroll, 205, 270, 0, -90);
            opa = getAktualPosition(scroll, 205, 270, 1, 0);
        } else {
            posX = sirka / 2 - 160;
            posY = vyska / 2 - 65 + miniposunY;
            rot = -90;
            opa = 0;
        }
        //TweenMax.killTweensOf(element);
        TweenMax.to(element, speed, {
            x: posX,
            y: posY,
            rotationZ: rot,
            opacity: opa,
            transformOrigin: "-1000px 0"
        });


    })();


    //BUBLE2 ANIMATION
    //-------------------------------------------------------------------------------------------

    (function () {
        var speed = 1.1;
        var posX = 0;
        var posY = 0;
        var scaleDef = 0;
        var element = $('#buble2');

        var rot = 0;
        var opa = 0;


        var miniposunY = 80;

        if (firstRun) {
            speed = 0;
            scaleDef = 0;
            //TweenMax.killTweensOf($('#buble2_sub'));
            TweenMax.to($('#buble2_sub'), speed, {
                scale: scaleDef,
                transformOrigin: "50% 50%",
                ease: Power4.easeOut
            });
        }


        if (scroll >= 60) {
            if (anim_buble2animated == false) {
                scaleDef = 1;
                anim_buble2animated = true;
                //TweenMax.killTweensOf($('#buble2_sub'));
                TweenMax.fromTo($('#buble2_sub'), 1.5,
                    {
                        scale: 0.4,
                    },
                    {
                        scale: scaleDef,
                        transformOrigin: "50% 50%",
                        opacity: 1,
                        ease: Elastic.easeOut
                    });
            }

        } else {
            if (anim_buble2animated == true) {
                scaleDef = 0;
                anim_buble2animated = false;
                //TweenMax.killTweensOf($('#buble2_sub'));
                TweenMax.to($('#buble2_sub'), 0.3, {
                    scale: scaleDef,
                    transformOrigin: "50% 50%",
                    opacity: 0,
                    ease: Power4.easeIn
                });
            }
        }

        posX = sirka / 2 + 160;
        posY = vyska / 2 - 65 + miniposunY;

        if (scroll < 230) {
            rot = 0;
            opa = 1;
        } else if ((scroll >= 230) && (scroll < 285)) {
            rot = getAktualPosition(scroll, 230, 285, 0, 90);
            opa = getAktualPosition(scroll, 230, 285, 1, 0);
        } else {
            rot = 90;
            opa = 0;
        }
        //TweenMax.killTweensOf(element);
        TweenMax.to(element, speed, {
            x: posX,
            y: posY,
            rotationZ: rot,
            opacity: opa,
            transformOrigin: "1000px 0"
        });
        /*

         //TweenMax.killTweensOf(element);
         TweenMax.to(element, speed, {
         x: posX,
         y: posY,
         ease: Power4.easeOut
         });
         */

    })();

    (function () {
        var speed = 0.8;
        var opacityDef = 1;
        var element = $('#buble2 .buble__text,#buble1 .buble__text');

        var miniposunY = 80;

        if (firstRun) {
            speed = 0;
            TweenMax.to(element, speed, {
                opacity: opacityDef
            });
        }

        //preloader
        if (scroll >= 190) {
            if (anim_preload2 == true) {
                anim_preload2 = false;
                //TweenMax.killTweensOf(element);
                //TweenMax.killTweensOf($('.buble__preloader'));
                TweenMax.to($('.buble__preloader'), 0.5, {
                    opacity: 0,
                    ease: Power4.easeIn
                });
            }
        } else if (scroll >= 140) {
            if (anim_preload2 == false) {
                anim_preload2 = true;
                //TweenMax.killTweensOf($('.buble__preloader'));
                TweenMax.to($('.buble__preloader'), 0.5, {
                    opacity: 1,
                    ease: Power4.easeIn
                });
            }

        } else if (scroll < 140) {
            if (anim_preload2 == true) {
                anim_preload2 = false;
                //TweenMax.killTweensOf(element);
                //TweenMax.killTweensOf($('.buble__preloader'));
                TweenMax.to($('.buble__preloader'), 0.5, {
                    opacity: 0,
                    ease: Power4.easeIn
                });
            }
        }

        //text opacity
        if (scroll >= 120) {
            if (anim_buble2text == false) {
                anim_buble2text = true;
                //TweenMax.killTweensOf(element);
                TweenMax.to(element, 0.5, {
                    opacity: 0,
                    ease: Power4.easeIn
                });
            }

        } else if (scroll < 120) {
            if (anim_buble2text == true) {
                anim_buble2text = false;
                //TweenMax.killTweensOf(element);
                TweenMax.to(element, 0.5, {
                    opacity: 1,
                    ease: Power4.easeIn
                });
            }
        }

        //app loaded
        if (scroll >= 199) {
            if (anim_slide1 == false) {
                anim_slide1 = true;
                //TweenMax.killTweensOf(element);
                TweenMax.to($('.mobile_slide.slide1'), 0.1, {
                    opacity: 1,
                    ease: Power4.easeIn
                });
            }
        } else if (scroll < 199) {
            if (anim_slide1 == true) {
                anim_slide1 = false;
                //TweenMax.killTweensOf(element);
                TweenMax.to($('.mobile_slide.slide1'), 0.1, {
                    opacity: 0,
                    ease: Power4.easeIn
                });
            }
        }
    })();


    //Mobile ANIMATION
    //-------------------------------------------------------------------------------------------
    (function () {
        var posY = 0;
        var opacity_def = 0;
        var element = $('#mobile');
        var element2 = $('.mobile_slide.slide1');
        var speed = 0.8;
        if (firstRun) {
            speed = 0;
        }


        if (scroll < 120) {
            posY = vyska * (1 / sceneScale);
        } else if ((scroll >= 120) && (scroll < 199)) {
            posY = getAktualPosition(scroll, 120, 199, vyska * (1 / sceneScale), 0);
        } else {
            posY = 0;
        }


        ////TweenMax.killTweensOf(element);
        TweenMax.to(element, speed, {
            y: posY,
            ease: Power4.easeOut
        });


    })();


    //custom bubles
    varSlideBubles = 2;
    $('.bubles_cd').each(function () {

        /* var myIndex = $(this).attr('data-slide');
         var slideImg = $($(this).attr('data-mobile-slide'));*/

        var myIndex = varSlideBubles;
        //var slideImg = $('slide'+varSlideBubles);
        var slideImg = $(this).find('.mobile_slide');
        varSlideBubles = varSlideBubles + 1;

        //Image SLide

        slideImg.each(function () {
            var speed = 0.8;
            var element = $(this);
            var opa = 0;
            if (firstRun) {
                speed = 0;
            }
            var startFrame1 = (myIndex * 100) + 60;
            var endFrame1 = (myIndex * 100) + 95;
            var startFrame2 = (myIndex * 100) + 110;
            var endFrame2 = (myIndex * 100) + 140;


            if (scroll < startFrame1) {

                opa = 0;
            } else if ((scroll >= startFrame1) && (scroll < endFrame1)) {

                opa = getAktualPosition(scroll, startFrame1, endFrame1, 0, 1);
            } else if ((scroll >= endFrame1) && (scroll < startFrame2)) {
                opa = 1;
            } else if ((scroll >= startFrame2) && (scroll < endFrame2)) {

                opa = getAktualPosition(scroll, startFrame2, endFrame2, 1, 0);
            } else {

                opa = 0;
            }

            //2

            //TweenMax.killTweensOf(element);
            TweenMax.to(element, speed, {
                opacity: opa
            });
        });


        $(this).find('.bubleLeft').each(function () {
            var speed = 0.8;
            var posX = 0;
            var posY = 0;
            var element = $(this);
            var rot = 0;
            var miniposunY = 30;
            var opa = 0;
            var tr = "-1000px 0";

            if (firstRun) {
                speed = 0;
            }


            var startFrame1 = (myIndex * 100) + 20;
            var endFrame1 = (myIndex * 100) + 70;
            var startFrame2 = startFrame1 + 100;
            var endFrame2 = endFrame1 + 100;

            //////console.log(startFrame1 + " - "+endFrame1)

            posX = sirka / 2 - 160;
            posY = vyska / 2 - 65 + miniposunY;

            if (scroll < startFrame1) {
                rot = 90;
                opa = 0;
            } else if ((scroll >= startFrame1) && (scroll < endFrame1)) {
                rot = getAktualPosition(scroll, startFrame1, endFrame1, 90, 0);
                opa = getAktualPosition(scroll, startFrame1, endFrame1, 0, 1);
            } else if ((scroll >= endFrame1) && (scroll < startFrame2)) {
                rot = 0;
                opa = 1;
            } else if ((scroll >= startFrame2) && (scroll < endFrame2)) {
                rot = getAktualPosition(scroll, startFrame2, endFrame2, 0, -90);
                opa = getAktualPosition(scroll, startFrame2, endFrame2, 1, 0);
            } else {
                rot = -90;
                opa = 0;
            }

            //2

            //TweenMax.killTweensOf(element);
            TweenMax.to(element, speed, {
                x: posX,
                y: posY,
                rotationZ: rot,
                opacity: opa,
                transformOrigin: tr
            });
        })

        $(this).find('.bubleRight').each(function () {
            var speed = 1.1;
            var posX = 0;
            var posY = 0;
            var element = $(this);
            var rot = 0;
            var miniposunY = 80
            var opa = 0;
            var tr = "1000px 0";

            if (firstRun) {
                speed = 0;
            }


            var startFrame1 = (myIndex * 100) + 20 + 20;
            var endFrame1 = (myIndex * 100) + 70 + 20;
            var startFrame2 = startFrame1 + 100 + 20;
            var endFrame2 = endFrame1 + 100 + 20;

            //////console.log(startFrame1 + " - "+endFrame1)

            posX = sirka / 2 + 160;
            posY = vyska / 2 - 65 + miniposunY;

            if (scroll < startFrame1) {
                rot = -90;
                opa = 0;
            } else if ((scroll >= startFrame1) && (scroll < endFrame1)) {
                rot = getAktualPosition(scroll, startFrame1, endFrame1, -90, 0);
                opa = getAktualPosition(scroll, startFrame1, endFrame1, 0, 1);
            } else if ((scroll >= endFrame1) && (scroll < startFrame2)) {
                rot = 0;
                opa = 1;
            } else if ((scroll >= startFrame2) && (scroll < endFrame2)) {
                rot = getAktualPosition(scroll, startFrame2, endFrame2, 0, 90);
                opa = getAktualPosition(scroll, startFrame2, endFrame2, 1, 0);
            } else {
                rot = 90;
                opa = 0;
            }

            //2

            //TweenMax.killTweensOf(element);
            TweenMax.to(element, speed, {
                x: posX,
                y: posY,
                rotationZ: rot,
                opacity: opa,
                transformOrigin: tr
            });
        })

    });

    firstRun = false

}

//*********************************************************************************************
//*****  Main preloader
//*********************************************************************************************

var scr_preloader = (function () {
    return {
        hide: function () {
            //
            setTimeout(function () {
                $('html').addClass('page-loaded');
                setTimeout(function () {
                    $('html').addClass('page-loaded-done');
                }, 300);
            }, 300);
        },
        init: function () {
            $('html').addClass('page-ready');
        }
    };
})();

//*********************************************************************************************
//*****  worksheet resizer
//*********************************************************************************************

var scr_worksheetresizer = (function () {

    var container;

    function resizeMe() {
        var k1 = $(window).width() / 1024;
        var newScale = ($(window).height() - 100) / 660;
        if (k1 < newScale) {
            newScale = k1;
        }
        if (newScale > 1) {
            newScale = 1
        }
        sceneScale = newScale;
        $('.wrapper__static').css({'transform': 'scale(' + newScale + ')'});

    }

    return {
        create: function () {
            if ($('.wrapper__static').length > 0) {
                container = $('.wrapper__static');
                $(window).resize(function () {
                    resizeMe();
                });
                resizeMe();
            }

        }
    };
})();

//*********************************************************************************************
//*****  Page scrollbar
//*********************************************************************************************
var progressTop = 0;
var scrollAkt;
var homebuttonTrigerTimeout;


var scr_scrollbar_ = (function () {
    var doc;
    var wrapper_height;
    var box_height;
    var boxCount;
    var mainContainer;
    var isScroll;
    var isScrollY;
    var lastScroll;
    var progressAll;
    var scrollSpeed;
    var directionScroll = 'none';

    var onBottom;
    var scrollPosition;
    var zmensenie = 1;

    //var scrollContainer = $('.wrapper__scrollContent');
    var scrollContainer = $('.wrapper__scrollContent');

    var mainContainer = $('.wrapper__pages');

    function resizeScroll() {
        boxCount = $('.page-item').length;

        zmensenie = 1;
        var padingTB = 0;


        //no blocks
        if ($('.free-scroll').length > 0) {
            box_height = $(window).height();
            padingTB = 0
            wrapper_height = $('.wrapper__pages').height();
            //console.log("wrapper_height = "+wrapper_height);
        } else if ($('.scr-paralax-container').length > 0) {
            zmensenie = 0.7;

            if (!mobileWidthUnder) {
                box_height = $(window).height() * zmensenie;
                padingTB = ($(window).height() - box_height) / 2;
                wrapper_height = box_height * boxCount + padingTB * 2;
                mainContainer.css({
                    'height': wrapper_height + 'px',
                    'padding-top': +padingTB + 'px',
                    'padding-bottom': +padingTB + 'px'
                });
                $('.page-item').css({'height': box_height + 'px'});
            } else {
                $('.page-item,.scr-paralax-item').removeAttr('style');
            }

        } else {
            if (!mobileWidthUnder) {
                //HP:
                boxCount = $('.bubles_cd').length + 3;
                box_height = $(window).height() * zmensenie;
                padingTB = 0;
                wrapper_height = box_height * boxCount;
                mainContainer.css({
                    'height': wrapper_height + 'px',
                    'padding-top': +padingTB + 'px',
                    'padding-bottom': +padingTB + 'px'
                });
            } else {
                $('.page-item,.scr-paralax-item').removeAttr('style');
            }
        }


    }

    function chcekEnd() {
        if ((progressAll > 0.98) && (onBottom == false)) {
            wasOnEnd = true;
            onBottom = true;
            $('#button_nextPage').css({'display': 'block'});
            TweenMax.fromTo($('#button_nextPage'), 0.5, {opacity: 0}, {
                opacity: 1
            });

            if ($('.noBottomArrow').length <= 0) {
                TweenMax.to($('#button__next'), 0.5, {
                    opacity: 0,
                    onComplete: function () {
                        $('#button__next').css({'display': 'none'});
                    }
                });
            }



        }
        if ((progressAll < 0.98) && (onBottom == true)) {
            onBottom = false;

            TweenMax.to($('#button_nextPage'), 0.5, {
                opacity: 0,
                onComplete: function () {
                    $('#button_nextPage').css({'display': 'none'});
                }
            });

            if ($('.noBottomArrow').length <= 0) {
                $('#button__next').css({'display': 'block'});
                TweenMax.fromTo($('#button__next'), 0.5, {opacity: 0}, {
                    opacity: 1
                });
            }
        }
    }

    function moveWithBar(posY) {
        if (isScroll) {

            var lastScrollPos = scrollContainer.scrollTop();

            var new_progressAll = (posY - 80) / ( $(window).height() - 80 ) * 100;

            if (new_progressAll < 0) {
                new_progressAll = 0;
            } else if (new_progressAll > 100) {
                new_progressAll = 100;
            }

            new_progressAll = new_progressAll / 100;

            isScrollY = posY;

            var newCalcY = new_progressAll * (wrapper_height - $(window).height());
            //console.log(posY +" --> "+ newCalcY + "wrapper_height = " + wrapper_height);
            scrollContainer.scrollTop(newCalcY);

            if (lastScrollPos < newCalcY) {
                directionScroll = 'down'
            } else {
                directionScroll = 'up'
            }


            /*
             TweenMax.killTweensOf($('.bar'));
             TweenMax.to($('.bar'), 0.3, {
             height: progressAll * 100 + "%",
             ease: Power4.easeOut
             });
             new ScrollToProgress(progressAll);
             */
        }
    }

    return {
        init: function () {
            onBottom = false;
            isScroll = false;
            mainContainer = $('.wrapper__pages');
            scrollAkt = 0;
            progressAll = 0;
            //box_height = $(window).height();
            //scrollPosition = $(window).scrollTop();
            scrollPosition = scrollContainer.scrollTop();

            resizeScroll();

            $('#button__next').mouseover(function (e) {
                //$(this).removeClass('pulsing');
            });

            $(document).mousemove(function (e) {
                $('.wrapper__scrollContent').focus();
            });

            $(document)
                .mousewheel(function (event, delta) {

                    if (!mobileWidthUnder) {

                        clearTimeout(homebuttonTrigerTimeout);
                        scrollPosition = scrollContainer.scrollTop();
                        //console.log(delta);
                        // var sNew = scrollPosition + (delta* -  box_height/6 ) ;
                        var sNew = scrollPosition + (delta * (-50 * zmensenie) );
                        if (sNew < 0) {
                            sNew = 0
                        }
                        if (sNew > wrapper_height - $(window).height()) {
                            sNew = wrapper_height - $(window).height();

                        }
                        var curScroll = {
                            x: 0,
                            //y: $(window).scrollTop()
                            y: scrollContainer.scrollTop()
                        };
                        TweenMax.killTweensOf(curScroll);
                        TweenMax.to(curScroll, 0.5, {
                            y: sNew,
                            onUpdate: function () {
                                //window.scrollTo(0, curScroll.y)
                                scrollContainer.scrollTop(curScroll.y)
                            },
                            ease: Power4.easeOut
                        });


                        /*-----------------------------------
                         Homepage - Magnet
                         -------------------------------------*/
                        ////$('#test2').text( 'delta - '+ delta);

                        if (delta < 0) {
                            directionScroll = 'down'
                        } else {
                            directionScroll = 'up'
                        }
                        // magnet for homepage items
                        if (homepage) {
                            //
                            //console.log(progressTop);
                            //fromSlide2

                            var curScrollDir


                            console.log(progressTop);
                            var mySlide ;
                            var progresPrc ;


                            if ((progressTop > 100)&&(progressTop < 200)) {

                                mySlide = Math.floor(progressTop / 100);
                                progresPrc = ( progressTop - (mySlide * 100) );

                                if ((progresPrc > 30) && (progresPrc < 99) &&(directionScroll === "down")) {
                                    var curScrollDir = {
                                        x: 0,
                                        //y: $(window).scrollTop()
                                        y: scrollContainer.scrollTop()
                                    };
                                    TweenMax.to(curScrollDir, 0.6, {
                                        y: (mySlide+1)*box_height,
                                        onUpdate: function () {
                                            //window.scrollTo(0, curScroll.y)
                                            scrollContainer.scrollTop(curScrollDir.y)
                                        },
                                        onComplete: function(){
                                            //slideTo next
                                            setTimeout(function () {
                                                var curScrollDir2 = {
                                                    x: 0,
                                                    //y: $(window).scrollTop()
                                                    y: scrollContainer.scrollTop()
                                                };
                                                TweenMax.to(curScrollDir2, 0.6, {
                                                    y: (3)*box_height,
                                                    onUpdate: function () {
                                                        //window.scrollTo(0, curScroll.y)
                                                        scrollContainer.scrollTop(curScrollDir2.y)
                                                    },
                                                    ease: Power4.easeOut
                                                });


                                            }, 750);
                                        },
                                        ease: Power4.easeOut
                                    });

                                }
                                if ((progresPrc >1) && (progresPrc < 98) && (directionScroll === "up")) {
                                    var curScrollDir = {
                                        x: 0,
                                        //y: $(window).scrollTop()
                                        y: scrollContainer.scrollTop()
                                    };
                                    TweenMax.to(curScrollDir, 0.6, {
                                        y: (mySlide)*box_height,
                                        onUpdate: function () {
                                            //window.scrollTo(0, curScroll.y)
                                            scrollContainer.scrollTop(curScrollDir.y)
                                        },
                                        ease: Power4.easeOut
                                    });

                                }

                            }else if (progressTop > 200) {

                                mySlide = Math.floor(progressTop / 100);
                                progresPrc = ( progressTop - (mySlide * 100) );

                                //console.log("Slide = " + mySlide + " | progres in slide = " + progresPrc);


                                ////$('#test').text( 'progress - '+ progresPrc+' / mySlide = '+mySlide);

                                if ((progresPrc > 40) && (progresPrc < 99) &&(directionScroll === "down")) {
                                    var curScrollDir = {
                                        x: 0,
                                        //y: $(window).scrollTop()
                                        y: scrollContainer.scrollTop()
                                    };
                                    TweenMax.to(curScrollDir, 0.6, {
                                        y: (mySlide+1)*box_height,
                                        onUpdate: function () {
                                            //window.scrollTo(0, curScroll.y)
                                            scrollContainer.scrollTop(curScrollDir.y)
                                        },
                                        ease: Power4.easeOut
                                    });

                                }
                                if ((progresPrc >1) && (progresPrc < 80) && (directionScroll === "up")) {
                                    if(mySlide==2){
                                        mySlide = 1;
                                    }
                                    var curScrollDir = {
                                        x: 0,
                                        //y: $(window).scrollTop()
                                        y: scrollContainer.scrollTop()
                                    };
                                    TweenMax.to(curScrollDir, 0.6, {
                                        y: (mySlide)*box_height,
                                        onUpdate: function () {
                                            //window.scrollTo(0, curScroll.y)
                                            scrollContainer.scrollTop(curScrollDir.y)
                                        },
                                        ease: Power4.easeOut
                                    });

                                }
                            }
                        }
                        /*-----------------------------------
                         Homepage - Magnet .end
                         -------------------------------------*/

                        return false;
                    }

                });


            //BUTTON MOVE NEXT
            $('#button__next').bind('click', function () {
                clearTimeout(homebuttonTrigerTimeout);
                var aktSlideNow = Math.round(scrollPosition / box_height) + 1;

                var sNew = aktSlideNow * box_height;
                if (sNew < 0) {
                    sNew = 0
                }
                if (sNew > wrapper_height - $(window).height()) {
                    sNew = wrapper_height - $(window).height();

                }

                var curScroll = {
                    x: 0,
                    //y: $(window).scrollTop()
                    y: scrollContainer.scrollTop()
                };
                TweenMax.to(curScroll, 0.6, {
                    y: sNew,
                    onUpdate: function () {
                        //window.scrollTo(0, curScroll.y)
                        scrollContainer.scrollTop(curScroll.y)
                    },
                    ease: Power4.easeOut
                });

                //if next slide on homepage
                if ((aktSlideNow == 2) && ($('body').hasClass('homepage'))) {
                    homebuttonTrigerTimeout = setTimeout(function () {
                        $('#button__next').trigger('click');
                    }, 750);
                }

                return false;
            });

            //scrolling s custom scrollerom

            $('.barTouch').mousedown(function (e) {
                isScroll = true;
                moveWithBar(e.pageY - $(window).scrollTop());
                e.preventDefault();
            });

            $(document).mousemove(function (e) {
                moveWithBar(e.pageY - $(window).scrollTop());
            });

            $(document).mouseup(function (e) {
                isScroll = false;
            });


            $(window).resize(function () {
                resizeScroll();
            });
        },
        update: function () {

            //////console.log("--> " +scrollContainer.scrollTop());

            //scrollPosition = $(window).scrollTop();

            scrollPosition = scrollContainer.scrollTop();

            //vypocita progress top kazdy slide ma 100, takze ak je 5 slidov na konci je 500;
            progressAll = scrollPosition / (wrapper_height - $(window).height() ); //percentualne
            progressTop = progressAll * (boxCount - 1) * 100;

            //update scrollBaru na percenta

            TweenMax.killTweensOf($('.bar'));
            TweenMax.to($('.bar'), 0.3, {
                height: progressAll * 100 + "%",
                ease: Power4.easeOut
            });


            chcekEnd();

        }
    };
})();


//*********************************************************************************************
//*****  animation of buble1 !not scrollbased
//*********************************************************************************************

var scr_buble1 = (function () {
    var me
    var text1;
    var text2;
    var intervalSpeed = 0;
    var word = 0;
    var myInterval1;
    var myInterval2 = 400;

    function startWriting(elementID, textArray, onCompleteFunction) {
        var line = 0;
        var letter = 0;
        var aktualText = " ";

        //console.log(intervalSpeed);

        var fxTiouted = function () {

            // aktualText = aktualText + textArray[line].substr(0,  letter = textArray[line].length);
            //letter = letter + 1;
            //if (letter >= textArray[line].length) {
            letter = 0
            aktualText = '<div class="buble__textanim_' + word + line + '">' + textArray[line] + "</div>"
            //var ElemenToAnim = $(".buble__textanim_"+line);

            elementID.append(aktualText);

            TweenMax.fromTo($(".buble__textanim_" + word + line), 1,
                {
                    x: 0,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    ease: Power2.easeInOut
                });


            line = line + 1;
            word = word + 1;
            if (line >= textArray.length) {
                onCompleteFunction();
                clearTimeout(myInterval1);
            } else {
                intervalSpeed = myInterval2;
                myInterval1 = setTimeout(fxTiouted, intervalSpeed);
            }
            //}
            //$('#buble1_text1').html(aktualText);
            //write text

        }

        myInterval1 = setTimeout(fxTiouted, intervalSpeed);

    }

    function startMouseEffect() {
        var currentMousePos = {x: -1, y: -1};
        $(document).mousemove(function (event) {
            if (progressTop < 10) {
                currentMousePos.x = (event.pageX - $(window).width() / 2) / ($(window).width() / 2);
                currentMousePos.y = (event.pageY - $(window).height() / 2) / ($(window).height() / 2);
                //////////console.log(currentMousePos.x+" , "+currentMousePos.y);
                TweenMax.set(me, {
                    transformPerspective: '1000'
                });
                TweenMax.killTweensOf(me);

                if (currentMousePos.y > 1) {
                    currentMousePos.y = 1;
                } else if (currentMousePos.y < -1) {
                    currentMousePos.y = -1;
                }
                if (currentMousePos.x > 1) {
                    currentMousePos.x = 1;
                } else if (currentMousePos.x < -1) {
                    currentMousePos.x = -1;
                }

                TweenMax.to(me, 1,
                    {
                        rotationX: currentMousePos.y * 30,
                        rotationY: currentMousePos.x * 30,
                        transformOrigin: "0 0",
                        ease: Power4.easeOut
                    });
            }
        });
    }

    return {
        startAnimation: function () {
            me = $('#buble1_sub');


            //clear texts
            text1 = $('#buble1_text1').html().split("<br>");
            text2 = $('#buble1_text2').html().split("<br>");
            $('#buble1_text1').html(' ');
            $('#buble1_text2').html(' ');


            // Buble Buble
            //TweenMax.killTweensOf(me);
            TweenMax.fromTo(me, 2,
                {
                    scale: 0,
                    delay: 0.2,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    transformOrigin: "-50% 50%",
                    ease: Elastic.easeInOut,
                    onComplete: function () {
                        startMouseEffect();
                        //write text1
                        startWriting($('#buble1_text1'), text1, function () {
                            //write text2
                            setTimeout(function () {
                                //change color of text1
                                TweenMax.to($('#buble1_text1'), 0.5, {color: '#cccccc'});
                                startWriting($('#buble1_text2'), text2, function () {

                                    //start pusing scrollbutton
                                    $('#button__next').addClass('pulsing');
                                });

                            }, 1000);


                        });
                    }
                });


            //*** mobile pops **/
            TweenMax.fromTo($('#buble1mob'), 2,
                {
                    scale: 0,
                    delay: 0.2,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    transformOrigin: "0 100%",
                    ease: Elastic.easeInOut,

                });

            TweenMax.fromTo($('#buble2mob'), 2,
                {
                    scale: 0,
                    opacity: 0
                },
                {
                    delay: 1,
                    scale: 1,
                    opacity: 1,
                    transformOrigin: "100% 100%",
                    ease: Elastic.easeInOut

                });


        }, returnRotation: function () {
            //TweenMax.killTweensOf(me);
            TweenMax.to(me, 2,
                {
                    rotationX: 0,
                    rotationY: 0,
                    transformOrigin: "0 0",
                    ease: Circ.easeOut
                });
        }
    };
})();


//*********************************************************************************************
//*****  scr_links_out
//*********************************************************************************************
var scr_links_out = (function () {

    function moveSiteOut(direction, myLink) {

        if (myLink.substr(0, 4) == "http") {
            //window.open(
            //    myLink,
            //    '_blank'
            //);
		window.location.href = myLink;
        } else {

            var animationClips = $('.wrapper__in, .wrapper__pages');
            var animStatic = $('.wrapper__static');
            TweenMax.killAll();


            //if desktop
            if (!mobileWidthUnder) {

                if (direction == "right") {
                    TweenMax.to(animationClips, 0.5, {
                        x: ( $(window).width() ),
                        ease: Power4.easeIn
                    });
                    TweenMax.to(animStatic, 0.5, {
                        x: ( $(window).width() ),
                        ease: Power4.easeIn
                    });
                    TweenMax.to($('.wrapper__page'), 0.2, {
                        delay: 0.5,
                        opacity: 0,
                        onComplete: function () {
                            window.location = myLink;
                        }
                    });
                } else {
                    TweenMax.to(animationClips, 0.5, {
                        x: ( 0 - $(window).width() ),
                        ease: Power4.easeIn
                    });
                    TweenMax.to(animStatic, 0.5, {
                        x: ( 0 - $(window).width() ),
                        ease: Power4.easeIn
                    });

                    TweenMax.to($('.wrapper__page'), 0.2, {
                        delay: 0.5,
                        opacity: 0,
                        onComplete: function () {
                            window.location = myLink;
                        }
                    });

                }
            } else {
                //if mobile
                window.location = myLink;
            }
        }
    }


    return {
        create: function () {
            var sectionId = $('body').attr("data-aktual-section");
            $('.nav-link').bind('click', function () {
                var myId = $(this).attr('data-section-index');
                var myLink = $(this).attr('href');
                if (myId > sectionId) {
                    moveSiteOut("left", myLink);
                } else {
                    moveSiteOut("right", myLink);
                }
                return false;
            });
            $('.button_nextPage').bind('click', function () {
                var myId = sectionId + 1;
                var myLink = $(this).attr('href');
                moveSiteOut("left", myLink);
                return false;
            });


        }
    };
})();


//* paralax
function killParalaxOnMove() {
    $('.scr-paralax-container').each(function () {
        TweenMax.killTweensOf($('.scr-paralax-item'));
    });

}
function initParalaxOnMove() {
    $('.scr-paralax-container').each(function () {

        $container = $(this);
        var windowHeight = $(window).height();
        var meHeight = $(this).height();
        var aktPosition = $(this).offset().top - $(window).scrollTop();
        var position = aktPosition - windowHeight / 2 + meHeight / 2;

        if ((position > 0 - windowHeight) && (position < windowHeight)) {

            if ($container.css('visibility') === 'hidden') {
                $container.css({'visibility': 'visible'});

                $container.find('.scr-paralax-item').each(function () {
                    TweenMax.to($(this), 0, {
                        x: (position / 3) * $(this).attr('data-x'),
                        y: (position / 3) * $(this).attr('data-y'),
                        z: 0
                    });

                });
            } else {
                $container.find('.scr-paralax-item').each(function () {
                    TweenMax.to($(this), 1.8, {
                        x: (position / 3) * $(this).attr('data-x'),
                        y: (position / 3) * $(this).attr('data-y'),
                        z: 0,
                        ease: Power2.easeOut
                    });

                });
            }
        } else if ($container.css('visibility') === 'visible') {
            $container.css({'visibility': 'hidden'});
        }

    });

}

//*********************************************************************************************
//*****  swapToMobile
//*********************************************************************************************

var swapToMobile = (function () {

    var mobileWidthNew = 0;

    function resizeMeMob() {
        if ($(window).width() < mobileWidthNew) {
            if (mobileWidthUnder === false) {
                mobileWidthUnder = true;
                $('body, html').addClass('mobile-width');
            }
        } else {
            if (mobileWidthUnder === true) {
                mobileWidthUnder = false;
                //firstRun = true;
                $('body, html').removeClass('mobile-width');
            }
        }
    }

    return {
        create: function (mobWidth) {
            mobileWidthNew = mobWidth;
            resizeMeMob();
            $(window).resize(function () {
                resizeMeMob();
            });
        }
    };
})();


//*********************************************************************************************
//*****  scr_mobileHomepage resizer
//*********************************************************************************************

var scr_mobileHomepage = (function () {


    function resizeMe() {
        /*
         $('.homepage-mobile_block').each(function(){
         if($(this).hasClass('short')){
         $(this).css({'height': $(window).height()-30+'px'});
         }else{
         $(this).css({'height': $(window).height()+'px'});
         }

         });
         */
    }

    return {
        create: function () {
            /*
             resizeMe();
             $(window).resize(function () {
             resizeMe();
             });
             */

            $('.homepage-mobile_block').each(function () {
                if ($(this).hasClass('short')) {
                    $(this).css({'height': 530 + 'px'});
                } else {
                    $(this).css({'height': 580 + 'px'});
                }
            });
        }
    };
})();

//*********************************************************************************************
//*****  mobile menu
//*********************************************************************************************

var scr_mobileMenu = (function () {
    var hred = 38;
    function toggleMenu() {
        //var nH = Math.ceil($(window).height() - $('.main-menu__nav-top').height()-30);

        var nH = $(window).height() - $('.main-menu__nav-top').height()-hred;

        if (!$('.main-menu__nav-mobile').hasClass('opened')) {
            $('.main-menu__nav-mobile').addClass('opened');
            resizeItems();
            $('body,html').addClass('no-scroll');

            TweenMax.to($('.main-menu__nav-mobile'), 0.3, {
                y: 0,
                ease: Power2.easeOut

            });
            TweenMax.to($('.main-menu__nav-bottom'), 0.3, {
                y: 0,
                ease: Power2.easeOut

            });
            $('.main-menu__nav-mobile .button_open-menu').hide();
        } else {
            $('.main-menu__nav-mobile').removeClass('opened');
            //resizeItems();
            $('body,html').removeClass('no-scroll');

            TweenMax.to($('.main-menu__nav-mobile'), 0.3, {
                y: 0 - nH,
                ease: Power2.easeOut
            });
            TweenMax.to($('.main-menu__nav-bottom'), 0.3, {
                y: 0-$(window).height()-60,
                ease: Power2.easeOut
            });
            $('.main-menu__nav-mobile .button_open-menu').show();
        }
    }

    function resizeItems(){

        /*
        var nH = $(window).height() - $('.main-menu__nav-top').height();
        var countIt = $('.menuItem').length + 1;
        var nHitem = Math.round(nH / countIt);
        if(nHitem > 52){
            nHitem = 52;
        }

        $('.main-menu__opened').css({
            'height': nH + 'px',
            'padding-top': nHitem / 2 + 'px',
            'padding-bottom': nHitem / 2 + 'px'
        });
        $('.menuItem').each(function () {
            $(this).css({'height': nHitem + "px", 'line-height': nHitem + 'px'});
        });
        */

        var nH = $(window).height() - $('.main-menu__nav-top').height()-hred;
        $('.main-menu__opened').css({
            'height': nH + 'px'
        });

    }
    function resizeMeMob() {

        var nH = $(window).height() - $('.main-menu__nav-top').height()-hred;
        /*
        var countIt = $('.menuItem').length + 1;
        var nHitem = Math.round(nH / countIt);
        if(nHitem > 52){
            nHitem = 52;
        }


        $('.main-menu__opened').css({
            'height': nH + 'px',
            'padding-top': nHitem / 2 + 'px',
            'padding-bottom': nHitem / 2 + 'px'
        });
        $('.menuItem').each(function () {
            $(this).css({'height': nHitem + "px", 'line-height': nHitem + 'px'});
        });
        */
        $('.menuItem').each(function () {
            $(this).removeAttr('style');
        });

        //console.log(nH-100 +" <  " + $('.main-menu__opened .navs').height());
        $('.main-menu__opened').removeClass('NOmarginTop');

        if(nH-100 < $('.main-menu__opened .navs').height()){

            var countIt = $('.menuItem').length;
            var nHitem = Math.round(nH / countIt);

            $('.menuItem').each(function () {
                $(this).css({'height': nHitem + "px", 'line-height': nHitem + 'px'});
            });

            if(nHitem<35){
                $('.main-menu__opened').addClass('NOmarginTop');
                //$('.menuItem.shares').css({'height': "35px", 'line-height': '35px'});
                $('.menuItem.shares').css({'height': "35px", 'line-height': '35px'});
            }



        }

        //nH = $(window).height() - $('.main-menu__nav-top').height()-50;


        $('.main-menu__opened').css({
            'height': nH + 'px'
        });

        if ($('.main-menu__nav-mobile').hasClass('opened')) {
            TweenMax.to($('.main-menu__nav-mobile'), 0, {
                y: 0,
                ease: Power2.easeOut

            });

        } else {
            TweenMax.to($('.main-menu__nav-mobile'), 0, {
                y: 0 - nH,
                ease: Power2.easeOut
            });
            TweenMax.to($('.main-menu__nav-bottom'), 0, {
                y: 0-$(window).height()-60,
                ease: Power2.easeOut

            });

        }
        $('.main-menu__nav-bottom').addClass('isVisible');
    }

    return {
        create: function () {
            resizeMeMob();
            var nH = $(window).height() - $('.main-menu__nav-top').height();
            TweenMax.to($('.main-menu__nav-mobile'), 0, {
                y: 0 - nH
            });

            $(window).resize(function () {
                resizeMeMob();
            });

            $('.button_open-menu').bind('touchstart click', function () {
                toggleMenu();
                return false;
            });
            resizeMeMob();
        }, resize: function () {
            resizeMeMob();
        }
    };
})();

//*********************************************************************************************
//*****  ready
//*********************************************************************************************

$(document).ready(function () {
    //show preloader icon;
    scr_preloader.init();
});

//*********************************************************************************************
//*****  loaded
//*********************************************************************************************

$(window).load(function () {

    //mobileVersion swapp by 500px
    swapToMobile.create(750);

    //mobile Menu resizer/cerate
    scr_mobileMenu.create();

    //resize Worksheet
    scr_worksheetresizer.create();

    //resizer mobileHomepage
    scr_mobileHomepage.create();

    //hide preloader icon and show page
    scr_preloader.hide();

    //create a custom scrollbar
    //scr_scrollbar.init();
    scr_scrollbar_.init();

    //start paralax for homepage
    ParallaxScroll.init();

    //animation of buble1 !not scrollbased for homepage
    if (homepage) {
        scr_buble1.startAnimation();
    }

    //nastavenie animacii na odchod sekcie pre linky
    scr_links_out.create();


    if ($('.noBottomArrow').length > 0) {
        $('.button__next').hide();
    }
    //test

    //$('body').append('<div id="test" style="background-color:red;padding:20px;color:#fff;z-index: 2000;position: absolute;left:0;top:0;"></div>');
    //$('body').append('<div id="test2" style="background-color:blue;padding:20px;color:#fff;z-index: 2000;position: absolute;right:0;top:0;"></div>');
    // //$('#test').text( 'width - '+ $(window).width()+' <br> height - '+ $(window).height());

});
