import Global = NodeJS.Global;

export interface App {
  init: any;
}

export interface NewGlobal extends Global {
  gw1: App;
  __webpack_require__: { o: any };
}
