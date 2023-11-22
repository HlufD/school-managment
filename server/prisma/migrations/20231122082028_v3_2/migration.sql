-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_student_TypeId_fkey`;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_student_TypeId_fkey` FOREIGN KEY (`student_TypeId`) REFERENCES `Student_Type`(`type_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`dep_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
