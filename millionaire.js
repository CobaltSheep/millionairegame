$(document).ready(() => {

  let currID = /SESS\w*ID=([^;]+)/i.test(document.cookie) ? RegExp.$1 : false;

  let GARDENbtn = document.getElementById("gardenbtn");
  let BEGGARbtn = document.getElementById("beggarbtn");
  let HOSPITALbtn = document.getElementById("hospitalbtn");
  let DINERbtn = document.getElementById("dinerbtn");

  let ORANGESbtn = document.getElementById("orangesbtn");
  let GOLDbtn = document.getElementById("goldbtn");
  let SPACEYbtn = document.getElementById("spaceybtn");

  let oprof = document.getElementById("oprof");
  let gprof = document.getElementById("gprof");
  let sprof = document.getElementById("sprof");

  let JUNKbtn = document.getElementById("junkbutton");

  let gamblebutton = document.getElementById("gambler");
  let appButton = document.getElementById("application");
  let houseButton = document.getElementById("houseupgrade");

  let HOUSEbtn = document.getElementById("housebtn");
  let MANSHbtn = document.getElementById("manshbtn");
  let PONDbtn = document.getElementById("pondbtn");

  let nextHouse = document.getElementById("nextHouse");
  let nextTimeSleep = document.getElementById("nextTimeSleep");
  let nextPrice = document.getElementById("nextprice");

  let nextJob = document.getElementById("nextjob");
  let nextWage = document.getElementById("nextwage");
  let nextFee = document.getElementById("nextfee");

  let payLoanbtn = document.getElementById("payloan");
  let takeLoanbtn = document.getElementById("takeloan");

  let blackjkbtn = document.getElementById("playblkjk");
  let hitbtn = document.getElementById("hitme");
  let staybtn = document.getElementById("stay");

  let energyP = document.getElementById("energypercent");
  let moneyAmount = document.getElementById("moneypercent");
  let foodAmount = document.getElementById("foodpercent");
  let currHouse = document.getElementById("house");
  let curr_JOB = document.getElementById("JOB");
  let wage = document.getElementById("wage");
  let debtAmount = document.getElementById("debtamt");
  let cardvalue = document.getElementById("cardsvalue");

  let alert = document.getElementById("alertmessage");
  let winchance = document.getElementById("casino");

  let charact = document.getElementById("character");

  let currEnergy = 100;
  let currFood = 100;

  let sleeptime = 40;

  let eattime = 40;
  let debtAmt = 0;
  let valueofCards = 0;
  let dealerCards = 0;
  var playing = false;

  let houses = ['Pond', 'House', 'Mansh'];
  let jobs = ['Beggar', 'Gardener', 'Chef', 'Doctor'];
  let jobrank = 1;
  let houserank = 1;
  //let currentJob = jobs[0];
  let currWage = 10;
  //let currentHouse = houses[0];

  let orangeProfit = 0;
  let goldProfit = 0;
  let spaceyProfit = 0;

  let nextsleep = 32;
  let nextabode = houses[1];
  let next_price = 1000;

  let next_Job = jobs[1];
  let next_Wage = 60;
  let next_Fee = 200;

  var loantaken = false;
  var asleep = false;
  var eating = false;

  cardvalue.innerHTML = valueofCards;
  nextWage.innerHTML = next_Wage;
  nextFee.innerHTML = next_Fee;
  nextJob.innerHTML = next_Job;
  debtAmount.innerHTML = debtAmt;
  nextTimeSleep.innerHTML = sleeptime;

  wage.innerHTML = currWage;
  energyP.innerHTML = currEnergy;
  foodAmount.innerHTML = currFood;

  nextPrice.innerHTML = next_price;
  nextHouse.innerHTML = nextabode;
  nextTimeSleep.innerHTML = 4;
  oprof.innerHTML = orangeProfit;
  sprof.innerHTML = goldProfit;
  gprof.innerHTML = spaceyProfit;

  var money = null;
  $.ajax({
    type: "GET",
    url: "getCurrentMoney.php",
    data: {}
  })
  .done(function(data){
    dataobj1=JSON.parse(data);
    money = dataobj1["currentCash"];
    moneyAmount.innerHTML = money;
  });

  var currentJob = jobs[0];
  curr_JOB.innerHTML = currentJob;
  var currentHouse = houses[0];
  currHouse.innerHTML = currentHouse;

  blackjkbtn.onclick = function(){
    if(playing == false){
      if(money >=50){
        playing = true;
        money-=50;
        $.ajax({
          type: "POST",
          url: "getMoney.php",
          data: {
            amount: money
          }
        });
        moneyAmount.innerHTML = money;
        let pmin = 4;
        let pmax = 21;
        let x = Math.floor((Math.random() * (pmax-pmin+1)) + pmin);
        valueofCards = x;
        cardvalue.innerHTML = valueofCards;
      } else{
        winchance.innerHTML ="not enough money!";
        alertClose();
      }
    } else{
      winchance.innerHTML ="already in a game!";
      alertClose();
    }

  }
  hitbtn.onclick = function(){
    if(playing == true){
      let hmin = 2;
      let hmax = 10;
      let y = Math.floor((Math.random() * (hmax-hmin+1)) + hmin);
      valueofCards +=y;
      cardsvalue.innerHTML = valueofCards;
      if(valueofCards > 21){
        winchance.innerHTML = "Bust! Sorry :(";
        playing = false;
      }
    }
  }
  staybtn.onclick = function(){
    let dmin = 4;
    let dmax = 21;
    let k = Math.floor((Math.random() * (dmax-dmin+1)) + dmin);
    dealerCards = k;
    let dhmin = 2;
    let dhmax = 10;
    while(dealerCards < 17){
      let l = Math.floor((Math.random() * (dhmax-dhmin+1)) + dhmin);
      dealerCards += l;
      console.log(dealerCards);
    }
    console.log("Dealer Final:" + dealerCards);
    console.log("Player Final:" + valueofCards);
    if(dealerCards <= 21 && valueofCards > 21){
      console.log("checking1.5");
      winchance.innerHTML = "Dealer Wins! Sorry :(";
      alertClose();
    } else if(dealerCards > 21 && valueofCards <= 21){
      console.log("checking1");
      money += 300;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      moneyAmount.innerHTML = money;
      winchance.innerHTML = "you win! Here's $300";
      alertClose();
    } else if(dealerCards < 21 && valueofCards < 21 && dealerCards > valueofCards){
      console.log("checking2");
      winchance.innerHTML = "Dealer Wins! Sorry :(";
      alertClose();
    } else if(dealerCards < 21 && valueofCards < 21 && dealerCards < valueofCards){
      console.log("checking3");
      money += 300;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      moneyAmount.innerHTML = money;
      winchance.innerHTML = "you win! Here's $300";
      alertClose();
    } else if(dealerCards < 21 && valueofCards < 21 || dealerCards == valueofCards){
      console.log("checking4");
      winchance.innerHTML = "its a tie. Here's your 50$ back!";
      alertClose();
      money+=50;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      moneyAmount.innerHTML = money;
    }
    console.log("checking5");
    playing = false;
  }


  ORANGESbtn.onclick = function(){
    if(money>=500){
      money-=500;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      moneyAmount.innerHTML = money;
      orangeProfit+=20;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      oprof.innerHTML = orangeProfit;
    } else {
      alert.innerHTML = "Not enough money!";
      alertClose();
    }
  }
  GOLDbtn.onclick = function(){
    if(money>=5000){
      money-=5000;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      moneyAmount.innerHTML = money;
      orangeProfit+=200;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      oprof.innerHTML = orangeProfit;
    }else {
      alert.innerHTML = "Not enough money!";
      alertClose();
    }
  }
  SPACEYbtn.onclick = function(){
    if(money>=50000){
      money-=50000;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      moneyAmount.innerHTML = money;
      orangeProfit+=2000;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      oprof.innerHTML = orangeProfit;
    }else {
      alert.innerHTML = "Not enough money!";
      alertClose();
    }
  }



  takeLoanbtn.onclick = function(){
    loantaken = true;
    money+=200;
    $.ajax({
      type: "POST",
      url: "getMoney.php",
      data: {
        amount: money
      }
    });
    moneyAmount.innerHTML = money;
    debtAmt += 200;
    debtAmount.innerHTML = debtAmt;
    /*let data = {
    column: "money",
    amount: money
  };*/
}
payLoanbtn.onclick = function(){
  if(money >= debtAmt){
    money-=debtAmt;
    $.ajax({
      type: "POST",
      url: "getMoney.php",
      data: {
        amount: money
      }
    });
    moneyAmount.innerHTML = money;
    debtAmt=0;
    debtAmount.innerHTML = debtAmt;
  } else{
    alert.innerHTML = "Not enough money!";
    alertClose();
  }
}

houseButton.onclick = function(){
  if(houserank == 1){
    if(money>=1000){
      money-=1000;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      moneyAmount.innerHTML = money;
      currentHouse = nextabode;
      currHouse.innerHTML = currentHouse;
      sleeptime = nextsleep;
      nextsleep = 24;
      nextTimeSleep.innerHTML = nextsleep/8;
      nextabode = houses[2];
      nextHouse.innerHTML = nextabode;
      next_price = 20000;
      nextPrice.innerHTML = next_price;
      houserank = 2;
      console.log(houserank);
    } else {
      alert.innerHTML = "Not enough money to buy house!"
      alertClose();
    }
  }
  if(houserank == 2){
    if(money>=20000){
      money-=20000;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      moneyAmount.innerHTML = money;
      currentHouse = nextabode;
      currHouse.innerHTML = currentHouse;
      sleeptime = nextsleep;
      nextsleep = 16;
      nextTimeSleep.innerHTML = nextsleep/8;
      nextabode = "No other houses!";
      nextHouse.innerHTML = nextabode;
      next_price = "N/A";
      nextPrice.innerHTML = next_price;
      houserank = 3;
      console.log(houserank);
    } else {
      alert.innerHTML = "Not enough money to buy house!"
      alertClose();
    }
  }
  $.ajax({
    type: "POST",
    url: "gethouse.php",
    data: {
      house: currentHouse
    }
  });
}

appButton.onclick = function(){
  if(jobrank == 1){
    if(debtAmt == 0){
      if(money>=200){
        money-=200;
        moneyAmount.innerHTML = money;
        currentJob = next_Job;
        curr_JOB.innerHTML = currentJob;
        next_Job = jobs[2];
        nextJob.innerHTML = next_Job;
        currWage = next_Wage;
        wage.innerHTML = currWage;
        next_Wage = 150;
        nextWage.innerHTML = next_Wage;
        next_Fee = 2000;
        nextFee.innerHTML = next_Fee;
        jobrank = 2;
      } else{
        alert.innerHTML = "Not enough money!";
        alertClose();
      }
    } else{
      alert.innerHTML = "Pay back your loan first!";
      alertClose();
    }
  }
  if(jobrank == 2){
    if(debtAmt == 0){
      if(money>=2000){
        money-=2000;
        $.ajax({
          type: "POST",
          url: "getMoney.php",
          data: {
            amount: money
          }
        });
        moneyAmount.innerHTML = money;
        currentJob = next_Job;
        curr_JOB.innerHTML = currentJob;
        next_Job = jobs[3];
        nextJob.innerHTML = next_Job;
        currWage = next_Wage;
        wage.innerHTML = currWage;
        next_Wage = 500;
        nextWage.innerHTML = next_Wage;
        next_Fee = 20000;
        nextFee.innerHTML = next_Fee;
        jobrank = 3;
      } else{
        alert.innerHTML = "Not enough money!";
        alertClose();
      }
    } else{
      alert.innerHTML = "Pay back your loan first!";
      alertClose();
    }
  }
  if(jobrank == 3){
    if(debtAmt == 0){
      if(money>=20000){
        money-=20000;
        $.ajax({
          type: "POST",
          url: "getMoney.php",
          data: {
            amount: money
          }
        });
        moneyAmount.innerHTML = money;
        currentJob = next_Job;
        curr_JOB.innerHTML = currentJob;
        next_Job = 'No Other Jobs';
        nextJob.innerHTML = next_Job;
        currWage = next_Wage;
        wage.innerHTML = currWage;
        next_Wage = 150;
        nextWage.innerHTML = next_Wage;
        next_Fee = "N/A";
        nextFee.innerHTML = next_Fee;
        jobrank = 4;
      } else{
        alert.innerHTML = "Not enough money!";
        alertClose();
      }
    } else{
      alert.innerHTML = "Pay back your loan first!";
      alertClose();
    }
  }
  $.ajax({
    type: "POST",
    url: "getJob.php",
    data: {
      job: currentJob
    }
  });
}


gamblebutton.onclick = function(){
  if(money >=200){
    money-=200;
    $.ajax({
      type: "POST",
      url: "getMoney.php",
      data: {
        amount: money
      }
    });
    moneyAmount.innerHTML =money;
    let x = Math.floor((Math.random() * 100) + 1);
    if(x <= 5){
      winchance.innerHTML = "You won 2,000 dollars! Nice!";
      money+=2000;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      moneyAmount.innerHTML =money;
    } else{
      winchance.innerHTML = "Sorry, maybe next time!";
    }
  } else{
    winchance.innerHTML = "Not Enough Money!";
    alertClose();
  }


}


DINERbtn.onclick = function() {
  if(currEnergy<=0 || currFood <=0){
    alert.innerHTML = "Not Enough Energy/Food!";
    alertClose();
  } else{
    if(currEnergy >= 50 && currFood >=0){
      currEnergy = energyP.innerHTML - 50;
      energyP.innerHTML = currEnergy;
      $('#energybar').css('width', currEnergy + "%");
      money+=currWage;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      moneyAmount.innerHTML = money;
      if(currFood<=0){
        foodAmount.innerHTML = 0;
      }else{
        currFood -= 25;
        foodAmount.innerHTML = currFood;
        $('#foodbar').css('width', currFood + "%");
      }
    } else{
      alert.innerHTML = "Not Enough Energy/Food!";
      alertClose();
    }
  }
}
BEGGARbtn.onclick = function() {
  if(currEnergy<=0 || currFood <=0){
    alert.innerHTML = "Not Enough Energy/Food!";
    alertClose();
  } else{
    if(currEnergy >= 50 && currFood >=0){
      currEnergy = energyP.innerHTML - 50;
      energyP.innerHTML = currEnergy;
      $('#energybar').css('width', currEnergy + "%");
      money+=currWage;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      moneyAmount.innerHTML = money;
      if(currFood<=0){
        foodAmount.innerHTML = 0;
      }else{
        currFood -= 25;
        foodAmount.innerHTML = currFood;
        $('#foodbar').css('width', currFood + "%");
      }
    } else{
      alert.innerHTML = "Not Enough Energy/Food!";
      alertClose();
    }
  }
}
HOSPITALbtn.onclick = function() {
  if(currEnergy<=0 || currFood <=0){
    alert.innerHTML = "Not Enough Energy/Food!";
    alertClose();
  } else{
    if(currEnergy >= 50 && currFood >=0){
      currEnergy = energyP.innerHTML - 50;
      energyP.innerHTML = currEnergy;
      $('#energybar').css('width', currEnergy + "%");
      money+=currWage;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }

      });
      console.log("data updated");
      console.log(money);
      moneyAmount.innerHTML = money;
      if(currFood<=0){
        foodAmount.innerHTML = 0;
      }else{
        currFood -= 25;
        foodAmount.innerHTML = currFood;
        $('#foodbar').css('width', currFood + "%");
      }
    } else{
      alert.innerHTML = "Not Enough Energy/Food!";
      alertClose();
    }
  }
}
GARDENbtn.onclick = function() {
  if(currEnergy<=0 || currFood <=0){
    alert.innerHTML = "Not Enough Energy/Food!";
    alertClose();
  } else{
    if(currEnergy >= 50 && currFood >=0){
      currEnergy = energyP.innerHTML - 50;
      energyP.innerHTML = currEnergy;
      $('#energybar').css('width', currEnergy + "%");
      money+=currWage;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      moneyAmount.innerHTML = money;
      if(currFood<=0){
        foodAmount.innerHTML = 0;
      }else{
        currFood -= 25;
        foodAmount.innerHTML = currFood;
        $('#foodbar').css('width', currFood + "%");
      }
    } else{
      alert.innerHTML = "Not Enough Energy/Food!";
      alertClose();
    }
  }
}

