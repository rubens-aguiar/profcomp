# Trilha Computação — protótipo local

Protótipo navegável de um catálogo de jogos digitais. O inventário curricular pesquisável cobre as 120 entradas do complemento de Computação à BNCC; os jogos iniciais continuam sendo registros demonstrativos, com associações de entrada a EM13CO07 e EM13CO08 ainda sujeitas à revisão da curadoria.

## Como abrir

Abra `index.html` em um navegador moderno. O projeto não usa backend, dependências de terceiros obrigatórias nem serviços gerenciados; as ações e os dados do protótipo ficam no navegador. A imagem `image-modelo-jogo.jpg`, fornecida pelo usuário, é referenciada no local original, sem cópia ou alteração.

## Inventário BNCC Computação

A fonte local contém os códigos e as redações integrais dos objetivos/habilidades do anexo: 11 objetivos de aprendizagem na Educação Infantil (EI03CO01–EI03CO11), 83 habilidades no Ensino Fundamental (do 1º ao 9º ano) e 26 habilidades no Ensino Médio (EM13CO01–EM13CO26). O texto da interface identifica objetivos da Educação Infantil e habilidades do Ensino Fundamental/Médio; o ano/grupo aparece junto ao código.

Nos catálogos de estudante e docente, a busca curricular é encadeada: **1. selecione a etapa; 2. selecione a habilidade ou objetivo** correspondente. A segunda lista só mostra opções da etapa escolhida e a redação integral do registro selecionado é exibida. A curadoria apresenta o inventário agrupado por etapa e ano/grupo; nos formulários de sugestão e de jogos, a seleção múltipla também é agrupada e recolhível para evitar uma lista única de 120 caixas.

A cobertura do inventário não significa que exista um jogo associado a cada habilidade. O acervo inicial é demonstrativo e voltado ao escopo original do projeto no Ensino Médio; se uma etapa/habilidade não tiver associação cadastrada, a interface informa a ausência em vez de inventar recomendações.

**Fontes consultadas:** [Complemento à BNCC — PDF oficial do MEC](https://www.gov.br/mec/pt-br/escolas-conectadas/arquivos/BNCCComputaoCompletodiagramado.pdf), [Resolução CNE/CEB nº 1/2022 — MEC Normas](https://mecnormas.mec.gov.br/pesquisa/detalhar/5040) e [listagem independente BNCC Computação — Computacional/Brackmann](https://www.computacional.com.br/bncc/). A resolução determina, no art. 1º, § 2º, que a formulação curricular considere as tabelas anexas; ela entrou em vigor em 1º de novembro de 2022.

**Nota de transcrição:** a página impressa 32 do PDF anexado mostra EF05CO11. A extração de texto por posição inseriu um zero adicional nesse token; a correção foi validada visualmente no PDF e corroborada pela lista independente. O inventário mantém o código EF05CO11 e sua redação integral.

## Jornadas

- **Estudante:** catálogo, busca por etapa e por habilidade/objetivo, filtros complementares, prévia do jogo e envio de nota de experiência de 1 a 5 com comentário opcional anônimo.
- **Educador:** acesso demonstrativo, catálogo pedagógico com os mesmos filtros curriculares, votação/comentário por par jogo–habilidade, sugestão de jogo e consulta dos feedbacks discentes privados.
- **Curadoria:** acesso demonstrativo, gestão de jogos e registros curriculares locais, consulta do inventário oficial por etapa/ano, moderação de sugestões com status e justificativa de recusa, além de relatórios. As redações normativas são somente leitura para evitar deriva da fonte.

Os atalhos de Educadores e Curadoria simulam uma sessão dentro deste protótipo. **Não constituem autenticação ou controle de segurança real.** Use valores inventados; e-mails e senhas não são enviados nem armazenados. Os dados de interação ficam localmente em `localStorage` e podem ser reiniciados limpando os dados locais do site. Ao carregar a versão atualizada, códigos oficiais legados recebem a redação canônica; jogos, votos, comentários, feedback, sugestões e habilidades locais adicionais são preservados.

## Limites do conteúdo

A especificação menciona quatro jogos iniciais, mas não identifica seus títulos. Os registros, notas, votos e comentários do protótipo são conteúdo ilustrativo: não comprovam gratuidade, acesso via navegador, código aberto ou alinhamento curricular de recursos reais. A curadoria deve validar as condições antes da publicação. A imagem quadrada fornecida pelo usuário aparece no primeiro cartão e é preservada inteira dentro do espaço 16:9; os demais espaços de miniatura são reservados para imagens futuras. Não são coletados nomes de alunos e os comentários discentes ficam em área privada do modo demonstrativo.

## Organização

`index.html` define a estrutura da página; `src/styles.css` concentra identidade visual e responsividade; `src/data.js` reúne os registros BNCC e dados iniciais; `src/app.js` contém navegação por hash, regras demonstrativas, filtros e persistência local. `plan.md` e `TODO.md` registram a rastreabilidade e os critérios de aceite; `.work/research/sources.md` guarda as referências da análise documental.
