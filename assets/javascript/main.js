// MENU

var body = $('body'),
burger = $('#burger'),
animatedEL = $('.anim'),
shadowUp = $('#shadow-up'),
shadowDown = $('#shadow-down'),
menu = $('.site-nav'),
menuList = $('.site-nav__list'),
menuItemLink = $('.site-nav__link, #site-nav__close-trigger'),
openTrigger = $('#site-nav__open-trigger'),
closeTrigger = $('#site-nav__close-trigger');

function openMenu() {
    openTrigger.attr("aria-expanded","true");
    menuList.css('transition','transform 350ms ease-out');
    shadowUp.css('display','none');
    shadowDown.css('display','block');
    animatedEL.css('transform','translate(10px, 10px)');
    menuItemLink.attr('tabindex', '0');
    body.addClass('nav-opened');
    setTimeout(
        function() {
            body.addClass('overflow');
            closeTrigger.addClass('down');
        }, 300);
}

function closeMenu() {
    openTrigger.attr("aria-expanded","false");
    closeTrigger.removeClass('down');
    menuList.css('transition','transform 350ms ease-out');
    menuItemLink.attr('tabindex', '-1');
    body.removeClass('nav-opened overflow');
    setTimeout(
        function() {
            menuList.css('transition','none');
        }, 350);
}
    

$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 120) {
        menu.addClass('sticky');
        topLink.addClass('visible');
    } else {
        menu.removeClass('sticky');
        topLink.removeClass('visible');
    }
});

openTrigger.on('mousedown touchstart', openMenu);
closeTrigger.on('mousedown touchstart', closeMenu);

openTrigger.keyup(function(event) {
    if (event.keyCode === 13) {
        openMenu();
    }
});

closeTrigger.keyup(function(event) {
    if (event.keyCode === 13) {
        closeMenu();
    }
});

$(document).on('keyup', function(event) {
    if (body.hasClass('nav-opened')) {
        if (event.keyCode === 27) {
            closeMenu();
        }
    }
});


// HOMEPAGE VIDEO CONTROLS

var homeVideo = $('#homepage-intro__video'),
homeVideoContainer = $('.homepage-intro__video-container'),
statusIndicator = $('.homepage-intro__video__status-indicator'),
videoStatus = true;

homeVideoContainer.on('click', checkVideoStatus);

function checkVideoStatus() {
    if (videoStatus) {
        pauseVideo();
    } else {
        playVideo();
    }
}

function pauseVideo() {
    homeVideo.get(0).pause();
    statusIndicator.addClass('visible');
    videoStatus = false;
}

function playVideo() {
    homeVideo.get(0).play();
    statusIndicator.removeClass('visible');
    videoStatus = true;
}


// SLIDERS

$( document ).ready(function() {

    // HOME SLIDER

    var homeSlickSettings = {
        autoplay:true,
        autoplaySpeed:1500,
        prevArrow:'<button type="button" class="slick-prev"> <svg viewBox="0 0 10 22.6" width="10px" height="22.6px"> <polygon class="tm-icon-slider--color" points="6.1,22.6 0,11.3 6.1,0 10,2.1 5,11.3 10,20.6 "/> </svg></button>',
        nextArrow:'<button type="button" class="slick-next"> <svg viewBox="0 0 10 22.6" width="10px" height="22.6px"> <polygon class="tm-icon-slider--color" points="3.9,0 10,11.3 3.9,22.6 0,20.6 5,11.3 0,2.1 "/> </svg></button>',
        mobileFirst:true,
        responsive: [
        {
            breakpoint: 1756,
            settings: 'unslick'
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 440,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1
            }
        }
        ]
    };
    
    $('.homepage-items__list--small').slick(homeSlickSettings);

    // BIBLIO SLIDER

    var biblioSlickSettings = {
        autoplay:true,
        autoplaySpeed:1500,
        prevArrow:'<button type="button" class="slick-prev"> <svg viewBox="0 0 10 22.6" width="10px" height="22.6px"> <polygon class="tm-icon-slider--color" points="6.1,22.6 0,11.3 6.1,0 10,2.1 5,11.3 10,20.6 "/> </svg></button>',
        nextArrow:'<button type="button" class="slick-next"> <svg viewBox="0 0 10 22.6" width="10px" height="22.6px"> <polygon class="tm-icon-slider--color" points="3.9,0 10,11.3 3.9,22.6 0,20.6 5,11.3 0,2.1 "/> </svg></button>',
        mobileFirst:true,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
        ]
    };

    $('.pdf-txt.books').slick(biblioSlickSettings);

    // COMMON SLIDER
    
    var resizeTimer;
    
    $(window).on('resize', function(e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        $('.homepage-items__list--small').slick(homeSlickSettings);
        $('.pdf-txt.books').slick(biblioSlickSettings);  
    }, 250);
    });
});


// NO EVENTS IN AGENDA

$( document ).ready(function() {
    var postsList = $('.agenda .post-list'),
    postsListItems = $('.agenda .post-list li'),
    postsListItemsLength = postsListItems.length,
    msg = '<div class="zero-event-container">';
    msg += '<div class="zero-event__emoticon">¯\\_(ツ)_/¯</div>';
    msg += '<p class="zero-event__text">Aucun événement n’est programmé pour l’instant…</p>';
    msg += '<p class="zero-event__text">Mais le parcours <em>Plus jamais ça&nbsp;!</em> vous ouvre toujours ses portes&nbsp;!</p>';
    msg += '<p class="zero-event__button"><a class="button button--blue" href="/plusjamaisca/">Plus jamais ça&nbsp;!</a></p>';
    msg += '</div>';

    if (postsListItemsLength == 0) {
        postsList.html(msg);
        $('.view-all-agenda').css('display','none');
    }
});


