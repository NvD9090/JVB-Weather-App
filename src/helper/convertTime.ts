const convertTime = (localTime: string): string => {
    const date = new Date(localTime);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    const formattedHours = isPM ? hours % 12 || 12 : hours;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const period = isPM ? 'PM' : 'AM';

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${formattedHours}:${formattedMinutes} ${period}, ${dayName}, ${monthName} ${day}, ${year}`;
};
export default convertTime