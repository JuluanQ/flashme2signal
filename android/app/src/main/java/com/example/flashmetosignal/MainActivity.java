package com.example.flashmetosignal;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import java.text.DateFormat;
import java.time.LocalDateTime;
import java.util.Date;

public class MainActivity extends AppCompatActivity {

    Spinner severiteSpin;
    Spinner typeSpin;
    EditText identEdit;
    EditText descEdit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Intent intent = getIntent();
        String action = intent.getAction();
        Uri data = intent.getData();


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
        severiteSpin = findViewById(R.id.spinnerSev);
        String severite = "";
        severite = severiteSpin.getSelectedItem().toString();

        // liste déroulante du type de probleme
        typeSpin = findViewById(R.id.spinnerType);
        String type = "";
        type = typeSpin.getSelectedItem().toString();

        //identifiant
        identEdit = findViewById(R.id.idEditIdent);
        String ident = "";
        ident = identEdit.getText().toString();

        // la description
        descEdit = findViewById(R.id.editTextTextMultiLine);
        String desc = "";
        desc = descEdit.getText().toString();

        makeData();

        // bouton envoi
        Button envoi = findViewById(R.id.boutonEnv);
        envoi.setOnClickListener(v -> {
            postData(makeData());
            Toast toast = Toast.makeText(this, makeData(), Toast.LENGTH_LONG);
            toast.show();
        });

    }

    public void postData(String data) {
        new AsyncSend(data).execute();
    }

    public String makeData() {
        String severite = "";
        severite = severiteSpin.getSelectedItem().toString();

        String type = "";
        type = typeSpin.getSelectedItem().toString();

        String ident = "";
        ident = identEdit.getText().toString();

        String desc = "";
        desc = descEdit.getText().toString();

        String formattedDate = "";
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            LocalDateTime laDate = LocalDateTime.now();
            formattedDate = String.valueOf(laDate);
        }

        return "{\"id\":4,\"idMateriel\":{\"id\":1,\"salle\":\"12\",\"type\":\"pc\"},\"severite\":\""+ severite +"\",\"description\":\""+ desc +"\",\"dateDemande\":\"" + formattedDate + "\",\"type\":\"pc\",\"demandeur\":" + ident +",\"etat\":{\"id\":2,\"libelle\":\"grave\"}}";
    }
}