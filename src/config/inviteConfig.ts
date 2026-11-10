export interface InviteConfig {
  /** Nome do aniversariante */
  birthdayPerson: string;
  /** Primeiro nome */
  shortName: string;
  /** Idade comemorada */
  age: number;
  /** Título principal exibido no convite */
  headline: string;
  /** Subtítulo exibido logo abaixo do cabeçalho */
  subheadline: string;
  /** Data formatada para exibição */
  dateDisplay: string;
  /** Dia da semana */
  dayOfWeek: string;
  /** Horário formatado para exibição */
  timeDisplay: string;
  /** Regra de ouro / Ingresso da noite */
  goldenRuleTitle: string;
  goldenRuleDescription: string;
  /** Dados para salvar na agenda (Google Calendar / Apple Calendar .ics) */
  calendar: {
    title: string;
    description: string;
    /** Formato YYYYMMDDTHHMMSS (horário local) */
    startDateTime: string;
    endDateTime: string;
  };
}

export const inviteConfig: InviteConfig = {
  birthdayPerson: 'Pedro Henrique',
  shortName: 'Pedro',
  age: 24,
  headline: 'Pedro Henrique faz 24!',
  subheadline: 'E a comemoração vai acabar em pizza.',
  dateDisplay: '29 de Novembro de 2026',
  dayOfWeek: 'Domingo',
  timeDisplay: 'A partir das 20h00',
  goldenRuleTitle: 'Ingresso da noite',
  goldenRuleDescription:
    'Cada convidado deve trazer uma pizza do seu sabor favorito para compartilharmos!',

  // 📅 CONFIGURAÇÃO DA AGENDA (29/11/2026 às 20h00):
  calendar: {
    title: '🍕 24 Anos do Pedro Henrique (Noite da Pizza!)',
    description:
      'Comemoração dos 24 anos do Pedro Henrique! Regra de ouro: trazer 1 pizza do seu sabor favorito para compartilharmos.',
    startDateTime: '20261129T200000',
    endDateTime: '20261129T235900',
  },
};

/**
 * Gera a URL para adicionar o evento diretamente no Google Calendar
 */
export function buildGoogleCalendarUrl(): string {
  const { title, description, startDateTime, endDateTime } = inviteConfig.calendar;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startDateTime}/${endDateTime}`,
    details: description,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Faz o download de um arquivo .ics compatível com Apple Calendar (iOS) e Outlook
 */
export function downloadIcsCalendarFile(): void {
  const { title, description, startDateTime, endDateTime } = inviteConfig.calendar;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Pedro Henrique 24 Anos//Convite Interativo//PT',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `DTSTART:${startDateTime}`,
    `DTEND:${endDateTime}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'aniversario-pedro-24-anos.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
