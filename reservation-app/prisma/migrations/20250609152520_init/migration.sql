-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nameProam" TEXT,
    "room" TEXT NOT NULL,
    "startTime" TIMESTAMP(6) NOT NULL,
    "endTime" TIMESTAMP(6) NOT NULL,
    "timeStamp" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);
