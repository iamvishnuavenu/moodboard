$(document).ready(function(){
    
    var ROOT = "http://localhost:8000";
    var default_room_image = "http://localhost:8000/assets/images/room/Atari1.jpg";
    var mainStage = null;

    
    function initialize(){
        setup_mainStage();
        setup_sidebar();
        
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
                 console.log(position);
                 var left = position.left ;
                 var top = position.top ;
                
//                 droppableImage = jQuery.parseHTML(droppableImage);
//                 alert(droppableImage);
//                 console.log(droppableImage); 
                
                 if( mainStage === null){
                     setup_mainStage()
        
                 }else{
                     
                    var stageElement = new fabric.Image.fromURL(ROOT+droppableImage,function(img){
                        img.set({
                            left: left,
                            top: top
                        });
                        img.scale(0.5);
                        console.log(img); 
                        mainStage.add(img); 
                        mainStage.renderAll();
                    })
                     
                 }    
                 
            }
        });
        
        
    }
    
    
    
//    setting up the main stage 
    function setup_mainStage(){
        //    Creating and Initializing the Canvas
        
        mainStage = new fabric.Canvas('mainstage');
        mainStage.setWidth($("#canvas-container").width());
        mainStage.setHeight($("#canvas-container").height());
        
    
        mainStage.setBackgroundImage(default_room_image,
        mainStage.renderAll.bind(mainStage),{
            backgroundImageOpacity: 0.5,
            backgroundImageStretch: false
        }                        );
        // ------------------------------------------------- //    
    }
    
//    setting up sidebar
    function setup_sidebar(){
        var listOfItem = [
          "<div class='draggableimgdiv'><img src='/assets/images/furniture/chair-png-image-11.jpg'></div>" ,
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/chair-png-image-11.jpg'></div>" ,
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/chair-png-image-11.jpg'></div>" ,
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/chair-png-image-11.jpg'></div>" ,
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/chair-png-image-11.jpg'></div>",
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/chair-png-image-11.jpg'></div>" , 
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/chair-png-image-11.jpg'></div>" ,
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/chair-png-image-11.jpg'></div>" ,
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/chair-png-image-11.jpg'></div>" ,
            "<div class='draggableimgdiv'><img src='/assets/images/furniture/chair-png-image-11.jpg'></div>"
        ];
        
        
        
        // Stacking-up the item on div
        _.forEach(listOfItem , function(div){
            $("#shelf").append(div);
        }); 
        
    }
    
    
//    start the party
    initialize();
    
});