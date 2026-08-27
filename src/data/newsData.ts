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

// Política editorial: o portal publica apenas estudos próprios da ANZA e
// informações institucionais da ANC ou da Justiça Eleitoral (TSE/TRE).
export const newsArticles: Article[] = [
  {
    id: 1,
    label: 'PESQUISA PRÓPRIA · GOVERNADOR',
    category: 'Eleitoral',
    state: 'CEARÁ',
    officeTag: 'ESTUDO ANZA',
    title: 'Pesquisa ANZA Ceará 2026: cenários para Governo, Senado e avaliações',
    subtitle: 'Levantamento próprio com 1.225 entrevistas em 34 municípios, registrado na Justiça Eleitoral.',
    img: '/urna_eletronica_brasil.jpg',
    date: '25 AGOSTO 2026',
    readTime: '4 min',
    author: 'Equipe de Análise Política ANZA',
    sourceName: 'ANZA',
    highlights: [
      'Pesquisa produzida e divulgada pela própria ANZA',
      'Amostra de 1.225 entrevistas em 34 municípios',
      'Registro TSE CE-07550/2026'
    ],
    content: [
      'O estudo eleitoral da ANZA apresenta os cenários de intenção de voto e avaliação de governo no Ceará com metodologia, amostra e ficha técnica disponíveis no relatório completo.',
      'A divulgação preserva a rastreabilidade dos dados e se limita ao levantamento produzido pela própria instituição.'
    ],
    stats: [
      { label: 'Entrevistas', value: '1.225', change: '34 municípios' },
      { label: 'Margem', value: '±2,8%', change: '95% confiança' }
    ]
  },
  {
    id: 2,
    label: 'JUSTIÇA ELEITORAL · CALENDÁRIO',
    category: 'Serviços',
    state: 'BRASIL',
    officeTag: 'TSE',
    title: 'Eleições 2026: confira as principais datas do calendário eleitoral',
    subtitle: 'O calendário oficial reúne os marcos das Eleições Gerais de 2026 e as datas dos dois turnos.',
    img: '/urna_eletronica_brasil.jpg',
    date: '06 MARÇO 2026',
    readTime: '3 min',
    author: 'Tribunal Superior Eleitoral',
    sourceName: 'TSE',
    sourceUrl: 'https://www.tse.jus.br/comunicacao/noticias/2026/Marco/eleicoes-2026-confira-as-principais-datas-do-calendario-eleitoral',
    highlights: [
      'Primeiro turno marcado para 4 de outubro de 2026',
      'Eventual segundo turno marcado para 25 de outubro de 2026',
      'Calendário estabelecido pela Resolução TSE nº 23.760/2026'
    ],
    content: [
      'O Tribunal Superior Eleitoral publicou o calendário oficial das Eleições Gerais de 2026, com prazos para eleitoras, eleitores, partidos, federações e candidaturas.',
      'Consulte sempre a publicação oficial do TSE para acompanhar prazos, regras e eventuais atualizações.'
    ]
  },
  {
    id: 3,
    label: 'JUSTIÇA ELEITORAL · RESULTADOS',
    category: 'Serviços',
    state: 'BRASIL',
    officeTag: 'TSE',
    title: 'TSE divulga orientações técnicas para os resultados das Eleições 2026',
    subtitle: 'Página oficial reúne documentação para instituições interessadas em receber e divulgar resultados eleitorais.',
    img: '/congresso_brasilia.jpg',
    date: '06 JULHO 2026',
    readTime: '3 min',
    author: 'Tribunal Superior Eleitoral',
    sourceName: 'TSE',
    sourceUrl: 'https://www.tse.jus.br/eleicoes/informacoes-tecnicas-sobre-a-divulgacao-de-resultados',
    highlights: [
      'Resultados oficiais fornecidos pela Justiça Eleitoral',
      'Documentação técnica disponível no portal do TSE',
      'Em 2026, cada eleitor poderá votar em dois candidatos ao Senado'
    ],
    content: [
      'O TSE disponibiliza informações técnicas para o recebimento e a divulgação dos resultados oficiais das Eleições Gerais de 2026.',
      'Para o Senado, embora cada eleitor possa votar em dois candidatos, a divulgação técnica trata o cargo de senador como um único cargo com duas vagas em disputa.'
    ]
  },
  {
    id: 4,
    label: 'COMUNICAÇÃO · POLÍTICA EDITORIAL',
    category: 'Institucional',
    state: 'CEARÁ',
    officeTag: 'ANC',
    title: 'ANC reforça compromisso com informação própria e fontes eleitorais oficiais',
    subtitle: 'O portal prioriza estudos produzidos pela ANZA e comunicados institucionais da Justiça Eleitoral.',
    img: '/plenario_camara_brasil.jpg',
    date: '27 AGOSTO 2026',
    readTime: '2 min',
    author: 'Comunicação ANC',
    sourceName: 'ANC',
    highlights: [
      'Pesquisas publicadas somente quando produzidas pela ANZA',
      'Conteúdo eleitoral institucional baseado em TSE e TRE',
      'Sem reprodução de pesquisas de outros institutos ou veículos'
    ],
    content: [
      'A política editorial do portal estabelece que resultados de pesquisas eleitorais somente serão publicados quando o levantamento tiver sido produzido pela própria ANZA.',
      'Notícias de serviço e informações sobre o processo eleitoral terão como referência a ANC e os canais oficiais do TSE e dos Tribunais Regionais Eleitorais.'
    ]
  }
];
