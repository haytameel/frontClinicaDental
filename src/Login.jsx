import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import React, { useState } from 'react';
import "./styles/login.css";



export const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMsg, setErrorMsg] = useState(''); // estado para error


    //los valores de los inputs, los guardamos en el estado ante cualquier cambio
    const handleChange = (e) => {
        const { name, value } = e.target;//<input name="username" value="haytame" />, eso es destructuring
        setFormData(prev => ({
            ...prev,// copia todo lo que había antes, para no perder valores
            [name]: value//Actualiza solo el campo que se ha modificado, importantes los corchetes, si no seria literal "name"
        }));
        setErrorMsg(''); // importante para limpiar error al modificar inputs

    };

    //
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://clinicadentaldocker.onrender.com/api/auth/login', formData)
            .then(response => {
                console.log(response.data);
                //guardamos el token
                const token = response.data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('username', response.data.username); 
                console.log('Token guardado en localStorage:', token);
                console.log('Username', response.data.username);

                //TIPO DE USUARIO
                const decoded = jwtDecode(token);
                const rol = decoded.rol;
                const username=decoded.sub;
                console.log('Rol del usuario:', rol);
                console.log('ID del usuario:', username);
                // Redirigimos según el rol del usuario
                if (rol === 'ADMIN') window.location.href = '/admin';
                else if (rol === 'PERSONAL') window.location.href = '/personal';
                else
                window.location.href = '/paciente'; 

            }).catch(error => {
                setErrorMsg('Usuario o contraseña incorrectos'); // mostramos error
                console.log(error.response);//importante, devuelve el error del servidor
                console.error('Error al iniciar sesión:', error.data);
            });
    }

    return (
        <div className="login-page">
            <div className='login-izq'>

                <h1>Bienvenido a tu <br />
                    <span>espacio personal</span>
                </h1>

                <p >
                    Gestiona tus citas, consulta tus radiografías/documentos, consulta los procesos y habla directamente con tu dentista.
                    Todo en un solo lugar, seguro y accesible. Estamos aquí para cuidar de tu sonrisa.
                    Recuerda que si no dispones de una cuenta, puedes registrarte gratuitamente.
                </p>

            </div>
            <div className='login-der'>
                <form onSubmit={handleSubmit}>
                    <h2>Introduce tus datos</h2>
                    {errorMsg && (
                        <div style={{ color: 'red', marginBottom: '1rem', backgroundColor: 'transparent', fontWeight: 'bold' }}>
                            {errorMsg}
                        </div>
                    )}
                    {/*  ES LO MISMO QUE LO DE ARRIBA, PERO CON UN IF TERNARIO
                                if (errorMsg) {
                                    return <div style={{ color: 'red', marginBottom: '1rem' }}>{errorMsg}</div>
                                    } else {
                                    return null; // no mostrar nada
                                    }

                                */}

                    <input
                        label='Usuario'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    ></input>

                    <input
                        label='Contraseña'
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    ></input>

                    <button className="boton" type='submit'>INICIAR SESIÓN</button>

                    <div>
                        <h5> <a href='/signup'>O REGÍSTRATE</a>
                            
                            </h5>
                    </div>

                </form>


            </div>
        </div>
    );
}

export default Login;


