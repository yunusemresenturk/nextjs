import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Page } from '../../../types/types';

const RegisterPage: Page = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Create an account</div>
                        </div>

                        <div>
                            <label htmlFor="firstname" className="block text-900 font-medium text-xl mb-2">
                                First Name
                            </label>
                            <InputText id="firstname" type="text" className="w-full md:w-30rem mb-5" value={name} onChange={(e) => setName(e.target.value)} />
                            
                            <label htmlFor="lastname" className="block text-900 font-medium text-xl mb-2">Last Name</label>
                            <InputText id="lastname" type="text" className="w-full md:w-30rem mb-5" value={surname} onChange={(e) => setSurname(e.target.value)} />
                            <label htmlFor="email" className="block text-900 font-medium text-xl mb-2">Email</label>
                            <InputText id="email" type="text" className="w-full md:w-30rem mb-5" value={email} onChange={(e) => setEmail(e.target.value)} />

                            <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem" />
                            <div className="mb-4">
                                <Button type="button" label="Create Account" className="w-full md:w-30rem mb-5" onClick={() => router.push('/')} />
                            </div>
                            <div className="text-center text-sm text-600">
                                Already have an account? <a href="/auth/login" className="text-900 hover:underline">Sign in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

RegisterPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};


export default RegisterPage;


