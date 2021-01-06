import Global = NodeJS.Global;

export interface App {
  init: any;
}

export interface NewGlobal extends Global {
  'example_react': App;
  'example_next': App;
  'gw1': App;
  __webpack_require__: { o: any };
}
