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
        <div className="flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md my-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Inicio de Sesión</h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        {...register("usuarioEmpleado", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
                        placeholder="Usuario"
                    />
                    <input
                        type="password"
                        {...register("passwordEmpleado", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
                        placeholder="Contraseña"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};
