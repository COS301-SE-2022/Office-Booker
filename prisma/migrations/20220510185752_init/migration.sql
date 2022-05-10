-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desk" (
    "_id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Desk_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Facility" (
    "_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "deskId" INTEGER NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "Desk" ADD CONSTRAINT "Desk_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_deskId_fkey" FOREIGN KEY ("deskId") REFERENCES "Desk"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
