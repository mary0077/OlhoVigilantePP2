import Logo from './assets/logprovi.png';

const Cadastro = () => {
  return (
    <>
      <div className="container">
        <img src={Logo} alt="Logo da Empresa" className="logo" />
        <h2 style={{ color: '#FFF' }}>Faça seu cadastro !</h2>
        <form>
          <label htmlFor="nome">Nome Completo :</label>
          <input type="text" id="nome" required />
          <label htmlFor="email">E-mail :</label>
          <input type="email" id="email" required />
          <label htmlFor="senha">Senha :</label>
          <input type="password" id="senha" required />
          <label htmlFor="endereco">Endereço :</label>
          <input type="text" id="endereco" required />
          <label htmlFor="cidade">Cidade :</label>
          <input type="text" id="cidade" required />
          <label htmlFor="cep">CEP :</label>
          <input type="text" id="cep" placeholder="00000-000" required />
          <label htmlFor="estado">Estado : </label>
          <select name="estado" id="estado" required>
            <option value="" disabled selected>
              Selecione o Estado :
            </option>
            <option value="SP">Acre</option>
            <option value="RJ">Alagoas</option>
            <option value="MG">Amapá</option>
            <option value="SP">Amazonas</option>
            <option value="SP">Bahia</option>
            <option value="SP">Ceará</option>
            <option value="SP">Distrito Federal</option>
            <option value="SP">Espírito Santo</option>
            <option value="SP">Goiás</option>
            <option value="SP">Maranhão</option>
            <option value="SP">Mato Grosso</option>
            <option value="SP">Mato Grosso do Sul</option>
            <option value="SP">Minas Geraiso</option>
            <option value="SP">Pará</option>
            <option value="SP">Paraíba</option>
            <option value="SP">Paraná</option>
            <option value="SP">Pernambuco</option>
            <option value="SP">Piauí</option>
            <option value="SP">Rio de Janeiro</option>
            <option value="SP">Rio Grande do Norte</option>
            <option value="SP">Rio Grande do Sul</option>
            <option value="SP">Rondônia</option>
            <option value="SP">Roraima</option>
            <option value="SP">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SP">Sergipe</option>
            <option value="SP">Tocantins</option>
          </select>
          <label htmlFor="telefone">Telefone :</label>
          <input
            type="tel"
            id="telefone"
            placeholder="(ex:(81)98888-8888)"
            required
          />
          <label>Sexo:</label>
          <input type="radio" name="sexo" value="masculino" /> Masculino
          <input type="radio" name="sexo" value="feminino" /> Feminino
          <input type="radio" name="sexo" value="outro" /> Outro
          <button type="submit">Cadastrar</button>
        </form>
        <div className='h-[275px] text-white bg-black'>

  <div className='container flex gap-1 justify-between pt-20 text-[20px]'>

<div> 
<p>
Rua Jurema, 10 - Centro, Jaboatão Dos Guararapes/PE
</p>

<p>
CEP: 50000-111

</p>
<p>
CNPJ: 00.000.000/0001-00
</p>

</div>

<div>

<p className="container text-white">
contato@olhovigilante.com.br
</p>
 
 <p>
 (81) 9 0800-0800
 </p>

</div>

<div>
<a href="/">
<p>
Inicio
</p></a>
<a href="/ocorrencia">
<p>
Ocorrências
</p></a>
<a href="/comunidade">
<p>
Comunidade
</p></a>
<a href="/denunciar">
<p>
Onde Denunciar
</p></a>

</div>
</div>


<div className='flex justify-center pt-10'>
<p className='text-white w-[599px] text-left text-[20px] mx-10px'>

© 2023  Olho Vigilante | Todos os direitos reservados.
</p>
</div>
</div>
      </div>

    </>
  );
};

export default Cadastro;
