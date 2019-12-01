-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2019 at 10:59 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `newspaper_project_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `article_id` int(11) NOT NULL,
  `newspaper_id` int(11) NOT NULL,
  `title_text` text NOT NULL,
  `title_font` text NOT NULL,
  `title_font_size` text NOT NULL,
  `title_alignment` text NOT NULL,
  `body_text` text NOT NULL,
  `body_font` text NOT NULL,
  `body_font_size` text NOT NULL,
  `body_alignment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Truncate table before insert `articles`
--

TRUNCATE TABLE `articles`;
--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`article_id`, `newspaper_id`, `title_text`, `title_font`, `title_font_size`, `title_alignment`, `body_text`, `body_font`, `body_font_size`, `body_alignment`) VALUES
(1, 2, 'article title', 'Title_font', '14', 'Center', 'This is the body.', 'Body_font', '14', 'Center'),
(2, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(3, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(4, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(5, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(6, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(7, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(8, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(9, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(10, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(11, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(12, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(13, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(14, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(15, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(16, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(17, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(18, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(19, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(20, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(21, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(22, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(23, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(24, 0, 'undefined', 'undefined', '0', 'undefined', 'undefined', 'undefined', '0', 'undefined'),
(25, 0, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined'),
(26, 0, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined'),
(27, 0, 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined'),
(28, 0, 'Title', 'Times', '36px', 'center', 'Body', 'Times', '36px', 'center'),
(29, 0, 'Title', 'Times', '36px', 'center', 'Body', 'Times', '36px', 'center');

-- --------------------------------------------------------

--
-- Table structure for table `newspapers`
--

CREATE TABLE `newspapers` (
  `newspaper_id` int(11) NOT NULL,
  `newspaper_password` text NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Truncate table before insert `newspapers`
--

TRUNCATE TABLE `newspapers`;
--
-- Dumping data for table `newspapers`
--

INSERT INTO `newspapers` (`newspaper_id`, `newspaper_password`, `admin_id`) VALUES
(1, 'S', 1),
(2, 'aaa', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `newspaper_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Truncate table before insert `users`
--

TRUNCATE TABLE `users`;
--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `is_admin`, `newspaper_id`) VALUES
(1, 'S', 'S', 1, 1),
(2, 'supergoa', 'pass123', 0, 1),
(3, 'aaa', 'aaa', 1, 2),
(4, 'newuser', 'newpass', 1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`article_id`);

--
-- Indexes for table `newspapers`
--
ALTER TABLE `newspapers`
  ADD PRIMARY KEY (`newspaper_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `newspapers`
--
ALTER TABLE `newspapers`
  MODIFY `newspaper_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
