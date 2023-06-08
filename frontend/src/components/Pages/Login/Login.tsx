import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { saveToken } from '../../../utils/jwtToken';

const Login = (props: any) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '', password: ''
    })
    const [type, setType] = useState(0)

    const [error, setError] = useState('')

    const loginUser = () => {
        if(!!form.email && !!form.password) {
            //Login
            axios.post(
                `http://localhost:4000/auth/${type === 0 ? 'login' : 'employeeLogin'}`, 
                { ...form }
            ).then((res) => {
                if(res.data.status === "OK") {
                    saveToken(res.data.token, type);
                    navigate("/");
                } else {
                    setError("Wystapil blad przy logowaniu!");
                }
            })
        } else {
            setError("Uzupelnij wszystkie pola.");
        }
    }

    return (
        <div className="inputForm">
            <span>Typ konta</span>
            <select onChange={(e) => {
                setType(+e?.target?.value)
            }}>
                <option value={0} selected>Klient</option>
                <option value={1}>Pracownik</option>
            </select>
            <span>Email</span>
            <input
                type="text"
                placeholder="Email"
                onChange={(e) => {
                    setForm(prev => ({...prev, email: (e?.nativeEvent?.target as HTMLInputElement)?.value}))
                }}
            />
            <span>Haslo</span>
            <input
                type="password"
                placeholder="Haslo"
                onChange={(e) => {
                    setForm(prev => ({...prev, password: (e?.nativeEvent?.target as HTMLInputElement)?.value}))
                }}
            />
            <button onClick={loginUser}>Zaloguj sie!</button>
            <span className="errorSpan">{error}</span>
        </div>
    );
};

export default Login;