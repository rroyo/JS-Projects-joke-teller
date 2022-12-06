"use strict";

const audioElement = document.getElementById("audio");
const button = document.getElementById("button");
const jokeContainer = document.getElementById("joke-container");
const jokeText = document.getElementById("joke-text-container");
const loader = document.getElementById("loader");

const jokesAPI =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

// VoiceRSS Javascript SDK
//prettier-ignore
const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"v="+(e.v||"")+"&key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};

async function _getJoke() {
    try {        
        const jokesResponse = await fetch(jokesAPI);
        const jokesJson = await jokesResponse.json();        
        return jokesJson.joke;
    } catch (error) {
        console.error(`Function ${arguments.callee.name} error: ${error}`);
    }
}

async function _playJoke(joke) {
    try {
        // Text to Speech parameters
        VoiceRSS.speech({
            key: "63611a9300cb42bba5f76b55b7fe5f89", // I know, I know... practice purposes only!
            src: joke,
            v: "mike",
            hl: "en-us",
            r: 0,
            c: "mp3",
            f: "44khz_16bit_stereo",
            ssml: false,
        });
    } catch (error) {
        console.error(`Function ${arguments.callee.name} error: ${error}`);
    }
}

function _fillTextContainer(joke) {
    jokeText.innerHTML = joke;
}

function _disableButton() {
    button.disabled = true;
}

function _showLoading() {
    loader.hidden = false;
}

function _hideLoading() {    
    loader.hidden = true;
}

function _clearTextJoke() {
    jokeText.innerText = "";
}

async function tellMeAJoke() {
    try {
        _clearTextJoke();
        _showLoading();        
        const joke = await _getJoke();
        _playJoke(joke);
        _fillTextContainer(joke);
        //audioElement.duration
        _hideLoading();
        //TODO Algo semblant a audioElement.onload = _hideLoading;
    } catch (error) {
        console.error(`Function ${arguments.callee.name} error: ${error}`);
    }
}

button.addEventListener("click", tellMeAJoke);

