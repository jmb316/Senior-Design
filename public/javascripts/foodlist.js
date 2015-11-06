// DOM Ready =============================================================
$(document).ready(function() {

    populateFoodTable();
                  
    // Add User button click
    $('#btnAddFood').on('click', addFood);
                  
    // Delete User link click
    $('#foodList table tbody').on('click', 'td a.linkdeletefood', deleteFood);

});

// Functions =============================================================


// Fill table with data
function populateFoodTable() {
    
    // Empty content string
    var tableContent = '';
    // jQuery AJAX call for JSON
    $.getJSON( '/foods/foodlist', function( data ) {
              // Stick our user data array into a userlist variable in the global object
              userListData = data;
              
              // For each item in our JSON, add a table row and cells to the content string
              $.each(data, function(){
                     tableContent += '<tr>';
                     tableContent += '<td>'+this.newFood+'</td>';
                     tableContent += '<td><a href="#" class="linkdeletefood" rel="' + this._id + '">delete?</a></td>';
                     tableContent += '</tr>';
                     });
              
              // Inject the whole content string into our existing HTML table
              $('#foodList table tbody').html(tableContent);
              });
};




// Add User
function addFood(event) {
    event.preventDefault();
    
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addFood input').each(function(index, val) {
                             if($(this).val() === '') { errorCount++; }
                             });
    
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
        console.log("food: "+  $('#addFood fieldset input#inputFoodName').val());
        // If it is, compile all user info into one object
        var newFood = {
            'newFood': $('#addFood fieldset input#inputFoodName').val(),
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
                       $('#addFood fieldset input').val('');
                       
                       // Update the table
                       populateFoodTable();
                       
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
                       
                       // Update the table
                       populateFoodTable();
                       
                       });
        
    }
    else {
        
        // If they said no to the confirm, do nothing
        return false;
        
    }
    
};