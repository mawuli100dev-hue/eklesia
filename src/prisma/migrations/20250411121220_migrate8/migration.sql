/*
  Warnings:

  - You are about to drop the column `month` on the `Reading` table. All the data in the column will be lost.
  - Made the column `date` on table `Reading` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Reading" DROP COLUMN "month",
ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT;
