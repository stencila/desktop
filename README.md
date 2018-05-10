## Stencila Desktop

Stencila is an open source office suite for reproducible research.: allowing you to do reproducible research 
with the intuitive, visual interfaces that you and your colleagues are used to.
Stencila Desktop is a part of the Stencila ecosystem.

### Install

Download an installer for the latest release at https://github.com/stencila/desktop/releases

- Windows : `.exe`
- Mac OSX : `.dmg`
- Linux: `.AppImage`

### Develop

To run a development version of Stencila Desktop:

```bash
$ git clone https://github.com/stencila/desktop.git
$ cd desktop
$ npm install
$ npm start
```

To create a distributable binary of Stencila Desktop:

```
$ npm run release
```

Find the binary for your operating system in the `dist` folder.
