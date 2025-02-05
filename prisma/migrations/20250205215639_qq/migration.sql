-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Visited" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "route_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "visited_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Visited_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Visited_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Visited" ("id", "route_id", "user_id", "visited_at") SELECT "id", "route_id", "user_id", "visited_at" FROM "Visited";
DROP TABLE "Visited";
ALTER TABLE "new_Visited" RENAME TO "Visited";
CREATE UNIQUE INDEX "Visited_route_id_key" ON "Visited"("route_id");
CREATE UNIQUE INDEX "Visited_user_id_key" ON "Visited"("user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
