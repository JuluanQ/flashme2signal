package com.example.flashmetosignal;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
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

        // bouton envoi
        Button envoi = findViewById(R.id.boutonEnv);
        envoi.setOnClickListener(v -> {
            //envoiDonnees("{\"id\":4,\"idMateriel\":{\"id\":1,\"salle\":\"1\",\"type\":\"tablette\"},\"severite\":\"mineur\",\"description\":\"descri\",\"dateDemande\":\"2022-05-25T06:33:44.116+00:00\",\"type\":\"panne\",\"etat\":\"0\"}");
            Toast toast = Toast.makeText(this, makeData(), Toast.LENGTH_LONG);
            toast.show();
        });

    }

    public void envoiDonnees(String data) {

        OutputStream out = null;
        try {
            URL url = new URL("http://localhost:8080/demandes");
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            out = new BufferedOutputStream(urlConnection.getOutputStream());

            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(out, "UTF-8"));
            writer.write(data);
            writer.flush();
            writer.close();
            out.close();

            urlConnection.connect();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
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

        return "{\"id\":,\"idMateriel\":{\"id\":1,\"salle\":\"1\",\"type\":\"" + type +"\"},\"severite\":\""+ severite + "\",\"description\":\" " + desc + "\",\"dateDemande\":\"2022-05-25T06:33:44.116+00:00\",\"type\":\"panne\",\"etat\":\"0\"}";

    }
}