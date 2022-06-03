import { SetStateAction, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../../components/Navbar";
import { Button } from '../../components/Button';

import '../../styles/viewTickets.scss';
import '../../styles/customStyleModal/viewTicketModal.scss'
import '../../styles/customStyleModal/globalAnimationModal.scss'
import '../../styles/global.scss';

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axiosLogin from "../../login/axiosLogin";
import { URI } from "../../enum/uri";
import ControleSessao from "../../login/ControleSessao";

export function ViewTickets({list = [] }){
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

        const checarAutenticacao =async () => {
            const token = ControleSessao.getToken()
            if (token == null){
                setAutenticado(false)
            } else {
                setAutenticado(true)
            }
            return autenticado
        }

        useEffect(() => {
            if (!autenticado){
                navigate('/')
            }
        }, [autenticado, navigate])


        // PESQUISAR POR TITULO DO CHAMADO    
        const handleGetAll = async () =>{
            const resposta =  await axiosLogin.get(URI.CHAMADOS_ABERTOS_EM_ANDAMENTO)
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
                chamado['titulo'].toLowerCase().includes(lowerBusca)
            );
        }, [busca, chamados]);  


         // ORDENAR CHAMADOS POR TITULO
         const [ order, setOrder ] = useState(1)
         const [ colunmOrder, setColunmOrder ] = useState('title')
         
 
         const handleOrder = (fieldName: SetStateAction<string>) => {
             setOrder(-order)
             setColunmOrder(fieldName)
         }
 
         chamadosFiltrados.sort( (a, b ) => {
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
                            <Button onClick={() => navigate('/page/edit/ticket')}>Editar</Button>
                        </div>
                    </div>
                </Modal>
                <div id="view-ticket-content">
                    <main>
                    <h1>CHAMADOS EM ANDAMENTO</h1>
                        <div className="main-search-area">
                        <input type="text" 
                                        placeholder="Procure pela titulo do chamado"
                                        value={busca}
                                        onChange={(ev) => setBusca(ev.target.value)}
                                         />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th><span>Id</span></th>
                                    <th><span onClick={e => handleOrder('titulo') }>Titulo ⇵</span></th>
                                    <th><span onClick={e => handleOrder('equipamento') }>Equipamento ⇵</span></th>
                                    <th><span onClick={e => handleOrder('status') }>Status ⇵</span></th>
                                </tr>
                            </thead>
                        
                            <tbody>
                                {chamadosFiltrados.map((chamado: any) => (
                                    <tr key={chamado['id']} onClick={onOpenModal} onClickCapture={() => {setId(chamado['id']); setTitulo(chamado['titulo']); setDescricao(chamado['descricao']); setPrioridade(chamado['prioridade'])}}>
                                        <td><span>{chamado['id']}</span></td>
                                        <td><span>{chamado['titulo']}</span></td>
                                        <td><span>{chamado['equipamento']}</span></td>
                                        <td><span>{chamado['status']}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>
            </div>
        );
    }