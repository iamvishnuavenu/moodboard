$(document).ready(function(){
    
    var userinteraction = Application.UserInteraction;
    
    $("a#new-moodboard").click(function(){
        var ask = confirm("Really Want to close this Work?");
        if( ask === true){
            userinteraction.newAction();    
        }
        // else nothing ...
    });
    
    $("a#save-moodboard").click(function(){
        var ask = confirm("Save the Current MoodBoard? ");
        if( ask === true){
            userinteraction.saveAction();
        }  
        // Other wise do nothing

    });
    

    $("a#snapshot-moodbpa").click(function(){
        alert("Take Snapshot!");
    });
    
});