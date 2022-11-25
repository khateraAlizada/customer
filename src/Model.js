export class FindItem {
  constructor(idstore, longitude, latitude) {
    this.idstore = idstore;
    this.longitude = longitude;
    this.latitude = latitude;
  }
  toString() {
    return this.idstore + " " + this.longitude + " " + this.latitude;
  }
}

export class StoresList {
  constructor(idstore, longitude, latitude) {
    this.idstore = idstore;
    this.longitude = longitude;
    this.latitude = latitude;
  }
  toString() {
    return this.idstore + " " + this.longitude + " " + this.latitude;
  }
}


export class ListShelfItems {
  constructor(storeID, sku, quantity, aisle, shelf) {
    this.storeID = storeID;
    this.sku = sku;
    this.quantity = quantity;
    this.aisle = aisle;
    this.shelf = shelf;
  }
  toString() {
    return (
      this.storeID +
      " " +
      this.sku +
      " " +
      this.quantity +
      " " +
      this.aisle +
      " " +
      this.shelf
    );
  }
}

export class Model {
  constructor() {

    this.listShelfItems = [];
    this.storesList = [];
    this.findItem = [];
  }

  copy() {
    let m = new Model();
  
    m.listShelfItems = this.listShelfItems;
    m.storesList = this.storesList;
    m.findItem = this.findItem;
    return m;
  }
}
