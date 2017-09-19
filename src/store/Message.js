import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';

const MessageStore = Object.assign({}, {
  _store: new BehaviorSubject({}),

  store(type) {
    return this._store.asObservable().distinctUntilChanged(type, (x) => {
      return x[type];
    });
  },

  addMessage(message) {
    this._store.next(
      Object.assign({}, this._store.getValue(), {[message.type]: message})
    );
  },

  removeMessage(type) {
    const data = Object.assign({}, this._store.getValue());
    delete data[type];
    this._store.next(Object.assign({}, data));
  },

  removeAll() {
    this._store.next({});
  }
});

export default MessageStore;
