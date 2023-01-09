GOOGLE_PROJECT_ID=lasyntex #google project id
CLOUD_RUN_SERVICE=lasyntex-service #project id + "service", prob anything i want
INSTANCE_CONNECTION_NAME=lasyntex:us-central1:lasyntex-sql #instance connection name
DB_USER=root #root
DB_PASS=ultraboost #password set earlier
DB_NAME=commands_data #database name

#took 10 hours to write this but i got it xD
gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
    --project=$GOOGLE_PROJECT_ID

gcloud run deploy $CLOUD_RUN_SERVICE \
    --image gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
    --add-cloudsql-instances $INSTANCE_CONNECTION_NAME \
    --update-env-vars INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME,DB_PASS=$DB_PASS,DB_USER=$DB_USER,DB_NAME=$DB_NAME \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --project=$GOOGLE_PROJECT_ID