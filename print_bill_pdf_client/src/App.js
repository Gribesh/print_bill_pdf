import React, { Component } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./App.css";

class App extends Component {
  state = {
    name: "",
    receiptId: 0,
    price1: 0,
    price2: 0,
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  createAndDownloadPdf = () => {
    axios
      .post("/create-pdf", this.state)
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        const filename =
          "Bill_" + this.state.name + "_" + new Date().toLocaleString();
        saveAs(pdfBlob, filename);
      });
  };

  render() {
    return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <td>
                <label>Name: </label>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Receipt Number: </label>
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Receipt ID"
                  name="receiptId"
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Price of product 1: </label>{" "}
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Price 1"
                  name="price1"
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Price of product 2: </label>{" "}
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Price 2"
                  name="price2"
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={this.createAndDownloadPdf}>
                  Download PDF
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
