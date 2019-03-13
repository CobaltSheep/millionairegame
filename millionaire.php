<?php
session_start();
require_once "config.php";
  if(isset($_POST["user"]) == true) { //verify password
      try {
          $dbh = new PDO(DB_DSN, DB_USER, DB_PASSWORD);
          $sth = $dbh->prepare("SELECT * FROM players WHERE id = :id");
          $sth->bindValue(':id', $_POST["user"]);
          $sth->execute();
          $player = $sth->fetch();
          if(password_verify($_POST['pass'], $player["pass"])) {
            $_SESSION["user"] = $_POST['user'];
            $currentID = $_SESSION["user"];
          }
          else {
            header("Location: millionaireSignIn.php");
            exit;
          }
      }
      catch (PDOException $e) {
          echo "<p>Error connecting to database!</p>";
      }
  }
  elseif(isset($_POST["user"]) == false && isset($_SESSION["user"]) == false) {
    header("Location: millionaireSignIn.php");
    exit;
  }
  try {
      $dbh = new PDO(DB_DSN, DB_USER, DB_PASSWORD);
      $sth = $dbh->prepare("SELECT players.money FROM players WHERE id = :id");
      $sth->bindValue(':id', $_POST["user"]);
      $sth->execute();
      $currentMoney = $sth->fetch();
  }
  catch (PDOException $e) {
      echo "<p>Error connecting to database!</p>";
  }
 ?>
<!DOCTYPE html>
<html>
<head>
  <title>Race to a Million!</title>
  <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
  <script src="millionaire.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <link rel="stylesheet" href="millionaire.css">
</head>
<body>
<div id="loanbtn">
  <button id="takeloan">Take Loan</button><p>Borrow $200</p><p>Interest: 2$/Sleep</p><button id="payloan">Pay Loan</button><p>You owe: <span id="debtamt"></span>$
  </div>

  <div id="manshbtn">
    <button id="sleepbutton">Go To Sleep</button><p>Takes 3 Seconds</p><img src="https://pngimg.com/uploads/house/house_PNG63.png" height="100px" width="150px"></img>
  </div>
  <div id="housebtn">
    <button id="sleepbutton">Go To Sleep</button><p>Takes 4 Seconds</p><img src="https://pngimg.com/uploads/house/house_PNG63.png" height="100px" width="150px"></img>
  </div>
  <div id="pondbtn">
    <button id="sleepbutton">Go To Sleep</button><p>Takes 5 Seconds</p><img src="https://pngimg.com/uploads/house/house_PNG63.png" height="100px" width="150px"></img>
  </div>

  <div id="hospitalbtn">
    <button id="workbutton">Go To Work</button><p>$500/Shift</p><img src="https://www.freeiconspng.com/uploads/business-man-with-clock-to-control-time-of-work-3.png" height=100px width="100px"></img><p>Current Job: Doctor</p>
  </div>
  <div id="dinerbtn">
    <button id="workbutton">Go To Work</button><p>$150/Shift</p><img src="https://www.freeiconspng.com/uploads/business-man-with-clock-to-control-time-of-work-3.png" height=100px width="100px"></img><p>Current Job: Chef</p>
  </div>
  <div id="gardenbtn">
    <button id="workbutton">Go To Work</button><p>$60/Shift</p><img src="https://www.freeiconspng.com/uploads/business-man-with-clock-to-control-time-of-work-3.png" height=100px width="100px"></img><p>Current Job: Gardener</p>
  </div>
  <div id="beggarbtn">
    <button id="workbutton">Go To Work</button><p>$10/Shift</p><img src="https://www.freeiconspng.com/uploads/business-man-with-clock-to-control-time-of-work-3.png" height=100px width="100px"></img><p>Current Job: Beggar</p>
  </div>

  <div id="gamblebtn">
    <button id="gambler">Gamble</button><p>A chance to win $2000</p><img src="https://icons.iconseeker.com/png/fullsize/poker/poker-chips.png" height="100px" width="100px"></img><p>Costs 200$</p>
  </div>
  <div id="jackbtn">
    <button id="playblkjk">Play BlackJack</button><p>Pay 50$ to Enter</p><p>Cards Value: <span id="cardsvalue"></span></p><button id="hitme">Take Extra Card</button><button id="stay">Stay</button>
  </div>

  <div id="foodbtn">
    <button id="junkbutton">Eat Junk Food</button><p>Take 5 Seconds</p><img src="https://www.fritolay.com/images/default-source/blue-bag-image/lays-classic.png?sfvrsn=bd1e563a_2" height="100px" width="100px"></img><p>Costs 5$</p>
  </div>


  <div id='investbtn'>
    <button id="orangesbtn">Invest In Oranges</button><p>Gives 20$/Sleep</p><p>Costs $500/share</p>
    <button id="goldbtn">Invest In Gold</button><p>Gives 200$/Sleep</p><p>Costs $5000/share</p>
    <button id="spaceybtn">Invest In SpaceY</button><p>Gives 2000$/Sleep</p><p>Costs $50,000/share</p>
  </div>

  <div id="buyhousebtn">
    <button id="houseupgrade">Buy a New House</button><p><strong>Info</strong></p><p>Price: <span id="nextprice"></span><p>Type: <span id="nextHouse"></span></p><p>Sleep Time: <span id="nextTimeSleep"></span></p>
  </div>
  <div id="applyjobbtn">
    <button id="application">Apply for New Job</button><p><strong>Info</strong></p><p>Fee: $<span id="nextfee"></span><p>Job: <span id="nextjob"></span></p><p>Wage: $<span id="nextwage"></span>/shift</p>
  </div>


  <div id="information">
    <p><strong>Player Information</strong></p>
    <p>Current House: <span id="house"></span></p>
    <p>Current Job: <span id="JOB"></span></p>
    <p>Current Wage: <span id="wage"></span>$/shift</p>
    <p>Orange Profit: <span id=oprof></span>$/sleep<p>
      <p>Gold Profit: <span id=gprof></span>$/sleep<p>
        <p>SpaceY Profit: <span id=sprof></span>$/sleep<p>
        </div>


        <div class="alerts">
          <h2>Message Board:</h2>
          <h4>Message From Casino: <span id="casino"></span></h4>
          <h4>Personal Message: <span id="alertmessage"></span></h4>
        </div>
        <div class="bars">
          <h6>Energy:</h6>
          <div class="w3-container">
            <div class="w3-border" id="blueborder">
              <div class="w3-blue" id="energybar"><p id="percent"><span id="energypercent"></span>%</p></div>
            </div>
          </div>
          <h6>Food:</h6>
          <div class="w3-container">
            <div class="w3-border" id="border">
              <div class="w3-red" id="foodbar"><p id="percent"><span id="foodpercent"></span>%</p></div>
            </div>
          </div>
        </div>
        <div id="moneydiv">
        <p>Money:<p id="cash"></p>
        <p id="cash"><span id="moneypercent">
        </span>$</p></p>
    </div>
        <br>
        <div id="imagediv">
          <img src="mario_right.png" id="character">
        </div>

        </div>
        <a href="millionaireSignOut.php">Sign Out</a>
      </body>
      </html>
