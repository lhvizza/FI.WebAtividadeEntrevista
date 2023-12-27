$(document).ready(function () {

    $("#CEP").inputmask("mask", { "mask": "99999-999" });
    $("#CPF").inputmask("mask", { "mask": "999.999.999-99" }, { reverse: true });
    $("#CPFBeneficiario").inputmask("mask", { "mask": "999.999.999-99" }, { reverse: true });

    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #CPF').val(obj.CPF);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        var cpf = document.getElementById("CPF");
        if (!Valida(cpf)) {
            return;
        }

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "CPF": cpf.value,
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val()
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })
    
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function Valida(cpf)
{
    var info = "";
    corErro = "#CCCCCC";
    corAcerto = "#FFFFFF";

    //Validação de CPF
    //var cpf = document.getElementById("CPF");
    strcpf = cpf.value;
    strcpf = strcpf.replace(".", "");
    strcpf = strcpf.replace(".", "");
    strcpf = strcpf.replace("-", "");

    if (isNaN(strcpf)) {
        info += " - CPF inválido.(Não está no formato 999.999.999-99) \n"
        cpf.style.background = corErro;
        cpf.focus();
    } else {
        if (strcpf == '' || strcpf.length != 11) {
            info += " - É obrigatório o preenchimento do CPF.(Caso preenchido, verifique se há caracteres ou números digitados de forma incorreta) \n";
            cpf.style.backgroundColor = corErro;
            cpf.focus();
        } else {
            if (strcpf == "00000000000"
                //|| strcpf == "11111111111"
                || strcpf == "22222222222"
                || strcpf == "33333333333"
                || strcpf == "44444444444"
                || strcpf == "55555555555"
                || strcpf == "66666666666"
                || strcpf == "77777777777"
                //|| strcpf == "88888888888"
                || strcpf == "99999999999") {
                info += " - CPF inválido. \n";
                cpf.style.backgroundColor = corErro;
                cpf.focus();
            } else {
                var Soma;
                var Resto;
                Soma = 0;
                for (i = 1; i <= 9; i++)
                    Soma = Soma + parseInt(strcpf.substring(i - 1, i)) * (11 - i);
                Resto = (Soma * 10) % 11;
                if (Resto != parseInt(strcpf.substring(9, 10))) {
                    info += " - CPF inválido. \n";
                    cpf.style.backgroundColor = corErro;
                    cpf.focus();
                } else {
                    Soma = 0;
                    for (i = 1; i <= 10; i++)
                        Soma = Soma + parseInt(strcpf.substring(i - 1, i)) * (12 - i);
                    Resto = (Soma * 10) % 11;
                    if (Resto != parseInt(strcpf.substring(10, 11))) {
                        info += " - CPF inválido. \n";
                        cpf.style.backgroundColor = corErro;
                        cpf.focus();
                    } else {
                        cpf.style.backgroundColor = corAcerto;
                    }
                }
            }
        }
    }
    
    // Final mostrando Erro em ModalDialog
    if (info.length > 0) {
        ModalDialog("Erro de Validação", info);
        return false;
    } else {
        return true;
    }
}

function adicionarAoGrid()
{
    if ($("#formBeneficiario")[0].checkValidity())
    {
        var cpf = document.getElementById("CPFBeneficiario");

        if (!existeCPFNoGrid(cpf.value))
        {
            if (!Valida(cpf)) {
                return;
            }

            var valorCPFBeneficiario = $("#CPFBeneficiario").val();
            var valorNomeBeneficiario = $("#NomeBeneficiario").val();

            var novaLinha =
                "<tr>" +
                "<td>" + valorCPFBeneficiario + "</td>" +
                "<td>" + valorNomeBeneficiario + "</td>" +

                // Botão para alterar
                "<td><button type='button' class='btn btn-primary btn-sm' onclick='alterarLinha(this)'>Alterar</button></td>" +

                // Botão para excluir
                "<td><button type='button' class='btn btn-primary btn-sm' onclick='excluirLinha(this)'>Excluir</button></td>" +
                "</tr>";

            // Adicione a nova linha ao corpo da tabela
            $("#gridBeneficiarios tbody").append(novaLinha);

            // Limpe os campos do formulário após adicionar ao grid
            $("#CPFBeneficiario").val("");
            $("#NomeBeneficiario").val("");
        }
        else
        {
            alert("CPF já incluido como beneficiário nesse cliente.");
        }
    }
    else 
    {
        alert("Preencha o CPF e o Nome do beneficiário antes de incluir.");
    }
}

function alterarLinha(botao)
{
    // Obtenha a linha correspondente
    var linha = $(botao).closest("tr");

    var valorCPFBeneficiario = linha.find("td:eq(0)").text();
    var valorNomeBeneficiario = linha.find("td:eq(1)").text();

    $("#CPFBeneficiario").val(valorCPFBeneficiario);
    $("#NomeBeneficiario").val(valorNomeBeneficiario);

    linha.remove();
}

function excluirLinha(botao) {
    // Obtenha a linha correspondente e remova-a
    $(botao).closest("tr").remove();
}

function existeCPFNoGrid(valor)
{
    var cpfExistentes = [];

    // Itera sobre as linhas da tabela e verifica se o valor já existe
    $("#gridBeneficiarios tbody tr").each(function () {
        var cpfExistente = $(this).find("td:eq(0)").text();''
        cpfExistentes.push(cpfExistente);
    });

    return cpfExistentes.includes(valor);
}