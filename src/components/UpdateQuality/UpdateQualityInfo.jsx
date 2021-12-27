import "./updatequality.css";
import MaterialTable from "material-table";
import { useState } from "react";
// import axios from "axios";
import * as XLSX from "xlsx";

export default function UploadQualityInfo() {
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
      <ns3:ListSAP_BatchInformation xmlns:ns3="http://www.agrosolutions.nl/AbsSapInterface/2016/08/30">` +
    (function () {
      let str = "";
      for (let i = 0; i < excelData.length; i++) {
        str +=
          `<ns3:SAP_BatchInformation>
          <ns3:ABS_batch_number>` +
          excelData[i].ABS_batch_number +
          `</ns3:ABS_batch_number>
          <ns3:Quality_class_code>` +
          excelData[i].Quality_class_code +
          `</ns3:Quality_class_code>
          <ns3:Determination_1>` +
          excelData[i].Determination_1 +
          `</ns3:Determination_1>
          <ns3:Determination_date_1>` +
          excelData[i].Determination_date_1 +
          `</ns3:Determination_date_1>
          <ns3:Determination_2>` +
          excelData[i].Determination_2 +
          `</ns3:Determination_2>
          <ns3:Determination_date_2>` +
          excelData[i].Determination_date_2 +
          `</ns3:Determination_date_2>
          <ns3:Determination_3>` +
          excelData[i].Determination_3 +
          `</ns3:Determination_3>
          <ns3:Determination_date_3>` +
          excelData[i].Determination_date_3 +
          `</ns3:Determination_date_3>
          <ns3:Determination_4>` +
          excelData[i].Determination_4 +
          `</ns3:Determination_4>
          <ns3:Determination_date_4>` +
          excelData[i].Determination_date_4 +
          `</ns3:Determination_date_4>
          <ns3:Determination_5>` +
          excelData[i].Determination_5 +
          `</ns3:Determination_5>
          <ns3:Determination_date_5>` +
          excelData[i].Determination_date_5 +
          `</ns3:Determination_date_5>
          <ns3:Success_Failure_Message>` +
          excelData[i].Success_Failure_Message +
          `</ns3:Success_Failure_Message>
       </ns3:SAP_BatchInformation>`;
      }
      return str;
    })() +
    `</ns3:ListSAP_BatchInformation>
      </soap:Body>
</soap:Envelope>`;

  // const handleSubmit = () => {
  //   console.log("submitted");
  //   // axios
  //   //   .post("http://192.168.21.165:8088/ABSSAPInterface.svc/V1", info)
  //   //   .then((res) => {});
  //   axios({
  //     method: "post",
  //     url: "http://192.168.21.165:8088/ABSSAPInterface.svc/V1",
  //     data: xml,
  //     headers: { "Content-Type": "text/xml; charset=utf-8" },
  //   }).then((res) => {});
  // };

  let headings = [
    { title: "ABS_batch_number", field: "ABS_batch_number" },
    { title: "Quality_class_code", field: "Quality_class_code" },
    { title: "Determination_1", field: "Determination_1" },
    { title: "Determination_date_1", field: "Determination_date_1" },
    { title: "Determination_2", field: "Determination_2" },
    { title: "Determination_date_2", field: "Determination_date_2" },
    { title: "Determination_3", field: "Determination_3" },
    { title: "Determination_date_3", field: "Determination_date_3" },
    { title: "Determination_4", field: "Determination_4" },
    { title: "Determination_date_4", field: "Determination_date_4" },
    { title: "Determination_5", field: "Determination_5" },
    { title: "Determination_date_5", field: "Determination_date_5" },
    { title: "Success_Failure_Message", field: "Success_Failure_Message" },
  ];

  const reset = () => {
    setExcelData([
      {
        ABS_batch_number: 0,
        Quality_class_code: 0,
        Determination_1: 0,
        Determination_date_1: 0,
        Determination_2: 0,
        Determination_date_2: 0,
        Determination_3: 0,
        Determination_date_3: 0,
        Determination_4: 0,
        Determination_date_4: 0,
        Determination_5: 0,
        Determination_date_5: 0,
        Success_Failure_Message: 0,
      },
    ]);
  };

  console.log(xml);

  return (
    <div className="app">
      <button className="reset" onClick={reset}>
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
      {/* <button className="submit" onClick={handleSubmit}>
        Submit
      </button> */}
      <MaterialTable
        title="Update Quality Info"
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
