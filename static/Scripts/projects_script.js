const initial_welcome = async () => {
    var element = document.getElementById("introduction_text");

    const text = "My programming projects:";
    sleep(1000)
    typing_animation(element, text, 10)
}


function home_button()
{
    location.href = "/";
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