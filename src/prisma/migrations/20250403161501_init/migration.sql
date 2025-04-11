-- CreateTable
CREATE TABLE "Reading" (
    "id" SERIAL NOT NULL,
    "nday" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "Label" TEXT,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Text" (
    "id" SERIAL NOT NULL,
    "readId" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "nday" TEXT NOT NULL,
    "text1" TEXT NOT NULL,
    "text2" TEXT,
    "text3" TEXT,
    "text4" TEXT,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_readId_fkey" FOREIGN KEY ("readId") REFERENCES "Reading"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
