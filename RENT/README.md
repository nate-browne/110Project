# Development Guide
## How to Run and Use RENT in Development Mode

### The Codebase (What everything does)

The tech stack for this app goes as follows:
* React Native + Typescript (app front end)
* axios (requests to the backend)
* Flask (Python backend)
* AWS EC2 (If we do end up hosting for realsies)

The React Native and axios is in the folder named `frontend`, and the Flask and DB stuff will be in the folder
named `backend`.

The `frontend` folder is set up as a typical Typescript project. `src` contains the source code, and is where the files we add
should go. All files that don't contain any JSX should end with the file extension `.ts`, and any with JSX should
end with `.tsx`. `App.tsx` is the main file for the program, but we can modularize it by putting subfolders, separate
style files, etc. React is pretty nice in that it looks very object-oriented, and Typescript helps catch a **lot** of
errors and stuff. For styling components, instead of designing our own, Akshay and I added in [this lovely library](https://github.com/react-native-training/react-native-elements) which has great icons and better documentation. Feel free to let us know if there are
any others we should add.

Regarding Typescript, [refer to this link](https://www.typescriptlang.org/docs/home.html) to get more information on how to use it.
Basically, it makes JavaScript feel a lot more like a true OO language like Java, which is ![very nice](https://media1.tenor.com/images/5198aac8f04c105379617199e0b9665b/tenor.gif)

The `backend` folder is a Flask Python project. [Flask](http://flask.pocoo.org) will provide a [RESTful api](https://restfulapi.net/)
for the front end to use, hooking into the database module (Shivani, James, Bonnie, and Tammy please look this over and either
keep it or yeet it).

### Things You'll Need

0. (macOS only) Homebrew. You can get it from [this site](https://brew.sh).

1. `node`, `yarn`, and `expo`. You should have both from the lab, but you can double check this by typing
   `node -v` and `yarn --version` into a terminal. If you get output, you're good. If you don't have either
   and you use a Mac, type `brew install node` followed by `brew install yarn` followed by `yarn global install expo`.
   Windows/Linux users, you're on your own; I know Linux distros have similar package managers to `brew` that you can use.
   Once done, `cd` into the frontend directory and type `yarn install` to get the rest of the missing dependencies.

2. `python3`. This will also install `pip3` for you. Installation is available through `brew` I think.

3. Flask, and SQLAlchemy. You can get these with `pip3 install flask` and `pip3 install flask_sqlalchemy`, respectively.

4. Passlib. You can install this with `pip3 install passlib`.

5. An editor that supports Typescript. I recommend either [IntelliJ IDEA](https://www.jetbrains.com/idea/?fromMenu),
   [Visual Studio Code](https://code.visualstudio.com/), or [Atom](https://atom.io/). Make sure that for VSCode you install the relevant Typescript plugins, like "ESLint", "TSLint", and "vscode-icons". If you're using VSCode, it may also help to have
   installed the "Python" plugin from Microsoft since it'll do linting and a bunch of other nice things.

6. mariaDB. On macOS, you can get this with `brew install mariadb`. Ask Aabjeet about installation on Linux. Once you've done this,
   you can create your local copy of the database with the following steps:
   ```bash
   $ cd backend
   $ mysql.server start
   $ mysql -u root < db/rent_init.sql
   $ mysql.server stop
   ```

### Steps to Install and Run

*Note: These steps will be updated when we add in info about the backend.*

1. `cd` into the `frontend` directory.

2. Next up, start up the database by typing `mysql.server start`. This will run a `mariadb` instance.

3. Almost done! Now, start up the python process. `cd` into the backend directory, then type `python3 server.py`. Leave this running.

4. `cd` back into frontend, then run `expo start`. Download the "Expo" app onto your phone, then scan the QR code. Das it. No more emulators!


