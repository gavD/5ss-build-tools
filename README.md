5 Simple Steps Fast Reads: Build Tools by Gavin Davies - sample project
==

Sample code for the book ["5 Simple Steps Fast Reads: Build Tools" by Gavin Davies](http://www.fivesimplesteps.com/collections/books). This repository is an example project showing how a build file might be written.

This project has two key files:

* `Gulpfile.js` - build file for the Gulp build tool
* `Gruntfile.js` - build file for the Grunt build tool

Dependencies
--

You will need:

* NodeJS with NPM installed

You will also need to install either [Grunt](http://gruntjs.com/) or [Gulp](http://gulpjs.com/), depending on which one you want to use - you can install both if you like, but you should only use one per project.

```bash
# If you are using Grunt:
npm install --global grunt-cli

# If you are using Gulp:
npm install --global gulp
```

Installation
--

Clone this repository to a directory on your computer. Then, install the dependencies with:

```bash
npm install
```

Running the Gulp build
--

```bash
gulp
```

Running the Grunt build
--

```bash
grunt
```
