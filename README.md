# jquery-promo-timer

How many hours left before the event.

Hours countdown in `HH:MM:SS` format.

## Settings

- `formatDelimiter` (string) default value is `:` this is for `string mode` timer elements delimiter
- `endAt` (number) timestamp to end promo date, default `null`, you can set this settings via `data-end-at` attribute, <div class="timer" data-end-at-ts="2015-"></div>
- `hoursSelector` (string) css selector for hours block
- `minutesSelector` (string) css selector for minutes block
- `secondsSelector` (string) css selector for seconds block
- `isString` (boolean) set mode `string mode` or `span mode` if `false`
- `startThreshold` (number) this is threshold of the starting countdown, if we have 30 hour to the end event and `threshold` set to 20 then countdown staring when event start in 20 hours

## Hot to use

in html:
            
            <!-- For span mode -->
            <div class="timer">
                <span class="hours"></span>
                <span class="minutes"></span>
                <span class="seconds"></span>
            </div>
            
            <!-- For string mode -->
            <div class="timer" data-end-at="2015-12-31 23:59:59"></div>
            
in js:

            $('.timer').promoTimer({
                endAt: Date.now() + 100000,
                startThreshold: 24 * 3600 // start when left less then 24 hours
            });
            
            