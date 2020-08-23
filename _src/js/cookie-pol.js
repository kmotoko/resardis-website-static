'use strict';

/* eslint-disable eqeqeq */

// CONSTANTS
const transTime = '1000'; // in ms
const cookiePolName = 'resardis-cookie-consent-v1';

// FUNCTIONS
function createCookie (name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; secure' + '; samesite=strict' + '; path=/';
}

function readCookie (name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// function eraseCookie (name) {
//     createCookie(name, '', -1);
// }

function setAnalytics () {
    if (readCookie(cookiePolName) == 'true') {
        /* eslint-disable */

        // Google Analytics
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga(
            'create',
            'UA-134849487-1',
            'auto',
            {
                "siteSpeedSampleRate": 20,
                "sampleRate": 100,
                "cookieExpires": 31104000,
                "cookieFlags": "Secure",
                "alwaysSendReferrer": true
            }
        );
        ga('send', 'pageview');
        ga('set', 'anonymizeIp', true);

        /* eslint-enable */
    } else {
        document.getElementById('cookie-notice').style.display = 'block';
    }
}

function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ACTION
setAnalytics();

document.getElementById('cookie-notice-accept').addEventListener('click', async function () {
    createCookie(cookiePolName, 'true', 365);
    setAnalytics();

    document.getElementById('cookie-notice').style.opacity = '0';
    document.getElementById('cookie-notice').style.transition = 'opacity ' + transTime + 'ms';
    await sleep(parseInt(transTime) + 25);
    document.getElementById('cookie-notice').style.display = 'none';
});
