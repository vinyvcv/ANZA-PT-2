export interface ElectoralCandidateRow {
  name: string;
  value: number;
  votes?: string;
  party?: string;
  color: string;
}

export interface LegislativeSeatRow {
  party: string;
  seats: number;
  color: string;
  highlights?: string;
}

export const electoral2026Data = {
  president: {
    ceFirstTurn: {
      title: 'Ceará — 1º Turno Oficial (TSE · 04/10/2026)',
      subtitle: 'Lula venceu em 183 dos 184 municípios cearenses no 1º turno.',
      turnout: '5.910.471 eleitores (84,50%) · Válidos: 5.617.814',
      data: [
        { name: 'Lula (PT)', value: 63.29, votes: '3.555.263 votos', party: 'PT', color: '#ef4444' },
        { name: 'Flávio Bolsonaro (PL)', value: 31.27, votes: '1.756.850 votos', party: 'PL', color: '#3b82f6' },
      ] as ElectoralCandidateRow[],
    },
    ceSecondTurn: {
      title: 'Ceará — 2º Turno Oficial (TSE · 25/10/2026)',
      subtitle: 'Lula venceu em todos os 184 municípios do Ceará no 2º turno.',
      turnout: '6.024.843 eleitores (86,11%) · Diferença: 2.216.646 votos',
      data: [
        { name: 'Lula (PT)', value: 68.93, votes: '4.036.124 votos', party: 'PT', color: '#ef4444' },
        { name: 'Flávio Bolsonaro (PL)', value: 31.07, votes: '1.819.478 votos', party: 'PL', color: '#3b82f6' },
      ] as ElectoralCandidateRow[],
    },
    brSecondTurn: {
      title: 'Brasil — 2º Turno Oficial (TSE · 25/10/2026)',
      subtitle: 'Virada nacional no 2º turno consolidou a reeleição presidencial.',
      turnout: 'Total de votos válidos: 124.082.273',
      data: [
        { name: 'Lula (PT)', value: 51.79, votes: '64.256.232 votos', party: 'PT', color: '#ef4444' },
        { name: 'Flávio Bolsonaro (PL)', value: 48.21, votes: '59.826.041 votos', party: 'PL', color: '#3b82f6' },
      ] as ElectoralCandidateRow[],
    },
    northeastOverview: {
      title: 'Região Nordeste — Panorama de Pesquisas & Urnas 2026',
      subtitle: 'Única região onde Lula venceu em todos os estados no 1º e no 2º turno (Datafolha, Quaest, AtlasIntel e TSE).',
      highlights: [
        { label: 'Faixa 1º Turno (Lula)', value: '53% – 60%', sub: 'Datafolha / Quaest / AtlasIntel' },
        { label: 'Faixa 1º Turno (Flávio)', value: '20% – 25%', sub: 'Média regional estimulada' },
        { label: 'Votos Válidos 2º Turno', value: '24,4M+', sub: 'Lula no Nordeste (TSE)' },
        { label: 'Liderança Ceará (2º Turno)', value: '68,93%', sub: '184 de 184 municípios' },
      ],
    },
  },

  governorCE: {
    officialFirstTurn: {
      title: 'Resultado Oficial 1º Turno — Ceará (TSE · 04/10/2026)',
      subtitle: 'Disputa definida logo no 1º turno, sem necessidade de 2º turno no estado.',
      data: [
        { name: 'Elmano de Freitas (PT)', value: 53.19, votes: '2.875.573 votos', party: 'PT', color: '#ef4444' },
        { name: 'Ciro Gomes (PSDB)', value: 46.22, votes: '2.498.891 votos', party: 'PSDB', color: '#3b82f6' },
        { name: 'Delegado Huggo (MISSÃO)', value: 0.32, votes: '17.219 votos', party: 'MISSÃO', color: '#06b6d4' },
        { name: 'Vera Lúcia (NOVO)', value: 0.11, votes: '5.701 votos', party: 'NOVO', color: '#f97316' },
        { name: 'Serley Leal (UP)', value: 0.08, votes: '4.344 votos', party: 'UP', color: '#a855f7' },
      ] as ElectoralCandidateRow[],
    },
    evePollsFirstTurn: {
      title: 'Pesquisas de Véspera 1º Turno — Votos Válidos (03/10/2026)',
      subtitle: 'Institutos apontaram empate técnico na margem de erro antes da abertura das urnas.',
      institutes: [
        { institute: 'Datafolha (03/10)', elmano: 50.0, ciro: 47.0, note: 'Margem ±2 p.p.' },
        { institute: 'Quaest (03/10)', elmano: 50.0, ciro: 49.0, note: 'Empate técnico no limite' },
        { institute: 'AtlasIntel (03/10)', elmano: 49.9, ciro: 49.6, note: 'Empate técnico absoluto' },
      ],
    },
    secondTurnPolls: {
      title: 'Simulações de 2º Turno — Governador CE (Pesquisas 2026)',
      subtitle: 'Cenários hipotéticos medidos antes da definição direta no 1º turno.',
      institutes: [
        { institute: 'Quaest (Reta Final)', elmano: 48.0, ciro: 49.0, note: 'Empate técnico' },
        { institute: 'Datafolha (Votos Válidos)', elmano: 49.0, ciro: 45.0, note: 'Vantagem numérica Elmano' },
        { institute: 'Paraná Pesquisas (Set/2026)', elmano: 50.5, ciro: 49.5, note: 'Empate técnico' },
      ],
    },
  },

  senatorCE: {
    datafolha: {
      institute: 'Datafolha · O Povo',
      date: '03/10/2026',
      metric: 'Votos Válidos (2 opções)',
      data: [
        { name: 'Cid Gomes (PSB)', value: 31.0, party: 'PSB', color: '#fbbf24' },
        { name: 'Luizianne Lins (Rede)', value: 28.0, party: 'REDE', color: '#ef4444' },
        { name: 'Capitão Wagner (União)', value: 23.0, party: 'UNIÃO', color: '#06b6d4' },
        { name: 'Alcides Fernandes (PL)', value: 14.0, party: 'PL', color: '#3b82f6' },
      ] as ElectoralCandidateRow[],
    },
    quaest: {
      institute: 'Quaest · TV Verdes Mares',
      date: '03/10/2026',
      metric: 'Votos Válidos (2 opções)',
      data: [
        { name: 'Cid Gomes (PSB)', value: 32.0, party: 'PSB', color: '#fbbf24' },
        { name: 'Luizianne Lins (Rede)', value: 27.0, party: 'REDE', color: '#ef4444' },
        { name: 'Capitão Wagner (União)', value: 26.0, party: 'UNIÃO', color: '#06b6d4' },
        { name: 'Alcides Fernandes (PL)', value: 13.0, party: 'PL', color: '#3b82f6' },
        { name: 'Catarina Matos (UP)', value: 1.0, party: 'UP', color: '#a855f7' },
        { name: 'Guilherme Theophilo (NOVO)', value: 1.0, party: 'NOVO', color: '#f97316' },
      ] as ElectoralCandidateRow[],
    },
    atlas: {
      institute: 'AtlasIntel / Focus',
      date: '30/09/2026',
      metric: 'Votos Válidos (1º e 2º votos)',
      data: [
        { name: 'Cid Gomes (PSB)', value: 28.1, party: 'PSB', color: '#fbbf24' },
        { name: 'Luizianne Lins (Rede)', value: 27.4, party: 'REDE', color: '#ef4444' },
        { name: 'Capitão Wagner (União)', value: 23.2, party: 'UNIÃO', color: '#06b6d4' },
        { name: 'Alcides Fernandes (PL)', value: 19.7, party: 'PL', color: '#3b82f6' },
      ] as ElectoralCandidateRow[],
    },
    parana: {
      institute: 'Paraná Pesquisas',
      date: '26/09/2026',
      metric: 'Citações Totais (até 2 nomes)',
      data: [
        { name: 'Cid Gomes (PSB)', value: 45.3, party: 'PSB', color: '#fbbf24' },
        { name: 'Capitão Wagner (União)', value: 45.0, party: 'UNIÃO', color: '#06b6d4' },
        { name: 'Luizianne Lins (Rede)', value: 36.3, party: 'REDE', color: '#ef4444' },
        { name: 'Alcides Fernandes (PL)', value: 20.5, party: 'PL', color: '#3b82f6' },
      ] as ElectoralCandidateRow[],
    },
  },

  deputiesCE: {
    federal: {
      title: 'Câmara Federal — 22 Vagas do Ceará (TSE 2026)',
      subtitle: '12 reeleitos e 10 novos nomes · 5 mulheres eleitas · Quociente eleitoral ~250.984 votos.',
      topHighlight: 'Mais votado: André Fernandes (PL) com 684.372 votos (12,39% dos válidos).',
      data: [
        { party: 'PL', seats: 4, color: '#3b82f6', highlights: 'André Fernandes, Matheus Noronha, Dr. Jaziel, Carmelo Neto' },
        { party: 'PSB', seats: 4, color: '#fbbf24', highlights: 'Tainah Marinho, Robério Monteiro, Idilvan, Dr. Acilon' },
        { party: 'PSD', seats: 3, color: '#06b6d4', highlights: 'Domingos Neto, Fernanda Pessoa, Célio Studart' },
        { party: 'FE Brasil (PT/PCdoB/PV)', seats: 3, color: '#ef4444', highlights: 'Fernando Santana, Raimundo Martins, Luisa Cela' },
        { party: 'MDB', seats: 2, color: '#10b981', highlights: 'Yury do Paredão, Nenen Coelho' },
        { party: 'PP', seats: 2, color: '#38bdf8', highlights: 'Danilo Forte, AJ Albuquerque' },
        { party: 'PRD / União / Rep. / Sol.', seats: 4, color: '#94a3b8', highlights: '1 vaga cada: PRD, União Brasil, Republicanos, Solidariedade' },
      ] as LegislativeSeatRow[],
    },
    stateAlece: {
      title: 'Assembleia Legislativa (Alece) — 46 Vagas (TSE 2026)',
      subtitle: 'Renovação de 56,5% (26 novos deputados) · Recorde de 14 mulheres eleitas (30,5%).',
      topHighlight: 'Mais votados: Tancredo dos Santos (PL · 151.396), Gabriel Biologia (PSOL · 141.749) e Bella Carmelo (PL · 130.802).',
      data: [
        { party: 'PSB', seats: 13, color: '#fbbf24' },
        { party: 'FE Brasil (PT/PCdoB/PV)', seats: 12, color: '#ef4444' },
        { party: 'PL', seats: 6, color: '#3b82f6' },
        { party: 'PSD', seats: 3, color: '#06b6d4' },
        { party: 'PSDB / Cidadania', seats: 3, color: '#38bdf8' },
        { party: 'União Progressista', seats: 3, color: '#6366f1' },
        { party: 'PSOL / REDE', seats: 2, color: '#a855f7' },
        { party: 'Republicanos', seats: 2, color: '#10b981' },
        { party: 'MDB / PRD-Sol.', seats: 2, color: '#94a3b8', highlights: '1 vaga MDB, 1 vaga Federação PRD/Solidariedade' },
      ] as LegislativeSeatRow[],
    },
  },
};
