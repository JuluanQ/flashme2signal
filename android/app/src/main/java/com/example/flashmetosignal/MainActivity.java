package com.example.flashmetosignal;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
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

        //Log.e("date format short : ", formattedDate);
        //String formattedDate =  DateFormat.getDateInstance(DateFormat.MEDIUM).format(now);
        //Log.e("date format medium : ", formattedDate);
        //formattedDate = "2022-05-25T06:33:44.116+00:00";

        return "{\"id\":4,\"idMateriel\":{\"id\":1,\"salle\":\"12\",\"type\":\"pc\"},\"severite\":\""+ severite +"\",\"description\":\""+ desc +"\",\"dateDemande\":\"" + formattedDate + "\",\"type\":\"pc\",\"demandeur\":" + ident +",\"etat\":{\"id\":2,\"libelle\":\"grave\"}}";

        //return "{\"id\":,\"idMateriel\":{\"id\":1,\"salle\":\"12\",\"type\":\"pc\"},\"severite\":\" " + severite + "\",\"description\":\"" + desc + "\",\"dateDemande\":\"" + formattedDate + "\",\"type\":\"pc\",\"demandeur\":" + ident +",\"etat\":{\"id\":2,\"libelle\":\"grave\"}}";

        //return "{\"id\":,\"idMateriel\":{\"id\":1,\"salle\":\"1\",\"type\":\"" + type +"\"},\"severite\":\""+ severite + "\",\"description\":\" " + desc + "\",\"dateDemande\":\"2022-05-25T06:33:44.116+00:00\",\"type\":\"panne\",\"etat\":\"0\"}";

    }
}