/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Student` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `B` on the `_CourseToStudent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `B` on the `_LevelToStudent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `B` on the `_School_YearToStudent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[phone_number]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_CourseToStudent` DROP FOREIGN KEY `_CourseToStudent_B_fkey`;

-- DropForeignKey
ALTER TABLE `_LevelToStudent` DROP FOREIGN KEY `_LevelToStudent_B_fkey`;

-- DropForeignKey
ALTER TABLE `_School_YearToStudent` DROP FOREIGN KEY `_School_YearToStudent_B_fkey`;

-- AlterTable
ALTER TABLE `Student` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_CourseToStudent` MODIFY `B` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `_LevelToStudent` MODIFY `B` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `_School_YearToStudent` MODIFY `B` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Student_phone_number_key` ON `Student`(`phone_number`);

-- AddForeignKey
ALTER TABLE `_CourseToStudent` ADD CONSTRAINT `_CourseToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_School_YearToStudent` ADD CONSTRAINT `_School_YearToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LevelToStudent` ADD CONSTRAINT `_LevelToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
