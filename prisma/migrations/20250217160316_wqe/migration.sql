/*
  Warnings:

  - You are about to drop the column `private` on the `Route` table. All the data in the column will be lost.
  - Added the required column `is_private` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Route" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creater_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "is_private" BOOLEAN NOT NULL,
    "approved" BOOLEAN,
    "city_id" INTEGER NOT NULL,
    CONSTRAINT "Route_creater_id_fkey" FOREIGN KEY ("creater_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Route_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Route" ("approved", "city_id", "created_at", "creater_id", "description", "id", "name", "updated_at") SELECT "approved", "city_id", "created_at", "creater_id", "description", "id", "name", "updated_at" FROM "Route";
DROP TABLE "Route";
ALTER TABLE "new_Route" RENAME TO "Route";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
