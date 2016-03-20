$(document).ready(function(){
    
    $("a#save-moodboard").click(function(){
        
        var data = JSON.stringify(Moodboard.getStage());
        alert("Data has been saved ");
        console.log(data);
        
        
    });
    
    $("a#new-moodboard").click(function(){
        alert("New Clicked!");    
    });
    
    $("a#snapshot-moodbpa").click(function(){
        alert("Take Snapshot!");
    });
    
})();