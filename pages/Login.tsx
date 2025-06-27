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
    <div style={styles.container}>
      {/* Top SVG Background */}
      <svg viewBox="0 0 1440 320" style={styles.topSvg} preserveAspectRatio="none">
        <path
          fill="#3e8ef7"
          fillOpacity="0.4"
          d="M0,160L60,144C120,128,240,96,360,112C480,128,600,192,720,202.7C840,213,960,171,1080,165.3C1200,160,1320,192,1380,208L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>

      {/* Bottom SVG Background */}
      <svg viewBox="0 0 1440 320" style={styles.bottomSvg} preserveAspectRatio="none">
        <path
          fill="#3e8ef7"
          fillOpacity="0.3"
          d="M0,288L48,272C96,256,192,224,288,202.7C384,181,480,171,576,165.3C672,160,768,160,864,154.7C960,149,1056,139,1152,133.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>

      <Card style={styles.card}>
        <div style={styles.inner}>
          <div style={{ paddingBottom: 20 }}>
            <Image preview={false} width={200} height={100} src="/NsLogo.jpeg" />
          </div>
          <div style={styles.inputGroup}>
            <div style={styles.label}>Username</div>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <div style={styles.label}>Password</div>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <Button
            style={styles.button}
            disabled={!userName || !password}
            onClick={handleLogin}
            type="primary"
          >
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    position: 'relative',
    overflow: 'hidden',
  },
  topSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 150,
    width: '100%',
    zIndex: 0,
  },
  bottomSvg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 150,
    width: '100%',
    zIndex: 0,
  },
  card: {
    padding: 40,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    zIndex: 1,
    width: 400,
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontWeight: 500,
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    padding: '8px 12px',
  },
  button: {
    marginTop: 20,
    width: '100%',
    height: 40,
    fontWeight: 'bold',
  },
};

export default Login;
