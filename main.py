import send_mail

from flask import Flask, render_template, request
from random import randint
from os import listdir, getcwd


app = Flask(__name__)


def get_ascii_art():
    path = f"{getcwd()}\\Ascii"
    ascii_files = listdir(path)
    fn = ascii_files[randint(0, len(ascii_files) - 1)]

    with open(f"{path}\\{fn}", "r") as file:
        text = file.read()

    return text


@app.route("/about_text", methods=["GET"])
def about_text():
    with open(f"{getcwd()}\\Content\\about.txt", "r") as file:
        text = file.read()

    return text


@app.route("/projects_text", methods=["GET"])
def projects_text():
    with open(f"{getcwd()}\\Content\\projects.txt", "r") as file:
        text = file.read()

    return text


@app.route("/contact_display", methods=["GET"])
def contact_display():
    with open(f"{getcwd()}\\Content\\contact.txt", "r") as file:
        text = file.read()

    return text


@app.route("/contact_text", methods=["POST"])
def contact_text():
    content = request.get_json()

    send_mail.create_message(content["name"], content["email"], content["message"])

    return ""


@app.route("/programming_projects")
def programming_projects():
    return render_template("projects_page.html")


@app.route("/")
def main():
    ascii_text = get_ascii_art()

    return render_template("main_page.html", ascii_art=ascii_text)


app.run()