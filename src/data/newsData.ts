export interface Article {
  id: number;
  label: string;
  category: 'Eleitoral' | 'Institucional' | 'Serviços';
  state?: string;
  officeTag?: string;
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

// Política editorial: o portal publica estudos próprios da Algoritma Dados e
// informações institucionais atualizadas da Justiça Eleitoral (TSE/TRE-CE).
export const newsArticles: Article[] = [
  {
    id: 1,
    label: 'JUSTIÇA ELEITORAL · PRESTAÇÃO DE CONTAS',
    category: 'Serviços',
    state: 'BRASIL',
    officeTag: 'TSE',
    title: 'TSE encerra prazos de prestação de contas do 1º e 2º turnos via CONTA+JE',
    subtitle: 'Envio final do 2º turno foi prorrogado para 16 de novembro pela plataforma digital unificada da Justiça Eleitoral.',
    img: '/urna_eletronica_brasil.jpg',
    date: '16 NOVEMBRO 2026',
    readTime: '3 min',
    author: 'Tribunal Superior Eleitoral',
    sourceName: 'TSE',
    sourceUrl: 'https://www.tse.jus.br/',
    highlights: [
      'Prazo do 1º turno encerrado em 3 de novembro de 2026',
      'Entrega do 2º turno prorrogada para 16 de novembro de 2026',
      'Envio integralmente digital pela nova plataforma CONTA+JE'
    ],
    content: [
      'Candidaturas e partidos políticos concluíram em novembro a entrega das prestações de contas finais das Eleições Gerais de 2026 por meio do sistema CONTA+JE.',
      'A ferramenta eliminou a necessidade de entrega física de mídias e integrou validações automáticas para agilizar a análise antes da diplomação.'
    ],
    stats: [
      { label: '1º Turno', value: '03/11', change: 'Prazo encerrado' },
      { label: '2º Turno', value: '16/11', change: 'Prorrogado TSE' }
    ]
  },
  {
    id: 2,
    label: 'JUSTIÇA ELEITORAL · TOTALIZAÇÃO',
    category: 'Institucional',
    state: 'CEARÁ',
    officeTag: 'TRE-CE',
    title: 'TRE-CE homologa por unanimidade a totalização definitiva do 2º turno no Ceará',
    subtitle: 'Corte eleitoral cearense encerrou o exame sem pendências e encaminhou comunicações ao TSE para diplomação.',
    img: '/plenario_camara_brasil.jpg',
    date: '05 NOVEMBRO 2026',
    readTime: '3 min',
    author: 'Tribunal Regional Eleitoral do Ceará',
    sourceName: 'TRE-CE',
    sourceUrl: 'https://www.tre-ce.jus.br/',
    highlights: [
      'Relatório de Totalização aprovado por unanimidade em 5 de novembro',
      'Ausência de reclamações pendentes após os prazos legais',
      'Liberação oficial dos trâmites para proclamação e diplomação'
    ],
    content: [
      'Em sessão plenária realizada em 5 de novembro de 2026, o TRE do Ceará homologou definitivamente o Relatório de Totalização do segundo turno no estado.',
      'Com o esgotamento dos prazos previstos na Resolução TSE nº 23.751/2026 e na Resolução TRE-CE nº 1.128/2026, a Corte encaminhou os autos ao TSE para os atos de diplomação.'
    ]
  },
  {
    id: 3,
    label: 'JUSTIÇA ELEITORAL · CALENDÁRIO PÓS-PLEITO',
    category: 'Serviços',
    state: 'BRASIL',
    officeTag: 'TSE',
    title: 'Diplomação até 18 de dezembro e novas datas de posse em janeiro de 2027',
    subtitle: 'Calendário oficial define prazos de justificativa de ausência, diplomação dos eleitos e posses presidenciais e estaduais.',
    img: '/congresso_brasilia.jpg',
    date: '12 NOVEMBRO 2026',
    readTime: '4 min',
    author: 'Tribunal Superior Eleitoral',
    sourceName: 'TSE',
    sourceUrl: 'https://www.tse.jus.br/',
    highlights: [
      '03/12/2026: prazo final para justificar ausência no 1º turno',
      '18/12/2026: data limite para todas as cerimônias de diplomação',
      '05/01/2027 e 06/01/2027: posses do Presidente e Governadores (EC 111/2021)'
    ],
    content: [
      'Com o fim da votação, o calendário da Justiça Eleitoral estabelece o dia 18 de dezembro de 2026 como limite legal para a diplomação de presidente, governadores, senadores e deputados eleitos.',
      'Pela Emenda Constitucional nº 111/2021, a posse do Presidente da República ocorrerá em 5 de janeiro de 2027 e a dos governadores em 6 de janeiro de 2027. Eleitores ausentes têm até 3 de dezembro (1º turno) e 8 de janeiro (2º turno) para justificar.'
    ],
    stats: [
      { label: 'Diplomação', value: '18/12', change: 'Prazo limite' },
      { label: 'Posse Pres.', value: '05/01', change: 'EC 111/2021' },
      { label: 'Posse Gov.', value: '06/01', change: 'Estados e DF' }
    ]
  },
  {
    id: 4,
    label: 'ESTUDO ALGORITMA · RESULTADOS 2026',
    category: 'Eleitoral',
    state: 'CEARÁ',
    officeTag: 'ALGORITMA',
    title: 'Balanço Eleições 2026 no Ceará: reeleição em 1º turno e bancadas definidas',
    subtitle: 'Análise consolidada da Algoritma Dados cruza dados oficiais do TSE para Presidente, Governador, Câmara Federal e Alece.',
    img: '/palacio_governo_brasil.jpg',
    date: '28 OUTUBRO 2026',
    readTime: '5 min',
    author: 'Equipe de Análise Política Algoritma Dados',
    sourceName: 'Algoritma Dados',
    highlights: [
      'Elmano de Freitas (PT) reeleito governador no 1º turno com 53,19%',
      'Lula (PT) alcançou 68,93% no Ceará no 2º turno, vencendo nos 184 municípios',
      'Alece renovou 56,5% das 46 cadeiras e atingiu recorde de 14 mulheres eleitas'
    ],
    content: [
      'Os números finais do TSE confirmaram a força do eleitorado cearense e nordestino no pleito de 2026, com definição estadual ainda no primeiro turno e ampliação expressiva no segundo turno presidencial.',
      'No Legislativo, a bancada federal do Ceará (22 vagas) teve liderança de PL e PSB (4 cadeiras cada), enquanto a Alece registrou 56,5% de renovação entre as 46 vagas.'
    ],
    stats: [
      { label: 'Gov. 1º Turno', value: '53,19%', change: 'Elmano (PT)' },
      { label: 'Pres. CE 2ºT', value: '68,93%', change: '184/184 cidades' }
    ]
  },
  {
    id: 5,
    label: 'JUSTIÇA ELEITORAL · BALANÇO NACIONAL',
    category: 'Institucional',
    state: 'BRASIL',
    officeTag: 'TSE',
    title: 'TSE disponibiliza Painel de Evolução da Totalização com dados completos de 2026',
    subtitle: 'Ferramenta interativa permite auditar e comparar resultados de 1º e 2º turnos por estado, município e zona eleitoral.',
    img: '/urna_eletronica_brasil.jpg',
    date: '30 OUTUBRO 2026',
    readTime: '3 min',
    author: 'Tribunal Superior Eleitoral',
    sourceName: 'TSE',
    sourceUrl: 'https://www.tse.jus.br/',
    highlights: [
      'Totalização 100% concluída no 2º turno em 25 de outubro de 2026',
      'Lula (PT) obteve 51,79% (64,25M votos) contra 48,21% de Flávio Bolsonaro (PL)',
      'Dados abertos disponíveis por município e seção eleitoral'
    ],
    content: [
      'O Tribunal Superior Eleitoral colocou no ar o Painel de Evolução da Totalização das Eleições Gerais de 2026, reforçando a transparência dos dados apurados em todo o país.',
      'No 2º turno nacional, foram contabilizados 124.082.273 votos válidos, com participação decisiva do Nordeste para a virada presidencial.'
    ]
  },
  {
    id: 6,
    label: 'ESTUDO ALGORITMA · NORDESTE',
    category: 'Eleitoral',
    state: 'NORDESTE',
    officeTag: 'ALGORITMA',
    title: 'Nordeste foi a única região onde Lula venceu em todos os estados nos dois turnos',
    subtitle: 'Levantamentos de Datafolha, Quaest e AtlasIntel convergiram com a apuração do TSE ao apontar mais de 24,4M de votos no 2º turno.',
    img: '/congresso_brasilia.jpg',
    date: '26 OUTUBRO 2026',
    readTime: '4 min',
    author: 'Núcleo Regional Algoritma Dados',
    sourceName: 'Algoritma Dados',
    highlights: [
      'Faixa de 53% a 60% nas pesquisas estimuladas de 1º turno na região',
      'Crescimento consistente de votos válidos entre o 1º e o 2º turno',
      'Mais de 24,4 milhões de votos válidos para Lula no Nordeste no 2º turno'
    ],
    content: [
      'A análise comparativa entre as pesquisas finais de Datafolha, Quaest e AtlasIntel e os boletins de urna do TSE confirma o peso determinante do Nordeste no resultado nacional de 2026.',
      'No Ceará, o desempenho saltou de 63,29% no 1º turno (183 de 184 municípios) para 68,93% no 2º turno (184 de 184 municípios).'
    ]
  }
];
