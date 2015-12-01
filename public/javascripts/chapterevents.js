// date variables
var now = new Date();
today = now.toISOString();
var tableContent="<table class='table table-striped'><tbody><th>Event</th><th>Date and Time</th><th>Attendees</th><th>Register</th>";
var twoHoursLater = new Date(now.getTime() + (2*1000*60*60));
twoHoursLater = twoHoursLater.toISOString();

// google api console clientID and apiKey (https://code.google.com/apis/console/#project:568391772772)

//TODO: get from config file
//heroku:
//var clientid = '316615911187-duaavj04u4g1poomqp7dpm76pjuf2642.apps.googleusercontent.com';
//local:
var clientId= '316615911187-g6qp9ghdv970gcnl4c2g6j90koov8chc.apps.googleusercontent.com';

var apiKey = 'AIzaSyCnjBi_r7BqHgKIY37bH5bzdzddoXAdYjs';

// enter the scope of current project (this API must be turned on in the google console)
var scopes = 'https://www.googleapis.com/auth/calendar';


// Oauth2 functions
function handleClientLoad() {
    //alert("handle client load");
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);
}

function checkAuth() {
   // alert("checkauth chap events");
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

// show/hide the 'authorize' button, depending on application state
function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    var resultPanel		= document.getElementById('result-panel');
    var resultTitle		= document.getElementById('result-title');
    
    if (authResult && !authResult.error) {
        authorizeButton.style.visibility = 'hidden';			// if authorized, hide button
        resultPanel.className = resultPanel.className.replace( /(?:^|\s)panel-danger(?!\S)/g , '' )	// remove red class
        resultPanel.className += '';				// add green class
        resultTitle.innerHTML = ''		// display 'authorized' text
        loadCalendarApi();											// load calendarif authorization passed
    } else {													// otherwise, show button
        authorizeButton.style.visibility = 'visible';
        resultPanel.className += ' panel-danger';				// make panel red
        authorizeButton.onclick = handleAuthClick;				// setup function to handle button click
    }
}

// function triggered when user authorizes app
function handleAuthClick(event) {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    return false;
}

// setup event details
var resource = {
    "start": {
        "dateTime": today
    },
    "end": {
        "dateTime": twoHoursLater
    }
};

// function load the calendar api and make the api call
function signup(eventId,summary,start,end) {
    alert("start:"+start);

        alert(" end: "+end);
    // setup event details
    var update = {
        "summary": summary,
        "anyoneCanAddSelf": true,
        "attendees": [
                      {
                      "email": "meriweiner@gmail.com"
                      }
                      ],
        "start": {
            "dateTime": start
        },
        "end": {
            "dateTime": end
        }
        

    };
    alert("in signup");
        //console.log("eventID: "+eventID);
     console.log("in signup");
    
        console.log("in signup");
   /* gapi.client.load('calendar', 'v3', function() {					// load the calendar api (version 3)
                     var request = gapi.client.calendar.events.insert({
                                                                      'calendarId':		'ftbioqlsgdfcp0sltprr7r7nqg@group.calendar.google.com',	// calendar ID
                                                                      "resource":			resource							// pass event details with api call
                                                                      });*/
    
    gapi.client.load('calendar', 'v3', function() {					// load the calendar api (version 3)
                     var request = gapi.client.calendar.events.patch({
                                                                      'calendarId':		'ftbioqlsgdfcp0sltprr7r7nqg@group.calendar.google.com',
                                                                              "eventId": eventId,
                                                                      "resource":			update							// pass event details with api call
                                                                      })
                     
                      //adding an event
                      request.execute(function(resp) {
                      if(resp.status=='confirmed') {
                      //document.getElementById('event-response').innerHTML = "Event created successfully. View it <a href='" + resp.htmlLink + "'>online here</a>.";
                                     // alert("Event created successfully");
                      } else {
                     // document.getElementById('event-response').innerHTML = "There was a problem. Reload page and try again.";
                                     // alert("There was a problem. Reload page and try again.");
                      }
                      console.log(resp);

                      });
                     
                     
                     //loading calendar after add
                location.reload (true);
     
                    
                     
                     
                     });
}



