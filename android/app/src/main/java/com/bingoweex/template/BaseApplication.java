package com.bingoweex.template;

import android.app.Application;
import com.bingo.weex.core.BingoWXEngine;

public class BaseApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        //初始化weex引擎
        BingoWXEngine engine=new BingoWXEngine(this);
        engine.init();
    }
}
