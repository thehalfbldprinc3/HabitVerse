-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'MEMBER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupHabit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "frequency" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "reminderTime" TIMESTAMP(3),
    "icon" TEXT,
    "color" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupHabit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupHabitMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupHabitId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "GroupHabitMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupHabitId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "HabitLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_externalId_key" ON "User"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupHabitMember_userId_groupHabitId_key" ON "GroupHabitMember"("userId", "groupHabitId");

-- CreateIndex
CREATE UNIQUE INDEX "HabitLog_userId_groupHabitId_date_key" ON "HabitLog"("userId", "groupHabitId", "date");

-- AddForeignKey
ALTER TABLE "GroupHabitMember" ADD CONSTRAINT "GroupHabitMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupHabitMember" ADD CONSTRAINT "GroupHabitMember_groupHabitId_fkey" FOREIGN KEY ("groupHabitId") REFERENCES "GroupHabit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitLog" ADD CONSTRAINT "HabitLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitLog" ADD CONSTRAINT "HabitLog_groupHabitId_fkey" FOREIGN KEY ("groupHabitId") REFERENCES "GroupHabit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
