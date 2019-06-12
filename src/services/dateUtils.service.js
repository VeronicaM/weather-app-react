/**
 *  @input timestamp(number) 
 *  @output date 
 *  e.g. getDateFromTimestamp(1560286800) -> 11
 */
const getDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date ? date.getDate() : 'N/A';
};

const getDateString = (timestamp) => {
    return timestamp ? new Date(timestamp * 1000).toDateString() : 'N/A';
}

const getTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date ? `${padWithZero(date.getHours())}:${padWithZero(date.getMinutes())}` : 'N/A';
};

// if number less than 10, add a leading 0 to it for display purposes
const padWithZero = (value) => {
    return `0${value}`.slice(-2);
};

const getTimestampFromString = (stringDate) => {
	const date = new Date(stringDate); 
	return date ? date.getTime() /1000 : 'N/A';
};

export default {
    getDateFromTimestamp,
    getDateString,
    getTimeFromTimestamp,
    getTimestampFromString,
    padWithZero
}