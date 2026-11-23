export interface SurveyRow {
  name: string;
  value: number;
  n?: number;
  color?: string;
  party?: string;
}

export interface ScenarioData {
  question: string;
  title: string;
  data: SurveyRow[];
  total: { n: number; value: number };
}

export interface EvaluationItem {
  title: string;
  data: { name: string; value: number; color: string }[];
}

export interface EvaluationData {
  question: string;
  title: string;
  approval: EvaluationItem;
  qualitative: EvaluationItem;
}

export interface ReportDataType {
  header: {
    confidential: string;
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    contractor: string;
    registration: string;
    sampleSize: string;
    municipalities: string;
    marginOfError: string;
    confidence: string;
    period: string;
    author: string;
  };
  index: {
    title: string;
    subtitle: string;
    items: { id: string; label: string; page: string; anchor: string }[];
    disclaimer: string;
  };
  methodology: {
    title: string;
    technicalParams: Record<string, string>;
    stratification: {
      description: string;
      quotas: string[];
    };
  };
  senator: {
    spontaneous: ScenarioData;
    stimulated_01: ScenarioData;
    stimulated_02: ScenarioData;
    stimulated_03: ScenarioData;
    stimulated_04: ScenarioData;
  };
  governor: {
    spontaneous: ScenarioData;
    stimulated: ScenarioData;
    secondTurn: ScenarioData;
  };
  evaluations: {
    federal: EvaluationData;
    state: EvaluationData;
  };
}

