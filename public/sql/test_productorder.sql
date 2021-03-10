-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `productorder`
--

DROP TABLE IF EXISTS `productorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productorder` (
  `quality` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `orderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`productId`,`orderId`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `productorder_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `productorder_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `order` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productorder`
--

LOCK TABLES `productorder` WRITE;
/*!40000 ALTER TABLE `productorder` DISABLE KEYS */;
INSERT INTO `productorder` VALUES (10,'2021-03-10 09:07:46','2021-03-10 09:07:46','73c27a4b-9a5b-4a49-8d29-75fc0ac2cc3b','a4131abb-f1eb-42ea-9cdc-f8da48407697'),(10,'2021-03-10 09:07:47','2021-03-10 09:07:47','73c27a4b-9a5b-4a49-8d29-75fc0ac2cc3b','aa81b9e8-7a8c-49c5-840f-c76945c05b40'),(10,'2021-03-10 09:07:46','2021-03-10 09:07:46','9ac89d40-4a28-4c2a-b725-748d25af300b','a4131abb-f1eb-42ea-9cdc-f8da48407697'),(10,'2021-03-10 09:07:47','2021-03-10 09:07:47','9ac89d40-4a28-4c2a-b725-748d25af300b','aa81b9e8-7a8c-49c5-840f-c76945c05b40');
/*!40000 ALTER TABLE `productorder` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-10 17:47:07
