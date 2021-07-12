import { Container } from "./styles";

export function TransactionTable(){
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desenvolvimento de Website</td>
            <td className="deposit">R$15.000</td>
            <td>Desenvolvimento</td>
            <td>12/07/2021</td>
          </tr>

          <tr>
            <td>Aluguel</td>
            <td className="withdraw">- R$1.050</td>
            <td>Casa</td>
            <td>1/07/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}