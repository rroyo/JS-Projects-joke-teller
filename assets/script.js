const audioElement = document.getElementById("audio");
const button = document.getElementById("button");
const jokeContainer = document.getElementById("joke-container");
const jokeText = document.getElementById("joke-text-container");
const loader = document.getElementById("loader-wrapper");
let interval = null;

const jokesAPI =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

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

function _writeTextSlowly(joke, duration) {
    const pause = duration * 1000 / joke.length;
    jokeText.innerHTML = '';

    if (typeof interval) clearInterval(interval);

    let i = 0; // The index of the current character

    // Use setInterval() to run the writeText() function repeatedly
    interval = setInterval(() => {
        jokeText.innerHTML += joke.substring(i, i + 1);
        i++;
        if (i > joke.length) clearInterval(interval);        
    }, pause);
}

function _disableButton() {
    button.disabled = true;
}

function _enableButton() {
    button.disabled = false;
}

function _showLoading() {
    loader.hidden = false;
}

function _hideLoading() {
    loader.hidden = true;
}

function _clearJoke() {
    clearInterval(interval);
    audioElement.src = '';
    jokeText.innerText = "";
}

async function tellJoke() {
    try {        
        _clearJoke();
        _showLoading();
        _disableButton();
        const joke = await _getJoke();
        _playJoke(joke);
        audioElement.addEventListener("canplaythrough", function () {
            _writeTextSlowly(joke, audioElement.duration);
            _enableButton();
            _hideLoading();
        });
    } catch (error) {
        console.error(`Function ${arguments.callee.name} error: ${error}`);
    }
}

button.addEventListener("click", tellJoke);