export const loginRequest = async (user) => {
    const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include'
    });

    console.log(response)

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response;
}
