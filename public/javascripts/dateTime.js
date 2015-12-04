// date variables
var now = new Date();
today = now.toISOString();
var tableContent="<table class='table table-striped'><tbody><th>Event</th><th>Date and Time</th><th>Attendees</th><th>Register</th>";
var twoHoursLater = new Date(now.getTime() + (2*1000*60*60));
twoHoursLater = twoHoursLater.toISOString();
var calId=$('#addEvent fieldset input#inputGoogleCal').val();

// google api console clientID and apiKey (https://code.google.com/apis/console/#project:568391772772)

//TODO: get from config file
//heroku:
//var clientId = '316615911187-duaavj04u4g1poomqp7dpm76pjuf2642.apps.googleusercontent.com';
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
     var addButton = document.getElementById('btnAddEvent');
    var resultPanel		= document.getElementById('result-panel');
    var resultTitle		= document.getElementById('result-title');
    
    if (authResult && !authResult.error) {
        authorizeButton.style.visibility = 'hidden';			// if authorized, hide button
        resultPanel.className = resultPanel.className.replace( /(?:^|\s)panel-danger(?!\S)/g , '' )	// remove red class
        resultPanel.className += '';				// add green class
        resultTitle.innerHTML = ''	;	// display 'authorized' text
         addButton.style.visibility = 'visible';
        loadCalendarApi();											// load calendarif authorization passed
    } else {													// otherwise, show button
        authorizeButton.style.visibility = 'visible';
        //resultPanel.className += ' panel-danger';				// make panel red
        authorizeButton.onclick = handleAuthClick;				// setup function to handle button click
       addButton.style.visibility = 'hidden';
    }
}

// function triggered when user authorizes app
function handleAuthClick(event) {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    return false;
}

