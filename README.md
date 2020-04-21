# Easy Geocoder

A simple, graphical interface to a million and one geocoding APIs.

## Step 1: Feed it a file

Add in your CSV or Excel file.

![Drag and drop or click to upload](images/upload.png)

It'll be read in like magic, and the preview will show you enough sample rows that you know what you're looking at.

![Preview](images/uploaded.png)

## Step 2: Set up the geocoding

Now you'll pick your geocoding service provider and pick what counts as the address you're geocoding. In the situation below, we're combining a few columns with the custom text "United States."

![Completing geocoding options](images/provider.png)

## Step 3: Geocoding

Click **Geocode** and you're ready to go! Along with latitude and longitude, you'll also receive any extra columns the geocoder decides to send back (this varies with different providers).

![Seeing your results](images/results.png)

The data you download is your original file **with the addition of geocoded data**.

![Downloaded](images/downloaded.png)

## Fun facts

- If you hit an error (rate limits, missing an API key, malformed request, etc) you'll be able to resume without re-requesting the ones you have already.
- If you upload something with latitude and longitude already filled in? It'll skip the rows where it's filled in.
- Results are cached, so if you try to request the same address multiple times it will re-use the original
- All of the heavy lifting is done by [node-geocoder](https://github.com/nchaulet/node-geocoder)
