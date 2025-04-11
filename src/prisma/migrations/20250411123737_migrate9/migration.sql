-- CreateTable
CREATE TABLE "Reading_FR" (
    "id" SERIAL NOT NULL,
    "weekday" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "label" TEXT,
    "theme" TEXT NOT NULL,
    "text" TEXT[],

    CONSTRAINT "Reading_FR_pkey" PRIMARY KEY ("id")
);
