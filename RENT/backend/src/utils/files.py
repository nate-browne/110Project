from typing import Any
from werkzeug.utils import secure_filename

from config import s3, ALLOWED_EXTENSIONS, S3_BUCKET, S3_LOCATION


def _allowed(filename: str) -> bool:
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_file_to_s3(file: Any, filetype: str) -> str:
    if file and _allowed(file.filename):
        name = secure_filename(file.filename)
        name = '/imgs/' + filetype + '/' + name
        s3.upload_fileobj(file, S3_BUCKET, name)
        return "{}{}".format(S3_LOCATION, name)
    else:
        return ""
