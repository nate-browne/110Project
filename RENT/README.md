# Development Guide
## How to Run and Use RENT in Development Mode

### The Codebase (What everything does)

The tech stack for this app goes as follows:
* React Native + Typescript (app front end)
* axios (requests to the backend)
* Flask (Python backend)
* Memcached/Redis (optional caching layer if we wanna scale)
* Nginx (probably, if we really get this running) running on AWS.

The React Native and axios is in the folder named `frontend`, and the Flask and DB stuff will be in the folder
named `backend`.

The `frontend` folder is set up as a typical Typescript project. `src` contains the source code, and is where the files we add
should go. All files that don't contain any JSX should end with the file extension `.ts`, and any with JSX should
end with `.tsx`. `App.tsx` is the main file for the program, but we can modularize it by putting subfolders, separate
style files, etc. React is pretty nice in that it looks very object-oriented, and Typescript helps catch a **lot** of
errors and stuff. For styling components, instead of designing our own, Akshay and I added in [this lovely library](https://github.com/react-native-training/react-native-elements) which has great icons and better documentation. Feel free to let us know if there are
any others we should add.

The `backend` folder is a Flask Python project. [Flask](http://flask.pocoo.org) is pretty easy to use and intuitive to set up,
but for now this is pretty empty as we still try to figure out the architecture of it. We're using Python 3 so that we can
take advantage of the enhanced type system/type annotations (via the `typing` module), as well as being able to run the most recent
build of Python and be as up-to-date as possible.

### Things You'll Need

0. (macOS only) Homebrew. You can get it from [this site](https://brew.sh).

1. `node`, `yarn`, and `expo`. You should have both from the lab, but you can double check this by typing
   `node -v` and `yarn --version` into a terminal. If you get output, you're good. If you don't have either
   and you use a Mac, type `brew install node` followed by `brew install yarn` followed by `yarn global install expo`.
   Windows/Linux users, you're on your own; I know Linux distros have similar package managers to `brew` that you can use.

2. `python3`. This will also install `pip3` for you. Installation is available through `brew` I think.

3. Flask. You can get this with `pip3 install flask`.

4. An editor with support for Typescript. I recommend either [IntelliJ IDEA](https://www.jetbrains.com/idea/?fromMenu) or
   [Visual Studio Code](https://code.visualstudio.com/). Make sure that for VSCode you install the relevant Typescript plugins,
   like "ESLint", "TSLint", and "vscode-icons".

5. **Fill this dependency in when we actually pick a database, if needed.**

### Steps to Install and Run

*Note: These steps will be updated when we add in info about the backend.*

1. After cloning this repo, `cd` into the `frontend` directory.

2. Run `yarn install` to install all of the needed dependencies automatically. Do note that we aren't using `npm` here, so
   if you run `npm install --save` for the dependencies, **shit will break, yo**.

3. *Skip this for now, this will be database/backend related (when we get there).*

4. Now run `expo start`. Download the "Expo" app onto your phone, then scan the QR code. Das it. No more emulators!


