CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`organization` text NOT NULL,
	`interest` text NOT NULL,
	`message` text NOT NULL,
	`created_at` integer NOT NULL,
	`source_hash` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_inquiries_created` ON `inquiries` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_inquiries_source_created` ON `inquiries` (`source_hash`,`created_at`);