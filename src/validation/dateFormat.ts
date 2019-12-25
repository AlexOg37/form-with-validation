import moment from "moment";

export const supportedDateFormat = 'DD/MM/YYYY';

moment.defaultFormat = supportedDateFormat;

export const parseDate = (date?: string, strict?: boolean) =>
  moment(date, date && supportedDateFormat, strict);
