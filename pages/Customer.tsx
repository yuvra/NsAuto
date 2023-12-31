'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Card, Col, Input, Row, Image } from "antd";
import { db } from '@/app/FireBase/firebase';


const Customer = () => {

  const [mobileNumber, setMobileNumber] = useState('')
  const [bills, setBills] = useState<any>([])
  const Router: any = useRouter();

  useEffect(() => {
    getData()
  }, [mobileNumber])

  const getData = async () => {

    // Create a reference to the cities collection
    const customerRef = db.collection('customer');

    const dataArr: any = []
    // To Fetch All The Bills
    if (mobileNumber === 'NSAUTO') {
      const q1 = await customerRef.get();
      const usersArray1 = q1.docs;
      usersArray1.map((doc) => {
        dataArr.push(doc.data())
      })

      setBills(dataArr)
      return
    }

    // To Fetch Specific Bills
    const q1 = customerRef.where("mobileNumber", "==", mobileNumber).get();
    const q2 = customerRef.where("vehicleNumber", "==", mobileNumber).get();

    const [querySnapshot1, querySnapshot2] = await Promise.all([q1, q2]);

    const usersArray1 = querySnapshot1.docs;
    const usersArray2 = querySnapshot2.docs;

    usersArray1.map((doc) => {
      dataArr.push(doc.data())
    })

    usersArray2.map((doc) => {
      dataArr.push(doc.data())
    })

    await setBills(dataArr)

  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '97vh' }}>
      <div style={{ paddingRight: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10%', paddingBottom: 25 }}>

        <h2>Search Generated Bill</h2>

      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: '#1c2739', height: '5%' }}>
        <div style={{ marginRight: 20 }}><span style={{ color: '#06c' }}>Enter Mobile Number</span></div>
        <div><Input size="small" value={mobileNumber} onChange={(e) => { setMobileNumber(e.target.value) }} /></div>
      </div>


      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '90%', paddingTop: '1%' }}>
        {
          bills.length === 0 &&
          <div style={{ backgroundColor: '#1c2739', color: 'white', padding: 10, display: 'flex', flexDirection: 'column' }}>
            <span style={{ paddingBottom: 10 }}>No Bills Found For {mobileNumber}</span>
            <Image preview={false} width={200} height={100} src={"/NsLogo.jpeg"} />
          </div>
        }

        {
          bills.length !== 0 &&
          <Row gutter={[10, 0]} style={{ width: '100%', height: '99%' }}>

            {
              bills.map((data: any) => {
                return (
                  <Col className="gutter-row" span={8} style={{ paddingTop: 10, cursor: 'pointer' }} onClick={() => {
                    Router.push({
                      pathname: '/CustomerDetails',
                      query: { name: JSON.stringify(data) }
                    });
                  }}>
                    <Card style={{ height: 200, backgroundColor: '#1c2739' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', }}>
                          <div style={{ width: '40%', color: 'white' }}>Name</div>
                          <div style={{ color: 'white' }}>{data.name}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', }}>
                          <div style={{ width: '40%', color: 'white' }}>Mobile Number</div>
                          <div style={{ color: 'white' }}>{data.mobileNumber}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', }}>
                          <div style={{ width: '40%', color: 'white' }}>Vehicle Number</div>
                          <div style={{ color: 'white' }}>{data.vehicleNumber}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', }}>
                          <div style={{ width: '40%', color: 'white' }}>Kilometer Reading</div>
                          <div style={{ color: 'white' }}>{data.kilometerReading}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', }}>
                          <div style={{ width: '40%', color: 'white' }}>Billing Date</div>
                          <div style={{ color: 'white' }}>{data.date}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', }}>
                          <div style={{ width: '40%', color: 'white' }}>Note</div>
                          <div style={{ color: 'white' }}>{data.note}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', }}>
                          <div style={{ width: '40%', color: 'white' }}>Vehicle Information</div>
                          <div style={{ color: 'white' }}>{data.vehicleInformation}</div>
                        </div>
                      </div>

                    </Card>
                  </Col>
                )
              })
            }

          </Row>
        }
      </div>
    </div>
  )
}

export default Customer;

