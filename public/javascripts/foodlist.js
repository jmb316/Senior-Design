// DOM Ready =============================================================
$(document).ready(function() {

                  
    // Add User button click
    $('#btnAddFoods').on('click', addFood);
                  
    // Delete User link click
    $('#foodList table tbody').on('click', 'td a.linkdeletefood', deleteFood);

});

// Functions =============================================================


// Add User
function addFood(event) {
    //alert("in add food!");
    //console.log("in add food!");
    event.preventDefault();
    
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addFood textarea').each(function(index, val) {
                             if($(this).val() === '') { errorCount++; }
                             });
    
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
       // console.log("food: "+  $('#addFood fieldset textarea#inputFoodName').val());
        // If it is, compile all user info into one object
        var newFood = {
            'newFood': $('#addFood fieldset textarea#inputFoodName').val(),
             'chapter_id':$('#addFood fieldset input#inputChapName').val()
        }
      //  alert($('#addUser fieldset input#inputUserName').val());
        // Use AJAX to post the object to our adduser service
        $.ajax({
               type: 'POST',
               data: newFood,
               url: '/foods/addfood',
               dataType: 'JSON'
               }).done(function( response ) {
                       
                       // Check for successful (blank) response
                       if (response.msg === '') {
                       
                       // Clear the form inputs
                       $('#addFood fieldset textarea').val('');
                       
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
function deleteFood(event) {
    
    event.preventDefault();
    
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this food request?');
    
    // Check and make sure the user confirmed
    if (confirmation === true) {
        
        // If they did, do our delete
        $.ajax({
               type: 'DELETE',
               url: '/foods/deletefood/' + $(this).attr('rel')
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