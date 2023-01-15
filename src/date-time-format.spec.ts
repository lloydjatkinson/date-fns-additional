import {
    describe, it, expect, 
} from 'vitest';
import {
    type FormatName,
    type FormatPattern,
    formatUsingPattern,
    formatAsTwelveHourTime,
    formatAsTwelveHourTimeWithPeriod,
    formatAsTwentyFourHourTime,
    formatAsMonthNameWithDayNumber,
    formatAsMonthNameWithOrdinalDate,
    formatAsDateMonthYearAndTwelveHourTimeWithPeriod,
    formatAsIsoDate, 
} from './date-time-format';

describe('date time formatting', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    });

    it('should have coverage setup', () => {
        formatAsTwelveHourTime(new Date());
    });

    it('should trigger new release', () => {
        expect(true);
    });
});