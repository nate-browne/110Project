import os
from typing import Any
from werkzeug.utils import secure_filename

from config import ALLOWED_EXTENSIONS, app


def _allowed(filename: str) -> bool:
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_file(file: Any, filetype: str) -> str:
    if file and _allowed(file.filename):
        name = secure_filename(file.filename)
        tmp = os.path.join(app.config['BASE_IMG_URL'], filetype, name)
        file.save(tmp)
        path = 'http://35.162.131.244/' + tmp[12:]
        return path
