window.onload = () => {
    document.getElementById('jakupinput').innerHTML = `Output: ${new URLSearchParams(window.location.search).get('name') ?? ''}`
}

