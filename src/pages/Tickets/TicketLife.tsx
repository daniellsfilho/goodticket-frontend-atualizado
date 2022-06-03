import '../../styles/global.scss';
import '../../styles/TicketLife.scss';

import { Navbar } from '../../components/Navbar';
import { FaCalendar, FaClock, FaUser, FaUserShield, FaArrowCircleRight } from 'react-icons/fa';
import { BadgeHigh } from '../../components/BadgeHigh';

export function TicketLife() {
    return(
        <div>
            <Navbar/>
            <main>
                <div className='main-content'>
                    <span>
                        <h2>Data de abertura:</h2>
                        <div>
                            <FaCalendar/>
                            <p>01/01/2020</p>
                        </div>
                    </span>
                    <span>
                        <h2>Hora de abertura:</h2>
                        <div>
                            <FaClock/>
                            <p>19h30</p>
                        </div>
                    </span>
                    <span>
                        <h2>Criado por:</h2>
                        <div>
                            <FaUser/>
                            <p>Vinicius Buarque</p>
                        </div>
                    </span>
                    <span>
                        <h2>Prioridade:</h2>
                        <div>
                            <p><BadgeHigh/></p>
                        </div>
                    </span>
                    <span>
                        <h2>Status:</h2>
                        <div>
                            <p>Aberto</p>
                        </div>
                    </span>
                    <span>
                        <h2>Analista responsável:</h2>
                        <div>
                            <FaUserShield/>
                            <p>Analista Fulano</p>
                        </div>
                    </span>
                </div>
                <div>
                    <div>
                        <span>Título do chamado:</span>
                        <input placeholder='Titulo do chamado'/>
                    </div>
                    <div>
                        <span>Descrição do chamado:</span>
                        <textarea placeholder='Descrição'/>
                    </div>
                </div>
            </main>
            <hr className='divider'/>
            <footer className='message-content'>
                <div>
                    <input placeholder='Digite um comentário...'/>
                    <button>
                        <FaArrowCircleRight/>
                    </button>
                </div>
            </footer>
        </div>
    )
}