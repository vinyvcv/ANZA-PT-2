export interface Article {
  id: number;
  label: string;
  category: 'Eleitoral' | 'Mercado' | 'Opinião' | 'Tecnologia' | 'Agro' | 'Finanças' | 'Social' | 'Varejo' | 'Cidades';
  state?: string;
  officeTag?: string; // 'PRESIDENTE' | 'GOVERNADOR' | 'SENADOR (2 VAGAS)' | 'DEP. FEDERAL' | 'DEP. ESTADUAL' | 'DEP. DISTRITAL'
  title: string;
  subtitle: string;
  img: string;
  date: string;
  readTime: string;
  author: string;
  sourceName?: string;
  sourceUrl?: string;
  highlights: string[];
  content: string[];
  stats?: { label: string; value: string; change?: string }[];
}

export const newsArticles: Article[] = [
  {
    id: 1,
    label: 'ELEITORAL · GOVERNADOR',
    category: 'Eleitoral',
    state: 'CEARÁ',
    officeTag: 'GOVERNADOR',
    title: 'Disputa ao Governo do Ceará em 2026: Pesquisa ANZA indica consolidação de alianças e 2º turno',
    subtitle: 'Levantamento quantitativo com 1.225 eleitores em 34 municípios detalha espontânea, estimulada e índice de rejeição.',
    img: '/urna_eletronica_brasil.jpg',
    date: '25 AGOSTO 2026',
    readTime: '4 min',
    author: 'Equipe de Análise Política ANZA',
    sourceName: 'G1 Ceará',
    sourceUrl: 'https://g1.globo.com/ce/ceara/',
    highlights: [
      'Ciro Gomes lidera intenção estimulada na região metropolitana de Fortaleza',
      'Elmano de Freitas mantém índices de aprovação estáveis em 56.4%',
      'Taxa de indecisos na pesquisa espontânea recua para 18.4%'
    ],
    content: [
      'A nova rodada de pesquisas do Instituto ANZA realizada na terceira semana de agosto detalha o xadrez político para o Palácio da Abolição.',
      'A consolidação dos blocos partidários sugere uma eleição altamente competitiva no Ceará com grande dependência da migração dos votos nulos e brancos.'
    ],
    stats: [
      { label: 'Indecisos', value: '18.4%', change: '-3.2%' },
      { label: 'Fidelidade', value: '64.1%', change: '+3.8%' },
      { label: 'Margem', value: '±2.8%' }
    ]
  },
  {
    id: 2,
    label: 'ELEITORAL · SENADOR',
    category: 'Eleitoral',
    state: 'CEARÁ',
    officeTag: 'SENADOR (2 VAGAS)',
    title: 'Corrida ao Senado no Ceará: Disputa pelas duas vagas esquenta bastidores partidários',
    subtitle: 'Com renovação de 2/3 do Senado em 2026, eleitor cearense poderá votar em dois nomes na mesma urna.',
    img: '/congresso_brasilia.jpg',
    date: '24 AGOSTO 2026',
    readTime: '4 min',
    author: 'Núcleo de Inteligência ANZA',
    sourceName: 'O POVO',
    sourceUrl: 'https://www.opovo.com.br/',
    highlights: [
      'Capitão Wagner e Eunício Oliveira aparecem bem posicionados nas simulações de 1º voto',
      'Cid Gomes e Roberto Cláudio disputam influência no eleitorado do interior',
      'Alta taxa de indecisão para a segunda vaga ao Senado chega a 42%'
    ],
    content: [
      'A renovação de dois terços das cadeiras do Senado Federal em 2026 transforma a disputa cearense em uma das mais estratégicas do Nordeste.',
      'O comportamento do eleitor em relação ao segundo voto tende a se definir apenas na reta final da propaganda eleitoral gratuita.'
    ],
    stats: [
      { label: 'Cadeiras', value: '2 Vagas', change: '2/3 Renovação' },
      { label: 'Indecisos 2º Voto', value: '42.0%', change: 'Potencial' }
    ]
  },
  {
    id: 3,
    label: 'ELEITORAL · PRESIDENTE',
    category: 'Eleitoral',
    state: 'BRASÍLIA',
    officeTag: 'PRESIDENTE',
    title: 'Pesquisa Nacional 2026: Avaliação de governo e intenção de voto à Presidência no Nordeste',
    subtitle: 'Amostragem nacional com 3.500 entrevistas aponta estabilidade na região Nordeste e polarização no Sudeste.',
    img: '/urna_eletronica_brasil.jpg',
    date: '23 AGOSTO 2026',
    readTime: '5 min',
    author: 'Observatório Político ANZA',
    sourceName: 'Agência Brasil',
    sourceUrl: 'https://agenciabrasil.ebc.com.br/',
    highlights: [
      'Lula mantém vantagem consolidada nos estados nordestinos acima de 58%',
      'Oposição ganha tração no interior de São Paulo e região Sul',
      'Pauta econômica e inflação de alimentos são determinantes no eleitor médio'
    ],
    content: [
      'A um ano do pleito presidencial de 2026, os dados nacionais consolidados pelo Instituto ANZA apontam um eleitorado polarizado e altamente engajado.',
      'O desempenho econômico no último trimestre do ano será o fator decisivo para a conversão do eleitor de centro.'
    ],
    stats: [
      { label: 'Amostra Nac.', value: '3.500', change: 'Probabilística' },
      { label: 'Margem Nac.', value: '±1.8%', change: '95% Confiança' }
    ]
  },
  {
    id: 4,
    label: 'ELEITORAL · DEP. FEDERAL',
    category: 'Eleitoral',
    state: 'SÃO PAULO',
    officeTag: 'DEP. FEDERAL',
    title: 'Bancada Federal SP 2026: Projeção de quociente partidário e renovação na Câmara',
    subtitle: 'Simulação ANZA prevê disputa acirrada pelas 70 cadeiras paulistas na Câmara dos Deputados em Brasília.',
    img: '/plenario_camara_brasil.jpg',
    date: '21 AGOSTO 2026',
    readTime: '4 min',
    author: 'Mesa Eleitoral ANZA',
    sourceName: 'Valor Econômico',
    sourceUrl: 'https://valor.globo.com/',
    highlights: [
      'Quociente eleitoral estimado em 310 mil votos por cadeira de Deputado Federal',
      'Puxadores de voto tradicionais devem concentrar até 35% do total da bancada',
      'Federações partidárias alteram cálculo da sobra eleitoral'
    ],
    content: [
      'A disputa pelas 70 vagas da bancada de São Paulo na Câmara dos Deputados movimentará somas recordes de fundos partidários e alianças estratégicas.'
    ]
  },
  {
    id: 5,
    label: 'ELEITORAL · DEP. ESTADUAL',
    category: 'Eleitoral',
    state: 'BAHIA',
    officeTag: 'DEP. ESTADUAL',
    title: 'Assembleia da Bahia 2026: Mapeamento de forças regionais para a ALBA',
    subtitle: 'Estudo detalha as bases eleitorais dos pré-candidatos a Deputado Estadual no Oeste e Recôncavo.',
    img: '/plenario_camara_brasil.jpg',
    date: '20 AGOSTO 2026',
    readTime: '3 min',
    author: 'Equipe de Análise Política ANZA',
    sourceName: 'A Tarde',
    sourceUrl: 'https://atarde.com.br/',
    highlights: [
      'Disputa pelas 63 cadeiras da ALBA tem pulverização no interior baiano',
      'Prefeitos aliados fortalecem votação de pré-candidatos majoritários',
      'Representatividade do agronegócio cresce na região de Barreiras'
    ],
    content: [
      'O mapeamento territorial do voto para Deputado Estadual na Bahia mostra como as lideranças municipais continuam sendo a espinha dorsal de votações expressivas.'
    ]
  },
  {
    id: 6,
    label: 'ELEITORAL · GOVERNADOR',
    category: 'Eleitoral',
    state: 'MARANHÃO',
    officeTag: 'GOVERNADOR',
    title: 'Eleições Maranhão 2026: Pesquisa desenha quadros de segundo turno no Palácio dos Leões',
    subtitle: 'Com forte alinhamento federal, pré-candidatos medem forças na região metropolitana de São Luís.',
    img: '/palacio_governo_brasil.jpg',
    date: '19 AGOSTO 2026',
    readTime: '4 min',
    author: 'Núcleo Maranhão ANZA',
    sourceName: 'O Imparcial',
    sourceUrl: 'https://oimparcial.com.br/',
    highlights: [
      'Carlos Brandão articula sucessão com apoio de bancada governista',
      'Oposição aposta em discurso de investimentos em infraestrutura e empregos',
      'Taxa de aprovação da gestão estadual permanece em 54%'
    ],
    content: [
      'A corrida pelo Palácio dos Leões em 2026 ganha contornos definitivos com a formação das chapas proporcionais e majoritárias.'
    ]
  },
  {
    id: 7,
    label: 'ELEITORAL · SENADOR',
    category: 'Eleitoral',
    state: 'PERNAMBUCO',
    officeTag: 'SENADOR (2 VAGAS)',
    title: 'Senado em Pernambuco: 2 vagas abertas agitam alianças partidárias',
    subtitle: 'Disputa promovida pelo término de mandatos no Senado gera intensa movimentação entre ex-governadores e deputados.',
    img: '/congresso_brasilia.jpg',
    date: '17 AGOSTO 2026',
    readTime: '3 min',
    author: 'Laboratório ANZA Data',
    sourceName: 'JC Pernambuco',
    sourceUrl: 'https://jc.ne10.uol.com.br/',
    highlights: [
      'Humberto Costa e Raquel Lyra medem articulações para chapas majoritárias',
      'Votação no Agreste e Sertão pernambucano será decisiva',
      'Eleitorado jovem demonstra maior exigência por propostas de trabalho'
    ],
    content: [
      'Com duas cadeiras em disputa para o Senado Federal em Pernambuco, os partidos calculam os riscos de composições isoladas frente às federações.'
    ]
  },
  {
    id: 8,
    label: 'ELEITORAL · DEP. DISTRITAL',
    category: 'Eleitoral',
    state: 'DISTRITO FEDERAL',
    officeTag: 'DEP. DISTRITAL',
    title: 'Câmara Legislativa do DF 2026: Projeção de cadeiras e novos nomes para a CLDF',
    subtitle: 'Levantamento da ANZA nas 35 Regiões Administrativas do DF mapeia votação dos distritais.',
    img: '/plenario_camara_brasil.jpg',
    date: '15 AGOSTO 2026',
    readTime: '4 min',
    author: 'Análise Política ANZA DF',
    sourceName: 'Portal TSE',
    sourceUrl: 'https://www.tse.jus.br/',
    highlights: [
      'Disputa pelas 24 vagas de Deputado Distrital na CLDF traz alta renovação',
      'Ceilândia, Samambaia e Taguatinga concentram os maiores colégios eleitorais',
      'Servidores públicos e segurança formam pautas dominantes'
    ],
    content: [
      'A dinâmica eleitoral do Distrito Federal apresenta características únicas, com forte apelo das pautas locais de transporte e serviços públicos.'
    ]
  },
  {
    id: 9,
    label: 'MERCADO & LOGÍSTICA',
    category: 'Mercado',
    state: 'MARANHÃO',
    title: 'Expansão do Complexo de Itaqui atrai R$ 4,2 bilhões em investimentos privados',
    subtitle: 'Novos berços de atracação e terminais de grãos fortalecem a posição do Maranhão no escoamento de safras.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    date: '14 AGOSTO 2026',
    readTime: '4 min',
    author: 'Núcleo de Inteligência Econômica ANZA',
    sourceName: 'O Imparcial',
    sourceUrl: 'https://oimparcial.com.br/',
    highlights: [
      'Aumento de 22% na capacidade de embarque de grãos e biocombustíveis',
      'Geração estimada de mais de 4.500 empregos diretos e indiretos'
    ],
    content: [
      'O Porto de Itaqui consolidou seu papel estratégico como um dos principais hubs de exportação do Arco Norte brasileiro.'
    ]
  },
  {
    id: 10,
    label: 'AGRO & TECNOLOGIA',
    category: 'Agro',
    state: 'BAHIA',
    title: 'Oeste baiano atinge marca histórica na produção de algodão sustentável',
    subtitle: 'Uso de sistemas de irrigação inteligente com energia solar impulsiona exportações.',
    img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    date: '12 AGOSTO 2026',
    readTime: '3 min',
    author: 'Observatório Agribusiness ANZA',
    sourceName: 'A Tarde',
    sourceUrl: 'https://atarde.com.br/',
    highlights: [
      '92% da safra baiana de algodão obteve certificação socioambiental internacional',
      'Redução de 25% no consumo de água no campo'
    ],
    content: [
      'O balanço consolidado da colheita no oeste da Bahia confirma a liderança tecnológica do estado no agronegócio brasileiro.'
    ]
  },
  {
    id: 11,
    label: 'ENERGIA & INDÚSTRIA',
    category: 'Cidades',
    state: 'CEARÁ',
    title: 'HUB de Hidrogênio Verde no Pecém conclui 1ª fase de infraestrutura civil',
    subtitle: 'Parceria internacional projeta início das operações de exportação de amônia verde para 2027.',
    img: '/palacio_governo_brasil.jpg',
    date: '10 AGOSTO 2026',
    readTime: '4 min',
    author: 'Setor de Indústria & Infra ANZA',
    sourceName: 'O POVO',
    sourceUrl: 'https://www.opovo.com.br/',
    highlights: [
      'Conclusão da terraplenagem dos parques fabris no Complexo do Pecém',
      'Memorandos de entendimento superam US$ 30 bilhões em investimentos'
    ],
    content: [
      'O progresso das obras no Pecém confirma a vocação do Ceará como centro de energias limpas para o continente europeu.'
    ]
  },
  {
    id: 12,
    label: 'FINANÇAS PÚBLICAS',
    category: 'Finanças',
    state: 'SÃO PAULO',
    title: 'Mercado de capitais registra recorde de emissões de títulos verdes estaduais',
    subtitle: 'Debêntures incentivadas para obras de saneamento e mobilidade urbana captam R$ 12 bilhões.',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    date: '08 AGOSTO 2026',
    readTime: '3 min',
    author: 'Mesa de Análise Financeira ANZA',
    sourceName: 'Valor Econômico',
    sourceUrl: 'https://valor.globo.com/',
    highlights: [
      'Sobredemanda de 2.4 vezes o volume ofertado por investidores institucionais',
      'Taxas de remuneração atrativas atreladas ao IPCA com isenção fiscal'
    ],
    content: [
      'A captação recorde sinaliza forte confiança do mercado na gestão fiscal e em ativos de infraestrutura.'
    ]
  }
];
