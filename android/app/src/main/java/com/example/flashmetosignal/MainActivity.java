package com.example.flashmetosignal;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;

import java.text.DateFormat;
import java.util.Date;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // affiche le logo de l'université
        ImageView image = findViewById(R.id.logoUniv);
        image.setImageResource(this.getResources().getIdentifier("logouniv", "drawable", this.getPackageName()));

        // affiche la date du jour
        TextView textDade = findViewById(R.id.idDate);
        Date now = new Date();
        DateFormat dateformatter = DateFormat.getDateInstance(DateFormat.SHORT);
        String formattedDate = dateformatter.format(now);
        textDade.setText(formattedDate);

        // liste déroulante de la sévérité du problème
        Spinner severite = findViewById(R.id.spinnerSev);

    }
}