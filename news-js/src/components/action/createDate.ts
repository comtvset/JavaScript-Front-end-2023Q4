export function formattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month: number | string = currentDate.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let day: number | string = currentDate.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    return `${year}-${month}-${day}`;
}
