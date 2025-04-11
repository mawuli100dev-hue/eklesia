/*
  Warnings:

  - You are about to drop the column `Label` on the `Reading` table. All the data in the column will be lost.
  - You are about to drop the `Text` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Text" DROP CONSTRAINT "Text_readId_fkey";

-- AlterTable
ALTER TABLE "Reading" DROP COLUMN "Label",
ADD COLUMN     "label" TEXT,
ADD COLUMN     "text" TEXT[];

-- DropTable
DROP TABLE "Text";
