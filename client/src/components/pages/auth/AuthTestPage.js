import React, { useState, useEffect } from 'react';
import useAuth from '../../_factors/hooks/auth/useAuth.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const AuthTestPage = () => {
  const { getRoles } = useAuth();
  const [roles, setRoles] = useState(null)

  useEffect(()=>{
    document.title = '🧪 Auth Test Page';
    setRoles(getRoles());
  }, []);

  return (
    <div>
      <Card sx={{ maxWidth: 300 }}>
        <CardContent>
          {roles ?
            <>
            <Typography variant="h6">
              You are logged in with roles:
            </Typography>

            {roles.map(role =>
              <Typography variant="body1" key={"role-"+role}>{role}</Typography>
            )}
            </>
            :
            <Typography variant="h6">
              You are not logged in! How are you here?!
            </Typography>
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthTestPage;
