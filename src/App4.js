import React from "react";
import axios from "axios";
import "./App.css";
import { Model, Shipment, Inventory } from "./Model.js";

function App() {
  const [model, setModel] = React.useState(new Model());
  const updategGenerateInventory = () => {
    // go through and get all stores from the model
    let str = "";
    model.inventories.forEach((i) => {
      str +=
        "StoreID: " +
        i.storeID +
        " ,sku:  " +
        i.sku +
        ", quantiy: " +
        i.quantity +
        " ,aisle:  " +
        i.aisle +
        ",shelf:  " +
        i.shelf +
        "<br>";
    });
    //insert HTML in the <div> with

    // shipment-list
    let cd = document.getElementById("storeInventory");
    cd.innerHTML = str;
  };
  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {
    updategGenerateInventory();
  }, [model]);

  const createReport = (e) => {
    let arg1 = document.getElementById("storeID");

    document.getElementById("storeInventory").value = "Report created!";
  };

  const generateInventoryReport = (e) => {
    // potentially modify the model
    let storeID = document.getElementById("storeID").value;
    //let quantity = document.getElementById("quantity").value;

    var base_url =
      "https://qytapr8ayd.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      storeID: storeID,
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "generateInventory",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(response.data.result);
        const list = response.data.result;

        for (let i = 0; i < list.length; i++) {
          console.log(list[i].sku);
          model.inventories.push(
            new Inventory(
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
    setModel(model.copy()); // this Triggers the redraw
  };

  const updateShipments = () => {
    // go through and get all stores from the model
    let str = "";
    model.shipments.forEach((i) => {
      str += i.storeID + " = " + i.sku + i.quantity + "<br>";
    });
    //insert HTML in the <div> with
    // shipment-list
    let cd = document.getElementById("shipment-list");
    cd.innerHTML = str;
  };
  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  // React.useEffect(() => {
  //   updateShipments();
  // }, [model]);

  const insertShipments = (e) => {
    let arg1 = document.getElementById("storeID");
    let arg2 = document.getElementById("sku");
    let arg3 = document.getElementById("quantity");
    document.getElementById("result").value = "added";
  };

  const processShipment = (e) => {
    // potentially modify the model
    //let sku = document.getElementById("sku").value;
    //let quantity = document.getElementById("quantity").value;

    var base_url =
      "https://qytapr8ayd.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      shipment: [{ storeID: "storeID", sku: "sku", quantity: "quantity" }],
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "processShipment",
      data: {
        body: msg,
      },
    })
      // .then(function (response) {
      //   console.log(response);
      //   let list= []
      //   list.forEach (item =>) {}= new Shipment(storeID, sku, quantity);
      //   model.shipments.push(list);
      //  })
      .catch(function (error) {
        console.log(error);
      });
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

  // <h1>Store</h1>
  //     idstore: <input id="idstore" />
  //     <button onClick={(e) => processShipment()}>Process Shipment</button>
  //     <p></p>
  //     shipment: <input id="shipment" readOnly />

  return (
    <div className="App">
      storeID: <input id="storeID" />
      <button onClick={(e) => generateInventoryReport()}>
        {" "}
        Generate Inventory{" "}
      </button>
      Store Inventory: <p id="storeInventory"></p>
    </div>
  );
}

export default App;
