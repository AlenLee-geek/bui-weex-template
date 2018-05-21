package com.bingoweex.template;

import android.app.Application;

import com.bingo.videocomponent.VideoEx;
import com.bingo.weex.core.BingoWXEngine;
import com.jzxiang.pickerview.PickerModule;

/**
 * Created by tonyyls on 2017/6/16.
 */

public class BaseApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        //初始化weex引擎
        BingoWXEngine engine=new BingoWXEngine(this);
        engine.init();
        //注册videoex组件
        engine.registerComponent("videoex", VideoEx.class);
        //注册pickmodule
        engine.registerModule("picker", PickerModule.class);
    }
}
