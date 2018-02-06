$.fn.RangeSlider = function(cfg) {
    this.sliderCfg = {
        min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null,
        max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
        step: cfg && Number(cfg.step) ? cfg.step : 1,
        callback: cfg && cfg.callback ? cfg.callback : null
    };

    var $input = $('input[type=range]');
    var min = this.sliderCfg.min;
    var max = this.sliderCfg.max;
    var step = this.sliderCfg.step;
    var callback = this.sliderCfg.callback;

    $input.attr('min', min)
        .attr('max', max)
        .attr('step', step);

    $input.bind("input", function(e) {
        console.log($input)
        $(this).attr('value', this.value);
        $(this).css('backgroundSize', this.value + '% 100%');
        $(this).next(".jblever").html(Math.round(this.value/(100*0.083)));
        $(this).next().css("left",this.value + '%')
        if(this.value>1){
            $(this).next().css("left",this.value-3 + '%')
        }
        if ($.isFunction(callback)) {
            callback(this);
        }
        var changeValue;
        if(this.value>94){
           changeValue=93;
           $(this).next().css("left",changeValue + '%');
           return;
        }
        
    });
};