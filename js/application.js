// Defining main Global namespace
var Application = {};



// Defining Moodboard module
Application.Moodboard = (function(){
    "use strict";
    var STAGE = null,
        width = 400,
        height = 400,    
        default_canvas_div = "mainstage", 
    
        CONTROL_PARAMS =  {
            'tl':true,
            'tr':true,
            'bl':true,
            'br':true,
            'ml':false,
            'mt':false,
            'mr':false,
            'mb':false,
            'mtr':false
        },    
        default_background = " http://localhost:8000/images/room/blue.png";
        
    return{
        // initilizing the Moodboard
        init: function(){
            // Intiailizing the STAGE
            console.log(" Canvas Created at : ", default_canvas_div);
            STAGE = new fabric.Canvas(default_canvas_div);
            },
        
        config : function(setting){
            console.log(" Setting consist of ", setting)
            this.setDef_canvas_div( setting.div );
            this.setDimension( { width : setting.width,
                                      height: setting.height
                                    });
            this.setBackgroundImage(setting.image);
            
        },
        // Preparing canvas 
        setupStage : function(){
                        // Setting up Moodboard
            console.log(" From Setup Stage : ");
            console.log(this.getDimension());
            
            this.getStage().setWidth(this.getDimension().width+2);
            this.getStage().setHeight(this.getDimension().height)
            
            this.getStage().setBackgroundImage(
                default_background,
                this.getStage().renderAll.bind(this.getStage()),{
                backgroundImageOpacity: 0.5,
                backgroundImageStretch: false});        
        },
        
        // Setting Dimension
        setDimension : function( dim ){
            width = dim.width;
            height = dim.height;
        },
        // Getting Dimension
        getDimension : function(){
            return{
                'width': width,
                'height': height
            };
        },
        // set default canvas div
        setDef_canvas_div: function(div){
            // Setting default div
            div = div || default_canvas_div;
        },
        // accessing default canvas object
        getStage: function(){
            return STAGE;
        },
        // set canvas object background image 
        setBackgroundImage: function(img){
            default_background = img;
        },
        // reset the canvas
        resetStage: function(){
        // Clearing the canvas
            STAGE.clear();    
            this.setupStage();
            this.update();
        },
        // return serialized canvas data
        getStage_JSON : function(){
            var data = JSON.stringify(STAGE);
            return data; 
        },
        // determine if object is initialized 
        isStageCreated: function(){
            return STAGE === null ? true : false;
        },
        // get default param for object control
        getCtrlParams: function(){
            return CONTROL_PARAMS;
        },
        // get default background image
        getDefaultBackgroundImage : function(){
            return default_background; 
        },
        // set background image
        setDefaultBackgroundImage : function(img){
            default_background = img;
        },
        // Refreshing function
        update : function(){
            STAGE.renderAll().bind(STAGE);
        },
    }

})();

// Handling User Level Interation
Application.UserInteraction = (function(){
    'using strict';
    var moodboard = Application.Moodboard;
    return{
        // "New" Creating New Moodboard
        
        newAction : function(){
            // Checking if user has done any work yet !
            console.log(moodboard.getStage().getObjects().length);
            if( moodboard.getStage().getObjects().length >= 1){
                 var retVal = confirm("Want to save Previous Moodboard?");
                console.log(" Confirmed ... ",retVal);
                 if( retVal === true){
                     // Saving previous Work
                     alert("MoodBoard Saved ..!");
                     moodboard.resetStage();
                 }else{
                     
                     moodboard.resetStage();
                     
                 }
            }
        },
        
        saveAction : function(){
            
            // Asking for user Confirmation
            var data = moodboard.getStage_JSON();
            // saving on the web localstorage 
            console.log(data);
        }
    }
})();
