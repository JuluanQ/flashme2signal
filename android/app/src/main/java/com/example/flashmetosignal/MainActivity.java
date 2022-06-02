package com.example.flashmetosignal;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.DateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.concurrent.ExecutionException;

public class MainActivity extends AppCompatActivity {

    Spinner severiteSpin;
    Spinner typeSpin;
    EditText identEdit;
    EditText descEdit;

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

        // pour vérifier si on passe par le QR Code
        Intent intent = getIntent();
        Uri uri = intent.getData();

        // bouton envoi
        Button envoi = findViewById(R.id.boutonEnv);
        if (uri != null) {
            envoi.setOnClickListener(v -> {
                postData(makeData());
                Toast toast = Toast.makeText(this, "Demande envoyée !", Toast.LENGTH_LONG);
                toast.show();
            });
        } else {
            envoi.setBackgroundColor(Color.parseColor("#FF0000"));
            envoi.setOnClickListener(v -> {
                Toast toast = Toast.makeText(this, "Vous devez scanner un QR Code pour envoyer une demande", Toast.LENGTH_LONG);
                toast.show();
            });
        }


    }

    public void postData(String data) {
        new AsyncSend(getResources().getString(R.string.demande), data).execute();
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

        return "{\"id\":" + getNewId() + ",\"idMateriel\":" + getAppareil() + ",\"severite\":\""+ severite +"\",\"description\":\""+ desc +"\",\"dateDemande\":\"" + formattedDate + "\",\"type\":\"" + type + "\",\"demandeur\":" + ident +",\"etat\":{\"id\":1,\"libelle\":\"En cours\"}}";
    }

    public String getNewId() {
        String ret = "0";
        String data = "";
        try {
            data = new AsyncGet(getResources().getString(R.string.demandes)).execute().get();
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }
        try {
            JSONArray jsonArray = new JSONArray(data);
            ArrayList num = new ArrayList();

            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject row = jsonArray.getJSONObject(i);
                num.add(row.getInt("id"));
            }
            int max = (int) Collections.max(num);
            max = max + 1;
            ret = String.valueOf(max);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return ret;
    }

    public String getAppareil() {
        String ret = "";
        // récupère l'intent
        Intent intent = getIntent();
        //String action = intent.getAction();
        Uri uri = intent.getData();

        if (uri != null) {
            String uriString = uri.toString();
            String id = uriString.substring(uriString.length()-1, uriString.length());
            try {
                String data = new AsyncGet(getResources().getString(R.string.materiels) + id).execute().get();
                ret = data;
            } catch (ExecutionException | InterruptedException e) {
                e.printStackTrace();
            }
        }
        return ret;
    }
}