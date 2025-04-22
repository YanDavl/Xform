-- CreateTable
CREATE TABLE "form_responses" (
    "id" TEXT NOT NULL,
    "form_id" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "form_responses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "form_responses" ADD CONSTRAINT "form_responses_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
