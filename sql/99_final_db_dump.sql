-- Create user table
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) UNIQUE NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL
);

-- Create home table
CREATE TABLE IF NOT EXISTS `home` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `street_address` VARCHAR(255) UNIQUE NOT NULL,
    `state` varchar(50) DEFAULT NULL,
    `zip` varchar(10) DEFAULT NULL,
    `sqft` float DEFAULT NULL,
    `beds` int DEFAULT NULL,
    `baths` int DEFAULT NULL,
    `list_price` float DEFAULT NULL
    -- Add other home-specific attributes here
);

-- Create user_home table for many-to-many relationship
CREATE TABLE IF NOT EXISTS `home_user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `home_id` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`home_id`) REFERENCES `home`(`id`) ON DELETE CASCADE
);


-- Optional: Insert some sample data if needed
