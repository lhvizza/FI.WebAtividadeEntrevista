using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Consulta os beneficiarios de um cliente
        /// </summary>
        /// <param name="idCliente">id do cliente</param>
        /// <returns></returns>
        public List<DML.Beneficiario> Consultar(long idCliente)
        {
            DAL.DaoBeneficiario ben = new DAL.DaoBeneficiario();
            return ben.ConsultarBeneficiarios(idCliente);
        }

        /// <summary>
        /// Excluir os beneficiarios de um cliente
        /// </summary>
        /// <param name="idCliente">id do cliente</param>
        /// <returns></returns>
        public void ExcluirBeneficiarios(long idCliente)
        {
            DAL.DaoBeneficiario ben = new DAL.DaoBeneficiario();
            ben.ExcluirBeneficiarios(idCliente);
        }

        /// <summary>
        /// Inclui um novo beneficiario para o cliente
        /// </summary>
        /// <param name="beneficiario">Objeto do beneficiario</param>
        public void IncluirBeneficiario(Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario ben = new DAL.DaoBeneficiario();
            ben.Incluir(beneficiario);
        }
    }
}
