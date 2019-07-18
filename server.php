<?php 
    //创建websocket服务器
    $ws = new swoole_websocket_server("0.0.0.0",9502);

    //open情况
    $ws->on('open',function($ws,$request){
        echo "新用户 $request->fd 加入。\n";
        $GLOBALS['fd'][$request->fd]['id'] = $request->fd;  //设置用户ID
        $GLOBALS['fd'][$request->fd]['name'] = '匿名用户';  //设置用户名
    });

    //message情况
    $ws->on('message',function($ws,$frame){
        $msg = $GLOBALS['fd'][$frame->fd]['name'].":".$frame->data."\n";
        if (strstr($frame->data,"#name#")) {    //让#name#默认为用户设置用户名
            $GLOBALS['fd'][$frame->fd]['name'] = str_replace('#name#','',$frame->data);
        }else{                                  //正常的消息发送
            //向每一个客户端发送消息
            foreach ($GLOBALS['fd'] as $i) {
                $ws->push($i['id'],$msg);
            }
        }
    });
    
    //close情况
    $ws->on('close',function($ws,$fd){
        echo "客户端：{$fd} 断开连接\n";
        unset($GLOBALS['fd'][$fd]);// 清除 已经关闭的客户端
    });

    $ws->start();
 ?>