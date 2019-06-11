import DateUtilsService from '../dateUtils.service.js';

it('should return date from timestamp', () => {
  	const date = DateUtilsService.getDateFromTimestamp(1560286800);
  	expect(date).toBe(11);
});

it('should return hh:mm from timestamp', () => {
  	const time = DateUtilsService.getTimeFromTimestamp(1560286800);
  	expect(time).toBe('22:00');
});

it('should return date string dd mm DD yyyy from timestamp', () => {
  	const dateString = DateUtilsService.getDateString(1560286800);
  	expect(dateString).toBe('Tue Jun 11 2019');
});

it('should pad number with 0', () => {
  	const paddedNumber = DateUtilsService.padWithZero(1);
  	expect(paddedNumber).toBe('01');
});