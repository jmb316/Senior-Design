//alert("in format-google-calendar.js");

//Get temp array with information abou day in followin format: [day number, month number, year]
var getDateInfo = function(date) {
    date = new Date(date);
    return [date.getDate(), date.getMonth(), date.getFullYear()];
};

//Get temp array with information abou day in followin format: [day number, month number, year]
var getTimeInfo = function(date) {
    date = new Date(date);
    var AMPM='AM';
    var hours=date.getHours();
    var minutes=date.getMinutes();
    
    if(hours>=12)
    {
        hours=hours-12;
        AMPM='PM';
    }
    if (hours==0)
        hours=12;
    
    if(minutes==0)
        minutes='00';
    else if(minutes<10)
        minutes="0"+minutes;
    
    return hours+":"+minutes+AMPM;
};

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    //console.log(hrs + ':' + mins + ':' + secs + '.' + ms);
    return hrs + ':' + mins + ':' + secs + '.' + ms;
}
var getFormattedDate = function(dateStart, dateEnd) {
    var formattedDate = '';
    
    if (dateStart[0] === dateEnd[0]) {
        if (dateStart[1] === dateEnd[1]) {
            if (dateStart[2] === dateEnd[2]) {
                //month day, year
                formattedDate = formatDateSameDay(dateStart);
            } else {
                //month day, year - month day, year
                formattedDate = formatDateDifferentYear(dateStart, dateEnd);
            }
        } else {
            if (dateStart[2] === dateEnd[2]) {
                //month day - month day, year
                formattedDate = formatDateDifferentMonth(dateStart, dateEnd);
            } else {
                //month day, year - month day, year
                formattedDate = formatDateDifferentYear(dateStart, dateEnd);
            }
        }
    } else {
        if (dateStart[1] === dateEnd[1]) {
            if (dateStart[2] === dateEnd[2]) {
                //month day-day, year
                formattedDate = formatDateDifferentDay(dateStart, dateEnd);
            } else {
                //month day, year - month day, year
                formattedDate = formatDateDifferentYear(dateStart, dateEnd);
            }
        } else {
            if (dateStart[2] === dateEnd[2]) {
                //month day - month day, year
                formattedDate = formatDateDifferentMonth(dateStart, dateEnd);
            } else {
                //month day, year - month day, year
                formattedDate = formatDateDifferentYear(dateStart, dateEnd);
            }
        }
    }
    
    return formattedDate;
};

//Get month name according to index
var getMonthName = function(month) {
    var monthNames = [
                      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
                      ];
    
    return monthNames[month];
};

//Transformations for formatting date into human readable format
var formatDateSameDay = function(date) {
    //month day, year
    // alert("Date: "+date);
    return getMonthName(date[1]) + ' ' + date[0] + ', ' + date[2];
};

var formatDateDifferentDay = function(dateStart, dateEnd) {
    //month day-day, year
    return getMonthName(dateStart[1]) + ' ' + dateStart[0] + '-' + dateEnd[0] + ', ' + dateStart[2];
};

var formatDateDifferentMonth = function(dateStart, dateEnd) {
    //month day - month day, year
    return getMonthName(dateStart[1]) + ' ' + dateStart[0] + '-' + getMonthName(dateEnd[1]) + ' ' + dateEnd[0] + ', ' + dateStart[2];
};

var formatDateDifferentYear = function(dateStart, dateEnd) {
    //month day, year - month day, year
    return getMonthName(dateStart[1]) + ' ' + dateStart[0] + ', ' + dateStart[2] + '-' + getMonthName(dateEnd[1]) + ' ' + dateEnd[0] + ', ' + dateEnd[2];
};