HOUSEbtn.onclick = function(){
  let id = setInterval(sleep, sleeptime);
  if(loantaken == true && currEnergy<100){
    debtAmt +=2;
    debtAmount.innerHTML = debtAmt;
    money+=orangeProfit;
    money+=goldProfit;
    money+=spaceyProfit;
    $.ajax({
      type: "POST",
      url: "getMoney.php",
      data: {
        amount: money
      }
    });
    moneyAmount.innerHTML = money;
  }
  asleep = true;
  function sleep(){
    if(currEnergy<100){
      currEnergy += 1;
      energyP.innerHTML = currEnergy;
      $('#energybar').css('width', currEnergy + "%");
    } else{
      clearInterval(id);
      alert.innerHTML = "Fully rested!";
      alertClose();
      asleep = false;
    }
  }

}

PONDbtn.onclick = function(){
  let id = setInterval(sleep, sleeptime);
  if(loantaken == true && currEnergy<100){
    debtAmt +=2;
    debtAmount.innerHTML = debtAmt;
    money+=orangeProfit;
    money+=goldProfit;
    money+=spaceyProfit;
    $.ajax({
      type: "POST",
      url: "getMoney.php",
      data: {
        amount: money
      }
    });
    moneyAmount.innerHTML = money;
  }
  asleep = true;
  function sleep(){
    if(currEnergy<100){
      currEnergy += 1;
      energyP.innerHTML = currEnergy;
      $('#energybar').css('width', currEnergy + "%");
    } else{
      clearInterval(id);

      alert.innerHTML = "Fully rested!";
      alertClose();
      asleep = false;
    }
  }

}

