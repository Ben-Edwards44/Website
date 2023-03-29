const initial_welcome = async () => {
    var element = document.getElementById("welcome_text");

    const text = "Hello, World!";
    sleep(2000)
    typing_animation(element, text, 100)
}


function about_pressed() {
    reset_button_data()

    var element = document.getElementById("button_data");
    element.scrollIntoView();

    fetch("/about_text")
    .then(response => response.text())
    .then(response => typing_animation(element, response, 10))
}


function projects_pressed() {
    reset_button_data()

    var element = document.getElementById("button_data");
    element.scrollIntoView();

    fetch("/projects_text")
    .then(response => response.text())
    .then(response => typing_animation(element, response, 10))
}


function contact_pressed() {
    reset_button_data()

    var element1 = document.getElementById("button_data");
    var element2 = document.getElementById("contact_form");
    element2.style.display = "block";
    element2.scrollIntoView();

    fetch("/contact_display")
    .then(response => response.text())
    .then(response => typing_animation(element1, response, 10))
}


function submit_pressed() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    const data = JSON.stringify({"name": name, "email": email, "message": message});
    
    fetch("/contact_text", {
        method: "POST",
        body: data,
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })

    var form = document.getElementById("contact_form")
    form.reset()
}


function reset_button_data() {
    var button_data = document.getElementById("button_data")
    var contact_form = document.getElementById("contact_form")
    
    button_data.innerHTML = ""
    contact_form.style.display = "none"
}


const typing_animation = async (element, text, delay) => {
    let refill = "";
    let current_html = false;
    const cursor_HTML = "_";

    for (character of text) {
        refill += character;

        if (character == "<") {
            current_html = true;
        } else if (character == ">") {
            current_html = false;
        }

        if (!current_html) {
            await sleep(delay)
        }

        element.innerHTML = refill + cursor_HTML;
    }

    if (refill.charAt(refill.length - 1) == cursor_HTML) {
        refill = refill.slice(0, -1);
    }
    
    element.innerHTML = refill;
}


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


initial_welcome()