## Stencila Desktop

The calls for research to be transparent and reproducible have never been louder. But today's tools for reproducible research can be intimidating - especially if you're not a coder. We're building software for reproducible research with the intuitive, visual interfaces that you and your colleagues are used to.

### Install

```bash
$ git clone https://github.com/stencila/desktop.git
$ cd desktop
$ npm install
$ npm start
```

Open an existing Dar archive for editing.

### Bundling

To bundle as an application for OSX, Windows, Linux do the following on each
platform:

```
$ npm run release
```

Find your bundle in the `dist` folder.
