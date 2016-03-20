$(document).ready(function(){
    
console.log(default_room_image);   
    
mainStage.setWidth($("#canvas-container").width());
mainStage.setHeight($("#canvas-container").height());
        
    
mainStage.setBackgroundImage(default_room_image,
mainStage.renderAll.bind(mainStage),{
            backgroundImageOpacity: 0.5,
            backgroundImageStretch: false
        }                        );
// ------------------------------------------------- //
        
   
});

