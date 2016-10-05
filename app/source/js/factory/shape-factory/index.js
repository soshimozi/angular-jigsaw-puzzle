'use strict';

function Bezier(a) {
	Array.call(this);
	
	if (a instanceof Array) {
		this[0]=a[0]; // cx1
		this[1]=a[1]; // cy1
		this[2]=a[2]; // cx2
		this[3]=a[3]; // cy2
		this[4]=a[4]; // x
		this[5]=a[5]; // y
	}
}

Bezier.prototype=[];

// Point object
function Point(a,b,c) {
    // a=x,b=y, c=id
    if (b!==undefined) {
	    this.x=a;
	    this.y=b;
	    this.id=(c!==undefined)?c:0;
	}
    // a=Point or {x:?,y:?,id:?}
    else if (a && a.x!==undefined) {
	    this.x=a.x;
	    this.y=a.y;
	    this.id=(a.id!==undefined)?a.id:0;		
	}
    // empty
    else {
	    this.x=this.y=this.id=0;
	}
}

Point.prototype.toString = function() {
	return "{x:"+this.x+",y:"+this.y+",id:"+this.id+"}";
};

Point.prototype.toHashkey = function() {
	// We could use toString(), but I am concerned with
	// the performance of Polygon.merge(). As for now
	// I have no idea if its really that much of an
	// improvement, but I figure the shorter the string
	// used as a hash key, the better. This also reduce
	// the number of concatenations from 6 to 2. Ultimately,
	// I could cache the hash key..
	return this.x+"_"+this.y;
};

Point.prototype.clone = function() {
	return new Point(this);
};

Point.prototype.offset = function(dx,dy) {
	this.x+=dx; this.y+=dy;
};

Point.prototype.set = function(a) {
	this.x=a.x;
	this.y=a.y;
    this.id=(a.id!==undefined)?a.id:0;
};

Point.prototype.compare = function(other,strict) {
	return this.x==other.x && this.y==other.y && (!strict || this.id==other.id);
};

// Segment object
function Segment(a,b) {
	this.ptA = new Point(a);
	this.ptB = new Point(b);
}

Segment.prototype.toString = function() {
	return "["+this.ptA+","+this.ptB+"]";
};

Segment.prototype.compare = function(other) {
	return (this.ptA.compare(other.ptA) && this.ptB.compare(other.ptB)) || (this.ptA.compare(other.ptB) && this.ptB.compare(other.ptA));
};

// Bounding box object
function Bbox(a,b,c,d) {
	// a=x1,b=y1,c=x2,d=y2
	if (d!==undefined) {
		this.tl=new Point({x:a,y:b});
		this.br=new Point({x:c,y:d});
    }
	// a=Point or {x:?,y:?},b=Point or {x:?,y:?}
	else if (b!==undefined) {
		var mn=Math.min;
		var mx=Math.max;
		this.tl=new Point({x:mn(a.x,b.x),y:mn(a.y,b.y)});
		this.br=new Point({x:mx(a.x,b.x),y:mx(a.y,b.y)});
	}
	// a=Bbox or {tl:{x:?,y:?},br:{x:?,y:?}}
	else if (a) {
		this.tl=new Point(a.tl);
		this.br=new Point(a.br);
	}
	// empty
	else {
		this.tl=new Point();
		this.br=new Point();
	}
}

Bbox.prototype.toString = function() {
	return "{tl:"+this.tl+",br:"+this.br+"}";
};

Bbox.prototype.clone = function() {
	return new Bbox(this);
};

Bbox.prototype.getTopleft = function() {
	return new Point(this.tl);
};

Bbox.prototype.getBottomright = function() {
	return new Point(this.br);
};

Bbox.prototype.unionPoint = function(p) {
	var mn=Math.min;
	var mx=Math.max;
	this.tl.x=mn(this.tl.x,p.x);
	this.tl.y=mn(this.tl.y,p.y);
	this.br.x=mx(this.br.x,p.x);
	this.br.y=mx(this.br.y,p.y);
};

Bbox.prototype.unionPoints = function(a) {
	// assume array of values
	if (a instanceof Array) {
		var mx=Math.max;
		var mn=Math.min;
		var x; var y;
		for (var i=0; i<a.length; i+=2) {
			x=a[i]; y=a[i+1];
			this.tl.x=mn(this.tl.x,x);
			this.tl.y=mn(this.tl.y,y);
			this.br.x=mx(this.br.x,x);
			this.br.y=mx(this.br.y,y);
		}
	}
};

