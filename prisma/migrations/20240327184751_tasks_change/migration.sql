-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "projectMember" TEXT,
ADD COLUMN     "status" TEXT,
ALTER COLUMN "teamId" DROP NOT NULL;
