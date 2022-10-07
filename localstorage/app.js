const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
        key: form.key.value,
        value: form.value.value,
    };
    console.log({ formData });
    window.localStorage.setItem(form.key.value, form.value.value);
    form.reset();
    form.key.focus();
    readFromStorage();
});
console.log(localStorage);

function readFromStorage() {
    document.querySelector("output").innerHTML = Object.keys(window.localStorage)
        .map(htmlTemplate)
        .join("");
}

function htmlTemplate(key) {
    const value = window.localStorage.getItem(key);
    return `
        <span>${key}</span>
        <span>${value}</span>
        <span><img src="bin.svg" width="10" onclick="removeItem('${key}')"/></span>
    `
}

function removeItem(key) {
    if (confirm('Are you sure you want to remove?')) {
        window.localStorage.removeItem(key);
        readFromStorage();
    }

}

readFromStorage();