// function load the calendar api and make the api call
function signup(eventId,summary,start,end,attendees) {
  
    alert(eventId+summary+start+end+attendees);
    console.log(calId);
    var email=$('#addEvent fieldset input#email').val();
   
    //alert("google email: "+email);

      attendees+=email;
  
    //attendees+="jmb316@lehigh.edu";
    var splitAttend = attendees.split(" ");
  
    // setup event details

    var t='[';
    for(var i=0;i<splitAttend.length;i++)
    {
        t+='{"email":"'+splitAttend[i]+'"},';

    }
    var str = t.substring(0, t.length - 1);
    str+=']';
    //console.log("t: "+str);
    // "attendees":[{"email":splitAttend[0]},{"email":splitAttend[1]}],
   var jsonYAY=  JSON.parse(str);
    console.log(jsonYAY);

    var update = {
        "summary": summary,
        "anyoneCanAddSelf": true,
       // "attendees":[{"email":splitAttend[0]},{"email":splitAttend[1]}],
       "attendees": jsonYAY,
        
        "start": {
            "dateTime": start
        },
        "end": {
            "dateTime": end
        }
        

    };

   /* gapi.client.load('calendar', 'v3', function() {					// load the calendar api (version 3)
                     var request = gapi.client.calendar.events.insert({
                                                                      'calendarId':		'ftbioqlsgdfcp0sltprr7r7nqg@group.calendar.google.com',	// calendar ID
                                                                      "resource":			resource							// pass event details with api call
                                                                      });*/
    
    gapi.client.load('calendar', 'v3', function() {					// load the calendar api (version 3)
                     
                     var request = gapi.client.calendar.events.update({
                                                                      'calendarId':calId,
                                                                              "eventId": eventId,
                                                                      "resource":			update							// pass event details with api call
                                                                      });
                     
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



function addEvent()
{
    alert("in add event!");
    
       var summary=$('#addE fieldset input#summary').val();
     var start=$('#addE fieldset input#start').val();
        var end=$('#addE fieldset input#end').val();
    alert("summary:"+summary+" start:"+start+" end:"+end);
    var details = {
        "summary": summary,
        "anyoneCanAddSelf": true,
        "start": {
            "dateTime": start
        },
        "end": {
            "dateTime": end
        }
        
        
    };
    
    gapi.client.load('calendar', 'v3', function() {					// load the calendar api (version 3)
                     
                     var request = gapi.client.calendar.events.insert({
                                                                      'calendarId':calId,
                                                                      "resource": details,
                                                                      // pass event details with api call
                                                                      });
                     
                     //adding an event
                     
                     request.execute(function(resp) {
                                     if(resp.status=='confirmed') {
                                     //alert("Event deleted successfully");
                                     } else {
                                     // document.getElementById('event-response').innerHTML = "There was a problem. Reload page and try again.";
                                     // alert("There was a problem. Reload page and try again.");
                                     console.log(resp);
                                     
                                     }
                                     
                                     
                                     
                                     });
                     
                     
                     //loading calendar after add
                     location.reload (true);
                     
                     
                     
                     
                     });
}




     function deleteEvent(eventId)
 {
     alert("in delete event!");
     
     gapi.client.load('calendar', 'v3', function() {					// load the calendar api (version 3)
                      
                      var request = gapi.client.calendar.events.delete({
                                                                       'calendarId':calId,
                                                                       "eventId": eventId,
                                                                     						// pass event details with api call
                                                                       });
                      
                      //adding an event
                      
                      request.execute(function(resp) {
                                      if(resp.status=='confirmed') {
                                      //alert("Event deleted successfully");
                                      } else {
                                      // document.getElementById('event-response').innerHTML = "There was a problem. Reload page and try again.";
                                      // alert("There was a problem. Reload page and try again.");
                                             console.log(resp);
                                      
                                      }
                                      
                               
                                      
                                      });
                      
                      
                      //loading calendar after add
                      location.reload (true);
                      
                      
                      
                      
                      });
 }


/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
   
    var request = gapi.client.calendar.events.list({
                                                   'calendarId': calId,
                                                   'timeMin': (new Date()).toISOString(),
                                                   'showDeleted': false,
                                                   'singleEvents': true,
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
                    //alert("start"+event.start.dateTime);
                      // alert("end"+event.end.dateTime);
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
                    var attendees="",attendeesPrint="";
                    for (var p in event.attendees) {
                        if(event.attendees[p].displayName)
                            attendeesPrint += event.attendees[p].displayName  + ', ';
                        else
                            attendeesPrint += event.attendees[p].email + ', ';
                        attendees += event.attendees[p].email + ' ';

                    }
                    if(attendeesPrint.length==0)
                    {
                        tableContent+=attendeesPrint;
                    
                    }
                    else
                    {
                        var strPrint = attendeesPrint.substring(0, attendeesPrint.length - 2);
                        tableContent+=strPrint;
                    }
                     //alert(p + " : " + event.attendees[p].displayName);
                    
                    tableContent += '</td>';
                    
                    // tableContent += '<td>'+'<input type="button" '+'onClick=signup(\''+'event.summary'+','+'yetAnotherString'+'\')' +' value="Sign Up"></input></td></tr>';
                    tableContent += '<td>'+'<input type="button" '+'onclick=" signup(\'' + event.id  +'\',\'' + event.summary +'\',\'' + event.start.dateTime  +'\',\''+ event.end.dateTime  +'\', \''+ attendees  + '\')"' +' value="    Sign Up   "></input>';
                    var admin=$('#addEvent fieldset input#admin').val();
                    console.log("admin: " + admin);
                    if (admin == 'true'){
                    tableContent += '<br><br><input type="button"value="Delete Event" onclick="deleteEvent(\''+event.id+ '\')"'+'</input>';
                    tableContent += '</td></tr>';
                    }
                    tableContent += '</td></tr>';
                    
                    //console.log(tableContent);
                    //onclick="return ReAssign(\'' + valuationId  +'\',\'' + user + '\')"
                    }
                    } else {
                    appendPre('No upcoming events found.');
                    //alert('No upcoming events found.');
                    }
                    
                    //console.log(tableContent);
                    appendPre(tableContent);
                    });
}
          // Inject the whole content string into our existing HTML table
           $('#announceList table tbody').html(tableContent);
        //  });

function appendPre(message) {
   // var pre = document.getElementById('output');
   // var textContent = document.createTextNode(message + '\n');
    document.getElementById("output").innerHTML = message+'</table></tbody>';
}
