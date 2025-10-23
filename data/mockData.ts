import { colors } from "@/theme/colors";

export const performanceData = [
  {
    name: 'História do Brasil',
    hours: 8,
    color: colors.yellow,
    legendFontColor: colors.primaryText,
    legendFontSize: 12,
  },
  {
    name: 'Estatística',
    hours: 6,
    color: colors.blue,
    legendFontColor: colors.primaryText,
    legendFontSize: 12,
  },
  {
    name: 'Geometria',
    hours: 5,
    color: colors.lightGreen,
    legendFontColor: colors.primaryText,
    legendFontSize: 12,
  },
  {
    name: 'Álgebra Linear',
    hours: 4,
    color: colors.lightPink,
    legendFontColor: colors.primaryText,
    legendFontSize: 12,
  },
];

export const weeklyStudyData = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
  datasets: [
    {
      data: [2, 3, 2.5, 4, 3.5, 1, 0.5],
    },
  ],
};

export const goals = [
  {
    id: '1',
    title: 'Ler livro Físico',
    subtitle: 'Meta Semanal de Estudos',
    progress: 0.75,
    status: 'Alta',
    deadline: 'Domingo',
    statusColor: colors.red,
  },
  {
    id: '2',
    title: 'Revisar Matemática',
    subtitle: 'Meta Semanal de Estudos',
    progress: 0.5,
    status: 'Média',
    deadline: 'Sexta',
    statusColor: colors.orange,
  },
  {
    id: '3',
    title: 'Exercícios de Química',
    subtitle: 'Meta Diária',
    progress: 0.3,
    status: 'Baixa',
    deadline: 'Hoje',
    statusColor: colors.accent,
  },
];

export const subjects = [
  {
    id: '1',
    name: 'Português',
    hours: 12,
    color: colors.pink,
    priority: 'Alta',
  },
  {
    id: '2',
    name: 'Matemática',
    hours: 15,
    color: colors.green,
    priority: 'Média',
  },
  {
    id: '3',
    name: 'História',
    hours: 8,
    color: colors.purple,
    priority: 'Alta',
  },
];

export const scheduledSessions = [
  {
    id: '1',
    subject: 'Álgebra Linear',
    topic: 'Matrizes',
    time: 'Hoje - 14:00',
  },
  {
    id: '2',
    subject: 'Português',
    topic: 'Literatura',
    time: 'Hoje - 14:00',
  },
];
