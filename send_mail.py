import smtplib


EMAIL = ""
PASSWORD = ""


def send_email(message):
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(EMAIL, PASSWORD)
 
    server.sendmail(EMAIL, EMAIL, message)


def create_message(name, email, message):
    email_message = f"**Email from website**\nSender name: {name}\nSender email: {email}\nMessage content: {message}"
    send_email(email_message)