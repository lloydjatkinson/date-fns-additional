import { format, isSameDay, subDays } from 'date-fns';

/**
 * Human friendly date time format names.
 * 
 * @see {@link FormatPattern}
 * 
 * @remarks
 * The `relative` format is under review. Currently, it has simple Today/Yesterday/(date) logic.
 * This functionality is probably either too limited or should be under a different name and built on
 * more generic logic.
 */
export type FormatName =
    | 'date-month-year-and-twelve-hour-time-with-period'
    | 'date-year-month-date'
    | 'month-name-with-day-number'
    | 'month-name-with-ordinal-date'
    | 'month-with-year'
    | 'relative'
    | 'twelve-hour-time-with-period'
    | 'twelve-hour-time'
    | 'twenty-four-hour-time'
    | 'year';

/**
 * Format specifiers for designated format names.
 * @see {@link FormatName}
 */
export type FormatPattern =
    | 'dd/MM/yyyy - hh:mm a'
    | 'h:mm a'
    | 'h:mm'
    | 'HH:mm'
    | 'LLLL d'
    | 'MMMM yyyy'
    | 'PPP'
    | 'yyyy-MM-dd'
    | 'yyyy';

/**
 * Formats a Date using the specified {@link FormatPattern}. Note the similarity to the {@link formatUsingPattern} function.
 * Both functions format the date based on the format pattern, it is simply a choice of whether to use the {@link FormatName} or {@link FormatPattern}.
 * Which function is more appropriate to use depends on the use case.
 * @param { Date } date The date. 
 * @param { FormatPattern } pattern The format pattern.
 * @returns { string } The formatted string.
 */
export const formatUsingPattern = (date: Date, pattern: FormatPattern): string => format(date, pattern);

/**
 * Formats a Date into "twelve hour time". For example, 3:23. This is "h:mm" format from date-fns.
 * @param { Date } date The date.
 * @returns { string } The formatted string.
 */
export const formatAsTwelveHourTime = (date: Date): string => formatUsingPattern(date, 'h:mm');

/**
 * Formats a Date into "twelve hour time with period". For example, 3:23 PM. This is "h:mm a" format from date-fns.
 * @param { Date } date The date.
 * @returns { string } The formatted string.
 */
export const formatAsTwelveHourTimeWithPeriod = (date: Date): string => formatUsingPattern(date, 'h:mm a');

/**
 * Formats a Date into "twenty four hour time". For example, 3:23. This is "HH:mm" format from date-fns.
 * @param { Date } date The date.
 * @returns { string } The formatted string.
 */
export const formatAsTwentyFourHourTime = (date: Date): string => formatUsingPattern(date, 'HH:mm');

/**
 * Formats a Date into "month name with day number". For example, October 21. This is "LLLL d" format from date-fns.
 * @param { Date } date The date.
 * @returns { string } The formatted string.
 */
export const formatAsMonthNameWithDayNumber = (date: Date): string => formatUsingPattern(date, 'LLLL d');

/**
 * Formats a Date into "month name with day number". For example, October 21. This is "PPP" format from date-fns.
 * @param { Date } date The date.
 * @returns { string } The formatted string.
 */
export const formatAsMonthNameWithOrdinalDate = (date: Date): string => formatUsingPattern(date, 'PPP');

/**
 * Formats a Date into "date month year and with twelve hour time". For example, 13/05/2021 - 03:50 PM
 * @param { Date } date The date.
 * @returns { string } The formatted string.
 */
export const formatAsDateMonthYearAndTwelveHourTimeWithPeriod = (date: Date): string => formatUsingPattern(date, 'dd/MM/yyyy - hh:mm a');

/**
 * Formats a Date into "date in ISO format without the time". For example, 2022-11-29.
 * @param { Date } date The date.
 * @returns { string } The formatted string.
 */
export const formatAsIsoDate = (date: Date): string => formatUsingPattern(date, 'yyyy-MM-dd');

/**
 * Formats a Date into "year". For example, 2023.
 * @param { Date } date The date.
 * @returns { string } The formatted string.
 */
export const formatAsYear = (date: Date): string => formatUsingPattern(date, 'yyyy');

/**
 * Formats a Date into "year". For example, 2023.
 * @param { Date } date The date.
 * @returns { string } The formatted string.
 */
export const formatAsMonthWithYear = (date: Date): string => formatUsingPattern(date, 'MMMM yyyy');

/**
 * Formats a Date into "relative date". For example, a date that is today would be formatted as "Today".
 * @example
 * formatAsRelativeDate(new Date(2020, 10, 21), new Date(2020, 10, 21)) // Today
 * formatAsRelativeDate(new Date(2020, 10, 20), new Date(2020, 10, 21)) // Yesterday
 * formatAsRelativeDate(new Date(2020, 10, 19), new Date(2020, 10, 21)) // October 19
 * @param { Date } date The date.
 * @param { Date } baseDate The date from which to calculate the relative formatting.
 * @returns { string } The formatted string.
 */
export const formatAsRelativeDate = (date: Date, baseDate: Date) => {
    if (isSameDay(date, baseDate)) {
        return 'Today';
    }

    const daysAgo = 1;
    const yesterday = subDays(baseDate, daysAgo);
    if (isSameDay(date, yesterday)) {
        return 'Yesterday';
    }

    return formatAsMonthNameWithDayNumber(date);
};

/**
 * Formats a Date using the specified {@link FormatName}. Note the similarity to the {@link formatUsingPattern} function.
 * This function is a convenient wrapper around {@link formatUsingPattern} that provides the ability to format based on {@link FormatName}.
 * Both functions format the date based on the format pattern, it is simply a choice of whether to use the {@link FormatName} or {@link FormatPattern}.
 * Which function is more appropriate to use depends on the use case.
 * @param { Date } date The date. 
 * @param { FormatPattern } pattern The format pattern.
 * @returns { string } The formatted string.
 */
export const formatUsingName = (date: Date, formatName: FormatName): string => {
    const lookup: Record<Exclude<FormatName, 'relative'>, FormatPattern> = {
        'twelve-hour-time': 'h:mm',
        'twelve-hour-time-with-period': 'h:mm a',
        'twenty-four-hour-time': 'HH:mm',
        'month-name-with-day-number': 'LLLL d',
        'month-name-with-ordinal-date': 'PPP',
        'month-with-year': 'MMMM yyyy',
        'date-month-year-and-twelve-hour-time-with-period': 'dd/MM/yyyy - hh:mm a',
        'date-year-month-date': 'yyyy-MM-dd',
        'year': 'yyyy',
    } as const;

    if (formatName === 'relative') {
        return formatAsRelativeDate(date, new Date());
    }

    return formatUsingPattern(date, lookup[formatName]);
};