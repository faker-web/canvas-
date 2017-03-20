(function(){
    function drawCanvas(){
        var myCanvas = document.getElementById('myCanvas');
        var ctx = myCanvas.getContext('2d');
        myCanvas.width = window.innerWidth; 
        this.width = myCanvas.width;
        this.height = myCanvas.height;
        this.canvas = myCanvas;
        this.ctx = ctx;
        this.R = '50';
        this.r = '20';
        this.RColor = '';
        this.rColor = 'black';
        this.scope = []; //小圆圆心坐标
        this.pointArr = [];
        this.drawColr = 'red';
    }
    drawCanvas.prototype.init = function(){
        this.drawRound();
        this.drawround();
        this.number = -1;
        this.canvas.addEventListener('touchstart',function(e){
            e.preventDefault();
            this.isChose(e)
        }.bind(this))
        this.canvas.addEventListener('touchmove',function(e){
            var nowPoint = e.touches[0];
            e.preventDefault();
            this.isChose(e)
            this.drawLine({X: nowPoint.pageX, Y: nowPoint.pageY})
        }.bind(this))
            this.canvas.addEventListener('touchend',function(e){
            if(this.pointArr.length > 3){
                alert(this.pointArr);            
            }else{
                alert('请至少链接4个点')
            }
            this.pointArr = [];
            this.clearCanvas();
            this.drawRound();
            this.drawround();
        }.bind(this))
    }
    drawCanvas.prototype.clearCanvas = function(){
        this.ctx.clearRect(0,0,this.width,this.height)
    }
    //花圆方法
    drawCanvas.prototype.nineRround = function(r,fillStyle){
        this.scope = [];
        this.number = 0;
        var cWidth = this.canvas.width;
        var cHeight = this.canvas.height;
        for(var i = 0;i < 3;i++){
            for(var j = 0;j < 3;j++){
                var canvasX = (cWidth / 3 - 20) / 2 + i * (cWidth / 3); 
                var canvasY = (cWidth / 3 - 20) / 2 + j * (cHeight / 3);
                var obj = {};
                obj.roundX = canvasX;
                obj.roundY = canvasY;
                obj.number = this.number;
                if(this.scope.indexOf(obj) == -1){
                    this.scope.push(obj);
                }
                // console.log(this.scope)
                this.ctx.beginPath();
                this.ctx.arc(canvasX,canvasY,r,0,2*Math.PI);
                //点中及修改样式
                if(this.pointArr.length > 0){
                    if(this.pointArr.indexOf(this.scope[this.scope.length - 1].number)!=-1){
                        this.ctx.strokeStyle = this.drawColr;
                        if(fillStyle){
                            this.ctx.fillStyle = this.drawColr; 
                            this.ctx.fill();
                        }
                    }else{
                        this.ctx.strokeStyle = this.rColor;
                        if(fillStyle){
                            this.ctx.fillStyle = this.rColor; 
                            this.ctx.fill();
                        }
                    }
                }else{
                    this.ctx.strokeStyle = this.rColor;
                    if(fillStyle){
                        this.ctx.fillStyle = this.rColor;
                        this.ctx.fill();                      
                    }
                }
                this.number++;
                this.ctx.stroke();
            }
        }
    }
    //是否选中
    drawCanvas.prototype.isChose = function(e){
        //计算中心圆的连线范围 满足条件画线
        var pointX = e.changedTouches[0].clientX;
        var pointY = e.changedTouches[0].clientY;
        for (var i = 0;i < this.scope.length;i++){
            var diffX = Math.abs(pointX - this.scope[i].roundX);
            var diffY = Math.abs(pointY - this.scope[i].roundY);
            var pwdR = Math.pow((diffX*diffX+diffY*diffY) , 0.5);
            if(pwdR < this.R){
                if(this.pointArr.indexOf(i) == -1){
                    this.pointArr.push(i);
                }
            }
        }
    }

    //外层大圆
    drawCanvas.prototype.drawRound = function(){
        this.nineRround(this.R);
    }
    //内层小圆
    drawCanvas.prototype.drawround  = function(){
        this.nineRround(this.r,this.rColor);
    }
    //画连接线
    drawCanvas.prototype.drawLine = function(touchPoint){
        this.clearCanvas();
        this.drawRound();
        this.drawround();
        var last = this.pointArr.length;
        if(last > 0){
            var startPointX = this.scope[this.pointArr[0]].roundX;
            var startPointY = this.scope[this.pointArr[0]].roundY;
            this.ctx.beginPath();
            this.ctx.moveTo(startPointX, startPointY);
            for(var i = 0;i < last;i++){
                var middlePointX = this.scope[this.pointArr[i]].roundX;
                var middlePointY = this.scope[this.pointArr[i]].roundY;
                this.ctx.lineTo(middlePointX, middlePointY);
            }
            this.ctx.strokeStyle = this.drawColr;
            this.ctx.lineTo(touchPoint.X, touchPoint.Y);
            this.ctx.stroke();
        }
    }
        if(typeof exports === 'Object') module.exports = drawCanvas;
        else if (typeof define === 'Function' && define.amd) {
            define([],function(){
                return drawCanvas
            })
        }
        else window.drawCanvas = drawCanvas;

})()

