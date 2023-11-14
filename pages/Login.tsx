'use client';

import { Button, Card, Image, Input } from "antd";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const Login = () => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { push } = useRouter();

  const handleLogin = () => {
    push('/Landing');
  }

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Card style={{ padding: 50, backgroundColor: '#E4E4E4' }} >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ paddingBottom: 20 }}>
            <Image width={200} height={100} src={window.location.origin + "/NsLogo.jpeg"} />
          </div>
          <div>
            <div >Username</div>
            <div><Input value={userName} onChange={(e) => { setUserName(e.target.value) }} type="text" /></div>
          </div>
          <div>
            <div >Password</div>
            <div><Input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" /></div>
          </div>
          <div style={{ marginTop: 20 }}>
            <Button disabled={userName === "" || password === ''} onClick={() => { handleLogin() }} type="primary">Login</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Login

