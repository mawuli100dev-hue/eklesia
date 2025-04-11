-- CreateTable
CREATE TABLE "Reading" (
    "id" SERIAL NOT NULL,
    "nday" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "label" TEXT,
    "text" TEXT[],

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);
