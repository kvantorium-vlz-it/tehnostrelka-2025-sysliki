-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "route_id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Coments_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Coments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Coments" ("created_at", "id", "route_id", "text", "user_id") SELECT "created_at", "id", "route_id", "text", "user_id" FROM "Coments";
DROP TABLE "Coments";
ALTER TABLE "new_Coments" RENAME TO "Coments";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
