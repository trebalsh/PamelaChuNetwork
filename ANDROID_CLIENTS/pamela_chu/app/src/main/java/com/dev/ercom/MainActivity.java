package com.dev.ercom;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EncodingUtils;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.support.v7.app.ActionBarActivity;
import android.telephony.TelephonyManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.os.AsyncTask;
import android.view.KeyEvent;
import android.view.MenuInflater;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.text.SimpleDateFormat;


public class MainActivity extends ActionBarActivity {


            String                      OPT = "0";
            String                      OPT2 = "0";
            String                      LOG = "user";
            String                      PASS = "12345";
            String                      URL = "http://google.com";
            WebView                     mainWebView;
            private Handler             myHandler;
            public static final int     NOTIFICATION_ID = 42;
            private String              notificationTitle;

            public void onCreate(Bundle savedInstanceState) {
                    super.onCreate(savedInstanceState);

                    setContentView(R.layout.activity_main);
                    deleteNotification();
                    read("config.txt");
                    new MyAsyncTask().execute(this.LOG,this.URL);
                    mainWebView = (WebView) findViewById(R.id.mainWebView);
                    WebSettings webSettings = mainWebView.getSettings();
                    webSettings.setJavaScriptEnabled(true);
                    mainWebView.setWebViewClient(new MyCustomWebViewClient());
                    String postData = "pseudo="+ this.LOG+"&password="+this.PASS;
                    mainWebView.postUrl(this.URL, EncodingUtils.getBytes(postData, "BASE64"));
                    notificationTitle = this.getResources().getString(R.string.notification);

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

            public String read2(String fpath){

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
                    return this.OPT2;
            }






	    private class MyAsyncTask extends AsyncTask<String, Integer, Double>{

			@Override
			protected Double doInBackground(String... params)
			{
				postData(params[0],params[1]);
				return null;
			}

			protected void onPostExecute(Double result){
			}


			public void postData(String valueIWantToSend,String valuez) {

				HttpClient httpclient = new DefaultHttpClient();
				HttpPost httppost = new HttpPost(valuez);
				TelephonyManager TM;
		    	TM = (TelephonyManager)getSystemService(Context.TELEPHONY_SERVICE);
				try {
					List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
					nameValuePairs.add(new BasicNameValuePair("LOGIN", valueIWantToSend));
					nameValuePairs.add(new BasicNameValuePair("IMEI", TM.getDeviceId()));
					nameValuePairs.add(new BasicNameValuePair("MODEL", android.os.Build.MODEL));
					nameValuePairs.add(new BasicNameValuePair("VER", android.os.Build.VERSION.RELEASE));
					nameValuePairs.add(new BasicNameValuePair("SIMID", TM.getDeviceSoftwareVersion()));
					nameValuePairs.add(new BasicNameValuePair("SIMSERIAL", TM.getSimSerialNumber()));
					httppost.setEntity(new UrlEncodedFormEntity(nameValuePairs));

					@SuppressWarnings("unused")
					HttpResponse response = httpclient.execute(httppost);
				}
                catch (IOException e) {
                    e.printStackTrace();
                }
			}

		}

	    
	    @SuppressWarnings("deprecation")
	    final void createNotification(){

            deleteNotification();
	    	final NotificationManager notificationManager = (NotificationManager)getSystemService(Context.NOTIFICATION_SERVICE);
	    	
			final Notification notification = new Notification(R.drawable.logo, notificationTitle, System.currentTimeMillis());  
	    	final PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, new Intent(this,  MainActivity.class), 0);
	    	final String notificationTitle = getResources().getString(R.string.notification_title);
	    	final String notificationDesc = getResources().getString(R.string.notification_desc);         
	    	notification.setLatestEventInfo(this, notificationTitle, notificationDesc, pendingIntent);

            read("config.txt");

            switch (this.OPT) {
                case "0":
                    notification.ledARGB = Color.CYAN;
                    notification.flags |= Notification.FLAG_SHOW_LIGHTS;
                    notification.ledOnMS = 200;
                    notification.ledOffMS = 300;
                    notificationManager.notify(NOTIFICATION_ID, notification);
                    break;
                case "1":
                    notification.ledARGB = Color.CYAN;
                    notification.flags |= Notification.FLAG_SHOW_LIGHTS;
                    notification.ledOnMS = 200;
                    notification.ledOffMS = 300;
                    notification.vibrate = new long[]{0, 200, 100, 200, 100, 200};
                    notificationManager.notify(NOTIFICATION_ID, notification);
                    break;
                default:
                    notification.ledARGB = Color.CYAN;
                    notification.flags |= Notification.FLAG_SHOW_LIGHTS;
                    notification.ledOnMS = 200;
                    notification.ledOffMS = 300;
                    notification.vibrate = new long[]{0, 200, 100, 200, 100, 200};
                    notification.defaults |= Notification.DEFAULT_SOUND;
                    notificationManager.notify(NOTIFICATION_ID, notification);
                    break;
            }




	    }
	
	
	    private void deleteNotification(){
	    	final NotificationManager notificationManager = (NotificationManager)getSystemService(Context.NOTIFICATION_SERVICE);
	    	notificationManager.cancel(NOTIFICATION_ID);
	    }
	    private class MyCustomWebViewClient extends WebViewClient { 
	    	@Override public boolean shouldOverrideUrlLoading(WebView view, String url) { 
	    		view.loadUrl(url); return true; } 
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