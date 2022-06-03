import { URI } from "../enum/uri";
import axiosLogin from "../login/axiosLogin";

export default class TicketRequests {

  public async newTicket(body: object) {
    try {
      const resposta = await axiosLogin.post(URI.INSERT_CHAMADOS, body)
      window.alert("Chamado cadastrado!")
      window.location.href = '/page/home'
      return resposta.data
    } catch (err) {
      console.log(err)
      window.alert("Ocorreu um erro!")
    }
  }
}