jQuery(function() {

    initOpenClose();

    //datapicker
    $.fn.datepicker.language['ru'] =  {
        days: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
        daysShort: ['Вос','Пон','Вто','Сре','Чет','Пят','Суб'],
        daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthsShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
        today: 'Сегодня',
        clear: 'Очистить',
        dateFormat: 'dd.mm.yyyy',
        timeFormat: 'hh:ii',
        firstDay: 1
    };
var disabledDays = [0, 6];	
    $('.datepicker_box').datepicker({
        language: 'ru',
        inline: true,
		 minDate: new Date(),

    onRenderCell: function (date, cellType) {
        if (cellType == 'day') {
            var day = date.getDay(),
                isDisabled = disabledDays.indexOf(day) != -1;

            return {
                disabled: isDisabled
            }
        }
    }

    })


    //carousels

    $('.intro')
        .slick({
            infinite: true,
            slidesToShow: 1,
            dots: true,
            arrows: false,
            slidesToScroll: 1,
            autoplay: true,
            fade: true,
            autoplaySpeed: 3000
        });

    $('.slick_support_measures')
        .slick({
            infinite: false,
            slidesToShow: 2,
            dots: false,
            arrows: false,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 9999,
                settings: "unslick"
            },
                {
                    breakpoint: 571,
                    settings: {
                        slidesToShow: 1,
                        dots: true
                    }
                }]
        });

    $('.slick_news')
        .on('init reInit', function (event, slick, currentSlide, nextSlide) {
            if(slick.$dots===null)
            {
                $('.title_news_box').addClass('active');
            }
        })
        .slick({
            infinite: false,
            slidesToShow: 4,
            dots: true,
            arrows: true,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 1320,
                settings: {
                    slidesToShow: 3
                }
            },{
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2
                }
            },{
                breakpoint: 571,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }]
        });

    $('.slick_calendar')
        .slick({
            infinite: false,
            slidesToShow: 4,
            dots: true,
            arrows: true,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 1320,
                settings: {
                    slidesToShow: 3
                }
            },{
                breakpoint: 801,
                settings: {
                    slidesToShow: 2
                }
            },{
                breakpoint: 571,
                settings: {
                    slidesToShow: 1,
                    arrows: false
                }
            }]
        });

    $('.slick_partners')
        .slick({
            infinite: false,
            slidesToShow: 4,
            dots: false,
            arrows: false,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            responsive: [{
                breakpoint: 9999,
                settings: "unslick"
            },
            {
                breakpoint: 581,
                settings: {
                    rows: 1,
                    slidesToShow: 1,
                    dots: true
                }
            }]
        });


    //scrool down
    $('.scroll_down').on('click', function(e){
        e.preventDefault();
        $('body, html').animate({
           scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
    });


    $('button[name="button_question"]').on('click', function(){
       $('.contact_holder').toggleClass('active');
    });



    //map
    ymaps.ready(init);

    function init(){

        var myMap;

        myMap = new ymaps.Map("map", {
            center: [55.043314, 58.976429],
            zoom: 17,
            controls: []
        });
        myMap.behaviors.disable('scrollZoom');

        var myPlacemark = new ymaps.Placemark([55.043314, 58.976429] , {},
            { iconLayout: 'default#image',
                iconImageHref: '/local/templates/main/images/marker.svg',
                iconImageSize: [88, 100],
                iconImageOffset: [-44, -100] });

        myMap.geoObjects.add(myPlacemark);
    };

});

// open-close init
function initOpenClose() {
    // jQuery('.add-nav li').openClose({
        // activeClass: 'active',
        // opener: '> a',
        // slider: '> ul',
        // animSpeed: 400,
        // effect: 'slide'
    // });
	    jQuery('.add-nav > ul > li').openClose({
        // activeClass: 'active',
        opener: '.root-item',
        slider: 'ul',//сворачивание списка
        animSpeed: 400,
        effect: 'slide'
    });
    jQuery('#nav').openClose({
        activeClass: 'active',
        opener: '.opener',
        slider: '.navigation',
        animSpeed: 400,
        effect: 'fade',
        hideOnClickOutside: true
    });
    jQuery('.nav_holder > ul > li').openClose({
        activeClass: 'active_down',
        opener: '.open_drop',
        slider: '> .drop',
        animSpeed: 400,
        effect: 'none',
        hideOnClickOutside: true
    });
}


/*
 * jQuery Open/Close plugin
 */
