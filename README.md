## `stencila/electron` : Stencila on the desktop

[![Build status](https://travis-ci.org/stencila/electron.svg?branch=master)](https://travis-ci.org/stencila/electron)
[![Dependency status](https://david-dm.org/stencila/electron.svg)](https://david-dm.org/stencila/electron)
[![Chat](https://badges.gitter.im/stencila/stencila.svg)](https://gitter.im/stencila/stencila)

### Status

![](http://blog.stenci.la/wip.png)

This is very much a work in progress. See our [main repo](https://github.com/stencila/stencila) for more details.


### Discuss

We love feedback. Create a [new issue](https://github.com/stencila/electron/issues/new), add to [existing issues](https://github.com/stencila/electron/issues) or [chat](https://gitter.im/stencila/stencila) with members of the community.


### Develop

Most development tasks can be run directly using Node.js tooling (`npm` etc) or via `make` wrapper recipes.

Task                                                    |`npm` et al            | `make`          |
------------------------------------------------------- |-----------------------|-----------------|    
Install and setup dependencies                          | `npm install`         | `make setup`
Rebuild dependencies for Electron (electron-rebuild)    | `npm run rebuild`     | `make rebuild`
Check code for lint                                     | `npm run lint`        | `make lint`
Run tests                                               | `npm test`            | `make test`
Run tests with coverage                                 | `npm run cover`       | `make cover`
Build the app                                           | `npm run build`       | `make build`
Clean                                                   |                       | `make clean`

After you install a new npm package, rerun [electron-rebuild](https://github.com/electron/electron-rebuild) using `make rebuild`.