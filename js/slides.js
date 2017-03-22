Reveal.addEventListener('epoch', function(event) {
    if(!this.epochInitialized) {
        var updateTime = function(){
            document.getElementById("timeElapsed").innerHTML = Date.now();
        };
        updateTime();
        window.setInterval(
            updateTime,
            111
        );
    }
    this.epochInitialized = true;
});

Reveal.addEventListener('timezone', function(event) {
    if(!this.timezoneInitialized) {
        var getUTCOffset = function(timezone) {
            var offset = moment().tz(timezone).utcOffset();
            var offsetPrefix = offset < 0 ? '-': '+';
            offset = Math.abs(offset);
            var hours = _.padStart(Math.floor(offset/60), 2, '0');
            var minutes = _.padStart(offset % 60, 2, '0');
            return offsetPrefix + hours + ':' + minutes;
        };
        var getTime = function(timezone) {
            return moment().tz(timezone).format('DD/MM/YYYY HH:mm:ss');
        };
        document.getElementById("newYorkTZ").innerText = getUTCOffset('America/New_York');
        document.getElementById("londonTZ").innerText = getUTCOffset('Europe/London');
        document.getElementById("parisTZ").innerText = getUTCOffset('Europe/Paris');
        document.getElementById("indiaTZ").innerText = getUTCOffset('Asia/Kolkata');
        var updateTime = function(){
            document.getElementById("newYorkTime").innerText = getTime('America/New_York');
            document.getElementById("londonTime").innerText = getTime('Europe/London');
            document.getElementById("parisTime").innerText = getTime('Europe/Paris');
            document.getElementById("indiaTime").innerText = getTime('Asia/Kolkata');
        };
        updateTime();
        window.setInterval(
            updateTime,
            1000
        );
    }
    this.timezoneInitialized = true;
});
