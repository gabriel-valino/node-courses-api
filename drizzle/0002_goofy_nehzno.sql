CREATE TABLE "enrollments" (
	"id" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_id_courses_id_fk" FOREIGN KEY ("id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;