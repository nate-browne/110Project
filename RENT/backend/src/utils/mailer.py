import csv
from sys import argv
import smtplib as s
from os.path import expanduser

from .generate import gen_keys

smtp_server = 'smtp.gmail.com'  # Gmail


def send_mail(recipient: str) -> str:
    '''Module for emailing dumbass users a temp password when they derp out.

Args:
  recipient: Second argument. Email address to send the email to.

Returns:
  None.
  '''

    userpass = gen_keys()

    TLS = 587  # TLS number used for login verification
    message = []
    message.append("Subject: Forgot Your Password\n\n")
    message.append("Hi there! You recently requested a temporary password. ")
    message.append("Use this one to login and CHANGE your real password!\n")
    message.append("Your temporary password is: {}\n\n".format(userpass))
    message.append("Cheers\nThe RENT App Team")
    to_send = ''.join(message)

    # Open CSV file, grab email and password
    filename = expanduser('~') + 'emailstuff.csv'
    with open(filename, 'r') as infile:
        read = csv.reader(infile, delimiter=',')
        next(read)
        for row in read:
            sender = row[0]
            passwd = row[1]

    # Send message
    with s.SMTP(smtp_server, TLS) as server:
        server.ehlo()
        server.starttls()
        server.login(sender, passwd)
        server.sendmail(sender, recipient, to_send)

    return userpass


if __name__ == '__main__':
    send_mail(argv[1])
