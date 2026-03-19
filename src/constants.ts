import { Service, TimeSlot } from './types';

export const SERVICES: Service[] = [
  {
    id: 'cleats',
    title: 'Krampon Kiralama',
    description: 'En yeni model kramponlar ile performansını artır.',
    icon: 'Footprints',
  },
  {
    id: 'shower',
    title: 'Lüks Duşlar',
    description: 'Maç sonrası ferahlatıcı ve hijyenik duş imkanı.',
    icon: 'ShowerHead',
  },
  {
    id: 'cafe',
    title: 'Sporcu Kafe',
    description: 'Enerji içecekleri ve sağlıklı atıştırmalıklar.',
    icon: 'Coffee',
  },
  {
    id: 'recording',
    title: 'Canlı Maç Kaydı',
    description: 'Maçını HD kalitesinde izle ve arkadaşlarınla paylaş.',
    icon: 'Video',
  },
];

export const TIME_SLOTS: string[] = [
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
  '18:00 - 19:00',
  '19:00 - 20:00',
  '20:00 - 21:00',
  '21:00 - 22:00',
  '22:00 - 23:00',
  '23:00 - 00:00',
  '00:00 - 01:00',
  '01:00 - 02:00',
];
