/*
  Warnings:

  - A unique constraint covering the columns `[year_name]` on the table `School_Year` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `year_name` to the `School_Year` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `School_Year` ADD COLUMN `year_name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `School_Year_year_name_key` ON `School_Year`(`year_name`);
