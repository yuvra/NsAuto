'use client';
import { Button, Card, Table, Modal } from "antd";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { PDFViewer, Page, View, Document, Text } from '@react-pdf/renderer';
import MyPdf from "@/app/components/MyPdf";
import moment from "moment";

const CustomerDetails = () => {

  const [downloadPdf, setDownloadPdf] = useState(false)
  const router: any = useRouter();
  const dataFromUrl = router.query.name
  const data = useRef<any>()

  function isJsonString(dataFromUrl: any) {
    try {
      JSON.parse(dataFromUrl);
    } catch (e) {
      return false;
    }
    return true;
  }

  if (isJsonString(dataFromUrl)) {
    data.current = JSON.parse(dataFromUrl)
  }

  const billingDataSource: any = [];
  let finalTotalAmount: number = 0;

  data.current?.billingData.map((dataItem: any, index: number) => {
    finalTotalAmount = finalTotalAmount + dataItem.Total;
    billingDataSource.push(
      {
        key: '1',
        itemDescription: `${dataItem['Item Description']}`,
        price: `${dataItem.Price}`,
        quantity: `${dataItem.Quantity}`,
        total: `${dataItem.Total}`
      }
    )
  })

  const billingColumns = [
    {
      title: 'Item Description',
      dataIndex: 'itemDescription',
      key: 'itemDescription',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    }
  ];

  return (
    <>
      <div style={{ width: '100%' }}>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>NS Automobile</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Card style={{ backgroundColor: '#1c2739', width: '100%', display: 'flex', justifyContent: 'center' }} bodyStyle={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
              <div style={{ width: '30%', color: 'white' }}>Name</div>
              <div style={{ color: 'white' }}>{data.current?.name}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
              <div style={{ width: '30%', color: 'white' }}>Mobile Number</div> 
              <div style={{ color: 'white' }}>{data.current?.mobileNumber}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
              <div style={{ width: '30%', color: 'white' }}>Vehicle Number</div>
              <div style={{ color: 'white' }}>{data.current?.vehicleNumber}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
              <div style={{ color: 'white', width: '30%' }}>Kilometer Reading</div>
              <div style={{ color: 'white' }}>{data.current?.kilometerReading}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
              <div style={{ width: '30%', color: 'white' }}>Billing Date</div>
              <div style={{ color: 'white' }}>{moment(data.current?.date).format('DD-MM-YYYY hh:mm:ss A') }</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
              <div style={{ width: '30%', color: 'white' }}>Note</div>
              <div style={{ color: 'white' }}>{data.current?.note}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', }}>
              <div style={{ width: '30%', color: 'white' }}>Vehicle Information</div>
              <div style={{ color: 'white' }}>{data.current?.vehicleInformation}</div>
            </div>
          </Card>
        </div>

        <Table direction="ltr" bordered={false} dataSource={billingDataSource} columns={billingColumns} pagination={false} />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Final Total: {finalTotalAmount}</h2>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button onClick={() => { setDownloadPdf(true) }}>Download Pdf</Button>
        </div>

        <Modal open={downloadPdf} onCancel={() => { setDownloadPdf(false) }} footer={false} >
          <PDFViewer showToolbar height={400} width={400}>
            <MyPdf data={data.current} />
          </PDFViewer>
        </Modal>
      </div>
    </>
  )
}

export default CustomerDetails;

