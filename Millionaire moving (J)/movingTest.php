<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Millionaire moving test</title>
    <link rel="Stylesheet" type="text/css" href="movingTest.css"/>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script src="movingTest.js"></script>

  </head>
  <body>

      <div class="alerts">
        <h2>Message Board:</h2>
        <h4>Message From Casino: <span id="casino"></span></h4>
        <h4>Personal Message: <span id="alertmessage"></span></h4>
      </div>
      <div class="investments">
        <h6>Energy:</h6>
        <div class="w3-container">
          <div class="w3-border">
            <div class="w3-blue" id="energybar"><p id="percent"><span id="energypercent"></span>%</p></div>
          </div>
        </div>
        <h6>Food:</h6>
        <div class="w3-container">
          <div class="w3-border">
            <div class="w3-red" id="foodbar"><p id="percent"><span id="foodpercent"></span>%</p></div>
          </div>
        </div>
      </div>

    <div id="box">
      <img id = "image" src="sprite.jpg" alt="stick figure" height="100px">
      <button id="workbutton">Go To Work</button><p><span id="wage"></span>$/Shift</p><img src="https://www.freeiconspng.com/uploads/business-man-with-clock-to-control-time-of-work-3.png"
       height="70px" ></img><p>Current Job: <span id="job"></span></p>
    </div>
  </body>
</html>
