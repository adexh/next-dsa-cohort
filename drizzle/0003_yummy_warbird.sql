DROP TABLE "dsacohort"."account";--> statement-breakpoint
DROP TABLE "dsacohort"."authenticator";--> statement-breakpoint
DROP TABLE "dsacohort"."session";--> statement-breakpoint
DROP TABLE "dsacohort"."verificationToken";--> statement-breakpoint
ALTER TABLE "dsacohort"."user" RENAME COLUMN "emailVerified" TO "contact";--> statement-breakpoint
ALTER TABLE "dsacohort"."user" ALTER COLUMN "contact" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "dsacohort"."user" ALTER COLUMN "pass" SET NOT NULL;