module.exports = class DB {
  #items = [];

  items() {
    return this.#items;
  }

  addItem(item) {
    this.#items.push(item);
  }

  getItem(id) {
    return this.#items.filter((item) => item.id === id)[0];
  }

  setItem(newItem) {
    this.#items = this.#items.map((item) =>
      item.id === newItem.id ? newItem : item,
    );
  }

  deleteItem(id) {
    this.#items = this.#items.filter((item) => item.id !== id);
  }
};
