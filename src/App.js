import React from "react";
import axios from "axios";
import "./App.css";
import { Model, ListShelfItems, StoresList, FindItem } from "./Model.js";

function App() {
  const [model, setModel] = React.useState(new Model());
  const updategGenerateShelfItems = () => {
    // go through and get all stores from the model
    let str = "";
    model.listShelfItems.forEach((i) => {
      str +=
        "StoreID: " +
        i.storeID +
        " ,sku:  " +
        i.sku +
        " , quantity" +
        i.quantity +
        " , aisle" +
        i.aisle +
        ",shelf:  " +
        i.shelf +
        "<br>";
    });
    //insert HTML in the <div> with

    // storeInventory
    let cd = document.getElementById("storeListShelfItems");
    cd.innerHTML = str;
  };
  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {
    updategGenerateShelfItems();
  }, [model]);

  const createShelfReport = (e) => {
    let arg1 = document.getElementById("storeID");
    let arg2 = document.getElementById("aisle");
    let arg3 = document.getElementById("shelf");

    document.getElementById("storeListShelfItems").value =
      "Shelf Report created!";
  };

  const generateShelfReport = (e) => {
    // potentially modify the model
    let storeID = document.getElementById("storeID").value;
    let aisle = document.getElementById("aisle").value;
    let shelf = document.getElementById("shelf").value;

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      storeID: storeID,
      aisle: aisle,
      shelf: shelf,
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "listItemsAisleShelf",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(response.data.result);
        const list = response.data.result;

        for (let i = 0; i < list.length; i++) {
          console.log(list[i].storeID);
          model.listShelfItems.push(
            new ListShelfItems(
              list[i].storeID,
              list[i].sku,
              list[i].quantity,
              list[i].aisle,
              list[i].shelf
            )
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // clear inputs

    setModel(model.copy()); // this Triggers the redraw
  };

  // const updateShipments = () => {
  //   // go through and get all stores from the model
  //   let str = "";
  //   model.shipments.forEach((i) => {
  //     str +=
  //       i.storeID + " = " + i.sku + i.quantity + i.aisle + i.shelf + "<br>";
  //   });
  //   //insert HTML in the <div> with
  //   // shipment-list
  //   let cd = document.getElementById("shipment-list");
  //   cd.innerHTML = str;
  // };

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  // React.useEffect(() => {
  //   updateShipments();
  // }, [model]);

  // const insertShipments = (e) => {
  //   let arg1 = document.getElementById("storeID");
  //   let arg2 = document.getElementById("sku");
  //   let arg3 = document.getElementById("quantity");
  //   document.getElementById("result").value = "added";
  // };

  const updateStoreList = () => {
    // go through and get all stores from the model
    let str = "";
    model.storesList.forEach((i) => {
      str +=
        "idstore: " +
        i.idstore +
        ", longitude: " +
        i.longitude +
        ", latitude: " +
        i.latitude +
        ", distance: " +
        i.distance +
        "<br>";
    });
    //insert HTML in the <div> with

    // storeInventory
    let cd = document.getElementById("storesList");
    cd.innerHTML = str;
  };
  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {
    updateStoreList();
  }, [model]);

  const createReport = (e) => {
    let arg1 = document.getElementById("custLong");
    let arg2 = document.getElementById("custLat");
    document.getElementById("storesList").value = "Report created!";
  };

  const storeListReport = (e) => {
    // potentially modify the model

    let custLat = document.getElementById("custLat").value;
    let custLong = document.getElementById("custLong").value;

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      custLong: custLong,
      custLat: custLat,
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "listStores",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(response.data.result);
        const list = response.data.result;

        for (let i = 0; i < list.length; i++) {
          console.log(list[i].idstore);
          model.storesList.push(
            new StoresList(
              list[i].idstore,
              list[i].longitude,
              list[i].latitude,
              list[i].distance
            )
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // clear inputs

    setModel(model.copy()); // this Triggers the redraw
  };

  const updateFindItem = () => {
    // go through and get all stores from the model
    let str = "";
    model.findItem.forEach((i) => {
      str +=
        "sku: " +
        i.sku +
        ", storeID: " +
        i.idstore +
        ", distance: " +
        i.distance +
        "<br>";
    });
    //insert HTML in the <div> with

    // storeInventory
    let cd = document.getElementById("findItemList");
    cd.innerHTML = str;
  };

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {
    updateFindItem();
  }, [model]);

  const findItemReport = (e) => {
    let arg1 = document.getElementById("sku");
    let arg2 = document.getElementById("longitude");
    let arg3 = document.getElementById("latitude");

    document.getElementById("findItemList").value = "Report created!";
  };

  const findItemHandle = (e) => {
    // potentially modify the model
    let sku = document.getElementById("sku").value;
    let longitude = document.getElementById("longitude").value;
    let latitude = document.getElementById("latitude").value;

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      sku: sku,
      custLong: longitude,
      custLat: latitude,
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "findItem",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(response.data.result);
        const list = response.data.result;

        for (let i = 0; i < list.length; i++) {
          console.log(list[i].sku);
          model.findItem.push(
            new FindItem(list[i].sku, list[i].idstore, list[i].distance)
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // clear inputs

    setModel(model.copy()); // this Triggers the redraw
  };

  // this can be place inside return
  //  storeID: <input id="storeID" />;
  //  sku: <input id="sku" />;
  //  quantity: <input id="quantity" />;

  // this can be place inside return
  //  storeID: <input id="storeID" />;
  //  sku: <input id="sku" />;
  //  quantity: <input id="quantity" />;

  // this can be place inside return
  //  storeID: <input id="storeID" />;
  //  sku: <input id="sku" />;
  //  quantity: <input id="quantity" />;

  //  <table className="table table-bordered">
  //       <tr>
  //         <th>storeID</th>
  //         <th>sku</th>
  //         <th>quantity</th>
  //       </tr>

  //       {shipment.map((item, index) => (
  //         <tr data-index={index}>
  //           <td>{item.storeID}</td>
  //           <td>{item.sku}</td>
  //           <td>{item.quantity}</td>
  //         </tr>
  //       ))}
  //     </table>
  //     <button onClick={(e) => processShipment()}> Process Shipment </button>
  //     result: <input id="shipment-result" readOnly />
  //     <div id="shipment-list"></div>
  // idstore: <input id="idstore" />
  //Store Inventory: <p id="storeInventory"></p>
  // Store Inventory: <p id="storeInventory"></p>
  // <button onClick={(e) => generateInventoryReport()}>
  //   {" "}
  //   Generate Inventory{" "}
  // </button>;
  //<div id="shipment-list"></div>

  return (
    <div className="App">
      <h3>Welcome to Customer Page </h3>
      storeID: <input id="storeID" />
      aisle: <input id="aisle" />
      shelf: <input id="shelf" />
      <button onClick={(e) => generateShelfReport()}>
        list Items on Aisle/Shelf
      </button>
      <div id="storeListShelfItems"></div>
      <p></p>
      sku: <input id="sku" />
      longitude: <input id="longitude" />
      latitude: <input id="latitude" />
      <button onClick={(e) => findItemHandle()}>Find Item</button>
      <div id="findItemList"></div>
      <p></p>
      custLong: <input id="custLong" />
      custLat: <input id="custLat" />
      <button onClick={(e) => storeListReport()}>List stores</button>
      <div id="storesList"></div>
    </div>
  );
}

export default App;
