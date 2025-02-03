-- CreateTable
CREATE TABLE "UserAdmin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "UserAdmin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Route" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creater_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "descripsion" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "private" BOOLEAN NOT NULL,
    "approved" BOOLEAN NOT NULL,
    CONSTRAINT "Route_creater_id_fkey" FOREIGN KEY ("creater_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RoultePlace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT,
    "routed_id" INTEGER NOT NULL,
    "lat" REAL NOT NULL,
    "lot" REAL NOT NULL,
    CONSTRAINT "RoultePlace_routed_id_fkey" FOREIGN KEY ("routed_id") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RoutePlaceImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image_id" INTEGER NOT NULL,
    "route_place_id" INTEGER NOT NULL,
    CONSTRAINT "RoutePlaceImage_route_place_id_fkey" FOREIGN KEY ("route_place_id") REFERENCES "RoultePlace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RoutePlaceImage_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alt" TEXT,
    "src" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RouteImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "route_id" INTEGER NOT NULL,
    "image_id" INTEGER NOT NULL,
    CONSTRAINT "RouteImage_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RouteImage_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAdmin_user_id_key" ON "UserAdmin"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "RoutePlaceImage_image_id_key" ON "RoutePlaceImage"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "RouteImage_image_id_key" ON "RouteImage"("image_id");