Bbox.prototype.width = function() {
	return this.br.x-this.tl.x;
};

Bbox.prototype.height = function() {
	return this.br.y-this.tl.y;
};

Bbox.prototype.offset = function(dx,dy) {
	this.tl.offset(dx,dy);
	this.br.offset(dx,dy);
};

Bbox.prototype.set = function(a) {
	if (a) {
		if (a instanceof Array) {
			// array of Points
			if (a.length>0) {
				var mx=Math.max;
				var mn=Math.min;
				var i;
				if (a[0].x!==undefined) {
					this.tl.x=this.br.x=a[0].x;
					this.tl.y=this.br.y=a[0].y;
					var p;
					for (i=1; i<a.length; i++) {
						p=a[i];
						this.tl.x=mn(this.tl.x,p.x);
						this.tl.y=mn(this.tl.y,p.y);
						this.br.x=mx(this.br.x,p.x);
						this.br.y=mx(this.br.y,p.y);
					}
				}
				// assume array of values
				else {
					var x; var y;
					for (i=0; i<a.length; i+=2) {
						x=a[i]; y=a[i+1];
						this.tl.x=mn(this.tl.x,x);
						this.tl.y=mn(this.tl.y,y);
						this.br.x=mx(this.br.x,x);
						this.br.y=mx(this.br.y,y);
					}
				}
			}
		}
	}
};

Bbox.prototype.pointIn = function(p) {
	return p.x>this.tl.x && p.x<this.br.x && p.y>this.tl.y && p.y<this.br.y;
};

Bbox.prototype.doesIntersect = function(bb) {
	var mn=Math.min;
	var mx=Math.max;
	return (mn(bb.br.x,this.br.x)-mx(bb.tl.x,this.tl.x))>0 && (mn(bb.br.y,this.br.y)-mx(bb.tl.y,this.tl.y))>0;
};

Bbox.prototype.union = function(other) {
	// this bbox is empty
	if (this.isEmpty()) {
		this.tl=new Point(other.tl);
		this.br=new Point(other.br);
	}
	// union only if other bbox is not empty
	else if (!other.isEmpty()) {
		var mn=Math.min;
		var mx=Math.max;
		this.tl.x=mn(this.tl.x,other.tl.x);
		this.tl.y=mn(this.tl.y,other.tl.y);
		this.br.x=mx(this.br.x,other.br.x);
		this.br.y=mx(this.br.y,other.br.y);
	}
	return this;
};

Bbox.prototype.inflate = function(a) {
	this.tl.x-=a;
	this.tl.y-=a;
	this.br.x+=a;
	this.br.y+=a;
};

Bbox.prototype.isEmpty = function() {
	return this.width()<=0 || this.height()<=0;
};

Bbox.prototype.draw = function(ctx) {
	ctx.rect(this.tl.x,this.tl.y,this.width(),this.height());
};
	
function ShapeFactory() {
    
    var shapeFactory = {
        rectangle : function(x, y, c, options) {
            //var self = this;
            
            //function init(x, y, c, options) {
            //    self.x = x;
            //    self.y = y;
            //    self.width = options.width||0;
            //    self.height = options.width||0;
            //    self.color = c;
            //    self.fill = options.fill;
            //    self.fillColor = options.fillColor;
            //};
            
            this.draw = function(ctx) {
                
                ctx.save();
                
                ctx.beginPath();
                ctx.rect(x, y, options.width, options.height);

                if(options.fill) {
                    ctx.fillStyle = options.fillStyle;
                    ctx.fill();
                }

                ctx.lineWidth = options.lineWidth || 1;
                ctx.strokeStyle = c;
                ctx.stroke();
                
                ctx.restore();
            };
            
            //init(x, y, c, options);
        },
        circle: function(x, y, c, options) {

            this.draw = function(ctx) {
                
                ctx.save();
                
                ctx.beginPath();
                ctx.arc(x, x, options.radius, 0, 2 * Math.PI, false);
                
                if(options.fill) {
                    ctx.fillStyle = options.fillStyle;
                    ctx.fill();
                }
                
                ctx.lineWidth = options.lineWidth || 1;
                ctx.strokeStyle = c;
                ctx.stroke();
                
                ctx.restore();
            };
        },
        bbox : Bbox
    };
	
	return shapeFactory;
}

ShapeFactory.$inject = [];

module.exports = ShapeFactory;

