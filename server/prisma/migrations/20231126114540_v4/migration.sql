/*
  Warnings:

  - You are about to drop the column `classRoomId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `ClassRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ClassRoom` DROP FOREIGN KEY `ClassRoom_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_classRoomId_fkey`;

-- DropForeignKey
ALTER TABLE `_CourseToStudent` DROP FOREIGN KEY `_CourseToStudent_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CourseToStudent` DROP FOREIGN KEY `_CourseToStudent_B_fkey`;

-- AlterTable
ALTER TABLE `Student` DROP COLUMN `classRoomId`;

-- DropTable
DROP TABLE `ClassRoom`;

-- DropTable
DROP TABLE `_CourseToStudent`;

-- CreateTable
CREATE TABLE `Student_Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student_Course` ADD CONSTRAINT `Student_Course_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student_Course` ADD CONSTRAINT `Student_Course_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
