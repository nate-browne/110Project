from random import choice
from string import ascii_letters, digits


def gen_keys(num=8, chars=ascii_letters + digits):
    '''This function generates a random set of ASCII characters used as a key. The
    user can specify how many characters the key should be (num) as well as
    which characters should be used (string). If no arguments are supplied,
    the default values are length 6 with all of the available ASCII characters
    (except for spaces)
    '''

    return ''.join(choice(chars) for x in range(num))
