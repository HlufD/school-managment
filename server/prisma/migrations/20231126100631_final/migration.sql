/*
  Warnings:

  - You are about to drop the `_ClassRoomToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ClassRoomToStudent` DROP FOREIGN KEY `_ClassRoomToStudent_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ClassRoomToStudent` DROP FOREIGN KEY `_ClassRoomToStudent_B_fkey`;

-- AlterTable
ALTER TABLE `Student` ADD COLUMN `classRoomId` INTEGER NULL;

-- DropTable
DROP TABLE `_ClassRoomToStudent`;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_classRoomId_fkey` FOREIGN KEY (`classRoomId`) REFERENCES `ClassRoom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
