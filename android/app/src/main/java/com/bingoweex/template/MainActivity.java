package com.bingoweex.template;

import android.content.Intent;
import android.net.Uri;
import android.os.Handler;
import android.support.v4.*;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import com.bingo.weex.core.BingoWXFragment;
import com.bingo.weex.core.BingoWXFragmentListener;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.utils.WXLogUtils;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity implements BingoWXFragmentListener {

    String TAG = MainActivity.class.getName();
    BingoWXFragment fragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getSupportActionBar().hide();

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                fragment = new BingoWXFragment();
                Map<String,Object> data=new HashMap<>();
                String startPage=BuildConfig.StartPage;
                fragment.setWXPage(Uri.parse(startPage),data);
                fragment.setWXFragmentListener(MainActivity.this);
                FragmentManager fragmentManager = getSupportFragmentManager();
                FragmentTransaction transaction = fragmentManager.beginTransaction();
                transaction.add(R.id.frame, fragment);
                transaction.commit();
            }
        },500);

    }

    @Override
    public void onWXRenderStart(WXSDKInstance instance) {
        WXLogUtils.d(TAG, "---onWXRenderStart");
    }

    @Override
    public void onWXViewCreated(WXSDKInstance instance, View view) {
        WXLogUtils.d(TAG, "---onWXViewCreated");
    }

    @Override
    public void onWXRenderSuccess(WXSDKInstance instance, int width, int height) {
        WXLogUtils.d(TAG, "---onWXRenderSuccess");
    }

    @Override
    public void onWXRenderException(WXSDKInstance instance, String errCode, String msg) {
        WXLogUtils.d(TAG, "---onWXRenderException code:" + errCode + " msg:" + msg);
    }


    @Override
    public void onBackPressed() {
        if (fragment != null) {
            fragment.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        fragment.onActivityResult(requestCode, resultCode, data);
    }


}
