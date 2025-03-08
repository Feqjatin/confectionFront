document.getElementById('username').addEventListener('input', async () => {
    const username = document.getElementById('username').value;
    const messageElement = document.getElementById('usernameMessage');

    if (username.length > 0) {
        const response = await fetch('/check-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });
        const data = await response.json();

        if (data.available) {
            messageElement.innerHTML = `<span class="text-success">Username is available!</span>`;
        } else {
            messageElement.innerHTML = `<span class="text-danger">Username is already taken.</span>`;
        }
    } else {
        messageElement.innerHTML = '';
    }
});