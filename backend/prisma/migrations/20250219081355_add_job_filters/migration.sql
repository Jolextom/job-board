-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "category" TEXT,
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'open',
ADD COLUMN     "type" TEXT;
