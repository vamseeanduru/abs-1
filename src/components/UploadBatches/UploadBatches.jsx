import "./UploadBatches.css";
import MaterialTable from "material-table";
import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

export default function UploadBatches() {
  const [excelData, setExcelData] = useState([]);

  const [selectedRow, setSelectedRow] = useState(null);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setExcelData(d);
    });
  };

  let xml =
    `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
	<soap:Body>
      <ListSAP_BatchInformation xmlns="http://www.agrosolutions.nl/AbsSapInterface/2016/08/30">` +
    (function () {
      let str = "";
      for (let i = 0; i < excelData.length; i++) {
        str +=
          `<SAP_BatchInformation>
          <Input_batch_number>` +
          excelData[i].Input_batch_number +
          `</Input_batch_number>
          <Output_batch_number>` +
          excelData[i].Output_batch_number +
          `</Output_batch_number>
          <Plant_code>` +
          excelData[i].Plant_code +
          `</Plant_code>
          <Location_code>` +
          excelData[i].Location_code +
          `</Location_code>
          <Inventory_status>` +
          excelData[i].Inventory_status +
          `</Inventory_status>
          <Vendor_code>` +
          excelData[i].Vendor_code +
          `</Vendor_code>
          <Transaction_code>` +
          excelData[i].Transaction_code +
          `</Transaction_code>
          <Batch_quantity>` +
          excelData[i].Batch_quantity +
          `</Batch_quantity>
          <ABS_primary_product_number>` +
          excelData[i].ABS_primary_product_number +
          `</ABS_primary_product_number>
          <Seed_Size>` +
          excelData[i].Seed_Size +
          `</Seed_Size>
          <SAP_document_no>` +
          excelData[i].SAP_document_no +
          `</SAP_document_no>
          <SAP_document_line_no>` +
          excelData[i].SAP_document_line_no +
          `</SAP_document_line_no>
          <Cancellation_indicator>` +
          excelData[i].Cancellation_indicator +
          `</Cancellation_indicator>
          <Cancellation_reference_no>` +
          excelData[i].Cancellation_reference_no +
          `</Cancellation_reference_no>
          <Production_lot_number>` +
          excelData[i].Production_lot_number +
          `</Production_lot_number>
          <Material_description>` +
          excelData[i].Material_description +
          `</Material_description>
          <Trans_event_type>` +
          excelData[i].Trans_event_type +
          `</Trans_event_type>
       </SAP_BatchInformation>`;
      }
      return str;
    })() +
    `</ListSAP_BatchInformation>
      </soap:Body>
</soap:Envelope>`;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    // axios
    //   .post(
    //     "http://192.168.21.165:8088/ABSSAPInterface.svc/V1",
    //     {
    //       "Content-Type": "text/xml; charset=utf-8",
    //     },
    //     xml
    //   )
    //   .then((res) => {});
    axios({
      method: "post",
      url: "http://192.168.21.165:8088/ABSSAPInterface.svc/V1",
      data: xml,
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
      },
    })
      .then((res) => {})
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
        }
      });
  };

  let headings = [
    { title: "Input_batch_number", field: "Input_batch_number" },
    { title: "Output_batch_number", field: "Output_batch_number" },
    { title: "Plant_code", field: "Plant_code" },
    { title: "Location_code", field: "Location_code" },
    { title: "Inventory_status", field: "Inventory_status" },
    { title: "Vendor_code", field: "Vendor_code" },
    { title: "Transaction_code", field: "Transaction_code" },
    { title: "Batch_quantity", field: "Batch_quantity" },
    {
      title: "ABS_primary_product_number",
      field: "ABS_primary_product_number",
    },
    { title: "Seed_Size", field: "Seed_Size" },
    { title: "SAP_document_no", field: "SAP_document_no" },
    { title: "SAP_document_line_no", field: "SAP_document_line_no" },
    { title: "Cancellation_indicator", field: "Cancellation_indicator" },
    { title: "Cancellation_reference_no", field: "Cancellation_reference_no" },
    { title: "Production_lot_number", field: "Production_lot_number" },
    { title: "Material_description", field: "Material_description" },
    { title: "Trans_event_type", field: "Trans_event_type" },
  ];

  const reset = () => {
    setExcelData([
      {
        Input_Batch_Number: 0,
        Output_Batch_Number: 0,
        Plant_code: 0,
        Location_code: 0,
        Inventory_status: 0,
        Vendor_code: 0,
        Transaction_code: 0,
        Batch_Quantity: 0,
        ABS_Primary_Product_Number: 0,
        Seed_Size: 0,
        SAP_document_no: 0,
        SAP_document_line_no: 0,
        Cancellation_indicator: 0,
        Cancellation_reference_no: 0,
        Production_lot_number: 0,
        Material_description: 0,
        Trans_event_type: 0,
      },
    ]);
  };

  console.log(xml);

  return (
    <div className="App">
      <button className="Reset" onClick={reset}>
        Reset
      </button>
      <label htmlFor="file-upload" className="custom-file-upload">
        Upload File
      </label>
      <input
        type="file"
        id="file-upload"
        onChange={(e) => {
          if (e.target.files[0]) {
            const file = e.target.files[0];
            readExcel(file);
          }
        }}
      />
      <button className="Submit" onClick={handleSubmit}>
        Submit
      </button>
      <MaterialTable
        title="Upload Batches"
        columns={headings}
        data={excelData}
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              const clonedData = [...excelData];
              clonedData[rowData.tableData.id][columnDef.field] = newValue;
              setExcelData(clonedData);

              setTimeout(resolve, 10);
            });
          },
        }}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        options={{
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#B1D0E0" : "#F2FFE9",
          }),
          headerStyle: { background: "#5584AC" },
          paging: false,
          sorting: false,
          search: false,
          exportButton: true,
          exportFileName: "Table data",
          draggable: false,
          borderBottom: "none",
        }}
      />
    </div>
  );
}
