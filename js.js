window.onload = function () {
    //s - размер одной клетки
    var s = window.innerWidth / 6;
    
    var sec = '00';
    var min = '00';
    var stopTime = false;
    var firstTime = true;
    
    var cells = [[[0, 0], [s, 0], [s * 2, 0], [s * 3, 0]]
                , [[0, s], [s, s], [s * 2, s], [s * 3, s]]
                , [[0, s * 2], [s, s * 2], [s * 2, s * 2], [s * 3, s * 2]]
                , [[0, s * 3], [s, s * 3], [s * 2, s * 3], [s * 3, s * 3]]];
    
    var colors = [[0, 0, 0, 0]
              , [0, 0, 0, 0]
              , [0, 0, 0, 0]
              , [0, 0, 0, 0]];

    function drawCells() {
        ctx.clearRect(0, 0, 4 * s, 4 * s);
        for (var i = 0; i < cells.length; i++) {
            for (var r = 0; r < cells[i].length; r++) {
                if (colors[i][r] == 0) ctx.fillStyle = "#8FBFB1";
                if (colors[i][r] == 1) ctx.fillStyle = "#000";
                ctx.fillRect(cells[i][r][0], cells[i][r][1], s - 1, s - 1);
            }
        }
    }
    
    //Секундомер
    function stopwatch() {
        var start = setInterval(function () {
            if (stopTime) {
                clearInterval(start);
                return;
            }
            sec++;
            if (sec == 60) {
                sec = 0;
                min++;
                if (min < 10) {
                    min = '0' + min;
                }
            }
            if (min == 0) {
                min = '00';
            }
            if (sec > 0) {
                if (sec < 10) {
                    sec = '0' + sec;
                }
            }
            else {
                sec = '00';
            }
            document.getElementById("stopwatch").childNodes[0].nodeValue = min + ':' + sec;
        }, 1000);
    }
    var canvas = document.getElementById("pixcels");
    canvas.width = 4 * s;
    canvas.height = 4 * s;
    var ctx = canvas.getContext("2d");
    drawCells();
    
    //При клике по клеткам
    canvas.onclick = function (e) {
        if (firstTime) {
            firstTime = false;
            stopwatch();
        }
        var clickX = e.pageX - canvas.offsetLeft;
        var clickY = e.pageY - canvas.offsetTop;
        for (var i = 0; i < cells.length; i++) {
            for (var r = 0; r < cells[i].length; r++) {
                var startX = cells[i][r][0];
                var endX = cells[i][r][0] + s;
                var startY = cells[i][r][1];
                var endY = cells[i][r][1] + s;
                if (clickX > startX && clickX < endX && clickY > startY && clickY < endY) {
                    var newColor = colors[i][r] == 0 ? 1 : 0;
                    colors[i].splice(r, 1, newColor);
                }
            }
        }
        drawCells();
    }
    
    //Поворот клеток на 90 градусов по часовой стрелке
    document.getElementById("rotate").onclick = function () {
        var newColorsArr = [];
        for (var r = 0; r < 4; r++) {
            var newColors = [];
            for (var i = 3; i >= 0; i--) {
                newColors.push(colors[i][r]);
            }
            newColorsArr.push(newColors);
        }
        colors = newColorsArr;
        drawCells();
    }
    
    //Отображение результата рисования
    document.getElementById("result").onclick = function () {
        canvas.onclick = false;
        document.getElementById("result").onclick = false;
        document.getElementById("rotate").onclick = false;
        stopTime = true;
        document.getElementsByClassName('result_data')[0].style.display = 'block';
        var canvasMini = document.getElementById("pixcels_mini");
        canvasMini.width = s;
        canvasMini.height = s;
        var ctxMini = canvasMini.getContext("2d");
        s = window.innerWidth / 24;
        var cellsMini = [[[0, 0], [s, 0], [s * 2, 0], [s * 3, 0]]
                , [[0, s], [s, s], [s * 2, s], [s * 3, s]]
                , [[0, s * 2], [s, s * 2], [s * 2, s * 2], [s * 3, s * 2]]
                , [[0, s * 3], [s, s * 3], [s * 2, s * 3], [s * 3, s * 3]]];
        ctxMini.clearRect(0, 0, 4 * s, 4 * s);
        for (var i = 0; i < cellsMini.length; i++) {
            for (var r = 0; r < cellsMini[i].length; r++) {
                if (colors[i][r] == 0) ctxMini.fillStyle = "#8FBFB1";
                if (colors[i][r] == 1) ctxMini.fillStyle = "#000";
                ctxMini.fillRect(cellsMini[i][r][0], cellsMini[i][r][1], s - 1, s - 1);
            }
        }
        var countPixcels = 0;
        for (var i = 0; i < colors.length; i++) {
            for (var r = 0; r < colors[i].length; r++) {
                countPixcels = countPixcels + colors[i][r];
            }
        }
        document.getElementById("count_pixcels").innerHTML = 'Пикселей: ' + countPixcels;
        document.getElementById("time").innerHTML = 'Время: ' + min + ':' + sec;
    }
}