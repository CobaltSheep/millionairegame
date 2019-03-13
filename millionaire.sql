CREATE TABLE IF NOT EXISTS `players` (
 `id` int NOT NULL AUTO_INCREMENT,
 `user` text,
 `pass` text,
 `money` int,
 `house` text,
 `job` text,
 PRIMARY KEY (`id`)
);
