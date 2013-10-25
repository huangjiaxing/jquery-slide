(function ($) {
    var settings;

    $.fn.slidePic = function (callerSettings) {
        settings = $.extend({
            width: 600,
            height: 300,
            controllerBottom: true,
            controllerLeft: true,
            autoSlideTime: 5000
        }, callerSettings || {});

        //初始化
        var picsLength = this.find(".slide-viewport > li").length;
        picsLength = parseInt(picsLength);
        this.css({
            width: settings.width,
            height: settings.height
        });

        if (settings.controllerBottom) {
            createControllerBottom.call(this, picsLength);
        }
        if (settings.controllerLeft) {
            createControllerLeft.call(this);
        }

        var controllerBottomHandler = $(".controller-bottom").find("li");
        var controllerSideHandler = $(".controller-side-left,.controller-side-right");
        var controllerSideLeftHandler = $(".controller-side-left");
        var controllerSideRightHandler = $(".controller-side-right");
        var slidePicHandler = this.find("li");
        var preIndex = 0;
        var timer = null;
        controllerBottomHandler.mouseover(function() {
            var index = $(this).index();
            showNext(index);
        });
        
        this.mouseover(function() {
            clearTimeout(timer);
            controllerSideLeftHandler.stop().animate({marginLeft:0},"normal");
            controllerSideRightHandler.stop().animate({marginRight:0},"normal");
        }).mouseleave(function() {
            timer = setTimeout(function() {
                var index = controllerBottomHandler.filter(".current").index();
                index = (index + 1) % picsLength;
                showNext(index);
                timer = setTimeout(arguments.callee,settings.autoSlideTime);
            }, settings.autoSlideTime);
            controllerSideLeftHandler.stop().animate({marginLeft:"-20px"},"normal");
            controllerSideRightHandler.stop().animate({marginRight:"-20px"},"normal");
        }).mouseleave();
        
        controllerSideHandler.click(function(){
            var index = controllerBottomHandler.filter(".current").index();
            if($(this).hasClass("controller-side-left")){
                index = (index - 1) % picsLength;
                if(index < 0){
                    index = picsLength + index;
                }
            }
            if($(this).hasClass("controller-side-right")){
                index = (index + 1) % picsLength;
            }
            showNext(index);
        });
        
        function showNext(index) {
            controllerBottomHandler.removeClass("current").eq(index).addClass("current");
            slidePicHandler.css("zIndex", "").eq(preIndex).css("zIndex", 1).end().eq(index).css({
                "zIndex": 2,
                "opacity": 0
            }).stop().animate({
                "opacity": 1
            }, "normal");
            preIndex = index;
        }
        
        return this;
    }

    var createControllerBottom = function (picsLength) {
        var controllerWidth = picsLength * 19; //19为底部控制器圆点的宽度outerWidth
        var controllerBottomHtml = "";
        for (var i = 0; i < picsLength; i++) {
            controllerBottomHtml += "<li></li>"
        }
        controllerBottomHtml = "<ul class='controller-bottom'>" + controllerBottomHtml + "</ul>";
        this.append(controllerBottomHtml);
        this.find(".controller-bottom").css({
            width: controllerWidth,
            marginLeft: -(controllerWidth / 2)
        }).find("li:first").addClass("current")
    };

    var createControllerLeft = function () {
        var controllerLeftHtml = '<span class="controller-side-left"></span><span class="controller-side-right"></span>';
        this.append(controllerLeftHtml);
        
    };
})(jQuery);