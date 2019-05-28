from os import walk
from typing import Optional
from os.path import join, expanduser


def find(name: str, from_home: bool) -> Optional[str]:
    '''Find a file by name in any directory'''
    if from_home:
        path = expanduser('~')
    else:
        path = '/'
    for root, dirs, files in walk(path):
        if name in files:
            return join(root, name)
    return None


if __name__ == '__main__':
    print(find('emailstuff.csv', True))
