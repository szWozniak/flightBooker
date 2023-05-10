import { TextField } from '@mui/material';
import React, { useState } from 'react';

interface ILogin {
    username: string,
    password: string
}
const Login: React.FC<any> = (props: any): JSX.Element => {

    const [form, setForm] = useState<ILogin>({
        username: '', password: ''
    })

    return (
        <div className="middleForm">
            <TextField 
                className="formInput"
                id="outlined-basic" 
                label="Username" 
                variant="outlined" 
                type="text"
                onChange={(e) => {
                    setForm(prev => ({...prev, username: (e?.nativeEvent?.target as HTMLInputElement)?.value}))
                }}
            />
            <TextField 
                className="formInput"
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                type="password"
                onChange={(e) => {
                    setForm(prev => ({...prev, password: (e?.nativeEvent?.target as HTMLInputElement)?.value}))
                }}
            />
        </div>
    );
};

export default Login;