/**
 * @author Dmitry Taynov
 */
(function (document, window, $) {
    /**
     * Promo timer plugin 
     *
     * @param {{}} opts
     * @param {string} [opts.formatDelimiter=:] 
     * @param {number}  [opts.endAt=null]
     * @param {string}  [opts.hoursSelector=.hours]
     * @param {string}  [opts.minutesSelector=.minutes]
     * @param {string}  [opts.secondsSelector=.seconds]
     * @param {boolean}  [opts.isString=false]
     * @param {number}  [opts.startThreshold=0]
     */
    $.fn.promoTimer = function (opts) {
        var defaultSettings = {
            formatDelimiter: ":",
            endAt: null,
            hoursSelector: '.hours',
            minutesSelector: '.minutes',
            secondsSelector: '.seconds',
            isString: false,
            startThreshold: 0
        };
        var settings = $.extend(defaultSettings, opts);
        var $this = $(this);
        if (!settings.endAt && $this.attr('data-end-at')) {
            settings.endAt = new Date($this.attr('data-end-at'));
        }
        var $hours = $this.find(settings.hoursSelector);
        var $minutes = $this.find(settings.minutesSelector);
        var $seconds = $this.find(settings.secondsSelector);
        var endAtTs = settings.endAt ? settings.endAt.getTime() : 0;
        var t;

        countDown();

        /**
         * Start hours countdown
         */
        function countDown() {
            var time = timeCount();
            var formated = formatTime(time);

            if (settings.isString) {
                $this.text(toString(time));
            } else {
                $hours.text(formated.h);
                $minutes.text(formated.m);
                $seconds.text(formated.s);
            }
            if (time.diff > 0) {
                t = setTimeout(countDown, 1000);
            }
        }

        /**
         * Count time value
         * 
         * @return {{h: number, m: number, s: number, diff: number}}
         */
        function timeCount() {
            var currentTs = Date.now();
            var diff = Math.floor((endAtTs - currentTs) / 1000);
            var time = {
                h: 0, m: 0, s:0, diff: diff
            };

            if (settings.startThreshold > 0 && diff > settings.startThreshold) {
                diff = settings.startThreshold;
            }

            time.h = Math.floor(diff / 3600);
            diff = diff % 3600;
            time.m = Math.floor(diff / 60);
            time.s = diff % 60;

            if (time.h < 0) time.h = 0;
            if (time.m < 0) time.m = 0;
            if (time.s < 0) time.s = 0;


            return time;
        }

        /**
         * Format digit to '00' string
         * 
         * @param {number} dd
         * @return {string}
         */
        function format(dd) {
            var ssStr = dd + '';

            if (ssStr.length < 2) {
                ssStr = '0' + ssStr;
            }

            return ssStr;
        }

        /**
         * Format each `time` object property to '00' string
         * 
         * @param time
         * @return {{h: string, m: string, s: string}}
         */
        function formatTime(time) {
            return {
                h: format(time.h),
                m: format(time.m),
                s: format(time.s)
            }
        }

        /**
         * Convert `time` object to string
         * 
         * @param {{h: number, m: number, s: number, diff: number}} time
         * @return {string} in '00:00:00' format
         */
        function toString(time) {
            var timeFormated = formatTime(time);
            return [timeFormated.h, timeFormated.m, timeFormated.s].join(':');
        }
    };
})(document, window, jQuery);