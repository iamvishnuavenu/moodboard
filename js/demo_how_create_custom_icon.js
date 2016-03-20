var canvas = new fabric.Canvas('mainstage');
var DIMICON = 15;
var HideControls = {
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


 var dataImage = [
	"https://cdn1.iconfinder.com/data/icons/streamline-interface/60/cell-8-10-120.png", /*scale*/
      "https://cdn1.iconfinder.com/data/icons/ui-color/512/Untitled-12-128.png", /*delete*/
      "https://cdn2.iconfinder.com/data/icons/social-messaging-productivity-1/128/sync-16.png", /*rotate*/
      "https://cdn2.iconfinder.com/data/icons/social-messaging-productivity-1/128/write-compose-16.png", /*change text*/
      "https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-1/128/save-16.png" /*save*/
  ];
//********override*****//
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
    }
 
//override prorotype _setCornerCursor to change the corner cusrors
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
    };
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
				canvas.remove(canvas.getActiveObject());
				break;		
			/**ADD END**/				
			default:  action = 'scale';
		  }
		  return action;
	  }
    }  
	
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
    }
//********override END*****//
 
 //create a rect object  
 var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill:  "#FF0000",
        stroke: "#000",
        width: 100,
        height: 100,
        strokeWidth: 10, 
        opacity: .8       
    });
canvas.add(rect);    
rect.setControlsVisibility(HideControls);

fabric.Image.fromURL('http://serio.piiym.net/CVBla/txtboard/thumb/1260285874089s.jpg', function (img) {
    img.top = 60;
    img.left = 250;
    img.setControlsVisibility(HideControls);
    canvas.add(img);
});

canvas.renderAll();