function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    var request = gapi.client.calendar.events.list({
                                                   'calendarId': 'ftbioqlsgdfcp0sltprr7r7nqg@group.calendar.google.com',
                                                   'timeMin': (new Date()).toISOString(),
                                                   'showDeleted': false,
                                                   'singleEvents': true,
                                                   'maxResults': 4,
                                                   'orderBy': 'startTime'
                                                   });
    
    request.execute(function(resp) {
                    var events = resp.items;
                    //appendPre('Upcoming events:');
                    
                    if (events.length > 0) {
                    for (i = 0; i < events.length; i++) {
                    var event = events[i];
                    var when = event.start.dateTime;
                    if (!when) {
                    when = event.start.date;
                    }
                    var dateStart = getDateInfo(event.start.dateTime || event.start.date),
                    dateEnd = getDateInfo(event.end.dateTime || event.end.date);
                    
                    var timeStart = getTimeInfo(event.start.dateTime || event.start.date),
                    timeEnd = getTimeInfo(event.end.dateTime || event.end.date);
                    var result="";
                    dateFormatted = getFormattedDate(dateStart, dateEnd);
                    //alert("eventid: "+event.id);
                    //console.log("event.id: "+event.id);
                    tableContent += '<tr>';
                    tableContent += '<td>'+event.summary+'</td>';
                    
                    
                    tableContent += '<td>'+ dateFormatted +" <br>"+timeStart+" - "+timeEnd+'</td><td>';
                    var myArr=[event.id,event.summary,event.start.dateTime,event.end.dateTime];
                    //alert(myArr[0]);
                    
                    for (var p in event.attendees) {
                        if(event.attendees[p].displayName)
                            tableContent += event.attendees[p].displayName  + ', ';
                    //console.log(p + " : " + event.attendees[p].displayName);
                    }
                    tableContent += '</td>';
                   // tableContent += '<td>'+'<input type="button" onClick="signup(\'' + this + '\')" name= '+myArr+'value="Sign Up"></input></td></tr>';
                   // tableContent += '<td>'+'<input type="button" onClick="signup(\'' + myArr + '\')" value="Sign Up"></input></td></tr>';
                    
                    // tableContent += '<td>'+'<input type="button" '+'onClick=signup(\''+'event.summary'+','+'yetAnotherString'+'\')' +' value="Sign Up"></input></td></tr>';
                    tableContent += '<td>'+'<input type="button" '+'onclick=" signup(\'' + event.id  +'\',\'' + event.summary +'\',\'' + event.start.dateTime  +'\',\''+ event.end.dateTime  + '\')"' +' value="Sign Up"></input></td></tr>';
                    
                    //onclick="return ReAssign(\'' + valuationId  +'\',\'' + user + '\')"
                    }
                    } else {
                    appendPre('No upcoming events found.');
                    //alert('No upcoming events found.');
                    }
                  
                    console.log(tableContent);
                    appendPre(tableContent);
                    });
}


 // input#inputChapName.form-control.input-lg(type='hidden', value='#{chapid}')
//<input id="inputChapName" type="hidden" value="565b81a0e4b030fba33dcafb" class="form-control input-lg">

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
//$.getJSON( '/announce/announcelist', function( data ) {
          // Stick our user data array into a userlist variable in the global object
          
          // For each item in our JSON, add a table row and cells to the content string
        /*  $.each(data, function(){
                 tableContent += '<tr>';
                 tableContent += '<td>'+this.newAnnounce+'</td>';
                 tableContent += '<td> Posted '+this.timeStamp+'</td>';
                 tableContent += '<td><a href="#" class="linkdeleteannounce" rel="' + this._id + '">delete?</a></td>';
                 
                 tableContent += '</tr>';
                 });*/
          
          // Inject the whole content string into our existing HTML table
           $('#announceList table tbody').html(tableContent);
        //  });

function appendPre(message) {
   // var pre = document.getElementById('output');
   // var textContent = document.createTextNode(message + '\n');
    document.getElementById("output").innerHTML = message+'</table></tbody>';
}