;(function($) {
    function OpenClose(options) {
        this.options = $.extend({
            addClassBeforeAnimation: true,
            hideOnClickOutside: true,
            activeClass:'active',
            opener:'.opener',
            slider:'.slide',
            animSpeed: 400,
            effect:'fade',
            event:'click'
        }, options);
        this.init();
    }
    OpenClose.prototype = {
        init: function() {
            if(this.options.holder) {
                this.findElements();
                this.attachEvents();
                this.makeCallback('onInit');
            }
        },
        findElements: function() {
            this.holder = $(this.options.holder);
            this.opener = this.holder.find(this.options.opener);
            this.slider = this.holder.find(this.options.slider);
        },
        attachEvents: function() {
            // add handler
            var self = this;
            this.eventHandler = function(e) {
                e.preventDefault();
                if (self.slider.hasClass(slideHiddenClass)) {
                    self.showSlide();
                } else {
                    self.hideSlide();
                }
            };
            self.opener.bind(self.options.event, this.eventHandler);

            // hover mode handler
            if(self.options.event === 'over') {
                self.opener.bind('mouseenter', function() {
                    self.showSlide();
                });
                self.holder.bind('mouseleave', function() {
                    self.hideSlide();
                });
            }

            // outside click handler
            self.outsideClickHandler = function(e) {
                if(self.options.hideOnClickOutside) {
                    var target = $(e.target);
                    if (!target.is(self.holder) && !target.closest(self.holder).length) {
                        self.hideSlide();
                    }
                }
            };

            // set initial styles
            if (this.holder.hasClass(this.options.activeClass)) {
                $(document).bind('click touchstart', self.outsideClickHandler);
            } else {
                this.slider.addClass(slideHiddenClass);
            }
        },
        showSlide: function() {
            var self = this;
            if (self.options.addClassBeforeAnimation) {
                self.holder.addClass(self.options.activeClass);
            }
            self.slider.removeClass(slideHiddenClass);
            $(document).bind('click touchstart', self.outsideClickHandler);

            self.makeCallback('animStart', true);
            toggleEffects[self.options.effect].show({
                box: self.slider,
                speed: self.options.animSpeed,
                complete: function() {
                    if (!self.options.addClassBeforeAnimation) {
                        self.holder.addClass(self.options.activeClass);
                    }
                    self.makeCallback('animEnd', true);
                }
            });
        },
        hideSlide: function() {
            var self = this;
            if (self.options.addClassBeforeAnimation) {
                self.holder.removeClass(self.options.activeClass);
            }
            $(document).unbind('click touchstart', self.outsideClickHandler);

            self.makeCallback('animStart', false);
            toggleEffects[self.options.effect].hide({
                box: self.slider,
                speed: self.options.animSpeed,
                complete: function() {
                    if (!self.options.addClassBeforeAnimation) {
                        self.holder.removeClass(self.options.activeClass);
                    }
                    self.slider.addClass(slideHiddenClass);
                    self.makeCallback('animEnd', false);
                }
            });
        },
        destroy: function() {
            this.slider.removeClass(slideHiddenClass).css({display:''});
            this.opener.unbind(this.options.event, this.eventHandler);
            this.holder.removeClass(this.options.activeClass).removeData('OpenClose');
            $(document).unbind('click touchstart', this.outsideClickHandler);
        },
        makeCallback: function(name) {
            if(typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        }
    };

    // add stylesheet for slide on DOMReady
    var slideHiddenClass = 'js-slide-hidden';
    $(function() {
        var tabStyleSheet = $('<style type="text/css">')[0];
        var tabStyleRule = '.' + slideHiddenClass;
        tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
        if (tabStyleSheet.styleSheet) {
            tabStyleSheet.styleSheet.cssText = tabStyleRule;
        } else {
            tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
        }
        $('head').append(tabStyleSheet);
    });

    // animation effects
    var toggleEffects = {
        slide: {
            show: function(o) {
                o.box.stop(true).hide().slideDown(o.speed, o.complete);
            },
            hide: function(o) {
                o.box.stop(true).slideUp(o.speed, o.complete);
            }
        },
        fade: {
            show: function(o) {
                o.box.stop(true).hide().fadeIn(o.speed, o.complete);
            },
            hide: function(o) {
                o.box.stop(true).fadeOut(o.speed, o.complete);
            }
        },
        none: {
            show: function(o) {
                o.box.hide().show(0, o.complete);
            },
            hide: function(o) {
                o.box.hide(0, o.complete);
            }
        }
    };

    // jQuery plugin interface
    $.fn.openClose = function(opt) {
        return this.each(function() {
            jQuery(this).data('OpenClose', new OpenClose($.extend(opt, {holder: this})));
        });
    };
}(jQuery));