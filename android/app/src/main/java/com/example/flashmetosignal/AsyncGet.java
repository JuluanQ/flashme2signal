package com.example.flashmetosignal;

import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

public class AsyncGet extends AsyncTask<String, Void, String> {
    private final String TAG = "get json :";
    private String url;

    public AsyncGet(String url) {
        this.url = url;
    }

    @Override
    protected String doInBackground(String... strings) {
        boolean status = false;
        String response = "";
        Log.e(TAG, "2 - pre Request to response...");
        try {
            response = performGetCall(url);
            Log.e(TAG, "3 - give Response...");
            Log.e(TAG, "4 " + response.toString());
        } catch (Exception e) {
            Log.e(TAG, "Error ...");
        }
        Log.e(TAG, "5 - after Response...");
        if (!response.equalsIgnoreCase("")) {
            try {
                Log.e(TAG, "6 - response !empty...");
                JSONObject jRoot = new JSONObject(response);
                JSONObject d = jRoot.getJSONObject("d");
                int ResultType = d.getInt("ResultType");
                Log.e("ResultType", ResultType + "");
                if (ResultType == 1) {
                    status = true;
                }
            } catch (JSONException e) {
                Log.e(TAG, "Error " + e.getMessage());
            } finally {
            }
        } else {
            Log.e(TAG, "6 - response is empty...");
            status = false;
        }
        return response;
    }

    @Override
    protected void onPreExecute() {
        Log.e(TAG, "1 - RequestVoteTask is about to start...");
    }

    public String performGetCall(String requestURL) {
        URL url = null;
        String rep = "";
        try {
            url = new URL(requestURL);
                    HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            try {
                InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
                    rep = new BufferedReader(new InputStreamReader(in, StandardCharsets.UTF_8))
                            .lines()
                            .collect(Collectors.joining("\n"));
                    Log.e(" resultat du get : ",rep);
                }

            } finally {
                urlConnection.disconnect();
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return rep;
    }
}