export const reportData: ReportDataType = {
  header: {
    confidential: "CONFIDENCIAL · USO EXCLUSIVO DO CONTRATANTE",
    badge: "PESQUISA ELEITORAL · CEARÁ · 2026",
    title: "RELATÓRIO GERAL",
    subtitle: "GOVERNADOR, SENADOR E AVALIAÇÕES",
    description: "Pesquisa quantitativa por telefone com aplicação de questionário estruturado, cobrindo 34 municípios do Estado do Ceará — março de 2026.",
    contractor: "Rede Integrada de Comunicação ANC Ltda / Rede ANC",
    registration: "CE-07550/2026",
    sampleSize: "1.225",
    municipalities: "34",
    marginOfError: "±2,8%",
    confidence: "95%",
    period: "18 a 21 de março de 2026",
    author: "Algoritma Dados — Pesquisa e Inteligência"
  },
  index: {
    title: "ÍNDICE GERAL",
    subtitle: "Navegação rápida pelos blocos do relatório",
    items: [
      { id: "01", label: "Ficha Técnica & Metodologia", page: "04", anchor: "methodology" },
      { id: "02", label: "Governador — Cenário Espontâneo", page: "05", anchor: "gov-spont" },
      { id: "03", label: "Governador — Cenário Estimulado", page: "06", anchor: "gov-stim" },
      { id: "04", label: "Governador — Cenário de Segundo Turno", page: "07", anchor: "gov-2" },
      { id: "05", label: "Senador — Cenário Espontâneo", page: "08", anchor: "sen-spont" },
      { id: "06", label: "Senador — Cenário Estimulado 01", page: "09", anchor: "sen-1" },
      { id: "07", label: "Senador — Cenário Estimulado 02", page: "10", anchor: "sen-2" },
      { id: "08", label: "Senador — Cenário Estimulado 03", page: "11", anchor: "sen-3" },
      { id: "09", label: "Senador — Cenário Estimulado 04", page: "12", anchor: "sen-4" },
      { id: "10", label: "Avaliação da Administração Federal (Presidente Lula)", page: "13", anchor: "eval-fed" },
      { id: "11", label: "Avaliação da Administração Estadual (Gov. Elmano de Freitas)", page: "14", anchor: "eval-state" }
    ],
    disclaimer: "Esta pesquisa está registrada no Tribunal Superior Eleitoral sob o número CE-07550/2026, atendendo integralmente à Resolução-TSE nº 23.600/2019. Os dados são de uso exclusivo do contratante e seguem os protocolos de sigilo da Algoritma Dados."
  },
  methodology: {
    title: "FICHA TÉCNICA & METODOLOGIA",
    technicalParams: {
      "Universo": "Eleitorado do Ceará (16 anos ou mais)",
      "Amostra": "1.225 entrevistas válidas",
      "Nível de Confiança": "95%",
      "Margem de Erro": "±2,8 pontos percentuais",
      "Período de Campo": "18 a 21 de março de 2026",
      "Registro TSE": "CE-07550/2026",
      "Contratante": "Rede ANC Ltda",
      "Auditoria": "100% das gravações e checagem de 20% das coletas"
    },
    stratification: {
      description: "A seleção dos entrevistados seguiu quotas proporcionais baseadas nos dados do TSE (Janeiro 2026) e IBGE, garantindo a representatividade do eleitorado cearense em 34 municípios polo e interioranos.",
      quotas: ["Gênero (52% F / 48% M)", "Faixa Etária (16 a 60+ anos)", "Escolaridade (Fund. / Méd. / Sup.)", "Faixas de Renda (Até 2SM / 2 a 5SM / 5SM+)", "Regiões (Fortaleza, RMF, Norte, Sul e Sertões)"]
    }
  },
  senator: {
    spontaneous: {
      question: '"Se as eleições para Senador, no Ceará, fossem hoje, em quem o(a) Sr(a) votaria? (ESPONTÂNEA)"',
      title: "1º NOME CITADO - ESPONTÂNEA (%)",
      data: [
        { name: "Não sabe / Não opinou", value: 74.1, n: 908, color: "#94a3b8" },
        { name: "Ninguém / Branco / Nulo", value: 17.8, n: 218, color: "#64748b" },
        { name: "Capitão Wagner", value: 3.4, n: 42, color: "#8b5cf6", party: "UNIÃO" },
        { name: "Alcides Fernandes", value: 1.2, n: 15, color: "#38bdf8", party: "PL" },
        { name: "Eunício Oliveira", value: 1.2, n: 15, color: "#60a5fa", party: "MDB" },
        { name: "José Guimarães", value: 1.1, n: 13, color: "#f87171", party: "PT" },
        { name: "Júnior Mano", value: 1.0, n: 12, color: "#fbbf24", party: "PSB" },
        { name: "Outros citados", value: 0.2, n: 4, color: "#a855f7" }
      ],
      total: { n: 1225, value: 100.0 }
    },
    stimulated_01: {
      question: '"Este ano teremos duas vagas para o Senado Federal. Se as eleições fossem hoje e os candidatos fossem esses, em quem o(a) Sr(a) votaria para senador no Ceará?"',
      title: "1º NOME CITADO - CENÁRIO 01 (%)",
      data: [
        { name: "Capitão Wagner (UNIÃO BRASIL)", value: 33.9, n: 415, color: "#8b5cf6", party: "UNIÃO" },
        { name: "Nenhum / Branco / Nulo", value: 20.9, n: 256, color: "#64748b" },
        { name: "Eunício (MDB)", value: 15.9, n: 195, color: "#3b82f6", party: "MDB" },
        { name: "Guimarães (PT)", value: 10.0, n: 123, color: "#ef4444", party: "PT" },
        { name: "Não sabe / Não opinou", value: 9.9, n: 121, color: "#94a3b8" },
        { name: "Alcides Fernandes (PL)", value: 7.3, n: 89, color: "#0284c7", party: "PL" },
        { name: "General Theophilo (NOVO)", value: 2.1, n: 26, color: "#f97316", party: "NOVO" }
      ],
      total: { n: 1225, value: 100.0 }
    },
    stimulated_02: {
      question: '"Se as eleições para Senador, no Ceará, fossem hoje e os candidatos fossem esses, em quem o(a) Sr(a) votaria?"',
      title: "1º NOME CITADO - CENÁRIO 02 (%)",
      data: [
        { name: "Nenhum / Branco / Nulo", value: 24.0, n: 294, color: "#64748b" },
        { name: "Roberto Cláudio (UNIÃO BRASIL)", value: 22.3, n: 273, color: "#8b5cf6", party: "UNIÃO" },
        { name: "Eunício (MDB)", value: 21.1, n: 258, color: "#3b82f6", party: "MDB" },
        { name: "Alcides Fernandes (PL)", value: 12.2, n: 149, color: "#0284c7", party: "PL" },
        { name: "Não sabe / Não opinou", value: 12.0, n: 147, color: "#94a3b8" },
        { name: "General Theophilo (NOVO)", value: 5.4, n: 66, color: "#f97316", party: "NOVO" },
        { name: "Chagas Vieira (sem partido)", value: 3.0, n: 38, color: "#a8a29e", party: "IND" }
      ],
      total: { n: 1225, value: 100.0 }
    },
    stimulated_03: {
      question: '"Se as eleições para Senador, no Ceará, fossem hoje e os candidatos fossem esses, em quem o(a) Sr(a) votaria?"',
      title: "1º NOME CITADO - CENÁRIO 03 (%)",
      data: [
        { name: "Capitão Wagner (UNIÃO BRASIL)", value: 36.7, n: 450, color: "#8b5cf6", party: "UNIÃO" },
        { name: "Nenhum / Branco / Nulo", value: 18.4, n: 225, color: "#64748b" },
        { name: "Guimarães (PT)", value: 15.9, n: 195, color: "#ef4444", party: "PT" },
        { name: "Não sabe / Não opinou", value: 9.8, n: 120, color: "#94a3b8" },
        { name: "Alcides Fernandes (PL)", value: 8.2, n: 100, color: "#0284c7", party: "PL" },
        { name: "Júnior Mano (PSB)", value: 8.2, n: 100, color: "#fbbf24", party: "PSB" },
        { name: "General Theophilo (NOVO)", value: 2.8, n: 35, color: "#f97316", party: "NOVO" }
      ],
      total: { n: 1225, value: 100.0 }
    },
    stimulated_04: {
      question: '"Se as eleições para Senador, no Ceará, fossem hoje e os candidatos fossem esses, em quem o(a) Sr(a) votaria?"',
      title: "1º NOME CITADO - CENÁRIO 04 (%)",
      data: [
        { name: "Nenhum / Branco / Nulo", value: 24.5, n: 300, color: "#64748b" },
        { name: "Roberto Cláudio (UNIÃO BRASIL)", value: 21.5, n: 263, color: "#8b5cf6", party: "UNIÃO" },
        { name: "Eunício (MDB)", value: 20.3, n: 249, color: "#3b82f6", party: "MDB" },
        { name: "Não sabe / Não opinou", value: 11.7, n: 143, color: "#94a3b8" },
        { name: "Alcides Fernandes (PL)", value: 10.9, n: 134, color: "#0284c7", party: "PL" },
        { name: "Júnior Mano (PSB)", value: 6.2, n: 76, color: "#fbbf24", party: "PSB" },
        { name: "General Theophilo (NOVO)", value: 4.9, n: 60, color: "#f97316", party: "NOVO" }
      ],
      total: { n: 1225, value: 100.0 }
    }
  },
  governor: {
    spontaneous: {
      question: '"Se as eleições para Governador, no Ceará, fossem hoje, em quem o(a) Sr(a) votaria? (ESPONTÂNEA)"',
      title: "INTENÇÃO DE VOTO ESPONTÂNEA (%)",
      data: [
        { name: "Não sabe / Não opinou", value: 55.5, n: 680, color: "#94a3b8" },
        { name: "Ciro Gomes", value: 16.2, n: 199, color: "#3b82f6", party: "PSDB" },
        { name: "Elmano de Freitas", value: 14.2, n: 174, color: "#ef4444", party: "PT" },
        { name: "Ninguém / Branco / Nulo", value: 11.2, n: 137, color: "#64748b" },
        { name: "Roberto Cláudio", value: 1.8, n: 22, color: "#8b5cf6", party: "UNIÃO" },
        { name: "Camilo Santana", value: 1.1, n: 13, color: "#f87171", party: "PT" }
      ],
      total: { n: 1225, value: 100.0 }
    },
    stimulated: {
      question: '"Se as eleições para Governador, no Ceará, fossem hoje e os candidatos fossem esses, em quem o(a) Sr(a) votaria?"',
      title: "INTENÇÃO DE VOTO ESTIMULADA (%)",
      data: [
        { name: "Ciro Gomes (PSDB)", value: 44.0, n: 539, color: "#3b82f6", party: "PSDB" },
        { name: "Elmano de Freitas (PT)", value: 35.9, n: 440, color: "#ef4444", party: "PT" },
        { name: "Eduardo Girão (NOVO)", value: 8.2, n: 100, color: "#f97316", party: "NOVO" },
        { name: "Nenhum / Branco / Nulo", value: 7.2, n: 88, color: "#64748b" },
        { name: "Não sabe / Não opinou", value: 3.8, n: 46, color: "#94a3b8" },
        { name: "Professor Jarir Pereira (PSOL)", value: 0.9, n: 12, color: "#a855f7", party: "PSOL" }
      ],
      total: { n: 1225, value: 100.0 }
    },
    secondTurn: {
      question: '"Em um eventual segundo turno para Governador, no Ceará, em quem o(a) Sr(a) votaria?"',
      title: "INTENÇÃO DE VOTO - 2º TURNO (%)",
      data: [
        { name: "Ciro Gomes (PSDB)", value: 49.2, n: 603, color: "#3b82f6", party: "PSDB" },
        { name: "Elmano de Freitas (PT)", value: 37.2, n: 455, color: "#ef4444", party: "PT" },
        { name: "Nenhum / Branco / Nulo", value: 8.0, n: 98, color: "#64748b" },
        { name: "Não sabe / Não opinou", value: 5.6, n: 69, color: "#94a3b8" }
      ],
      total: { n: 1225, value: 100.0 }
    }
  },
  evaluations: {
    federal: {
      question: '"Em sua opinião, a administração do Presidente Lula está sendo:" / "De uma maneira geral, o(a) Sr(a) aprova ou desaprova a administração do Presidente Lula, até o momento?"',
      title: "AVALIAÇÃO E APROVAÇÃO — PRESIDENTE LULA",
      approval: {
        title: "APROVAÇÃO GERAL (%)",
        data: [
          { name: "Aprova", value: 55.2, color: "#10b981" },
          { name: "Desaprova", value: 37.9, color: "#ef4444" },
          { name: "Não sabe / Não opinou", value: 6.9, color: "#94a3b8" }
        ]
      },
      qualitative: {
        title: "AVALIAÇÃO QUALITATIVA (%)",
        data: [
          { name: "Ótima / Boa", value: 42.8, color: "#3b82f6" },
          { name: "Ruim / Péssima", value: 33.1, color: "#ef4444" },
          { name: "Regular", value: 21.4, color: "#f59e0b" },
          { name: "Não sabe / Não opinou", value: 2.7, color: "#94a3b8" }
        ]
      }
    },
    state: {
      question: '"Em sua opinião, a administração do Governador do Estado do Ceará, Elmano de Freitas, está sendo:" / "De uma maneira geral, o(a) Sr(a) aprova ou desaprova a administração de Elmano de Freitas, até o momento?"',
      title: "AVALIAÇÃO E APROVAÇÃO — GOVERNADOR ELMANO",
      approval: {
        title: "APROVAÇÃO GERAL (%)",
        data: [
          { name: "Aprova", value: 56.4, color: "#10b981" },
          { name: "Desaprova", value: 34.8, color: "#ef4444" },
          { name: "Não sabe / Não opinou", value: 8.8, color: "#94a3b8" }
        ]
      },
      qualitative: {
        title: "AVALIAÇÃO QUALITATIVA (%)",
        data: [
          { name: "Ótima / Boa", value: 34.2, color: "#3b82f6" },
          { name: "Regular", value: 31.1, color: "#f59e0b" },
          { name: "Ruim / Péssima", value: 28.0, color: "#ef4444" },
          { name: "Não sabe / Não opinou", value: 6.7, color: "#94a3b8" }
        ]
      }
    }
  }
};
