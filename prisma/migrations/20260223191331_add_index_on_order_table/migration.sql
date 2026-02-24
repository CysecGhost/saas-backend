-- DropIndex
DROP INDEX "Order_orgId_idx";

-- CreateIndex
CREATE INDEX "Order_orgId_status_createdAt_idx" ON "Order"("orgId", "status", "createdAt");
