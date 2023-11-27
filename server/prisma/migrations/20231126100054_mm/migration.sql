/*
  Warnings:

  - You are about to drop the column `classRoomId` on the `Student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_classRoomId_fkey`;

-- AlterTable
ALTER TABLE `Student` DROP COLUMN `classRoomId`;

-- CreateTable
CREATE TABLE `_ClassRoomToStudent` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ClassRoomToStudent_AB_unique`(`A`, `B`),
    INDEX `_ClassRoomToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ClassRoomToStudent` ADD CONSTRAINT `_ClassRoomToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `ClassRoom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClassRoomToStudent` ADD CONSTRAINT `_ClassRoomToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
