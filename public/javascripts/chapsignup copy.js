// Userlist data array for filling in info box
var userData = [];
var chapterListData = [];
// DOM Ready =============================================================
$(document).ready(function() {

    // Add Chapter button click
    $('#btnAddChapter').on('click', addChapter);
                  alert("chapsignup.js");
                  
                 //  parseData("sample.csv", addChapter);
                  

});

// Functions =============================================================



// Show User Info
function showChapterInfo(event) {
    
    // Prevent Link from Firing
    event.preventDefault();
    
    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');
    
    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);
    
    // Get our User Object
    var thisUserObject = userListData[arrayPosition];
    
    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);
    
};
function processFiles(files) {
   /* jQuery.getJSON(files, function (csvdata) {
                   console.log(csvdata.csvToArray());
                   });*/
   /* var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var output = document.getElementById("fileOutput");
        var texto = e.target.result;
        
        csvJSON(texto);*/
 parseData("sample.csv", doStuff);
                     /* $.ajax({
                             type: "GET",
                             url: "names2.txt",
                             dataType: "text",
                             success: function(data) {processData2(data);}
                             });*/
    
    
    //csvJSON(data);
};

function doStuff(data) {
    
    //Data is usable here
    alert("do stuff!");
    console.log(data);
}

    /*
    alert("processData2");
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];
     alert("alltext:"+allText);
    alert("headers:"+headers);
    alert("allTextLines.length: "+allTextLines.length);
    for (var i=0; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
          alert("data:"+data);
        if (data.length == headers.length) {
            
            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);
            alert("tarr: "+tarr);
        }
    }
    alert(lines);
}*/
/*
function processData(allText) {
        //alert("in processData");
  //  alert("allText: "+allText);
    
    var allTextLines = allText.split(',');
    var headers = allTextLines[0].split(',');
    var lines = [];
    
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        //if (data.length == headers.length) {
            
          //  var tarr = [];
           //for (var j=0; j<headers.length; j++) {
              //  tarr.push(data[j]);
           // }
       // }
    }
            for(var j=1;j<allTextLines.length;j++){
                alert("currentline"+allTextLines[j]);
            }
           // lines.push(tarr);
    
    
    // alert(lines);
}*/
/*function csvJSON(csv){
    alert("in CSVJSON");
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
               alert("currentline"+currentline[j]);
        }
        result.push(obj);
    }
    alert(JSON.stringify(result));
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}*/
/*
function parseData(url,callback) {
    Papa.parse(url,{
               download: true,
               delimiter: ",",
               dynamicTyping: true,
               header:true,
               complete: function (results) {
               //setCentroids(results, "isomap");
               // callback(null, null);
               console.log("Parsing complete:", results, file);
               alert(results.data);
               return results.data;
               
               }
               });
}*/

// Add Chapter
function addChapter(event) {
    event.preventDefault();
    alert("do stuff in add chap!");
    /*
     //parsing csv
     Papa.parse("sample.csv",{
     download: true,
     delimiter: ",",
     //dynamicTyping: true,
     header:true,
     complete: function (results) {
     //setCentroids(results, "isomap");
     // callback(null, null);
     alert("Parsing complete:", results, "sample.csv");
     console.log(results.data);
     csv=results.data;
     
     
     $.ajax({
     type: 'POST',
     data: results,
     url: '/users/addchapter',
     dataType: 'JSON'
     }).done(function( response ) {
     // alert("response: "+response.msg);
     // Check for successful (blank) response
     if (response.msg === '') {
     
     alert("added sample to database!");
     //window.location.href = "/addMember";
     }
     else {
     
     // If something goes wrong, alert the error message that our service returned
     alert('Error: ' + response.msg);
     
     }
     });
     
     }
     });*/
    
    // alert("data1"+csv);
    // alert("data2:"+JSON.stringify(csv));
    //alert("data3:"+JSON.stringify(data)[0]."loc");
    //      alert("data4:"+csv[0]);
    // alert("do stuff in add chap2!");
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addChapter input').each(function(index, val) {
                           if($(this).val() === '') {
                                
                                errorCount++; }
                             });

    // Check and make sure errorCount's still at zero
   // if(errorCount === 0) {
       // alert($('#addChapter fieldset select#inputSchool').val());
        //alert($('#addChapter fieldset select#inputChapter').val());
        // If it is, compile all user info into one object
        var newChapter = {
            'School': $('#addChapter fieldset select#inputSchool').val(),
            'Chapter': $('#addChapter fieldset select#inputChapter').val(),
            'Facebook': $('#addChapter fieldset input#inputFacebook').val(),
            'Twitter': $('#addChapter fieldset input#inputTwitter').val(),
            'Tumblr': $('#addChapter fieldset input#inputTumblr').val(),
            'Instagram': $('#addChapter fieldset input#inputInstagram').val()
    //    }
       // alert("yay");
       /* var coll = mongo.collection('chapterlist');
        var query      = {School:School};
        //var userObject = {School: School, chapter: chapter};
        alert("yay3");
        // make sure this username does not exist already
        coll.findOne(query, function(err, school){
                     if (school) {
                     err = 'The chapter you entered already exists';
                     callback(err);
                     } else {
                     
                     // create the new user
                     coll.insert(newChapter, function(err,user){
                                 callback(err,user);
                                 });
                     }
                     });*/

   
   // });
    
        //alert("yay2");

        // Use AJAX to post the object to our adduser service
            $.ajax({
               type: 'POST',
               data: newChapter,
               url: '/users/addchapter',
               dataType: 'JSON'
                   }).done(function( response ) {
                      // alert("response: "+response.msg);
                       // Check for successful (blank) response
                       if (response.msg === '') {
                       
                       // Clear the form inputs
                       $('#addChapter fieldset input').val('');
                       
                       // Clear the form select
                       $('#addChapter fieldset select').val('Select');
                       
                       // Update the table
                       //populateTable();
                       alert( "id before");
                        alert( "id is : " + json.forms[0].id);
                         alert("Chapter added to database!");
                       }
                       else {
                       
                       // If something goes wrong, alert the error message that our service returned
                       alert('Error: ' + response.msg);
                       
                       }
                       });
        
        $.ajax({
               type: 'POST',
               data: csv,
               url: '/users/addchapter',
               dataType: 'JSON'
               }).done(function( response ) {
                       // alert("response: "+response.msg);
                       // Check for successful (blank) response
                       if (response.msg === '') {

                       alert("added sample to database!");
                       }
                       else {
                       
                       // If something goes wrong, alert the error message that our service returned
                       alert('Error: ' + response.msg);
                       
                       }
                       });
        }
   // else {
        // If errorCount is more than 0, error out
     //   alert('Please fill in all fields');
      //  return false;
   // }
};

// Add User
function addUser(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        }
 alert($('#addUser fieldset input#inputUserName').val());
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/user/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

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
function deleteUser(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};





/*Uploading template*/

function fileFunction(){
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
        if (x.files.length != 1) {
            txt = "Select one file";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
                txt+="<br>The path of the selected file: " + x.value;
            }
        }
    }
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead.
        }
    }
    document.getElementById("demo").innerHTML = txt;
}