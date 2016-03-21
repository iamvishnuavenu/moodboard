$(document).ready(function(){
    
    var moodboard = Application.Moodboard;
    var ROOT = "http://localhost:8000"
    function SetupMainStage(){
        var setting = {
            div: "mainstage",
            width: $("#canvas-container").width(),
            height: $("#canvas-container").height(),
            image: "http://localhost:8000/images/room/axiom.png"
        }
        // Initialize the Moodboard!
        moodboard.init();
        
        moodboard.config(setting);
        
        moodboard.setupStage();
    };
    
  function SetupSideBar(){
          var listOfItem = [
          "<div class='draggableimgdiv'><img src='/images/furniture/a.png'></div>" ,
            "<div class='draggableimgdiv'><img src='/images/furniture/a.png'></div>" ,
            "<div class='draggableimgdiv'><img src='/images/furniture/a.png'></div>" ,
            "<div class='draggableimgdiv'><img src='/images/furniture/a.png'></div>" ,
            "<div class='draggableimgdiv'><img src='/images/furniture/a.png'></div>",
            "<div class='draggableimgdiv'><img src='/images/furniture/a.png'></div>" , 
            "<div class='draggableimgdiv'><img src='/images/furniture/a.png'></div>" ,
           "<div class='draggableimgdiv'><img src='/images/furniture/a.png'></div>"             ];
        
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
                
                 var droppableImage = ui.draggable.find("img").attr("src");
                 var position = ui.helper.position();
                 var left = position.left ;
                 var top = position.top ;
                
                
                 if( moodboard.isStageCreated()){
                     console.log("mainStage Yet not Intialized ...");
                     
                 }else{
                    // Adding the  Element on Drop! 
                    var stageElement = new                  fabric.Image.fromURL(ROOT+droppableImage,function(img){
                        img.set({
                            left: 60,
                            top: 250,
                        });
                        img.setControlsVisibility(moodboard.getCtrlParams());
                        img.scale(0.5);
                        moodboard.getStage().add(img); 
                        moodboard.getStage().renderAll();
                    })
                     
                 } // else ended    
                 
            } // drop ended 
        });

  };
    
    function initialize(){
        SetupMainStage();
        SetupSideBar();
    }
    
    
    initialize();
});