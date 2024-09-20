import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {

    const { register, handleSubmit } = useForm();
    const { signin, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        //console.log(data);
        signin(data);
    });

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" { ...register("usuarioEmpleado", { required: true }) }
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Usuario"
                />
                <input type="password" { ...register("passwordEmpleado", { required: true }) }
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Contraseña"
                />
                <button type="submit">Inicio Sesión</button>
            </form>
        </div>
    );
};
