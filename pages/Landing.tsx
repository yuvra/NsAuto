'use client';
import { useRouter } from 'next/navigation';
import { Card } from "antd";

const Landing = () => {
  const { push } = useRouter();

  const handleCustumerSearch = () => {
    push('/Customer');
  }

  const handleCreateBill = () => {
    push('/GenerateBill');
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '97vh' }}>
        <Card style={{padding: 100, backgroundColor: '#E4E4E4'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{ padding: 20 }}>
            <Card style={{ backgroundColor: '#161617', minWidth: 155, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleCustumerSearch()}>
              <span style={{ color: 'white' }}>Search Custumer</span>
            </Card>
          </div>
          <div style={{ padding: 20 }}>
            <Card style={{ backgroundColor: '#161617', minWidth: 155, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleCreateBill()}>
              <span style={{ color: 'white' }}>Create Bill</span>
            </Card>
          </div>
          </div>
          
        </Card>
      </div>
    </>
  )
}

export default Landing

