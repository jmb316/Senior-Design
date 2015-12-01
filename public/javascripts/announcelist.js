// DOM Ready =============================================================
$(document).ready(function() {
    // Add User button click
    $('#btnAddAnnounce').on('click', addAnnounce);
                  
    // Delete User link click
    $('#announceList table tbody').on('click', 'td a.linkdeleteannounce', deleteAnnounce);
});

// Functions =============================================================

// Add User
function addAnnounce(event) {
    event.preventDefault();
    
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addAnnounce textarea').each(function(index, val) {
                             if($(this).val() === '') { errorCount++; }
                             });


    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        // If it is, compile all user info into one object
        var newAnnounce = {
            'newAnnounce': $('#addAnnounce fieldset textarea#inputAnnounceName').val(),
             'timeStamp': dateTime(),
        'chapter_id':$('#addAnnounce fieldset input#inputChapName').val()
            
        }
        // Use AJAX to post the object to our adduser service
        $.ajax({
               type: 'POST',
               data: newAnnounce,
               url: '/announce/addannounce',
               dataType: 'JSON'
               }).done(function( response ) {
                       
                       // Check for successful (blank) response
                       if (response.msg === '') {
                       
                       // Clear the form inputs
                       $('#addAnnounce fieldset textarea').val('');
                       
                       // Update the table
                       location.reload (true);
                       }
                       else {
                       
                       // If something goes wrong, alert the error message that our service returned
                       alert('Error: ' + response.msg);
                       
                       }
                       });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};



// Delete User
function deleteAnnounce(event) {
   // alert("DELETE!");
    event.preventDefault();
    
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this announcement?');
    
    // Check and make sure the user confirmed
    if (confirmation === true) {
        // If they did, do our delete
        $.ajax({
               type: 'DELETE',
               url: '/announce/deleteannounce/' + $(this).attr('rel')
               }).done(function( response ) {
                       
                       // Check for a successful (blank) response
                       if (response.msg === '') {
                       }
                       else {
                       alert('Error: ' + response.msg);
                       }
                       
                       location.reload (true);
                       
                       });
        
    }
    else {
        // If they said no to the confirm, do nothing
        return false;
    }
    
};

function dateTime()
{
    var currentdate = new Date();
    
    var hours = currentdate.getHours();
    var AMPM="AM";
    if (hours > 12) {
        hours -= 12;
        AMPM="PM"
    } else if (hours === 0) {
        hours = 12;
        AMPM="AM"
    }
    var minutes= currentdate.getMinutes();
    if (minutes <10);
    minutes="0"+currentdate.getMinutes();
    
    var datetime = (currentdate.getMonth()+1) + "/"
    + (currentdate.getDate())  + "/"
    + currentdate.getFullYear() + " "
    + hours + ":"
    + minutes+AMPM;
    return datetime;
   // alert(datetime);
}