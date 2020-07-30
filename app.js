//The Dom evenet listener will listn out to wheen all the HTML loaded and only then execcute th JS
document.addEventListener('DOMContentLoaded',()=>{
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const alert = document.getElementById('alert')
    const score = document.getElementById('score')
    let isJumping = false
    let gravity = 0.9
    let isGameOver = false
    score.innerHTML = 0

    function control(e){
        //press for spacebar
        if(e.keyCode === 32){
            //code
            if(!isJumping){
                isJumping = true;
                jump();
            }
        }
    }

    document.addEventListener('keyup', control);
    let position = 0 
    function jump(){
        let count = 0
        let timerId = setInterval(function (){
            //move down 
            if(count === 20){
                clearInterval(timerId)
                console.log('down')
                position -= 30
                dino.style.bottom = position + 'px'
                let downTimerId = setInterval(function(){
                    if(count === 7){
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                    position -= 5
                    dino.style.bottom = position + 'px'
                    count --
                    position = position * gravity
 
                })
            }
            
            //move up
            console.log('up')
            count++
            position += 30
            position = position * gravity;
            dino.style.bottom = position + 'px'
        }, 20)
    }

    function generateObstacles(){
        score.innerHTML;
        let randomTime = Math.random() * 4000
        let obstaclePosition = 1800
        const obstacle = document.createElement('div')
        if (!isGameOver) obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'
        let timerId = setInterval(function(){
            if(obstaclePosition > 0 &&  obstaclePosition < 60 && position < 60){
                clearInterval(timerId)
                clearInterval(timerInterval)
                alert.innerHTML = 'Game Over'
                isGameOver = true;
                // remove all cchildren
                while(grid.firstChild){
                    grid.removeChild(grid.lastChild)
                }
            }

            obstaclePosition -=10
            obstacle.style.left = obstaclePosition + 'px'
        }, 20)
        if (!isGameOver) setTimeout(generateObstacles, randomTime)
    }

    function startTimer() {
        timePassed = 0
        timerInterval = setInterval(() => {
          
          // The amount of time passed increments by one
          timePassed = timePassed += 1;
          
          document.getElementById("score").innerHTML = timePassed;
        }, 10);
    }

    generateObstacles()
    startTimer()
})