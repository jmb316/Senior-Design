//DEPRECATED FILE!!
(function(){
 
 var todo = document.querySelector( '#todolist' ),
 form = document.querySelector( 'form' ),
 field = document.querySelector( '#newitem' );
 
 form.addEventListener( 'submit', function( ev ) {
                       todo.innerHTML += '<li>' + field.value + '</li>';
                       field.value = '';
                       field.focus();
                       storestate();
                       ev.preventDefault();
                       }, false);
 
 todo.addEventListener( 'click', function( ev ) {
                       var t = ev.target;
                       if ( t.tagName === 'LI' ) {
                       if ( t.classList.contains( 'done' ) ) {
                       t.parentNode.removeChild( t );
                       } else {
                       t.classList.add( 'done' );
                       }
                       storestate();
                       };
                       ev.preventDefault();
                       }, false);
 
 document.addEventListener( 'DOMContentLoaded', retrievestate, false );
 
 //TODO: store in database & not locally
 function storestate() {
 localStorage.todolist = todo.innerHTML;
 };
 
 function retrievestate() {
 if ( localStorage.todolist ) {
 todo.innerHTML = localStorage.todolist;
 }
 };
 
 })();
