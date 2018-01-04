<img src="https://s3.amazonaws.com/xynga/images/XYNGA.png" width="400" alt="Xynga Community Logo"/>

# Containers

## Synopisis

Xynga-Containers is an Angular 4 library that is made up of the following components:

- `CardComponent` - a container formatted like a note card on which content can be displayed.
- `CollapsibleBoxComponent` - a toggleable container that animates to expand and close.
- `InformationPanelComponent` - an expandable container designed to display help links which will scroll to
stay in view as long as containing element remains in view.
- `ModalPanelComponent` - a sliding container that appears from the right side of the browser window.
- `TooltipComponent` - a pop-up container that is triggered by clicking on a designated button.

## Motivation

Xynga-Containers is one of the 7 Xynga libraries. Each of the 7 libraries are made up of components, services,
and directives that were originally developed for Vertex's Country-By-Country Reporting application. They were
repackaged under the Xynga name and published on npm so that they could be made available to anyone that wishes
to use them in their Angular 4 application.

## Installation

To install Xynga-Containers, run the command `npm install xynga-containers` from an Angular project directory
to which you wish to install the library. It will then be available in the project's `node_modules` directory.
All Xynga-Containers's third party dependencies will be automatically downloaded and placed in the project's
`node_modules` directory as well. Then, simply import `ContainersModule` (from 'xynga-containers') to the
appropriate module in the project.

Additionally, it is important that `"types" : ["node"]` and `"typeRoots" : ["../node_modules/@types"]` are
added to the `"compilerOptions"` array in the project's `tsconfig.app.json` file, or else the project might
not compile properly. If you are using the `angular-cli` then this should be handled for you.

# Additional Information

Detailed descriptions on how to use each individual component in Xynga-Containers, along with examples and APIs,
can be found at [XYNGA-WEBSITE].

# Contact

If you have a question about how a particular component or directive works, or would like to report a bug, please
email `xyngaba@gmail.com`.

Xynga website: [XYNGA-WEBSITE]

github: https://www.github.com/xynga/containers

npm: https://www.npmjs.com/package/xynga-containers


# License

The MIT License (MIT)

Copyright (c) 2017 Jesse Aronson, Sam Black, Jiggs Gatmaitan, Nancy Gerwig, John Hart,
Tim Klein, Andrew LaRoche, Peter Vink

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.