/*
  Warnings:

  - You are about to drop the column `startring_dtae` on the `School_Year` table. All the data in the column will be lost.
  - Added the required column `startring_date` to the `School_Year` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `School_Year` DROP COLUMN `startring_dtae`,
    ADD COLUMN `startring_date` DATETIME(3) NOT NULL;
