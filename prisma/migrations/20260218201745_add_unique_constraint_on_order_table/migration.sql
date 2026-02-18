/*
  Warnings:

  - A unique constraint covering the columns `[id,orgId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_id_orgId_key" ON "Order"("id", "orgId");
