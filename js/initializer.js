// Main Namespace object
var Moodboard = (function(){
    var STAGE = null;
    var CONTROL_PARAMS =  {
            'tl':true,
            'tr':true,
            'bl':true,
            'br':true,
            'ml':false,
            'mt':false,
            'mr':false,
            'mb':false,
            'mtr':false
        };    
        
    return{
        init: function(div){
            // Intiailizing the STAGE
            STAGE = new fabric.Canvas(div);        
        },
        
        getStage: function(){
            return STAGE;
        },
        setBackgroundImage: function(args){
            
        },
        
        isStageCreated: function(){
            return STAGE === null ? true : false;
            
        },
        
        getCtrlParams: function(){
            return CONTROL_PARAMS;
        },
        
    }
})();




    // Overriding Fabric

    var DIMICON = 20;
    // -----------  Images for Icons ------------------- //
        
         var dataImage = [
      "http://localhost:8000/assets/images/icons/resize.png", /*scale*/
      "http://localhost:8000/assets/images/icons/delete.png", /*delete*/
      "http://localhost:8000/assets/images/icons/rotate.png", /*rotate*/
      "https://cdn2.iconfinder.com/data/icons/social-messaging-productivity-1/128/write-compose-16.png", /*change text*/
      "https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-1/128/save-16.png" /*save*/
        ];
        
    // ------------------------------------------------------ //
    
    // ---------------- Overriding the _drawControl --------- // 
    fabric.Object.prototype._drawControl = function(control, ctx, methodName, left, top) {
      if (!this.isControlVisible(control)) {
        return;
      }
	  var SelectedIconImage = new Image();
      var size = this.cornerSize;
    /*  fabric.isVML() ||*/ this.transparentCorners || ctx.clearRect(left, top, size, size);
	   switch (control)
            {
            case 'tl':/*delete*/
              SelectedIconImage.src = dataImage[1];
			  break;
            case 'tr':/*scale*/
              SelectedIconImage.src = dataImage[0];	  
			  break;
            case 'bl':/*scale*/
             SelectedIconImage.src = dataImage[0];
			  break;
            case 'br':/*rotate*/
              SelectedIconImage.src = dataImage[2];
			  break;
            default:
              ctx[methodName](left, top, size, size);
            }
             
            if (control == 'tl' || control == 'tr' || control == 'bl' || control == 'br')
            {
              try {
                ctx.drawImage(SelectedIconImage, left, top, DIMICON, DIMICON); 
              } catch (e) {
				  ctx[methodName](left, top, size, size);
              }
            }
    } // overriding  ended 
 
    //--- override prorotype _setCornerCursor to change the corner cusrors ---//
	fabric.Canvas.prototype._setCornerCursor =  function(corner, target) {
		if (corner === 'mtr' && target.hasRotatingPoint) {
			this.setCursor(this.rotationCursor);
			/*ADD*/
		  }else if(corner == "tr" || corner == "bl" ){
			  this.setCursor('sw-resize'); 

		  }else if(corner == "tl" || corner == "br"){
			  this.setCursor('pointer');  
		  }			  
			/*ADD END*/
		  else {
			this.setCursor(this.defaultCursor);
			return false;
		  }
    }; // end override 
 
    //--- Override the setting action on object interaction ---//  
    fabric.Canvas.prototype._getActionFromCorner = function(target, corner){
      var action = 'drag';
	  if (corner){
		  switch(corner){
			case 'ml':
			case 'mr':
				action = 'scaleX';
				break;
			case 'mt':
			case 'mb':
				action = 'scaleY';
				break;
			case 'mtr':
				action = 'rotate';
				break;
			/**ADD **/	
			case 'br':
				action = 'rotate';
				break;
			case 'tl'://delete function if mouse down
				action = 'delete';
				Moodboard.getStage().remove(Moodboard.getStage().getActiveObject());
				break;		
			/**ADD END**/				
			default:  action = 'scale';
		  }
		  return action;
	  }
    } //  End _getAction 
	
    //--- Overriding _performTransformAction ---//
    fabric.Canvas.prototype._performTransformAction = function(e, transform, pointer) {
      var x = pointer.x,
          y = pointer.y,
          target = transform.target,
          action = transform.action;

      if (action === 'rotate') {
        this._rotateObject(x, y);
        this._fire('rotating', target, e);
      }
      else if (action === 'scale') {
        this._onScale(e, transform, x, y);
        this._fire('scaling', target, e);
      }
      else if (action === 'scaleX') {
        this._scaleObject(x, y, 'x');
        this._fire('scaling', target, e);
      }
      else if (action === 'scaleY') {
        this._scaleObject(x, y, 'y');
        this._fire('scaling', target, e);
      }
	  /**ADD**/
	  else if (action === 'delete') {
		//do nothing, because here function executed when mouse moves
	  }
	  /**ADD END**/
	  else {
        this._translateObject(x, y);
        this._fire('moving', target, e);
        this.setCursor(this.moveCursor);
      }
    } // End of _actionPerformed
//
//    // *****************  Override Ends ******************** //
//
//

