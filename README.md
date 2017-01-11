# `cross-var`

[![NPM](https://nodei.co/npm/cross-var.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cross-var/) 
[![NPM](https://nodei.co/npm-dl/cross-var.png?months=9&height=3)](https://nodei.co/npm/cross-var/)

[![npm version](https://img.shields.io/npm/v/cross-var.svg)](https://www.npmjs.com/package/cross-var)
[![npm license](https://img.shields.io/npm/l/cross-var.svg)](https://www.npmjs.com/package/cross-var)
[![npm download](https://img.shields.io/npm/dm/cross-var.svg)](https://www.npmjs.com/package/cross-var)
[![npm download](https://img.shields.io/npm/dt/cross-var.svg)](https://www.npmjs.com/package/cross-var)
[![Package Quality](http://npm.packagequality.com/shield/cross-var.svg)](http://packagequality.com/#?package=cross-var)
[![Inline docs](http://inch-ci.org/github/elijahmanor/cross-var.svg?branch=master)](http://inch-ci.org/github/elijahmanor/cross-var)
[![star this repo](http://githubbadges.com/star.svg?user=HansHammel&repo=cross-var&style=flat&color=fff&background=007ec6)](https://github.com/elijahmanor/cross-var)
[![fork this repo](http://githubbadges.com/fork.svg?user=HansHammel&repo=cross-var&style=flat&color=fff&background=007ec6)](https://github.com/elijahmanor/cross-var/fork)

[![david dependency](https://img.shields.io/david/elijahmanor/cross-var.svg)](https://david-dm.org/elijahmanor/cross-var)
[![david devDependency](https://img.shields.io/david/dev/elijahmanor/cross-var.svg)](https://david-dm.org/elijahmanor/cross-var)
[![david optionalDependency](https://img.shields.io/david/optional/elijahmanor/cross-var.svg)](https://david-dm.org/elijahmanor/cross-var)
[![david peerDependency](https://img.shields.io/david/peer/elijahmanor/cross-var.svg)](https://david-dm.org/elijahmanor/cross-var)
[![npms score](https://badges.npms.io/cross-var.svg)](https://www.npmjs.com/package/cross-var)
[![Known Vulnerabilities](https://snyk.io/test/github/elijahmanor/cross-var/badge.svg)](https://snyk.io/test/github/elijahmanor/cross-var)

## Overview

When using `npm scripts` it creates a lot of environment variables that are available for you to leverage when executing scripts.

If you'd like to take a look at all of the variables then you can run `npm run env` in your terminal. 

```
> npm run env

npm_package_name=cross-var
npm_package_author_name=Elijah Manor
npm_package_version=1.0.0
... lots more ...
```

Now you can use those environment variables in your `npm scripts` by referencing them like the following

```
{
  "name": "World",
  "scripts": {
    "//": "The following only works on Mac OS X/Linux (bash)",
    "bash-script": "echo Hello $npm_package_name"
    "//": "The following only works on a Windows machine",
    "win-script": "echo Hello %npm_package_name%"
  }
}
```

```
> npm run bash-script

Hello World
```
However, this won't work on Windows... because it expects the variables to be surrounded by percent signs, so we can change our script just slightly.

### `cross-var` to the Rescue!

The goal of `cross-var` is to let you use one script syntax to work either on a **Mac OS X/Linux (bash)** or **Windows**. Reference the [Usage]() documention below on how to use `cross-var` in your scripts.

## Usage

### Simple Commands

```
{
  "version": "1.0.0",
  "config": {
    "port": "1337"
  },
  "scripts": {
    "prebuild": "cross-var rimraf public/$npm_package_version",
    "build:html": "cross-var jade --obj data.json src/index.jade --out public/$npm_package_version/",
    "server:create": "cross-var http-server public/$npm_package_version -p $npm_package_config_port",
    "server:launch": "cross-var opn http://localhost:$npm_package_config_port"
  }
}
```

### Complex Commands

```
{
  "version": "1.0.0",
  "scripts": {
    "build:css": "cross-var \"node-sass src/index.scss | postcss -c .postcssrc.json | cssmin > public/$npm_package_version/index.min.css\"",
    "build:js": "cross-var \"mustache data.json src/index.mustache.js | uglifyjs > public/$npm_package_version/index.min.js\"",
  }
}
```

## But What About!?!

> Click on one of the following questions to reveal a detailed answer

<details>
	<summary>Why don't you use `cross-env`?</summary>
    `cross-env` is great for scripts that need a particular environment variable
set, but isn't intended to fix cross-environment issues when using variables
inside an `npm script` 
</details>

<details>
	<summary>Why don't you use an external node file?</summary>
    That is a fine solution to this problem, but if you would rather stick to
straight up `npm scripts`, then this is a good solution
</details>

<details>
  <summary>Why don't you just use Windows 10 Ubuntu-based Bash shell?</summary>
Yes, if you can do that... then great! Windows 10’s version 1607 update, dubbed the “Anniversary Update”, has [intergrated a great bash shell](https://msdn.microsoft.com/en-us/commandline/wsl/about) that should allow you to run Linux software directly on Windows without any changes.

However, if you want to support older Windows versions, then you might consider using `cross-env` or another approach to leverage environment variables in your scripts.
</details>
