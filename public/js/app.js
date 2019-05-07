const weatherForm = document.querySelector('form');
const searchEl = document.querySelector('input');
const msg1El = document.querySelector('.msg1');
const msg2El = document.querySelector('.msg2');

weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const location = searchEl.value;
    msg1El.textContent = 'Loading...';
    msg2El.textContent = '';
    fetch(`http://localhost:3001/weather?address=${location}`).then(res => {
        res.json().then(data => {
            if (data.error) {
                msg1El.textContent = data.error;
                msg2El.textContent = '';
            } else {
                msg1El.textContent = data.location;
                msg2El.innerText =data.forcast;
            }
        })
    })
});