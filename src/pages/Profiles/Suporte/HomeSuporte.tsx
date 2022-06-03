import { useNavigate } from 'react-router-dom'
import { Navbar } from '../../../components/Navbar';
import { Button } from '../../../components/Button';
import { useEffect, useState } from 'react';

import ControleSessao from '../../../login/ControleSessao';

import '../../../styles/home.scss';
import '../../../styles/global.scss';

export function HomeSuporte() {
    const navigate = useNavigate();
    const [autenticado, setAutenticado] = useState(true);

    useEffect(() => {
        checarAutenticacao()
    }, [])

    useEffect(() => {
        if (!autenticado) {
            navigate('/')
        }
    }, [autenticado, navigate])

    const checarAutenticacao = async () => {
        const token = ControleSessao.getToken()
        if (token == null) {
            setAutenticado(false)
        } else {
            setAutenticado(true)
        }
        return autenticado
    }

    return (
        <div id="home-content">
            <Navbar />
            <main>
                <div className='main-content'>
                    <Button onClick={() => navigate('/page/tickets/view')}>
                        Verificar chamados
                    </Button>
                </div>
            </main>
        </div>
    );
};