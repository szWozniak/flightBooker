import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = (props: any) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '', firstname: '', lastname: '', phone: '', passport: '', password: '', passwordRepeat: ''
    })
    const [error, setError] = useState("")

    const registerUser = () => {
        if(!!form.email && !!form.firstname && !!form.lastname && !!form.phone 
            && !!form.passport && !!form.password && !!form.passwordRepeat) {
            if(form.password !== form.passwordRepeat) {
                setError("Hasla nie sa zgodne.");
            } else {
                axios.post(
                    "http://localhost:4000/auth/register", 
                    { ...form }
                ).then((res) => {
                    if(res.data.status === "OK") {
                        navigate("/login");
                    } else {
                        setError("Wystapil blad przy rejestracji!");
                    }
                })
            }
        } else {
            setError("Uzupelnij wszystkie pola.");
        }
    }

    return (
        <div className="inputForm">
            <span>Email</span>
            <input
                type="text"
                placeholder="Email"
                onChange={(e) => {
                    setForm(prev => ({...prev, email: (e?.nativeEvent?.target as HTMLInputElement)?.value}))
                }}
            />
            <span>Imie</span>
            <input
                type="text"
                placeholder="Imie"
                onChange={(e) => {
                    setForm(prev => ({...prev, firstname: (e?.nativeEvent?.target as HTMLInputElement)?.value}))
                }}
            />
            <span>Nazwisko</span>
            <input
                type="text"
                placeholder="Nazwisko"
                onChange={(e) => {
                    setForm(prev => ({...prev, lastname: (e?.nativeEvent?.target as HTMLInputElement)?.value}))
                }}
            />
            <span>Numer telefonu</span>
            <input
                type="text"
                placeholder="Numer telefonu"
                onChange={(e) => {
                    setForm(prev => ({...prev, phone: (e?.nativeEvent?.target as HTMLInputElement)?.value}))
                }}
            />
            <span>Numer paszportu</span>
            <input
                type="text"
                placeholder="Numer paszportu"
                onChange={(e) => {
                    setForm(prev => ({...prev, passport: (e?.nativeEvent?.target as HTMLInputElement)?.value}))
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
            <span>Powtorz Haslo</span>
            <input
                type="password"
                placeholder="Powtorz Haslo"
                onChange={(e) => {
                    setForm(prev => ({...prev, passwordRepeat: (e?.nativeEvent?.target as HTMLInputElement)?.value}))
                }}
            />
            <button onClick={registerUser}>Zarejestruj sie!</button>
            <span className="errorSpan">{error}</span>
        </div>
    );
};

export default Register;