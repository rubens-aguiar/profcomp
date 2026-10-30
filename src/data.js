(function(){
const SKILLS = [
  {
    "code": "EI03CO01",
    "stage": "Educação Infantil",
    "substage": "Grupo EI03",
    "description": "Reconhecer padrão de repetição em sequência de sons, movimentos, desenhos.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer padrão de repetição em sequência de sons, movimentos, desenhos."
  },
  {
    "code": "EI03CO02",
    "stage": "Educação Infantil",
    "substage": "Grupo EI03",
    "description": "Expressar as etapas para a realização de uma tarefa de forma clara e ordenada.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Expressar as etapas para a realização de uma tarefa de forma clara e ordenada."
  },
  {
    "code": "EI03CO03",
    "stage": "Educação Infantil",
    "substage": "Grupo EI03",
    "description": "Experienciar a execução de algoritmos brincando com objetos (des)plugados.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Experienciar a execução de algoritmos brincando com objetos (des)plugados."
  },
  {
    "code": "EI03CO04",
    "stage": "Educação Infantil",
    "substage": "Grupo EI03",
    "description": "Criar e representar algoritmos para resolver problemas.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar e representar algoritmos para resolver problemas."
  },
  {
    "code": "EI03CO05",
    "stage": "Educação Infantil",
    "substage": "Grupo EI03",
    "description": "Comparar soluções algorítmicas para resolver um mesmo problema.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Comparar soluções algorítmicas para resolver um mesmo problema."
  },
  {
    "code": "EI03CO06",
    "stage": "Educação Infantil",
    "substage": "Grupo EI03",
    "description": "Compreender decisões em dois estados (verdadeiro ou falso).",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Compreender decisões em dois estados (verdadeiro ou falso)."
  },
  {
    "code": "EI03CO07",
    "stage": "Educação Infantil",
    "substage": "Grupo EI03",
    "description": "Reconhecer dispositivos eletrônicos (e não-eletrônicos), identificando quando estão ligados ou desligados (abertos ou fechados).",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer dispositivos eletrônicos (e não-eletrônicos), identificando…"
  },
  {
    "code": "EI03CO08",
    "stage": "Educação Infantil",
    "substage": "Grupo EI03",
    "description": "Compreender o conceito de interfaces para comunicação com objetos (des)plugados.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Compreender o conceito de interfaces para comunicação com objetos…"
  },
  {
    "code": "EI03CO09",
    "stage": "Educação Infantil",
    "substage": "Grupo EI03",
    "description": "Identificar dispositivos computacionais e as diferentes formas de interação.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Identificar dispositivos computacionais e as diferentes formas de interação."
  },
  {
    "code": "EI03CO10",
    "stage": "Educação Infantil",
    "substage": "Grupo EI03",
    "description": "Utilizar tecnologia digital de maneira segura, consciente e respeitosa.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Utilizar tecnologia digital de maneira segura, consciente e respeitosa."
  },
  {
    "code": "EI03CO11",
    "stage": "Educação Infantil",
    "substage": "Grupo EI03",
    "description": "Adotar hábitos saudáveis de uso de artefatos computacionais, seguindo recomendações de órgãos de saúde competentes.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Adotar hábitos saudáveis de uso de artefatos computacionais, seguindo…"
  },
  {
    "code": "EF01CO01",
    "stage": "Ensino Fundamental",
    "substage": "1º ano",
    "description": "Organizar objetos físicos ou digitais considerando diferentes características para esta organização, explicitando semelhanças (padrões) e diferenças.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Organizar objetos físicos ou digitais considerando diferentes…"
  },
  {
    "code": "EF01CO02",
    "stage": "Ensino Fundamental",
    "substage": "1º ano",
    "description": "Identificar e seguir sequências de passos aplicados no dia a dia para resolver problemas.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Identificar e seguir sequências de passos aplicados no dia a dia para…"
  },
  {
    "code": "EF01CO03",
    "stage": "Ensino Fundamental",
    "substage": "1º ano",
    "description": "Reorganizar e criar sequências de passos em meios físicos ou digitais, relacionando essas sequências à palavra ‘Algoritmos’.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reorganizar e criar sequências de passos em meios físicos ou digitais,…"
  },
  {
    "code": "EF01CO04",
    "stage": "Ensino Fundamental",
    "substage": "1º ano",
    "description": "Reconhecer o que é a informação, que ela pode ser armazenada, transmitida como mensagem por diversos meios e descrita em várias linguagens.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer o que é a informação, que ela pode ser armazenada, transmitida…"
  },
  {
    "code": "EF01CO05",
    "stage": "Ensino Fundamental",
    "substage": "1º ano",
    "description": "Representar informação usando diferentes codificações.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Representar informação usando diferentes codificações."
  },
  {
    "code": "EF01CO06",
    "stage": "Ensino Fundamental",
    "substage": "1º ano",
    "description": "Reconhecer e explorar artefatos computacionais voltados a atender necessidades pessoais ou coletivas.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer e explorar artefatos computacionais voltados a atender…"
  },
  {
    "code": "EF01CO07",
    "stage": "Ensino Fundamental",
    "substage": "1º ano",
    "description": "Conhecer as possibilidades de uso seguro das tecnologias computacionais para proteção dos dados pessoais e para garantir a própria segurança.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Conhecer as possibilidades de uso seguro das tecnologias computacionais…"
  },
  {
    "code": "EF02CO01",
    "stage": "Ensino Fundamental",
    "substage": "2º ano",
    "description": "Criar e comparar modelos (representações) de objetos, identificando padrões e atributos essenciais.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar e comparar modelos (representações) de objetos, identificando…"
  },
  {
    "code": "EF02CO02",
    "stage": "Ensino Fundamental",
    "substage": "2º ano",
    "description": "Criar e simular algoritmos representados em linguagem oral, escrita ou pictográfica, construídos como sequências com repetições simples (iterações definidas) com base em instruções preestabelecidas ou criadas, analisando como a precisão da instrução impacta na execução do algoritmo.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar e simular algoritmos representados em linguagem oral, escrita ou…"
  },
  {
    "code": "EF02CO03",
    "stage": "Ensino Fundamental",
    "substage": "2º ano",
    "description": "Identificar que máquinas diferentes executam conjuntos próprios de instruções e que podem ser usadas para definir algoritmos.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Identificar que máquinas diferentes executam conjuntos próprios de…"
  },
  {
    "code": "EF02CO04",
    "stage": "Ensino Fundamental",
    "substage": "2º ano",
    "description": "Diferenciar componentes físicos (hardware) e programas que fornecem as instruções (software) para o hardware.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Diferenciar componentes físicos (hardware) e programas que fornecem as…"
  },
  {
    "code": "EF02CO05",
    "stage": "Ensino Fundamental",
    "substage": "2º ano",
    "description": "Reconhecer as características e usos das tecnologias computacionais no cotidiano dentro e fora da escola.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer as características e usos das tecnologias computacionais no…"
  },
  {
    "code": "EF02CO06",
    "stage": "Ensino Fundamental",
    "substage": "2º ano",
    "description": "Reconhecer os cuidados com a segurança no uso de dispositivos computacionais.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer os cuidados com a segurança no uso de dispositivos computacionais."
  },
  {
    "code": "EF03CO01",
    "stage": "Ensino Fundamental",
    "substage": "3º ano",
    "description": "Associar os valores 'verdadeiro' e 'falso' a sentenças lógicas que dizem respeito a situações do dia a dia, fazendo uso de termos que indicam negação.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Associar os valores 'verdadeiro' e 'falso' a sentenças lógicas que dizem…"
  },
  {
    "code": "EF03CO02",
    "stage": "Ensino Fundamental",
    "substage": "3º ano",
    "description": "Criar e simular algoritmos representados em linguagem oral, escrita ou pictográfica, que incluam sequências e repetições simples com condição (iterações indefinidas), para resolver problemas de forma independente e em colaboração.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar e simular algoritmos representados em linguagem oral, escrita ou…"
  },
  {
    "code": "EF03CO03",
    "stage": "Ensino Fundamental",
    "substage": "3º ano",
    "description": "Aplicar a estratégia de decomposição para resolver problemas complexos, dividindo esse problema em partes menores, resolvendo-as e combinando suas soluções.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Aplicar a estratégia de decomposição para resolver problemas complexos,…"
  },
  {
    "code": "EF03CO04",
    "stage": "Ensino Fundamental",
    "substage": "3º ano",
    "description": "Relacionar o conceito de informação com o de dado.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Relacionar o conceito de informação com o de dado."
  },
  {
    "code": "EF03CO05",
    "stage": "Ensino Fundamental",
    "substage": "3º ano",
    "description": "Compreender que dados são estruturados em formatos específicos dependendo da informação armazenada.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Compreender que dados são estruturados em formatos específicos dependendo…"
  },
  {
    "code": "EF03CO06",
    "stage": "Ensino Fundamental",
    "substage": "3º ano",
    "description": "Reconhecer que, para um computador realizar tarefas, ele se comunica com o mundo exterior com o uso de interfaces físicas (dispositivos de entrada e saída).",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer que, para um computador realizar tarefas, ele se comunica com o…"
  },
  {
    "code": "EF03CO07",
    "stage": "Ensino Fundamental",
    "substage": "3º ano",
    "description": "Utilizar diferentes navegadores e ferramentas de busca para pesquisar e acessar informações.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Utilizar diferentes navegadores e ferramentas de busca para pesquisar e…"
  },
  {
    "code": "EF03CO08",
    "stage": "Ensino Fundamental",
    "substage": "3º ano",
    "description": "Usar ferramentas computacionais em situações didáticas para se expressar em diferentes formatos digitais.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Usar ferramentas computacionais em situações didáticas para se expressar…"
  },
  {
    "code": "EF03CO09",
    "stage": "Ensino Fundamental",
    "substage": "3º ano",
    "description": "Reconhecer o potencial impacto do compartilhamento de informações pessoais ou de seus pares em meio digital.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer o potencial impacto do compartilhamento de informações pessoais…"
  },
  {
    "code": "EF04CO01",
    "stage": "Ensino Fundamental",
    "substage": "4º ano",
    "description": "Reconhecer objetos do mundo real e/ou digital que podem ser representados através de matrizes que estabelecem uma organização na qual cada componente está em uma posição definida por coordenadas, fazendo manipulações simples sobre estas representações.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer objetos do mundo real e/ou digital que podem ser representados…"
  },
  {
    "code": "EF04CO02",
    "stage": "Ensino Fundamental",
    "substage": "4º ano",
    "description": "Reconhecer objetos do mundo real e/ou digital que podem ser representados através de registros que estabelecem uma organização na qual cada componente é identificado por um nome, fazendo manipulações sobre estas representações.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer objetos do mundo real e/ou digital que podem ser representados…"
  },
  {
    "code": "EF04CO03",
    "stage": "Ensino Fundamental",
    "substage": "4º ano",
    "description": "Criar e simular algoritmos representados em linguagem oral, escrita ou pictográfica, que incluam sequências e repetições simples e aninhadas (iterações definidas e indefinidas), para resolver problemas de forma independente e em colaboração.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar e simular algoritmos representados em linguagem oral, escrita ou…"
  },
  {
    "code": "EF04CO04",
    "stage": "Ensino Fundamental",
    "substage": "4º ano",
    "description": "Entender que para guardar, manipular e transmitir dados deve-se codificá-los de alguma forma que seja compreendida pela máquina (formato digital).",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Entender que para guardar, manipular e transmitir dados deve-se…"
  },
  {
    "code": "EF04CO05",
    "stage": "Ensino Fundamental",
    "substage": "4º ano",
    "description": "Codificar diferentes informações para representação em computador (binária, ASCII, atributos de pixel, como RGB etc.).",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Codificar diferentes informações para representação em computador…"
  },
  {
    "code": "EF04CO06",
    "stage": "Ensino Fundamental",
    "substage": "4º ano",
    "description": "Usar diferentes ferramentas computacionais para criação de conteúdo (textos, apresentações, vídeos etc.).",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Usar diferentes ferramentas computacionais para criação de conteúdo…"
  },
  {
    "code": "EF04CO07",
    "stage": "Ensino Fundamental",
    "substage": "4º ano",
    "description": "Demonstrar postura ética nas atividades de coleta, transferência, guarda e uso de dados.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Demonstrar postura ética nas atividades de coleta, transferência, guarda e…"
  },
  {
    "code": "EF04CO08",
    "stage": "Ensino Fundamental",
    "substage": "4º ano",
    "description": "Reconhecer a importância de verificar a confiabilidade das fontes de informações obtidas na Internet.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer a importância de verificar a confiabilidade das fontes de…"
  },
  {
    "code": "EF05CO01",
    "stage": "Ensino Fundamental",
    "substage": "5º ano",
    "description": "Reconhecer objetos do mundo real e/ou digital que podem ser representados através de listas que estabelecem uma organização na qual há um número variável de itens dispostos em sequência, fazendo manipulações simples sobre estas representações.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer objetos do mundo real e/ou digital que podem ser representados…"
  },
  {
    "code": "EF05CO02",
    "stage": "Ensino Fundamental",
    "substage": "5º ano",
    "description": "Reconhecer objetos do mundo real e digital que podem ser representados através de grafos que estabelecem uma organização com uma quantidade variável de vértices conectados por arestas, fazendo manipulações simples sobre estas representações.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer objetos do mundo real e digital que podem ser representados…"
  },
  {
    "code": "EF05CO03",
    "stage": "Ensino Fundamental",
    "substage": "5º ano",
    "description": "Realizar operações de negação, conjunção e disjunção sobre sentenças lógicas e valores 'verdadeiro' e 'falso'.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Realizar operações de negação, conjunção e disjunção sobre sentenças…"
  },
  {
    "code": "EF05CO04",
    "stage": "Ensino Fundamental",
    "substage": "5º ano",
    "description": "Criar e simular algoritmos representados em linguagem oral, escrita ou pictográfica, que incluam sequências, repetições e seleções condicionais para resolver problemas de forma independente e em colaboração.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar e simular algoritmos representados em linguagem oral, escrita ou…"
  },
  {
    "code": "EF05CO05",
    "stage": "Ensino Fundamental",
    "substage": "5º ano",
    "description": "Identificar os componentes principais de um computador (dispositivos de entrada/saída, processadores e armazenamento).",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Identificar os componentes principais de um computador (dispositivos de…"
  },
  {
    "code": "EF05CO06",
    "stage": "Ensino Fundamental",
    "substage": "5º ano",
    "description": "Reconhecer que os dados podem ser armazenados em um dispositivo local ou remoto.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer que os dados podem ser armazenados em um dispositivo local ou…"
  },
  {
    "code": "EF05CO07",
    "stage": "Ensino Fundamental",
    "substage": "5º ano",
    "description": "Reconhecer a necessidade de um sistema operacional para a execução de programas e gerenciamento do hardware.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer a necessidade de um sistema operacional para a execução de…"
  },
  {
    "code": "EF05CO08",
    "stage": "Ensino Fundamental",
    "substage": "5º ano",
    "description": "Acessar as informações na Internet de forma crítica para distinguir os conteúdos confiáveis de não confiáveis.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Acessar as informações na Internet de forma crítica para distinguir os…"
  },
  {
    "code": "EF05CO09",
    "stage": "Ensino Fundamental",
    "substage": "5º ano",
    "description": "Usar informações considerando aplicações e limites dos direitos autorais em diferentes mídias digitais.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Usar informações considerando aplicações e limites dos direitos autorais…"
  },
  {
    "code": "EF05CO10",
    "stage": "Ensino Fundamental",
    "substage": "5º ano",
    "description": "Expressar-se crítica e criativamente na compreensão das mudanças tecnológicas no mundo do trabalho e sobre a evolução da sociedade.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Expressar-se crítica e criativamente na compreensão das mudanças…"
  },
  {
    "code": "EF05CO11",
    "stage": "Ensino Fundamental",
    "substage": "5º ano",
    "description": "Identificar a adequação de diferentes tecnologias computacionais na resolução de problemas.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Identificar a adequação de diferentes tecnologias computacionais na…"
  },
  {
    "code": "EF06CO01",
    "stage": "Ensino Fundamental",
    "substage": "6º ano",
    "description": "Classificar informações, agrupando-as em coleções (conjuntos) e associando cada coleção a um ‘tipo de dados’",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Classificar informações, agrupando-as em coleções (conjuntos) e associando…"
  },
  {
    "code": "EF06CO02",
    "stage": "Ensino Fundamental",
    "substage": "6º ano",
    "description": "Elaborar algoritmos que envolvam instruções sequenciais, de repetição e de seleção usando uma linguagem de programação.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Elaborar algoritmos que envolvam instruções sequenciais, de repetição e de…"
  },
  {
    "code": "EF06CO03",
    "stage": "Ensino Fundamental",
    "substage": "6º ano",
    "description": "Descrever com precisão a solução de um problema, construindo o programa que implementa a solução descrita.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Descrever com precisão a solução de um problema, construindo o programa…"
  },
  {
    "code": "EF06CO04",
    "stage": "Ensino Fundamental",
    "substage": "6º ano",
    "description": "Construir soluções de problemas usando a técnica de decomposição e automatizar tais soluções usando uma linguagem de programação.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Construir soluções de problemas usando a técnica de decomposição e…"
  },
  {
    "code": "EF06CO05",
    "stage": "Ensino Fundamental",
    "substage": "6º ano",
    "description": "Identificar os recursos ou insumos necessários (entradas) para a resolução de problemas, bem como os resultados esperados (saídas), determinando os respectivos tipos de dados, e estabelecendo a definição de problema como uma relação entre entrada e saída.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Identificar os recursos ou insumos necessários (entradas) para a resolução…"
  },
  {
    "code": "EF06CO06",
    "stage": "Ensino Fundamental",
    "substage": "6º ano",
    "description": "Comparar diferentes casos particulares (instâncias) de um mesmo problema, identificando as semelhanças e diferenças entre eles, e criar um algoritmo para resolver todos, fazendo uso de variáveis (parâmetros) para permitir o tratamento de todos os casos de forma genérica.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Comparar diferentes casos particulares (instâncias) de um mesmo problema,…"
  },
  {
    "code": "EF06CO07",
    "stage": "Ensino Fundamental",
    "substage": "6º ano",
    "description": "Entender o processo de transmissão de dados, como a informação é quebrada em pedaços, transmitida em pacotes através de múltiplos equipamentos, e reconstruída no destino.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Entender o processo de transmissão de dados, como a informação é quebrada…"
  },
  {
    "code": "EF06CO08",
    "stage": "Ensino Fundamental",
    "substage": "6º ano",
    "description": "Compreender e utilizar diferentes formas de armazenar, manipular, compactar e recuperar arquivos, documentos e metadados.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Compreender e utilizar diferentes formas de armazenar, manipular,…"
  },
  {
    "code": "EF06CO09",
    "stage": "Ensino Fundamental",
    "substage": "6º ano",
    "description": "Apresentar conduta e linguagem apropriadas ao se comunicar em ambiente digital, considerando a ética e o respeito.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Apresentar conduta e linguagem apropriadas ao se comunicar em ambiente…"
  },
  {
    "code": "EF06CO10",
    "stage": "Ensino Fundamental",
    "substage": "6º ano",
    "description": "Analisar o consumo de tecnologia na sociedade, compreendendo criticamente o caminho da produção dos recursos bem como aspectos ligados à obsolescência e a sustentabilidade.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Analisar o consumo de tecnologia na sociedade, compreendendo criticamente…"
  },
  {
    "code": "EF07CO01",
    "stage": "Ensino Fundamental",
    "substage": "7º ano",
    "description": "Criar soluções de problemas para os quais seja adequado o uso de registros e matrizes unidimensionais para descrever suas informações e automatizá-las usando uma linguagem de programação.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar soluções de problemas para os quais seja adequado o uso de registros…"
  },
  {
    "code": "EF07CO02",
    "stage": "Ensino Fundamental",
    "substage": "7º ano",
    "description": "Analisar programas para detectar e remover erros, ampliando a confiança na sua correção.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Analisar programas para detectar e remover erros, ampliando a confiança na…"
  },
  {
    "code": "EF07CO03",
    "stage": "Ensino Fundamental",
    "substage": "7º ano",
    "description": "Construir soluções computacionais de problemas de diferentes áreas do conhecimento, de forma individual e colaborativa, selecionando as estruturas de dados e técnicas adequadas, aperfeiçoando e articulando saberes escolares.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Construir soluções computacionais de problemas de diferentes áreas do…"
  },
  {
    "code": "EF07CO04",
    "stage": "Ensino Fundamental",
    "substage": "7º ano",
    "description": "Explorar propriedades básicas de grafos.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Explorar propriedades básicas de grafos."
  },
  {
    "code": "EF07CO05",
    "stage": "Ensino Fundamental",
    "substage": "7º ano",
    "description": "Criar algoritmos fazendo uso da decomposição e do reúso no processo de solução de forma colaborativa e cooperativa e automatizá-los usando uma linguagem de programação.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar algoritmos fazendo uso da decomposição e do reúso no processo de…"
  },
  {
    "code": "EF07CO06",
    "stage": "Ensino Fundamental",
    "substage": "7º ano",
    "description": "Compreender o papel de protocolos para a transmissão de dados.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Compreender o papel de protocolos para a transmissão de dados."
  },
  {
    "code": "EF07CO07",
    "stage": "Ensino Fundamental",
    "substage": "7º ano",
    "description": "Identificar problemas de segurança cibernética e experimentar formas de proteção.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Identificar problemas de segurança cibernética e experimentar formas de…"
  },
  {
    "code": "EF07CO08",
    "stage": "Ensino Fundamental",
    "substage": "7º ano",
    "description": "Demonstrar empatia sobre opiniões divergentes na web.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Demonstrar empatia sobre opiniões divergentes na web."
  },
  {
    "code": "EF07CO09",
    "stage": "Ensino Fundamental",
    "substage": "7º ano",
    "description": "Reconhecer e debater sobre cyberbullying.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer e debater sobre cyberbullying."
  },
  {
    "code": "EF07CO10",
    "stage": "Ensino Fundamental",
    "substage": "7º ano",
    "description": "Identificar os impactos ambientais do descarte de peças de computadores e eletrônicos, bem como sua relação com a sustentabilidade.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Identificar os impactos ambientais do descarte de peças de computadores e…"
  },
  {
    "code": "EF07CO11",
    "stage": "Ensino Fundamental",
    "substage": "7º ano",
    "description": "Criar, documentar e publicar, de forma individual ou colaborativa, produtos (vídeos, podcasts, web sites) usando recursos de tecnologia.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar, documentar e publicar, de forma individual ou colaborativa,…"
  },
  {
    "code": "EF08CO01",
    "stage": "Ensino Fundamental",
    "substage": "8º ano",
    "description": "Construir soluções de problemas usando a técnica de recursão e automatizar tais soluções usando uma linguagem de programação.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Construir soluções de problemas usando a técnica de recursão e automatizar…"
  },
  {
    "code": "EF08CO02",
    "stage": "Ensino Fundamental",
    "substage": "8º ano",
    "description": "Criar soluções de problemas para os quais seja adequado o uso de listas para descrever suas informações e automatizá-las usando uma linguagem de programação, empregando ou não a recursão como uma técnica de resolver o problema.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar soluções de problemas para os quais seja adequado o uso de listas…"
  },
  {
    "code": "EF08CO03",
    "stage": "Ensino Fundamental",
    "substage": "8º ano",
    "description": "Utilizar algoritmos clássicos de manipulação sobre listas.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Utilizar algoritmos clássicos de manipulação sobre listas."
  },
  {
    "code": "EF08CO04",
    "stage": "Ensino Fundamental",
    "substage": "8º ano",
    "description": "Construir soluções computacionais de problemas de diferentes áreas do conhecimento, de forma individual e colaborativa, selecionando as estruturas de dados e técnicas adequadas, aperfeiçoando e articulando saberes escolares.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Construir soluções computacionais de problemas de diferentes áreas do…"
  },
  {
    "code": "EF08CO05",
    "stage": "Ensino Fundamental",
    "substage": "8º ano",
    "description": "Compreender os conceitos de paralelismo, concorrência e armazenamento/ processamento distribuídos.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Compreender os conceitos de paralelismo, concorrência e armazenamento/…"
  },
  {
    "code": "EF08CO06",
    "stage": "Ensino Fundamental",
    "substage": "8º ano",
    "description": "Entender como é a estrutura e funcionamento da internet.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Entender como é a estrutura e funcionamento da internet."
  },
  {
    "code": "EF08CO07",
    "stage": "Ensino Fundamental",
    "substage": "8º ano",
    "description": "Compartilhar informações por meio de redes sociais, compreendendo a sua dinâmica de funcionamento, de forma responsável e avaliando sua confiabilidade, considerando o respeito e a ética.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Compartilhar informações por meio de redes sociais, compreendendo a sua…"
  },
  {
    "code": "EF08CO08",
    "stage": "Ensino Fundamental",
    "substage": "8º ano",
    "description": "Distinguir os tipos de dados pessoais que são solicitados em espaços digitais e os riscos associados.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Distinguir os tipos de dados pessoais que são solicitados em espaços…"
  },
  {
    "code": "EF08CO09",
    "stage": "Ensino Fundamental",
    "substage": "8º ano",
    "description": "Analisar criticamente as políticas de termos de uso das redes sociais e demais plataformas.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Analisar criticamente as políticas de termos de uso das redes sociais e…"
  },
  {
    "code": "EF08CO10",
    "stage": "Ensino Fundamental",
    "substage": "8º ano",
    "description": "Discutir questões sobre segurança e privacidade relacionadas ao uso dos ambientes virtuais.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Discutir questões sobre segurança e privacidade relacionadas ao uso dos…"
  },
  {
    "code": "EF08CO11",
    "stage": "Ensino Fundamental",
    "substage": "8º ano",
    "description": "Avaliar a precisão, relevância, adequação, abrangência e vieses que ocorrem em fontes de informação eletrônica.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Avaliar a precisão, relevância, adequação, abrangência e vieses que…"
  },
  {
    "code": "EF09CO01",
    "stage": "Ensino Fundamental",
    "substage": "9º ano",
    "description": "Criar soluções de problemas para os quais seja adequado o uso de árvores e grafos para descrever suas informações e automatizá-las usando uma linguagem de programação.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar soluções de problemas para os quais seja adequado o uso de árvores e…"
  },
  {
    "code": "EF09CO02",
    "stage": "Ensino Fundamental",
    "substage": "9º ano",
    "description": "Construir soluções computacionais de problemas de diferentes áreas do conhecimento, de forma individual e colaborativa, selecionando as estruturas de dados e técnicas adequadas, aperfeiçoando e articulando saberes escolares.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Construir soluções computacionais de problemas de diferentes áreas do…"
  },
  {
    "code": "EF09CO03",
    "stage": "Ensino Fundamental",
    "substage": "9º ano",
    "description": "Usar autômatos para descrever comportamentos de forma abstrata automatizando-os através de uma linguagem de programação baseada em eventos.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Usar autômatos para descrever comportamentos de forma abstrata…"
  },
  {
    "code": "EF09CO04",
    "stage": "Ensino Fundamental",
    "substage": "9º ano",
    "description": "Compreender o funcionamento de malwares e outros ataques cibernéticos.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Compreender o funcionamento de malwares e outros ataques cibernéticos."
  },
  {
    "code": "EF09CO05",
    "stage": "Ensino Fundamental",
    "substage": "9º ano",
    "description": "Analisar técnicas de criptografia para armazenamento e transmissão de dados.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Analisar técnicas de criptografia para armazenamento e transmissão de dados."
  },
  {
    "code": "EF09CO06",
    "stage": "Ensino Fundamental",
    "substage": "9º ano",
    "description": "Analisar problemas sociais de sua cidade e estado a partir de ambientes digitais, propondo soluções.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Analisar problemas sociais de sua cidade e estado a partir de ambientes…"
  },
  {
    "code": "EF09CO07",
    "stage": "Ensino Fundamental",
    "substage": "9º ano",
    "description": "Avaliar aplicações e implicações políticas, socioambientais e culturais das tecnologias digitais para propor alternativas aos desafios do mundo contemporâneo, incluindo aqueles relativos ao mundo do trabalho.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Avaliar aplicações e implicações políticas, socioambientais e culturais…"
  },
  {
    "code": "EF09CO08",
    "stage": "Ensino Fundamental",
    "substage": "9º ano",
    "description": "Discutir como a distribuição desigual de recursos de computação em uma economia global levanta questões de equidade, acesso e poder.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Discutir como a distribuição desigual de recursos de computação em uma…"
  },
  {
    "code": "EF09CO09",
    "stage": "Ensino Fundamental",
    "substage": "9º ano",
    "description": "Criar ou utilizar conteúdo em meio digital, compreendendo questões éticas relacionadas a direitos autorais e de uso de imagem.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar ou utilizar conteúdo em meio digital, compreendendo questões éticas…"
  },
  {
    "code": "EF09CO10",
    "stage": "Ensino Fundamental",
    "substage": "9º ano",
    "description": "Avaliar a veracidade, credibilidade e relevância da informação em seus diferentes formatos, sendo capaz de identificar o propósito pelo qual foi disseminada.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Avaliar a veracidade, credibilidade e relevância da informação em seus…"
  },
  {
    "code": "EM13CO01",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Explorar e construir a solução de problemas por meio da reutilização de partes de soluções existentes.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Explorar e construir a solução de problemas por meio da reutilização de…"
  },
  {
    "code": "EM13CO02",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Explorar e construir a solução de problemas por meio de refinamentos, utilizando diversos níveis de abstração desde a especificação até a implementação.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Explorar e construir a solução de problemas por meio de refinamentos,…"
  },
  {
    "code": "EM13CO03",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Identificar o comportamento dos algoritmos no que diz respeito ao consumo de recursos como tempo de execução, espaço de memória e energia, entre outros.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Identificar o comportamento dos algoritmos no que diz respeito ao consumo…"
  },
  {
    "code": "EM13CO04",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Reconhecer o conceito de metaprogramação como uma forma de generalização na construção de programas, permitindo que algoritmos sejam entrada ou saída para outros algoritmos.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Reconhecer o conceito de metaprogramação como uma forma de generalização…"
  },
  {
    "code": "EM13CO05",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Identificar os limites da Computação para diferenciar o que pode ou não ser automatizado, buscando uma compreensão mais ampla dos limites dos processos mentais envolvidos na resolução de problemas.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Identificar os limites da Computação para diferenciar o que pode ou não…"
  },
  {
    "code": "EM13CO06",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Avaliar software levando em consideração diferentes características e métricas associadas.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Avaliar software levando em consideração diferentes características e…"
  },
  {
    "code": "EM13CO07",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Compreender as diferentes tecnologias, bem como equipamentos, protocolos e serviços envolvidos no funcionamento de redes de computadores, identificando suas possibilidades de escala e confiabilidade.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Redes de computadores"
  },
  {
    "code": "EM13CO08",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Entender como mudanças na tecnologia afetam a segurança, incluindo novas maneiras de preservar sua privacidade e dados pessoais on-line, reportando suspeitas e buscando ajuda em situações de risco.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Segurança, privacidade e proteção de dados"
  },
  {
    "code": "EM13CO09",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Identificar tecnologias digitais, sua presença e formas de uso, nas diferentes atividades no mundo do trabalho.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Identificar tecnologias digitais, sua presença e formas de uso, nas…"
  },
  {
    "code": "EM13CO10",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Conhecer os fundamentos da Inteligência Artificial, comparando-a com a inteligência humana, analisando suas potencialidades, riscos e limites.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Conhecer os fundamentos da Inteligência Artificial, comparando-a com a…"
  },
  {
    "code": "EM13CO11",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Criar e explorar modelos computacionais simples para simular e fazer previsões, identificando sua importância no desenvolvimento científico.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar e explorar modelos computacionais simples para simular e fazer…"
  },
  {
    "code": "EM13CO12",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Produzir, analisar, gerir e compartilhar informações a partir de dados, utilizando princípios de ciência de dados.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Produzir, analisar, gerir e compartilhar informações a partir de dados,…"
  },
  {
    "code": "EM13CO13",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Analisar e utilizar as diferentes formas de representação e consulta a dados em formato digital para pesquisas científicas.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Analisar e utilizar as diferentes formas de representação e consulta a…"
  },
  {
    "code": "EM13CO14",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Avaliar a confiabilidade das informações encontradas em meio digital, investigando seus modos de construção e considerando a autoria, a estrutura e o propósito da mensagem.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Avaliar a confiabilidade das informações encontradas em meio digital,…"
  },
  {
    "code": "EM13CO15",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Analisar a interação entre usuários e artefatos computacionais, abordando aspectos da experiência do usuário e promovendo reflexão sobre a qualidade do uso dos artefatos nas esferas do trabalho, do lazer e do estudo.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Analisar a interação entre usuários e artefatos computacionais, abordando…"
  },
  {
    "code": "EM13CO16",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Desenvolver projetos com robótica, utilizando artefatos físicos ou simuladores.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Desenvolver projetos com robótica, utilizando artefatos físicos ou…"
  },
  {
    "code": "EM13CO17",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Construir redes virtuais de interação e colaboração, favorecendo o desenvolvimento de projetos de forma segura, legal e ética.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Construir redes virtuais de interação e colaboração, favorecendo o…"
  },
  {
    "code": "EM13CO18",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Planejar e gerenciar projetos integrados às áreas de conhecimento de forma colaborativa, solucionando problemas, usando diversos artefatos computacionais.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Planejar e gerenciar projetos integrados às áreas de conhecimento de forma…"
  },
  {
    "code": "EM13CO19",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Expor, argumentar e negociar propostas, produtos e serviços, utilizando diferentes mídias e ferramentas digitais.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Expor, argumentar e negociar propostas, produtos e serviços, utilizando…"
  },
  {
    "code": "EM13CO20",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Criar conteúdos, disponibilizando-os em ambientes virtuais para publicação e compartilhamento, avaliando a confiabilidade e as consequências da disseminação dessas informações.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Criar conteúdos, disponibilizando-os em ambientes virtuais para publicação…"
  },
  {
    "code": "EM13CO21",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Comunicar ideias complexas de forma clara por meio de objetos digitais como mapas conceituais, infográficos, hipertextos e outros.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Comunicar ideias complexas de forma clara por meio de objetos digitais…"
  },
  {
    "code": "EM13CO22",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Produzir e publicar conteúdo como textos, imagens, áudios, vídeos e suas associações, bem como ferramentas para sua integração, organização e apresentação, utilizando diferentes mídias digitais.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Produzir e publicar conteúdo como textos, imagens, áudios, vídeos e suas…"
  },
  {
    "code": "EM13CO23",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Analisar criticamente as experiências em comunidades virtuais e as relações advindas da interação e comunicação com outras pessoas, bem como seus impactos na sociedade.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Analisar criticamente as experiências em comunidades virtuais e as…"
  },
  {
    "code": "EM13CO24",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Identificar e reconhecer como as redes sociais e artefatos computacionais em geral interferem na saúde física e mental de seus usuários.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Identificar e reconhecer como as redes sociais e artefatos computacionais…"
  },
  {
    "code": "EM13CO25",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Dialogar em ambientes virtuais com segurança e respeito às diferenças culturais e pessoais, reconhecendo e denunciando atitudes abusivas.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Dialogar em ambientes virtuais com segurança e respeito às diferenças…"
  },
  {
    "code": "EM13CO26",
    "stage": "Ensino Médio",
    "substage": "EM13 (código comum à etapa)",
    "description": "Aplicar os conceitos e pressupostos do direito digital em sua conduta e experiências com o cotidiano da cultura digital, bem como na produção e uso de artefatos computacionais.",
    "official": true,
    "source": "Computação na Educação Básica — Complemento à BNCC, MEC/CNE, 2022",
    "name": "Aplicar os conceitos e pressupostos do direito digital em sua conduta e…"
  }
];
const INITIAL_GAMES = [
  { id: 'jogo-modelo', title: 'Jogos Educativos', description: 'Prévia visual enviada para o protótipo. A atividade, o link e as condições de uso precisam ser validados pela curadoria.', image: 'image-modelo-jogo.jpg', icon: '⌘', skills: ['EM13CO07', 'EM13CO08'], concepts: ['redes de computadores', 'privacidade'], axis: 'Mundo Digital', type: 'Desafio', transversal: 'Cidadania digital e cultura digital', requirements: 'Navegador atualizado e conexão com a internet (a confirmar).', audience: 'Ensino Médio (a confirmar)', justification: 'Relação curricular pendente de validação do Curador.', before: 'Apresente o objetivo da atividade e combine como a turma vai compartilhar as descobertas.', during: 'Convide a turma a registrar decisões e a explicar como chegou a cada conclusão.', after: 'Promova uma conversa coletiva sobre as estratégias utilizadas e as situações percebidas.', assessment: 'Sugestão ao professor: peça uma justificativa oral ou escrita para as escolhas feitas. O sistema não avalia a aprendizagem.', limitations: 'A fonte, o link, a licença e a acessibilidade ainda precisam de verificação.', rating: 4.6, ratingCount: 12},
  { id: 'rota-dos-pacotes', title: 'Rota dos pacotes', description: 'Um desafio ilustrativo sobre caminhos percorridos por informações em uma rede.', image: '', icon: '⌘', skills: ['EM13CO07'], concepts: ['redes de computadores', 'pacotes de dados'], axis: 'Mundo Digital', type: 'Desafio', transversal: 'Geografia e comunicação', requirements: 'Navegador atualizado (a confirmar).', audience: 'Ensino Médio (a confirmar)', justification: 'Proposta ilustrativa de relação com redes; validação curricular pendente.', before: 'Pergunte o que os estudantes imaginam que acontece quando enviam uma mensagem.', during: 'Peça que observem por quais pontos uma informação poderia passar.', after: 'Compare as rotas imaginadas e converse sobre caminhos alternativos.', assessment: 'Sugestão ao professor: desenhar uma rota possível e explicar seus componentes.', limitations: 'Registro de demonstração: não corresponde a recurso validado nem informa licença real.', rating: 4.8, ratingCount: 9},
  { id: 'detetives-dados', title: 'Detetives dos dados', description: 'Uma prévia ilustrativa para explorar decisões sobre privacidade e circulação de dados.', image: '', icon: '◇', skills: ['EM13CO08'], concepts: ['privacidade', 'dados pessoais'], axis: 'Cultura Digital', type: 'Investigação', transversal: 'Cidadania e direitos digitais', requirements: 'Navegador atualizado (a confirmar).', audience: 'Ensino Médio (a confirmar)', justification: 'Proposta ilustrativa de relação com proteção de dados; validação pendente.', before: 'Conversem sobre situações em que um serviço pede informações pessoais.', during: 'Peça que identifiquem quais dados são necessários em cada situação.', after: 'Compare critérios de compartilhamento e de proteção.', assessment: 'Sugestão ao professor: solicitar uma explicação sobre como tomar uma decisão de compartilhamento.', limitations: 'Registro de demonstração: não corresponde a recurso validado nem informa licença real.', rating: 4.5, ratingCount: 7},
  { id: 'conexao-segura', title: 'Conexão segura', description: 'Uma prévia ilustrativa sobre segurança, privacidade e escolhas em ambientes digitais.', image: '', icon: '◎', skills: ['EM13CO07', 'EM13CO08'], concepts: ['segurança digital', 'redes', 'proteção de dados'], axis: 'Cultura Digital', type: 'Simulação', transversal: 'Cidadania digital', requirements: 'Navegador atualizado (a confirmar).', audience: 'Ensino Médio (a confirmar)', justification: 'Proposta ilustrativa de relação com redes e segurança; validação pendente.', before: 'Retome combinados de segurança e peça exemplos de decisões em serviços digitais.', during: 'Estimule a identificação de escolhas e consequências possíveis.', after: 'Reúna estratégias de proteção que a turma considera úteis.', assessment: 'Sugestão ao professor: propor uma justificativa de boas práticas aplicáveis ao contexto.', limitations: 'Registro de demonstração: não corresponde a recurso validado nem informa licença real.', rating: 4.4, ratingCount: 5}
];
const INITIAL_VOTES = [
  { id: 'v1', gameId: 'jogo-modelo', skill: 'EM13CO07', rating: 5, teacher: 'Ana Paula' },
  { id: 'v2', gameId: 'jogo-modelo', skill: 'EM13CO08', rating: 4, teacher: 'Ana Paula' },
  { id: 'v3', gameId: 'rota-dos-pacotes', skill: 'EM13CO07', rating: 5, teacher: 'Marcos' },
  { id: 'v4', gameId: 'detetives-dados', skill: 'EM13CO08', rating: 4, teacher: 'Marcos' },
  { id: 'v5', gameId: 'conexao-segura', skill: 'EM13CO07', rating: 4, teacher: 'Ana Paula' },
  { id: 'v6', gameId: 'conexao-segura', skill: 'EM13CO08', rating: 5, teacher: 'Marcos' }
];
const INITIAL_COMMENTS = [
  { id: 'c1', gameId: 'rota-dos-pacotes', skill: 'EM13CO07', teacher: 'Ana Paula', text: 'Ajudou a iniciar uma conversa sobre caminhos alternativos para uma mensagem.', date: '2026-10-20' },
  { id: 'c2', gameId: 'conexao-segura', skill: 'EM13CO08', teacher: 'Marcos', text: 'Sugiro reservar alguns minutos para discutir as escolhas depois da atividade.', date: '2026-10-22' }
];
window.TRAIL_DATA = { skills: SKILLS, games: INITIAL_GAMES, votes: INITIAL_VOTES, comments: INITIAL_COMMENTS };
})();
