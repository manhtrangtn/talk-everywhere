$(function () {
    $("#chat-box").hide();
    $("#login-box").show();
    $(".stickers").hide();
    var socket = io.connect('https://talk-everywhere.herokuapp.com/');
    var username;
    socket.on('users', function (data) {
        $("#onlineUser").html("");
        data.forEach(function (element) {
            $("#onlineUser").append('<div class="user">' + element + '</div>')
        });
    });
    $("#start").click(function () { 
        if($("#username").val()==''){alert("Please enter vaild username!")}else
        socket.emit('start', $("#username").val());
    });
    socket.on('false', function () { 
        alert("Username already exist! Pleas choose an others username.")
    })
    socket.on('true',function (data) { 
        $("#login-box").hide(200);
        $("#chat-box").show(400);
        $("#cUser").text(data);
        username = data;
    })
    $("#send").click(function () { 
        if ($("#message").val()!='') {
            socket.emit('send', {
            username: username,
            message: $("#message").val()
        });
        $("#message").val("")}else{}
        
    });
    socket.on('sent',function (data) { 
        $("#chat").append(
            '<div class = "msg"><span class = "msgUser">' + data.username + ':</span><br><span class = "msgContent">' +data.message+'</span></div>'
        );
        $("#chat").animate({
            scrollTop: $("#chat").height()
        }, 100);
    });
    $("#logout").click(function () {
            $("#chat-box").hide(200);
            $("#login-box").show(400);
            socket.emit('logout', username);
    });
    $(".stk").click(function () { 
        $(".stickers").show(300);
    })
    $("#agry").click(function () { 
         socket.emit('stick', "agry");
    })
    $("#gift").click(function () {
        socket.emit('stick', "gift");
    })
    $("#leuuu").click(function () {
        socket.emit('stick', "leuuu");
    })
    $("#love").click(function () {
        socket.emit('stick', "love");
    })
    $("#simon").click(function () {
        socket.emit('stick', "simon");
    })
    socket.on('stk', function (data) {
        $("#chat").append(
            '<img src="'+data+'" class="sent-img"/><br>'
        );
        $("#chat").animate({
            scrollTop: $("#chat").height()
        }, 100);
    });
});