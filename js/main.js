
// Global definition
var ROOT = "http://localhost:8000";
var default_room_image = "http://localhost:8000/assets/images/room/axiom.png";
// Canvas Specific code 


// Global Canvas Area
 $(document).ready(function(){

    
    // Initializing the mood  
    Moodboard.init("mainstage");    
    
    
    // Main bootstraping code
    function initialize(){
        console.log(" # calling intialize!");
        
        setup_sidebar();
        setup_mainStage();
        }
    
    
//    setting up the main stage 
     function setup_mainStage(){   
    
        Moodboard.getStage().setWidth($("#canvas-container").width());
        Moodboard.getStage().setHeight($("#canvas-container").height());
        
    
        Moodboard.getStage().setBackgroundImage(default_room_image,
                                     Moodboard.getStage().renderAll.bind(Moodboard.getStage()),{
        
            backgroundImageOpacity: 0.5,
            backgroundImageStretch: false
        });
// ------------------------------------------------- //
    } // End of setup_MainStage
    

    //    setting up sidebar
function setup_sidebar(){
    var listOfItem = [
          "<div class='draggableimgdiv'><img src='/assets/images/furniture/a.png'></div>" ,
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/a.png'></div>" ,
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/a.png'></div>" ,
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/a.png'></div>" ,
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/a.png'></div>",
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/a.png'></div>" , 
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/a.png'></div>" ,
           "<div class='draggableimgdiv'><img src='/assets/images/furniture/a.png'></div>"         ];
        
// Stacking-up the item on div
_.forEach(listOfItem , function(div){
    $("#shelf").append(div);
}); 
        

// Make them Draggable 
$(".draggableimgdiv").draggable({
            cursor: "move",
            stack: "#shelf",
            helper : "clone"
});

$("#mainstage").droppable({
    
    drop: function(event, ui){
                 var $this = $(this);
                
//                 var droppableImage = ui.draggable.html();
                 var droppableImage = ui.draggable.find("img").attr("src");
                 var position = ui.helper.position();
                 var left = position.left ;
                 var top = position.top ;
                
                
//                 droppableImage = jQuery.parseHTML(droppableImage);
//                 alert(droppableImage);
//                 console.log(droppableImage); 
                
                 if( Moodboard.isStageCreated()){
                     console.log("mainStage Yet not Intialized ...");
                     
                 }else{
                    // Adding the  Element on Drop! 
                    var stageElement = new fabric.Image.fromURL(ROOT+droppableImage,function(img){
                        img.set({
                            left: 60,
                            top: 250,
                        });
                        img.setControlsVisibility(Moodboard.getCtrlParams());
                        img.scale(0.5);
                        Moodboard.getStage().add(img); 
                        Moodboard.getStage().renderAll();
                    })
                     
                 } // else ended    
                 
            } // drop ended 
        });

    }
    
    
    //    start the party
    initialize();
    
    
    
});