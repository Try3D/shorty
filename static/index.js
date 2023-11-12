async function shortenURL() {
    var originalURL = document.getElementById('original_url').value;
    var customShortURL = document.getElementById('custom_short_url').value;

    const response = await fetch('/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            original_url: originalURL,
            custom_short_url: customShortURL
        })
    });

    const data = await response.json();
    var outputElement = document.getElementById('shortened-url');
    var copybutton = document.getElementById('copybutton');
    var shortenedURL = window.location.host + '/' + data.short_url;
    var linkElement = document.createElement('a');

    outputElement.style.display = "inline";
    copybutton.style.display = "inline";
    linkElement.href = data.short_url;
    linkElement.textContent = shortenedURL;
    outputElement.innerHTML = '';
    outputElement.appendChild(linkElement);

    originalURL.innerHTML = ""
    customShortURL.innerHTML = ""

    copybutton.onclick = event => {
        event.preventDefault()
        navigator.clipboard.writeText(shortenedURL)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('button');
    button.addEventListener('click', () => {
        shortenURL()
    })
})
