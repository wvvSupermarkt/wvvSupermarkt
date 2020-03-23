-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: dbo
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `article_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `hash` int(11) NOT NULL,
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (12,'Taschentücher',2134),(32,'Klopapier',2132);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device` (
  `device_id` varchar(45) NOT NULL,
  `type_id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `quality` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`device_id`),
  KEY `fkIdx_49` (`type_id`),
  CONSTRAINT `FK_49` FOREIGN KEY (`type_id`) REFERENCES `deviceTypes` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES ('12',1,34,95,'2020-03-22 00:07:05'),('13',2,55,75,'2020-03-22 00:08:23');
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deviceTypes`
--

DROP TABLE IF EXISTS `deviceTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deviceTypes` (
  `type_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deviceTypes`
--

LOCK TABLES `deviceTypes` WRITE;
/*!40000 ALTER TABLE `deviceTypes` DISABLE KEYS */;
INSERT INTO `deviceTypes` VALUES (1,'user'),(2,'counter');
/*!40000 ALTER TABLE `deviceTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supermarket`
--

DROP TABLE IF EXISTS `supermarket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supermarket` (
  `place_id` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `formatted_address` varchar(45) NOT NULL,
  `occupancy` int(11) NOT NULL,
  PRIMARY KEY (`place_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supermarket`
--

LOCK TABLES `supermarket` WRITE;
/*!40000 ALTER TABLE `supermarket` DISABLE KEYS */;
INSERT INTO `supermarket` VALUES ('ChIJ1dKDoZtPqEcRM1AThFC0IPk-wk88Z89zM8','Netto','Hermannstraße 158A, 12051 Berlin, Germany',0),('ChIJO1QHaqRPqEcRJ1r5ccupsgg','Lidl','Glasower Str. 42, 12051 Berlin, Germany',2);
/*!40000 ALTER TABLE `supermarket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supermarket_article`
--

DROP TABLE IF EXISTS `supermarket_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supermarket_article` (
  `article_id` int(11) NOT NULL,
  `sa_id` int(11) NOT NULL,
  `place_id` varchar(45) NOT NULL,
  `availability` enum('0','1') NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`sa_id`),
  KEY `fkIdx_25` (`article_id`),
  KEY `fkIdx_28` (`place_id`),
  CONSTRAINT `FK_25` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`),
  CONSTRAINT `FK_28` FOREIGN KEY (`place_id`) REFERENCES `supermarket` (`place_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supermarket_article`
--

LOCK TABLES `supermarket_article` WRITE;
/*!40000 ALTER TABLE `supermarket_article` DISABLE KEYS */;
INSERT INTO `supermarket_article` VALUES (32,0,'ChIJO1QHaqRPqEcRJ1r5ccupsgg','0','2020-03-22 00:23:01'),(12,1,'ChIJO1QHaqRPqEcRJ1r5ccupsgg','0','2020-03-22 00:23:28'),(12,2,'ChIJ1dKDoZtPqEcRM1AThFC0IPk-wk88Z89zM8','0','2020-03-22 00:23:01');
/*!40000 ALTER TABLE `supermarket_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supermarket_device`
--

DROP TABLE IF EXISTS `supermarket_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supermarket_device` (
  `place_id` varchar(45) NOT NULL,
  `sd_id` int(11) NOT NULL,
  `device_id` varchar(45) NOT NULL,
  PRIMARY KEY (`sd_id`),
  KEY `fkIdx_37` (`device_id`),
  KEY `fkIdx_39` (`place_id`),
  CONSTRAINT `FK_36` FOREIGN KEY (`device_id`) REFERENCES `device` (`device_id`),
  CONSTRAINT `FK_39` FOREIGN KEY (`place_id`) REFERENCES `supermarket` (`place_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supermarket_device`
--

LOCK TABLES `supermarket_device` WRITE;
/*!40000 ALTER TABLE `supermarket_device` DISABLE KEYS */;
INSERT INTO `supermarket_device` VALUES ('ChIJO1QHaqRPqEcRJ1r5ccupsgg',0,'13'),('ChIJ1dKDoZtPqEcRM1AThFC0IPk-wk88Z89zM8',1,'12');
/*!40000 ALTER TABLE `supermarket_device` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-22 16:54:57
