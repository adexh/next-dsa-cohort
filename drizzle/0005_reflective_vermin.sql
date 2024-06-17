CREATE TABLE IF NOT EXISTS "dsacohort"."jsondata" (
	"id" serial PRIMARY KEY NOT NULL,
	"data_type" varchar(50),
	"data" json
);
--> statement-breakpoint
ALTER TABLE "dsacohort"."user" ALTER COLUMN "id" SET DATA TYPE serial;