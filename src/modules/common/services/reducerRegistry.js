export class ReducerRegistry {
  constructor() {
    this.emitChange = null;
    this.reducers = {};
  }

  getReducers() {
    return { ...this.reducers };
  }

  register() {
    if (this.emitChange) {
      this.emitChange(this.getReducers());
    }
  }

  save(name, reducer) {
    this.reducers = { ...this.reducers, [name]: reducer };
  }

  setChangeListener(listener) {
    this.emitChange = listener;
  }
}

export default new ReducerRegistry();
