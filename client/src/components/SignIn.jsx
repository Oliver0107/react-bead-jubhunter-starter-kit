import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [loginCode, setLoginCode] = React.useState('');
    const role = 'employee';
    const user = useSelector(state => state.user.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(user);

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(login({ loginCode, role }));
        navigate('/')
    };

    return (
        <>
            <div>Bejelentkezés</div>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="loginCode" className="block text-sm font-medium text-gray-700">
                        Login code
                    </label>
                    <input
                        type="text"
                        id="loginCode"
                        name="loginCode"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Login code"
                        value={loginCode}
                        onChange={(e) => setLoginCode(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Bejelentkezés
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default SignIn;
