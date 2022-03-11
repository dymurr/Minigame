    const speedModifier = 0.2; // set speed of orbs 
    const NumberofOrbs = 8; // set orb number
    const rounds = 4; // set number of rounds
    const missed = 4; 
    const timer = 10000; // set time till fail
    var round = 0;
    var misses = 0;
    var hits = 0;
    gameStarted = false;
    var mytimer;

function startGame(){
    $(".laptop").removeClass("hidden");
    $(".laptop2").removeClass("hidden");
    $(".laptop3").removeClass("hidden");
    $(".screen").removeClass("hidden");
    $(".camera").removeClass("hidden")
    $(".btn_box").removeClass("hidden");
    var body = document.getElementById("minigame");
    body.addEventListener('pointerdown', miss);
    createOrbs()
    $(".btn").one("dblclick", function() {
    gameLoad();
    $(".Loading").removeClass("hidden");
    })
}

function roundStart () {
    setTimeout(function () {
    $(".Loading").addClass("hidden");
    $(".minigame").removeClass("hidden");
    $(".orb").removeClass("hidden hit");
    $(".screen").addClass("hidden");
    $(".btn_box").addClass("hidden");
    $('#rounds').remove()
    round++  
    misses = 0;
    hits = 0;
    hit = false;
    Settimer()
    game();
},5000);
    }

function NewPosition() {
    var y = Math.floor(Math.random() * 660) + 210; 
    var x = Math.floor(Math.random() * 1205) + 365;
    return [y, x]
}    
function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
  
    var greatest = x > y ? x : y;
  
    var speed = Math.ceil(greatest / speedModifier);
  
    return speed;
}
function animateDiv (orb) {
      var newq = NewPosition();
      var y = orb.offsetTop;
      var x = orb.offsetLeft;
      var speed = calcSpeed([y, x], newq);
    
$(orb).animate({ top: newq[0], left: newq[1] }, speed, function () {
    animateOrb();
      });
    }
    function game () {  
        gameStarted = true;
    }

    function checks (checks) {
        if(gameStarted === false) return;
        if(gameStarted === true);
        checks.target.classList.add("hit");
        hit = true;
        hits++
        roundResult()
        }
        var misses = 0;
        function miss (miss) {

            if (gameStarted === false) return;
            if (gameStarted === true && hit === true) {
                hit = false;
            }
            if (gameStarted === true && hit === false){
            var missed = false;
            misses++;
            roundResult()
            }
        }
        function roundResult() {
            
            if (hits == NumberofOrbs){
                roundPassed()
                }
                else {
                }
            
            if (misses > missed){
                gameLost()
                }
                else {
                }
            }

        function gameLost()  {
            var orbs = document.querySelectorAll('.orb');
            orbs.forEach(orb => {
            orb.remove();
        });
         round = 0;
         misses = 0;
         hits = 0;
            $(".Loading").addClass("hidden");
            $(".minigame").addClass("hidden");
            $(".laptop").addClass("hidden");
            $(".laptop2").addClass("hidden");
            $(".laptop3").addClass("hidden");
            $(".camera").addClass("hidden");
            $.post('https://minigame/result', JSON.stringify({
        success: false
    }));
            var gameis = "failed"
            gameStarted = false;
            clearTimeout(mytimer)
        }

        function roundPassed()  {
            if (round < rounds) {
            gameStarted = false;
            misses = 0;
            roundStart();
            clearTimeout(mytimer)
            roundDisplay()
            }
            else {
                gameWon();
                clearTimeout(mytimer)
            }
        }
        function gameWon()  {
            var orbs = document.querySelectorAll('.orb');
            orbs.forEach(orb => {
            orb.remove();
        });
        round = 0;
        misses = 0;
        hits = 0;
        gameStarted = false;
            $(".Loading").addClass("hidden");
            $(".minigame").addClass("hidden")
            $(".laptop").addClass("hidden");
            $(".laptop2").addClass("hidden");
            $(".laptop3").addClass("hidden");
            $(".camera").addClass("hidden");
            $.post('https://minigame/result', JSON.stringify({
        success: true
    }));
        }

        function Settimer() {
            mytimer = setTimeout(function() {
                gameLost()
            },timer)
        }

window.addEventListener('message', (event) => {
    if (event.data.type === 'open') {
        startGame();
    }
});

function createOrbs() {
    for(var i = 0; i < NumberofOrbs; i++) {
        var ele = document.createElement("div");
        ele.setAttribute("ID", "orb-" + (i + 1));
        document.body.appendChild(ele);
        ele.classList.add("orb");
        ele.classList.add("hidden");
        ele.addEventListener('pointerdown', checks);
        animateOrb()
        }
    }
    function animateOrb() {
        document.querySelectorAll('.orb').forEach(orb => { animateDiv(orb) });
}
function gameLoad() {
    $('.Loading').animate({ opacity: 0 }, 0);
    $('.Loading').animate({ opacity: 1}, 'slow');
    setTimeout(function() {
        document.getElementById('audiotag1').play();
        roundStart()
    },2000)
}
function roundDisplay() {
    var roundno = document.createElement("div");
    roundno.setAttribute("ID", "rounds");
    document.body.appendChild(roundno);
    $('#rounds').html(round + " / " + rounds);
}