package com.javatpoint.hidetitle;

import android.content.Intent;
import android.os.Bundle;
import android.app.Activity;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.apache.http.util.EncodingUtils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

public class MainActivity extends Activity {

    String                      OPT = "0";
    String                      OPT2 = "0";
    String                      LOG = "user";
    String                      PASS = "12345";
    String                      URL = "http://google.com";
    WebView                     mainWebView;
    private Handler myHandler;
    public static final int     NOTIFICATION_ID = 42;
    private String              notificationTitle;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_main);

        read("config.txt");
        mainWebView = (WebView) findViewById(R.id.mainWebView);
        WebSettings webSettings = mainWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        mainWebView.setWebViewClient(new MyCustomWebViewClient());
        String postData = "pseudo="+ this.LOG+"&password="+this.PASS;
        mainWebView.postUrl(this.URL, EncodingUtils.getBytes(postData, "BASE64"));
        notificationTitle = this.getResources().getString(R.string.notification);
        
    }

    private class MyCustomWebViewClient extends WebViewClient {
        @Override public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url); return true; }
    }

    public void read(String fpath){

        try {
            BufferedReader br =  new BufferedReader(new InputStreamReader(openFileInput(fpath)));

            String[] tmp = br.readLine().split("-");
            File file = new File( fpath);
            String filePath = file.getAbsolutePath();
            this.URL = tmp[0];
            this.OPT = tmp[1];
            this.LOG = tmp[2];
            this.OPT2 = tmp[3];
            this.PASS = tmp[4];
        }
        catch (IOException e) {
            Log.e("Exception", "File write failed: " + e.toString());
        }
    }


    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && mainWebView.canGoBack()) {
            mainWebView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }


    public boolean onCreateOptionsMenu(Menu menu) {

        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.my_menu, menu);

        return true;
    }

    public String get_url()
    {
        return this.URL;
    }


    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.Parametre:
                read("config.txt");
                Intent intent = new Intent(MainActivity.this, param.class);
                intent.putExtra("URL", URL);
                intent.putExtra("OPT", OPT);
                intent.putExtra("LOG", LOG);
                intent.putExtra("OPT2", OPT2);
                intent.putExtra("PASS", PASS);
                startActivity(intent);
                return true;
            case R.id.quitter:
                finish();
                return true;
        }
        return false;}

}