// AUTOMATIC FIRST PARAGRAPH FOR POST
$('body.post .post__content >:first-child').addClass('chapeau');


// FIX "NTH-CHILD" CSS SELECTOR FOR IE

$(document).ready(function() {
    $(".container--half:nth-child(even)").addClass("even");
    $(".container--half:nth-child(odd)").addClass("odd");
});

// FIX MD IN EXCERPTS

function cleanTextFromMd(textObj) {
    var cleanedText = textObj.text().replace(/_/g, '');
    cleanedText = cleanedText.replace(/\*\*/g, '');
    textObj.text(cleanedText);
}

$('.post__excerpt, .archive-am-num__excerpt, .page-am-num__excerpt').each(function() {
    cleanTextFromMd( $(this) );
});


// AIDE MEMOIRE

$(document).ready(function() {
    var footnotesList = $('.am-article ol').last(),
    footnotesItems = footnotesList.find('li'),
    footnoteHookTop = '<svg class="footnote-hook footnote-hook__top" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><polygon fill="#0075A7" points="5.6,44 19.3,44 19.3,19.6 44.4,19.6 44.4,6 5.6,6 "/></svg>',
    footnoteHookBottom = '<div class="footnote-hook__bottom-container clearfix"><svg class="footnote-hook footnote-hook__bottom" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><polygon fill="#0075A7" points="44.4,6 30.7,6 30.7,30.4 5.6,30.4 5.6,44 44.4,44 "/></svg></div>';

    footnotesList.addClass('footnotes');

    function deleteUnwantedFromExcerpt() {
        $('.am-post-item__excerpt').find('img').parent().remove();
        $('.am-post-item__excerpt').each(function() {
            cleanTextFromMd( $(this) );
        });
    }

    function findAndShowAnchors() {
        var i = 1,
        anchors = $(".am-article .post__content a[href^='#footnote-']");
        anchors.each(function() {
            $(this).addClass('internal footnote-link').attr('id', 'note-'+i);
            i++;
        })
        showAnchors(anchors);
    }

    function addLinksToFootnotes() {
        var i = 1;
        footnotesItems.each(function() {
            $(this).prepend('<a href="#note-'+i+'" class="internal note-link" id="footnote-'+i+'" title="Retour dans le texte"><svg id="top-link__svg" viewBox="0 0 40 40"><style>.blue-color{fill:#003b62}</style><path fill="#fff" d="M0 0h40v40H0z"/><path class="blue-color" d="M11 36H4V4h7V0H0v40h11zM29 4h7v32h-7v4h11V0H29z"/><path id="top-link__arrow" class="blue-color" d="M20 18.1l7.6 7.7h3.9L20 14.2 8.5 25.8h3.9z"/></svg></a> ');
            i++;
        })
    }

    function addVisualHooks() {
        footnotesList.before(footnoteHookTop);
        footnotesList.after(footnoteHookBottom);
    }

    function showAnchors(target) {
        
        target.mouseenter(function() {
            console.log("test footnotes mouseenter");
            var anchorVisibilityTimer = setTimeout(closeOpenedAnchors, 1500);
            closeOpenedAnchors();
            clearTimeout(anchorVisibilityTimer);
            var footnoteId = $(this).attr('href');
            var footnoteIdLength = footnoteId.length;
            var footnoteIdCleaned = footnoteId.substring(1, footnoteIdLength);
            var footnoteContent = $('#'+footnoteIdCleaned).parent();
            var footnoteContentTmp = footnoteContent.clone();
            footnoteContentTmp.find('a').eq(0).remove();
            $(this).after('<div class="footnoteContent" style="display:none">'+footnoteHookTop+'<div class="footnoteContentInner">'+footnoteContentTmp.html()+'</div>'+footnoteHookBottom);
            $('.footnoteContent').slideDown(150);
            $('.footnote-link').click(closeOpenedAnchors);
            clearTimeout(anchorVisibilityTimer);
        });
    }

    function closeOpenedAnchors() {
        $('.footnoteContent').slideUp(150, function() {
            $(this).remove();
        });
    }
    
    deleteUnwantedFromExcerpt()
    findAndShowAnchors();
    addLinksToFootnotes();
    addVisualHooks();
});


// SCROLL LINKS

var root = $('html, body'),
topLink = $('#top-link');

function customScrollLink(e) {
    e.preventDefault();
    var url = $.attr(this, "href");
    var urlLength = url.length;
    var id = url.substr(url.indexOf('#'), urlLength); 
    id = $( id );
    var offsetTop = id.offset().top;
    if ($('body').hasClass("am-post")) {
        offsetTop -= 120;
    }
    root.animate({ scrollTop: offsetTop},500); 
}

function topScrollLink() {
    root.animate({ scrollTop: 0},500); 
}

$(document).ready(function() {
    $('a.internal').on('click', customScrollLink);
    $('#top-link').on('click', topScrollLink);
});