MANSHbtn.onclick = function(){
  let id = setInterval(sleep, sleeptime);
  if(loantaken == true && currEnergy<100){
    debtAmt +=2;
    debtAmount.innerHTML = debtAmt;
    money+=orangeProfit;
    money+=goldProfit;
    money+=spaceyProfit;
    $.ajax({
      type: "POST",
      url: "getMoney.php",
      data: {
        amount: money
      }
    });
    moneyAmount.innerHTML = money;
  }
  asleep = true;
  function sleep(){
    if(currEnergy<100){
      currEnergy += 1;
      energyP.innerHTML = currEnergy;
      $('#energybar').css('width', currEnergy + "%");
    } else{
      clearInterval(id);

      alert.innerHTML = "Fully rested!";
      alertClose();
      asleep = false;
    }
  }

}

JUNKbtn.onclick = function(){
  if(currFood<100){
    if(money >=5){
      money-=5;
      $.ajax({
        type: "POST",
        url: "getMoney.php",
        data: {
          amount: money
        }
      });
      moneyAmount.innerHTML = money;
      let stuff = setInterval(eat, eattime);
      eating = true;
      function eat(){
        if(currFood < 100 && money>=3){
          currFood += 1;
          foodAmount.innerHTML = currFood;
          $('#foodbar').css('width', currFood + "%");
        } else{
          clearInterval(stuff);
          alert.innerHTML = "Stomach Full!";
          alertClose();
          eating = false;
        }
      }
    } else{
      alert.innerHTML = "Not enough money!";
      alertClose();
    }
  } else{
    alert.innerHTML = "Stomach Full!";
    alertClose();
  }
}

