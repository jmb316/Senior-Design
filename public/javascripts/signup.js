// Userlist data array for filling in info box
var userListData = [];
var chapterListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
                  
    // Populate the chapter info on initial page load
    //populateChapSignup();

    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Add User button click
    $('#btnAddUser').on('click', addUser);
                  
                  
    // Add Chapter button click
    $('#btnAddChapter').on('click', addChapter);

    // Delete User link click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

});

// Functions =============================================================

function createUser(username, password, password_confirmation, callback){
    var coll = mongo.collection('users');
    
    if (password !== password_confirmation) {
        var err = 'The passwords do not match';
        callback(err);
    } else {
        var query      = {username:username};
        var userObject = {username: username, password: password};
        
        // make sure this username does not exist already
        coll.findOne(query, function(err, user){
                     if (user) {
                     err = 'The username you entered already exists';
                     callback(err);
                     } else {
                     // create the new user
                     coll.insert(userObject, function(err,user){
                                 callback(err,user);
                                 });
                     }
                     });
    }
}
