/**
 * Returns a medium-format date-only from a ISO date string. Does not
 * do time zone conversion
 */
function getFormattedDateFromDateString(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
) {
  const splitDateString = dateString.split('T')[0];
  const date = new Date(splitDateString + 'T00:00:00.000');
  return date.toLocaleDateString(navigator.language, options);
}

/**
 * Returns a medium-format date/time string, with timezone adjustment
 */
function getFormattedDateFromISO(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '---';
  return date.toLocaleDateString(navigator.language, options);
}

/**
 * Returns a medium-format date/time string, with timezone adjustment
 */
function getFormattedDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
) {
  return date.toLocaleDateString(navigator.language, options);
}

function transformDateToYearLast(val?: string | null) {
  if (val) {
    // protect form from partial dates
    const yearFirstDate = new Date(val).toISOString().split('T')[0];
    const split = yearFirstDate.split('-');
    return [split[1], split[2], split[0]].join('/');
  }
  return null;
}

/** Sets the year-first string that the date field needs */
function transformDateToYearFirst(dueDate?: string | null) {
  if (dueDate?.length === 10) {
    const split = dueDate.split('/');
    const yearFirstDate = [split[2], split[0], split[1]].join('-');
    return yearFirstDate;
  }
  return '';
}

export const dateTimeHelpers = {
  getFormattedDateFromDateString,
  getFormattedDateFromISO,
  getFormattedDate,
  transformDateToYearLast,
  transformDateToYearFirst,
};