function alertClose(){
  setTimeout(function(){
    alert.innerHTML = "";
    winchance.innerHTML = "";
  }, 3500);

}
let moveLR = 0;
let moveUD = 48;
function move(e){
  if(asleep == false){
    if(eating == false){
      if(e.keyCode==68){
        document.getElementById("character").src="mario_right.png";
        moveLR+=12;
        if(moveLR > 976){
          moveLR = 976;
        }
        charact.style.left = moveLR + 'px';
      }
      if(e.keyCode==65){
        document.getElementById("character").src="mario_left.png";
        moveLR-=12;
        if(moveLR <= 0){
          moveLR = 0;
        }
        charact.style.left = moveLR + 'px';
      }
      if(e.keyCode==87){
        moveUD -= 12;
        if(moveUD <= 0){
          moveUD = 0;
        }
        charact.style.top = moveUD + 'px';
      }
      if(e.keyCode==83){
        moveUD += 12;
        if(moveUD > 650){
          moveUD = 650;
        }
        charact.style.top = moveUD + 'px';
      }
      $('#character').css("visibility", 'visible');
      //loanbtn (bank)
      if($("#character").css('left') == '204px' && $("#character").css('top') == '324px'){
        $("#loanbtn").css("visibility", 'visible');
        $('#character').css("visibility", 'hidden');
      } else{
        $("#loanbtn").css("visibility", 'hidden');
      }
      if($("#character").css('left') == '204px' && $("#character").css('top') == '324px'){
        $('#investbtn').css('visibility', 'visible');
        $('#character').css("visibility", 'hidden');
      } else{
        $('#investbtn').css('visibility', 'hidden');
      }
      //sleepbtn (mansion)
      if($("#character").css('left') == '816px'&& $("#character").css('top') == '156px'){
        if(houserank == 3){
          $("#manshbtn").css("visibility", 'visible');
          $('#character').css("visibility", 'hidden');
        }else{
          alert.innerHTML = "You don't own this house!";
          alertClose();
        }

      } else{
        $("#manshbtn").css("visibility", 'hidden');

      }
      //gamble
      if($("#character").css('left') == '732px' && $("#character").css('top') == '444px'){
        $("#jackbtn").css("visibility", 'visible');
        $('#character').css("visibility", 'hidden');
      } else{
        $("#jackbtn").css("visibility", 'hidden');
      }
      //blackjack
      if($("#character").css('left') == '732px' && $("#character").css('top') == '444px'){
        $("#gamblebtn").css("visibility", 'visible');
        $('#character').css("visibility", 'hidden');
      } else{
        $("#gamblebtn").css("visibility", 'hidden');
      }
      //sleepbtn house
      if($("#character").css('left') == '72px' && $("#character").css('top') == '216px'){
        if(houserank == 2){
          $("#housebtn").css("visibility", 'visible');
          $('#character').css("visibility", 'hidden');
        }else{
          alert.innerHTML = "You don't own this house!";
          alertClose();
        }
      } else{
        $("#housebtn").css("visibility", 'hidden');
      }
      //sleepbtn Pond
      if($("#character").css('left') == '132px' && $("#character").css('top') == '636px'){
        if(houserank == 1){
          $("#pondbtn").css("visibility", 'visible');
          $('#character').css("visibility", 'hidden');
        }else{
          alert.innerHTML = "You don't own this house!";
          alertClose();
        }
      } else{
        $("#pondbtn").css("visibility", 'hidden');
      }
      //workbtn (hospital)
      if($("#character").css('left') == '192px' && $("#character").css('top') == '204px'){
        if(jobrank == 4){
          $("#hospitalbtn").css("visibility", 'visible');
          $('#character').css("visibility", 'hidden');
        } else{
          alert.innerHTML = "You don't have this job";
          alertClose();
        }
      } else{
        $("#hospitalbtn").css("visibility", 'hidden');
      }
      //workbtn (diner)
      if($("#character").css('left') == '864px' && $("#character").css('top') == '312px'){
        if(jobrank == 3){
          $("#dinerbtn").css("visibility", 'visible');
          $('#character').css("visibility", 'hidden');
        } else{
          alert.innerHTML = "You don't have this job";
          alertClose();
        }
      } else{
        $("#dinerbtn").css("visibility", 'hidden');
      }
      //workbtn beggar
      if($("#character").css('left') == '468px' && $("#character").css('top') == '372px'){
        if(jobrank == 1){
          $("#beggarbtn").css("visibility", 'visible');
          $('#character').css("visibility", 'hidden');
        } else{
          alert.innerHTML = "You don't have this job";
          alertClose();
        }
      } else{
        $("#beggarbtn").css("visibility", 'hidden');
      }
      //workbtn garden
      if($("#character").css('left') == '720px' && $("#character").css('top') == '612px'){
        if(jobrank == 2){
          $("#gardenbtn").css("visibility", 'visible');
          $('#character').css("visibility", 'hidden');
        } else{
          alert.innerHTML = "You don't have this job";
          alertClose();
        }
      } else{
        $("#gardenbtn").css("visibility", 'hidden');
      }
      //food
      if($("#character").css('left') == '684px' && $("#character").css('top') == '312px'){
        $("#foodbtn").css("visibility", 'visible');
        $('#character').css("visibility", 'hidden');
      } else{
        $("#foodbtn").css("visibility", 'hidden');
      }
      //buyhouse
      if($("#character").css('left') == '204px' && $("#character").css('top') == '444px'){
        $("#buyhousebtn").css("visibility", 'visible');
        $('#character').css("visibility", 'hidden');
      } else{
        $("#buyhousebtn").css("visibility", 'hidden');
      }
      //appjob
      if($("#character").css('left') == '48px' && $("#character").css('top') == '360px'){
        $("#applyjobbtn").css("visibility", 'visible');
        $('#character').css("visibility", 'hidden');
      } else{
        $("#applyjobbtn").css("visibility", 'hidden');
      }
    } else{
      alert.innerHTML = "eating...";
      alertClose();
    }
  } else {
    alert.innerHTML = "sleeping...";
    alertClose();
  }
}

document.onkeydown = move;



});
