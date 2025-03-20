$(document).ready(function () {
    $("#off").click(function () {
      $("body").css("background-color", "black").addClass("dark-mode");
      $("#lightbulb").css("stroke", "white");
      $("h2").css("color", "white"); // Lightbulb and hint turn white
    });
  
    $("#dim").click(function () {
      $("body").css("background-color", "gray").removeClass("dark-mode");
      $("#lightbulb").css("stroke", "black");
      $("h2").css("color", "#DCDCDC");
    });
  
    $("#bright").click(function () {
      $("body").css("background-color", "#FFD700").removeClass("dark-mode");
      $("#lightbulb").css("stroke", "Red");
      $("h2").css("color", "black");
    });
  });
  