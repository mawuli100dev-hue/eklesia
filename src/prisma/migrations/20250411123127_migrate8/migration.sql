-- CreateTable
CREATE TABLE "Reading" (
    "id" SERIAL NOT NULL,
    "weekday" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "label" TEXT,
    "theme" TEXT NOT NULL,
    "text" TEXT[],

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);
