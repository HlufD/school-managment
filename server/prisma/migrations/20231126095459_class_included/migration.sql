-- AlterTable
ALTER TABLE `Student` ADD COLUMN `classRoomId` INTEGER NULL;

-- CreateTable
CREATE TABLE `ClassRoom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `departmentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_classRoomId_fkey` FOREIGN KEY (`classRoomId`) REFERENCES `ClassRoom`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassRoom` ADD CONSTRAINT `ClassRoom_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
