-- CreateTable
CREATE TABLE "Reading" (
    "id" SERIAL NOT NULL,
    "weekday" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "label" TEXT,
    "text" TEXT[],

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);
