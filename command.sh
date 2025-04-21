#Lancer les compilations

tsc services/readingService.ts &
tsc controllers/readingController.ts &
tsc routes/readingRoute.ts &
tsc app.ts &
tsc server.ts &

# Lancer le server typescripts

#node server.js