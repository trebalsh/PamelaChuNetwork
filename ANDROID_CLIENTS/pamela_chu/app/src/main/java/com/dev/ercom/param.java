package com.dev.ercom;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;

 
public class param extends Activity {
	
	
	
    @SuppressWarnings("unused")
	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.param);

       Intent intent = getIntent();
       final EditText editText1 = (EditText) findViewById(R.id.editText1);
       editText1.setText(intent.getStringExtra("URL"));
       
       final EditText editText2 = (EditText) findViewById(R.id.editText2);
       editText2.setText(intent.getStringExtra("LOG"));

       
       final EditText editText3 = (EditText) findViewById(R.id.editText3);
       editText3.setText(intent.getStringExtra("PASS"));
     
    
       
	RadioGroup radioGroup = (RadioGroup) findViewById(R.id.radiogroup);
       final RadioButton bt1 = (RadioButton) findViewById(R.id.radioButton1);
       final RadioButton bt2 = (RadioButton) findViewById(R.id.radioButton2);
       final RadioButton bt3 = (RadioButton) findViewById(R.id.radioButton3);
    
       

       
       Button button1 = (Button) findViewById(R.id.button1);

       if (intent.getStringExtra("OPT").equals("0"))
    	   bt1.setChecked(true);
       if (intent.getStringExtra("OPT").equals("1"))
    	   bt2.setChecked(true);
       if (intent.getStringExtra("OPT").equals("2"))
    	   bt3.setChecked(true);



       button1.setOnClickListener(new View.OnClickListener() {
       	public void onClick(View v) {

            String res = "";

           res = editText1.getText().toString() + "-";

            if(bt3.isChecked())
                res += "2";
            else if(bt2.isChecked())
                res += "1";
            else if(bt1.isChecked())
                res += "0";
            else
            res += "0";

            res += "-" + editText2.getText().toString() + "-0";


            res += "-" + editText3.getText().toString() + "-";

            writeToFile(res);
            String[] varo = read("config.txt");
            System.exit(0);
           // finish();


       	}

       });
    }


    public String[] read(String fpath){

        try {
        BufferedReader br =  new BufferedReader(new InputStreamReader(openFileInput(fpath)));
            String[] tmp = br.readLine().split("-");
            return tmp;
        }
        catch (IOException e) {
            Log.e("Exception", "File write failed: " + e.toString());
        }
        return null;
    }



    private void writeToFile(String data) {
        try {
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(openFileOutput("config.txt", Context.MODE_PRIVATE));
            outputStreamWriter.write(data);
            outputStreamWriter.close();
        }
        catch (IOException e) {
            Log.e("Exception", "File write failed: " + e.toString());
        }
    }


}
