/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_CourseToStudent` DROP FOREIGN KEY `_CourseToStudent_B_fkey`;

-- DropForeignKey
ALTER TABLE `_LevelToStudent` DROP FOREIGN KEY `_LevelToStudent_B_fkey`;

-- DropForeignKey
ALTER TABLE `_School_YearToStudent` DROP FOREIGN KEY `_School_YearToStudent_B_fkey`;

-- AlterTable
ALTER TABLE `Student` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_CourseToStudent` MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_LevelToStudent` MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_School_YearToStudent` MODIFY `B` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `_CourseToStudent` ADD CONSTRAINT `_CourseToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_School_YearToStudent` ADD CONSTRAINT `_School_YearToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LevelToStudent` ADD CONSTRAINT `_LevelToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
