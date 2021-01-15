class Food{

    constructor(){
        this.milkImg = loadImage("images/Milk.png");
        this.foodStock =0;
        this.lastFed=null;
    }
    showWashRoom(){
        background(washroom)
    }

    //show garden function ref show washroom func above
    showGarden(){
        background(garden)
    }
    // show bedroom function ref show washroom func above
    showBedRoom(){
        background(bedroom)
    }

    display(){
        var x = 80, y = 100;
        imageMode(CENTER)
        image(this.milkImg,720,200,70,70);
        if(this.foodStock!== 0){
            if(!isFed)
            for(var i = 0;i<this.foodStock;i++){
                if(i%10 === 0){
                    x = 80;
                    y= y+50;
                }
                image(this.milkImg,x,y,50,50)
                x = x+30;
            }
            else {
                
                for(var i = 0;i<this.foodStock;i++){
                    if(i%10 === 0){
                        x = 80;
                        y= y+50;
                    }
                    image(this.milkImg,x,y,50,50)
                    x = x+30;
                } 
                
                image(this.milkImg,dog.x-50,dog.y,50,50) ;
                setTimeout(function(){isFed = false;}, 2000)
                
            }
        }

    }
}