var msg = document.getElementById("msg");
var wsServer = 'ws://120.79.134.194:9502';//调用websocket对象建立连接：//参数：ws/wss(加密)：//ip:port （字符串）
var websocket = new WebSocket(wsServer);
websocket.onopen = function (evt) {//onopen监听连接打开
    // 应该显示远程服务器连接成功
    //msg.innerHTML = websocket.readyState;
    //websocket.readyState 属性：
    /*
     CONNECTING     0    The connection is not yet open.
     OPEN           1    The connection is open and ready to communicate.
     CLOSING        2    The connection is in the process of closing.
     CLOSED         3    The connection is closed or couldn't be opened.
     */
};
//onmessage 监听服务器数据推送
websocket.onmessage = function (evt) {
    msg.innerHTML += evt.data +'<br>';//不断递增的数据
    console.log('从服务器获取到的数据: ' + evt.data);
};
//监听连接关闭
websocket.onclose = function (evt) {
    console.log("服务器拒绝");
};
//监听连接错误信息
websocket.onerror = function (evt, e) {
    console.log('错误: ' + evt.data);
};
//发送信息
function send_msg(){
    var text = document.getElementById('text').value;// 获取数据
    document.getElementById('text').value = '';// 清空数据
    websocket.send(text);//向服务器发送数据
}
//发送昵称
function send_name(){
    var text = document.getElementById('myname').value;// 获取数据
    websocket.send("#name#"+text);//向服务器发送数据
    var myTitle = document.getElementById("myTitle");
    myTitle.innerHTML = "IM "+text;
    alert("设置成功");
    var setName = document.getElementById("setName");
    setName.style.display = "none";
    var send_msg = document.getElementById("send_msg");
    send_msg.style.display = "block";
}