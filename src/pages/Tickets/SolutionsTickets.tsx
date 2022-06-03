import { Link, useNavigate } from "react-router-dom";

import { Navbar } from "../../components/Navbar";
import { Button } from '../../components/Button';

import '../../styles/viewTickets.scss';
import '../../styles/customStyleModal/viewTicketModal.scss'
import '../../styles/customStyleModal/globalAnimationModal.scss'
import '../../styles/global.scss';

import "react-responsive-modal/styles.css";
import axiosLogin from "../../login/axiosLogin";
import { URI } from "../../enum/uri";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import Modal from "react-responsive-modal";
import ControleSessao from "../../login/ControleSessao";

export function SolutionsTickets() {
        const [open, setOpen] = useState(false);
        const onOpenModal = () => setOpen(true);
        const onCloseModal = () => setOpen(false);
        const navigate = useNavigate();
        const [chamados, setChamados] = useState([])
        const [titulo, setTitulo] = useState('')
        const [descricao, setDescricao] = useState('')
        const [prioridade, setPrioridade] = useState('')
        const [id, setId] = useState('')
        const [autenticado, setAutenticado] = useState(true)
        
        // AUTENTICAÇÃO DA PÁGINA
        useEffect(() => {
            checarAutenticacao()
        }, [])
        
        const checarAutenticacao = async () => {
            const token = ControleSessao.getToken()
            if (token == null){
                setAutenticado(false)
            } else {
                setAutenticado(true)
            }
        }

        useEffect(() => {
            if (!autenticado){
                navigate('/')
            }
        })


        // PESQUISAR POR TITULO DO CHAMADO    
        const handleGetAll = async () => {
            const resposta =  await axiosLogin.get(URI.CHAMADOS_FECHADOS)
            return resposta.data
        }

        const getAllTickets = async () => {
            const allTickets = await handleGetAll()
            if (allTickets) setChamados(allTickets)    
        }
        useEffect(() => {
            getAllTickets()
        }, []);

        const [busca, setBusca] = useState('');

        const chamadosFiltrados = useMemo(() => {
            const lowerBusca = busca.toLowerCase();
            return chamados.filter((chamado: any) =>
                chamado['descricao'].toLowerCase().includes(lowerBusca)
        
            );
        }, [busca, chamados]);  

        // ORDENAR CHAMADOS POR TITULO
        const [ order, setOrder ] = useState(1)
        const [ colunmOrder, setColunmOrder ] = useState('title')
        

        const handleOrder = (fieldName: SetStateAction<string>) => {
            setOrder(-order)
            setColunmOrder(fieldName)
        }

        chamadosFiltrados.sort( (a: any, b: any) => {
            return a[colunmOrder] < b[colunmOrder] ? -order : order ;
        })

        // RENDERIZAÇÃO DA PÁGINA
                    return (
                        <div>
                           <Navbar />
                            <Modal
                                open={open}
                                onClose={onCloseModal}
                                center
                                classNames={{
                                overlay: "customOverlay",
                                modal: "customModal",
                                overlayAnimationIn: 'customEnterOverlayAnimation',
                                overlayAnimationOut: 'customLeaveOverlayAnimation',
                                modalAnimationIn: 'customEnterModalAnimation',
                                modalAnimationOut: 'customLeaveModalAnimation',
                            }}>
                                <div id="modal-content">
                                    <div className="id-ticket">
                                        <p>{id}</p>
                                    </div>
                                    <input type="text" placeholder={titulo} disabled />
                                    <textarea name="" id="" placeholder={descricao} disabled />
                                    <select name="" id="" disabled>
                                        <option value="">{prioridade}</option>
                                        <option value="">Baixa</option>
                                    </select>
                                    <div className="margin-left">
                                        <Button onClick={() => navigate('/page/tickets/new')}>Editar</Button>
                                    </div>
                                </div>
                            </Modal>
                            <div id="view-ticket-content">
                                <main>
                                <h1>Banco de Soluções</h1>
                                    <div className="main-search-area">
                                        <input type="text" 
                                        placeholder="Procure pela descrição do chamado"
                                        value={busca}
                                        onChange={(ev) => setBusca(ev.target.value)}
                                         />
                                         <Button onClick={() => navigate('/page/tickets/new')}>Criar Chamado</Button>
                                    </div>
                                    <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th onClick={() => handleOrder('titulo') }><span>Titulo ⇵</span></th>
                                                <th onClick={() => handleOrder('equipamento') }><span>Equipamento ⇵</span></th>
                                                <th onClick={() => handleOrder('descricao') }><span>Descricão ⇵</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chamadosFiltrados.map((chamado: any) => (
                                                <tr key={chamado['id']} onClick={onOpenModal} onClickCapture={() => {setId(chamado['id']); setTitulo(chamado['titulo']); setDescricao(chamado['descricao']); setPrioridade(chamado['prioridade'])}}>
                                                    <td><span>{chamado['titulo']}</span></td>
                                                    <td><span>{chamado['equipamento']}</span></td>
                                                    <td><span>{chamado['descricao']}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    </div>
                                    <p id="linkticket">Caso não encontre uma solução, crie um chamado <Link to={"/page/tickets/new"}>aqui!</Link></p>
                                </main>
                            </div>
                        </div>
                    );
                } 
    