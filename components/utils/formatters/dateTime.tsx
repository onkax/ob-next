import Moment from 'moment';

export default class DateFormatter {
  static format(date: Date, format: string): string {
    if (!date) return '';
    return Moment(date).format(format);
  }

  static getYear(date: Date): string {
    if (!date) return '';
    return Moment(date).format('YYYY');
  }

  static getDateForReports(date: Date): string {
    if (!date) return '';
    return Moment(date).format('DD MMM YYYY');
  }

  static getDateForNews(date: Date): string {
    if (!date) return '';
    return Moment(date).format('DD MMM, YYYY');
  }

  static getTime(date: Date): string {
    if (!date) return '';
    return Moment(date).format('hh:mm');
  }
}
