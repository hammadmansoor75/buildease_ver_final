-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "assignedToTeam" TEXT,
    "assignedFrom" TIMESTAMP(3),
    "assignedTill" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);
