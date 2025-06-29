"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, Input, Modal, notification } from "antd";
import BillingTable from "@/app/components/BillingTable";
import { db } from "@/app/FireBase/firebase";
import { PDFViewer } from "@react-pdf/renderer";
import MyPdf from "@/app/components/MyPdf";
import moment from "moment";

const GenerateBill = () => {
  const [tableData, setTableData] = useState<any>([]);
  const [customerName, setcustomerName] = useState<any>("");
  const [mobileNumber, setMobileNumber] = useState<any>("");
  const [vehicleNumber, setVehicleNumber] = useState<any>("");
  const [kilometerReading, setKilometerReading] = useState<any>("");
  const [note, setNote] = useState<any>("");
  const [vehicleInformation, setVehicleInformation] = useState("");
  const [generateDisabled, setGenerateDisabled] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const [finalData, setFinalData] = useState<any>();

  useEffect(() => {
    if (tableData.length > 0) {
      setGenerateDisabled(true);
    } else {
      setGenerateDisabled(false);
    }
  }, [tableData]);

  const handleGenerateBill = async () => {
    const billingData: any = [];
    tableData.map((billingItem: any) => {
      billingData.push({
        key: billingItem.key,
        "Item Description": billingItem.description,
        Price: parseInt(billingItem.price),
        Quantity: parseInt(billingItem.quantity),
        Total: parseInt(billingItem.price) * parseInt(billingItem.quantity),
      });
    });

    const payLoadData = {
      date: moment().toISOString(),
      kilometerReading: parseInt(kilometerReading),
      mobileNumber: mobileNumber,
      name: customerName,
      note: note,
      vehicleInformation: vehicleInformation,
      vehicleNumber: vehicleNumber,
      billingData: billingData,
    };
    setFinalData(payLoadData);
    try {
      await db.collection("customer").add(payLoadData);
      await openNotification("Document successfully written!");
      await setShowDownload(true);
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  const openNotification = (text: string) => {
    api.open({
      message: "Invoice Generated Successfully",
      description: "",
      duration: 3,
      style: {
        backgroundColor: "#3cb043",
        height: 5,
        width: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      closeIcon: null,
    });
  };

  return (
    <div
      style={{
        height: "97vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={styles.header}>
        <span style={styles.headerText}>🧾 Generate Bill</span>
      </div>
      {contextHolder}
      <Card style={styles.formCard} bordered={false}>
        <div style={styles.formLayout}>
          {[
            {
              label: "Customer Name",
              value: customerName,
              setter: setcustomerName,
            },
            {
              label: "Mobile Number",
              value: mobileNumber,
              setter: setMobileNumber,
            },
            {
              label: "Vehicle Number",
              value: vehicleNumber,
              setter: setVehicleNumber,
            },
            {
              label: "Kilometer Reading",
              value: kilometerReading,
              setter: setKilometerReading,
            },
            { label: "Note", value: note, setter: setNote, maxLength: 25 },
            {
              label: "Vehicle Note",
              value: vehicleInformation,
              setter: setVehicleInformation,
            },
          ].map((field, idx) => (
            <div key={idx} style={styles.formRow}>
              <label style={styles.label}>{field.label}</label>
              <Input
                size="small"
                required
                style={styles.input}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                maxLength={field.maxLength || undefined}
              />
            </div>
          ))}
        </div>
      </Card>

      <div style={{ width: "100%" }}>
        <BillingTable tableData={tableData} setTableData={setTableData} />
      </div>

      <div>
        {generateDisabled && (
          <Button
            disabled={
              customerName === "" ||
              mobileNumber === "" ||
              vehicleNumber === "" ||
              kilometerReading === ""
            }
            onClick={() => {
              handleGenerateBill();
            }}
            type="primary"
            style={{
              marginTop: 20,
              backgroundColor: "#1d1d1f",
              cursor: "pointer",
            }}
            color="#1d1d1f"
          >
            Generate Bill
          </Button>
        )}
      </div>

      <div>
        <Modal
          open={showDownload}
          onCancel={() => {
            setShowDownload(false);
          }}
          footer={false}
        >
          <PDFViewer showToolbar height={400} width={400}>
            <MyPdf data={finalData} />
          </PDFViewer>
        </Modal>
      </div>
    </div>
  );
};

const data = [
  {
    key: "0",
    "Item Description": "Edward King 0",
    Price: 32,
    Quantity: 10,
    Total: 320,
  },
  {
    key: "1",
    "Item Description": "Edward King 0",
    Price: 16,
    Quantity: 20,
    Total: 320,
  },
  {
    key: "2",
    "Item Description": "Edward King 20",
    Price: 16,
    Quantity: 20,
    Total: 320,
  },
];

const styles: Record<string, React.CSSProperties> = {
  header: {
    padding: "16px 0",
    marginBottom: 20,
    width: "100%",
    textAlign: "center",
    borderBottom: "1px solid #e0e0e0",
    fontFamily: "Poppins",
  },
  headerText: {
    fontSize: 24,
    fontWeight: 600,
    color: "#1d1d1f",
    letterSpacing: 1,
  },
  formCard: {
    padding: 24,
    marginBottom: 24,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    width: "100%",
    maxWidth: 700,
  },
  formLayout: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  formRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  label: {
    minWidth: 150,
    fontWeight: 500,
    fontSize: 14,
    color: "#444",
  },
  input: {
    flex: 1,
    maxWidth: 350,
  },
};

export default GenerateBill;
