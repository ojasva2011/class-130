song = "";
leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scorerightWrist = 0;


function preload(){
    song = loadSound("music.mp3");
}


function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
    
}

function modelLoaded(){
    console.log("modelLoaded")
}

function draw(){
    image(video,0,0,600,500);

    fill("#FFA500");
    stroke("#FFA500");
    circle(rightWristX,rightWristY,20);
    
    if(scorerightWrist > 0.2){

        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5X";
            song.rate(0.5);
        }

        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1X"
            song.rate(1);
        }

        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5X";
            song.rate(1.5);
        }

        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2X";
            song.rate(2);
        }

        else if(rightWristY > 400 && rightWristY <= 500){
            document.getElementById("speed").innerHTML = "Speed = 2.5X";
            song.rate(2.5);
        }
    }

    if(scoreLeftWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    inNumberLEftWristY = Number(leftWristY)
    remove_decimals = floor(inNumberLEftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = " Volume -  " + volume;
    song.setVolume(volume);
}
}

function Play(){
    song.play();
    
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log(" leftWristX =" + leftWristX + " leftWristY =" + leftWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log(" rightWristX = " + rightWristX + " rightWristY = " + rightWristY );
        scorerightWrist = results[0].pose.keypoints[10].score;
    }
}