export const Footer = () => (
    <div className="h-[275px] text-white bg-black">
        <div className="container flex gap-1 justify-between pt-20 text-[20px]">
          <div>
            <p>Rua Jurema, 10 - Centro, Jaboatão Dos Guararapes/PE</p>

            <p>CEP: 50000-111</p>
            <p>CNPJ: 00.000.000/0001-00</p>
          </div>

          <div>
            <p className="container text-white">contato@olhovigilante.com.br</p>

            <p>(81) 9 0800-0800</p>
          </div>

          <div>
            <a href="/">
              <p>Inicio</p>
            </a>
            <a href="/ocorrencia">
              <p>Ocorrências</p>
            </a>
            <a href="/comunidade">
              <p>Comunidade</p>
            </a>
            {/* <a href="/denunciar">
              <p>Onde Denunciar</p>
            </a> */}
          </div>
        </div>

        <div className="flex justify-center pt-10">
          <p className="text-white w-[599px] text-left text-[20px] mx-10px">
            © 2023 Olho Vigilante | Todos os direitos reservados.
          </p>
        </div>
      </div>
)