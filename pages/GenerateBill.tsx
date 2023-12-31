'use client';
import React, { useEffect, useState } from "react";
import { Button, Input, Modal, notification } from "antd";
import BillingTable from "@/app/components/BillingTable";
import { db } from '@/app/FireBase/firebase'
import { PDFViewer } from "@react-pdf/renderer";
import MyPdf from "@/app/components/MyPdf";
import moment from "moment";

const GenerateBill = () => {

  const [tableData, setTableData] = useState<any>([])
  const [customerName, setcustomerName] = useState<any>('')
  const [mobileNumber, setMobileNumber] = useState<any>('')
  const [vehicleNumber, setVehicleNumber] = useState<any>('')
  const [kilometerReading, setKilometerReading] = useState<any>('')
  const [generateDisabled, setGenerateDisabled] = useState(true)
  const [api, contextHolder] = notification.useNotification();
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const [finalData, setFinalData] = useState<any>()

  useEffect(() => {
    if (tableData.length > 0) {
      setGenerateDisabled(true)
    } else {
      setGenerateDisabled(false)
    }
  }, [tableData])

  const handleGenerateBill = async () => {

    const billingData: any = []
    tableData.map((billingItem: any) => {
      billingData.push({
        key: billingItem.key,
        "Item Description": billingItem['Item Description'],
        Price: parseInt(billingItem.Price),
        Quantity: parseInt(billingItem.Quantity),
        Total: parseInt(billingItem.Price) * parseInt(billingItem.Quantity),
      })
    })

    const payLoadData = {
      date: moment().toISOString(),
      kilometerReading: parseInt(kilometerReading),
      mobileNumber: mobileNumber,
      name: customerName,
      note: 'Test Note',
      vehicleInformation: 'test vehicleInformation',
      vehicleNumber: vehicleNumber,
      billingData: billingData
    }
    setFinalData(payLoadData)
    try {
      await db.collection('customer').add(payLoadData);
      await openNotification("Document successfully written!")
      await setShowDownload(true)
    } catch (error) {
      console.error('Error writing document: ', error);
    }

  }


  const openNotification = (text: string) => {
    api.open({
      message: 'Invoice Generated Successfully',
      description: '',
      duration: 3,
      style: { backgroundColor: '#3cb043', height: 5, width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' },
      closeIcon: null

    });
  };

  return (
    <div style={{ height: '97vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ padding: 5 }}>
        <span>Generate Bill</span>
      </div>
      {contextHolder}
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        <div style={{ paddingRight: 20, display: 'flex', flexDirection: 'row', paddingBottom: 10 }}>
          <div style={{ paddingRight: 40 }}>Customer Name</div>
          <Input autoFocus required size="small" style={{ width: 300 }} onChange={(e) => { setcustomerName(e.target.value) }} value={customerName} />
        </div>

        <div style={{ paddingRight: 20, display: 'flex', flexDirection: 'row', paddingBottom: 10 }}>
          <div style={{ paddingRight: 40 }}>Mobile Number</div>
          <Input required size="small" style={{ width: 300 }} onChange={(e) => { setMobileNumber(e.target.value) }} value={mobileNumber} />
        </div>

        <div style={{ paddingRight: 20, display: 'flex', flexDirection: 'row', paddingBottom: 10 }}>
          <div style={{ paddingRight: 40 }}>Vehicle Number</div>
          <Input required size="small" style={{ width: 300 }} onChange={(e) => { setVehicleNumber(e.target.value) }} value={vehicleNumber} />
        </div>

        <div style={{ paddingRight: 20, display: 'flex', flexDirection: 'row', paddingBottom: 10 }}>
          <div style={{ paddingRight: 20 }}>Kilometer Reading</div>
          <Input required size="small" style={{ width: 300 }} onChange={(e) => { setKilometerReading(e.target.value) }} value={kilometerReading} />
        </div>

      </div>

      <div style={{ width: '100%' }}>
        <BillingTable tableData={tableData} setTableData={setTableData} />
      </div>

      <div>
        {generateDisabled && <Button disabled={customerName === '' || mobileNumber === '' || vehicleNumber === '' || kilometerReading === ''} onClick={() => { handleGenerateBill() }} type="primary" style={{ marginTop: 20, backgroundColor: '#1d1d1f', cursor: 'pointer' }} color="#1d1d1f">
          Generate Bill
        </Button>}
      </div>

      <div>
        <Modal open={showDownload} onCancel={() => { setShowDownload(false) }} footer={false} >
          <PDFViewer showToolbar height={400} width={400}>
            <MyPdf data={finalData} />
          </PDFViewer>
        </Modal>
      </div>
    </div>
  )
}


const data = [
  {
    key: '0',
    "Item Description": 'Edward King 0',
    Price: 32,
    Quantity: 10,
    Total: 320,
  },
  {
    key: '1',
    "Item Description": 'Edward King 0',
    Price: 16,
    Quantity: 20,
    Total: 320,
  },
  {
    key: '2',
    "Item Description": 'Edward King 20',
    Price: 16,
    Quantity: 20,
    Total: 320,
  },
]

export default GenerateBill;

