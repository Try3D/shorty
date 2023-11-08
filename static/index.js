async function shortenURL() {
    var originalURL = document.getElementById('original_url').value;
    var customShortURL = document.getElementById('custom_short_url').value;

    try {
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

        if (response.ok) {
            const data = await response.json();
            var outputElement = document.getElementById('shortened-url');
            var shortenedURL = window.location.host + '/' + data.short_url;
            var linkElement = document.createElement('a');
            linkElement.href = data.short_url;
            linkElement.textContent = shortenedURL;
            outputElement.innerHTML = '';
            outputElement.appendChild(linkElement);
        } else {
            const errorData = await response.json();
            alert(errorData.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('button');
    button.addEventListener('click', () => {
        shortenURL()
    })
})
