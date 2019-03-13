$(document).ready(() => {
    $(document).mousemove( function(e) {
      let x = e.pageX;
      let y = e.pageY;

      $('#image').css('margin-left', x);
      $('#image').css('margin-top', y);
    });

    let workbutton = document.getElementById("workbutton");
    let sleepbutton = document.getElementById("sleepbutton");
    let foodbutton = document.getElementById("foodbutton");
    let gamblebutton = document.getElementById("gambler");
    let appButton = document.getElementById("application");
    let houseButton = document.getElementById("houseupgrade");
    let payLoanbtn = document.getElementById("payloan");
    let takeLoanbtn = document.getElementById("takeloan");

    let blackjkbtn = document.getElementById("playblkjk");
    let hitbtn = document.getElementById("hitme");
    let staybtn = document.getElementById("stay");

    let energyP = document.getElementById("energypercent");
    let moneyAmount = document.getElementById("moneypercent");
    let foodAmount = document.getElementById("foodpercent");
    let currHouse = document.getElementById("house");
    let currJob = document.getElementById("job");
    let wage = document.getElementById("wage");
    let timeSleep = document.getElementById("sleepTime");
    let debtAmount = document.getElementById("debtamt");
    let cardvalue = document.getElementById("cardsvalue");

    let alert = document.getElementById("alertmessage");
    let winchance = document.getElementById("casino");

    let charact = document.getElementById("character");


    let money = 0;
    let currEnergy = 100;
    let currFood = 100;
    let housing = "Street";
    let job = "Beggar";
    let currWage = 5;
    let sleeptime = 40;
    let eattime = 40;
    let debtAmt = 0;
    let valueofCards = 0;
    let dealerCards = 0;
    let playing = false;


    let loantaken = false;
    cardvalue.innerHTML = valueofCards;
    debtAmount.innerHTML = debtAmt;
    timeSleep.innerHTML = sleeptime/8;
    currHouse.innerHTML = housing;
    wage.innerHTML = currWage;
    moneyAmount.innerHTML = money;
    energyP.innerHTML = currEnergy;
    foodAmount.innerHTML = currFood;
    currJob.innerHTML = job;
    currHouse.innerHTML = housing;

    houseButton.onclick = function(){
      if(money>=1000){
        money -= 1000;
        moneyAmount.innerHTML = money;
        housing = "Shack";
        currHouse.innerHTML = housing;
        sleeptime -= 8;
        timeSleep.innerHTML = sleeptime/8;
      }
        else {
        alert.innerHTML = "Not enough money to buy house!"
        alertClose();
      }
    }

});
