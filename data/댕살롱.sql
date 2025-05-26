CREATE TABLE `metadata_definitions` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `entity` varchar(100),
  `code` varchar(100),
  `value` varchar(255),
  `created_at` timestamp NOT NULL DEFAULT 'now()',
  `updated_at` timestamp
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(300) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `log_in_type` varchar(20) NOT NULL,
  `profile_image` varchar(2048),
  `is_owner` boolean DEFAULT 'false',
  `created_at` timestamp NOT NULL DEFAULT 'now()',
  `updated_at` timestamp
);

CREATE TABLE `stores` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `images` varchar(300) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `detail` varchar(300) NOT NULL,
  `like_counts` count DEFAULT 0,
  `user_id` integer,
  `created_at` timestamp DEFAULT 'now()'
);

CREATE TABLE `store_images` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `store_id` integer,
  `image_url` varchar(2048) NOT NULL COMMENT '이미지 경로',
  `image_name` varchar(255) NOT NULL COMMENT '서버에 저장된 파일 이름(고유 식별자 포함)',
  `image_original_name` varchar(255) NOT NULL COMMENT '원래 파일 이름',
  `image_size` integer NOT NULL DEFAULT 0 COMMENT '이미지 파일 크기',
  `image_type` varchar(10) NOT NULL COMMENT '이미지 파일 형식(jpg, png)',
  `created_at` timestamp DEFAULT 'now()'
);

CREATE TABLE `store_likes` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `sotre_id` integer,
  `user_id` integer,
  `created_at` timestamp DEFAULT 'now()'
);

CREATE TABLE `reservations` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `store_id` integer,
  `user_id` integer,
  `dog_type` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `created_at` timestamp DEFAULT 'now'
);

CREATE TABLE `reviews` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` integer,
  `store_id` integer,
  `like_counts` count DEFAULT 0,
  `content` varchar(200) NOT NULL,
  `created_at` timestamp DEFAULT 'now()',
  `updated_at` timestamp
);

CREATE TABLE `review_likes` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `review_id` integer,
  `user_id` integer,
  `created_at` timestamp DEFAULT 0
);

CREATE TABLE `review_images` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `review_id` integer,
  `image_url` varchar(2048) NOT NULL COMMENT '이미지 경로',
  `image_name` varchar(255) NOT NULL COMMENT '서버에 저장된 파일 이름(고유 식별자 포함)',
  `image_original_name` varchar(255) NOT NULL COMMENT '원래 파일 이름',
  `image_size` integer NOT NULL DEFAULT 0 COMMENT '이미지 파일 크기 (바이트 단위)',
  `image_type` varchar(10) NOT NULL COMMENT '이미지 파일 형식 (예: jpg, png 등)',
  `created_at` timestamp DEFAULT 'now()'
);

CREATE TABLE `comments` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `content` varchar(200) NOT NULL,
  `review_id` integer,
  `created_at` timestamp DEFAULT 'now()',
  `updated_at` timestamp
);

ALTER TABLE `reservations` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `reservations` ADD FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

ALTER TABLE `review_images` ADD FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

ALTER TABLE `store_images` ADD FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `stores` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `review_likes` ADD FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`);

ALTER TABLE `review_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `store_likes` ADD FOREIGN KEY (`sotre_id`) REFERENCES `stores` (`id`);

ALTER TABLE `store_likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
