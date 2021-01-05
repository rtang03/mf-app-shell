import Global = NodeJS.Global;

export interface App {
  init: any;
}

export interface NewGlobal extends Global {
  // app2: App;
  gw1: App;
  __webpack_require__: { o: any };
}
