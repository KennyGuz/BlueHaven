CREATE DATABASE  IF NOT EXISTS `proyectoisw6133` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `proyectoisw6133`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyectoisw613
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `barcos`
--

DROP TABLE IF EXISTS `barcos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barcos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Descripcion` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CapacidadHuespedes` int(11) NOT NULL,
  `Precio` float NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barcos`
--

LOCK TABLES `barcos` WRITE;
/*!40000 ALTER TABLE `barcos` DISABLE KEYS */;
INSERT INTO `barcos` VALUES (1,'Ocean Explorer','Un barco de lujo con todas las comodidades.',3000,1500000),(2,'Blue Horizon','Barco moderno con múltiples opciones de entretenimiento.',2500,1300000),(3,'Sunset Voyager','Ideal para viajes familiares y excursiones.',2000,1100000),(4,'Crystal Waves','Experiencia premium con restaurantes y spa a bordo.',2800,1400000),(5,'Pacific Dream','Un crucero diseñado para largas travesías.',3500,1600000);
/*!40000 ALTER TABLE `barcos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complementos`
--

DROP TABLE IF EXISTS `complementos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complementos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Descripcion` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Precio` float NOT NULL,
  `TipoAplicacion` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complementos`
--

LOCK TABLES `complementos` WRITE;
/*!40000 ALTER TABLE `complementos` DISABLE KEYS */;
/*!40000 ALTER TABLE `complementos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cruceros`
--

DROP TABLE IF EXISTS `cruceros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cruceros` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Foto` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Dias` int(11) NOT NULL,
  `IDBarco` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Nombre` (`Nombre`),
  KEY `IDBarco` (`IDBarco`),
  CONSTRAINT `cruceros_ibfk_1` FOREIGN KEY (`IDBarco`) REFERENCES `barcos` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cruceros`
--

LOCK TABLES `cruceros` WRITE;
/*!40000 ALTER TABLE `cruceros` DISABLE KEYS */;
INSERT INTO `cruceros` VALUES (1,'Caribe de Ensueño','imagen1.jpg',7,1),(2,'Aventura Mediterránea','imagen2.jpg',10,2),(3,'Expedición Ártica','imagen3.jpg',14,3),(4,'Tesoros del Pacífico','imagen4.jpg',12,4),(5,'Lujo en el Atlántico','imagen5.jpg',8,5);
/*!40000 ALTER TABLE `cruceros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinos`
--

DROP TABLE IF EXISTS `destinos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Descripcion` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinos`
--

LOCK TABLES `destinos` WRITE;
/*!40000 ALTER TABLE `destinos` DISABLE KEYS */;
INSERT INTO `destinos` VALUES (1,'Destino Miami','Ciudad costera en Florida, EE.UU., conocida por sus playas y vida nocturna.'),(2,'Destino Cozumel','Isla del Caribe Mexicano famosa por su arrecife de coral y buceo.'),(3,'Destino Nassau','Capital de las Bahamas, con playas paradisíacas y turismo de lujo.'),(4,'Destino Barcelona','Ciudad española con una rica historia, arquitectura y gastronomía mediterránea.'),(5,'Destino Marsella','Ciudad portuaria en Francia con una mezcla de culturas y un puerto histórico.');
/*!40000 ALTER TABLE `destinos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallereservas`
--

DROP TABLE IF EXISTS `detallereservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallereservas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDReserva` int(11) NOT NULL,
  `IDHabitacion` int(11) NOT NULL,
  `CantidadHabitaciones` int(11) NOT NULL,
  `CantidadHuespedes` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDReserva` (`IDReserva`),
  KEY `IDHabitacion` (`IDHabitacion`),
  CONSTRAINT `detallereservas_ibfk_1` FOREIGN KEY (`IDReserva`) REFERENCES `reservas` (`ID`),
  CONSTRAINT `detallereservas_ibfk_2` FOREIGN KEY (`IDHabitacion`) REFERENCES `habitaciones` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallereservas`
--

LOCK TABLES `detallereservas` WRITE;
/*!40000 ALTER TABLE `detallereservas` DISABLE KEYS */;
/*!40000 ALTER TABLE `detallereservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fechascrucero`
--

DROP TABLE IF EXISTS `fechascrucero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fechascrucero` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDCrucero` int(11) NOT NULL,
  `FechaInicio` datetime NOT NULL,
  `FechaFin` datetime NOT NULL,
  `FechaLimitePago` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDCrucero` (`IDCrucero`),
  CONSTRAINT `fechascrucero_ibfk_1` FOREIGN KEY (`IDCrucero`) REFERENCES `cruceros` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fechascrucero`
--

LOCK TABLES `fechascrucero` WRITE;
/*!40000 ALTER TABLE `fechascrucero` DISABLE KEYS */;
INSERT INTO `fechascrucero` VALUES (1,1,'2025-06-10 00:00:00','2025-06-17 00:00:00','2025-05-01 00:00:00'),(2,2,'2025-07-05 00:00:00','2025-07-15 00:00:00','2025-06-01 00:00:00'),(3,3,'2025-08-20 00:00:00','2025-09-03 00:00:00','2025-07-15 00:00:00'),(4,4,'2025-09-10 00:00:00','2025-09-22 00:00:00','2025-08-05 00:00:00'),(5,5,'2025-10-01 00:00:00','2025-10-10 00:00:00','2025-09-01 00:00:00'),(6,1,'2025-06-10 00:00:00','0000-00-00 00:00:00','2025-05-01 00:00:00'),(7,1,'2025-07-15 00:00:00','0000-00-00 00:00:00','2025-06-10 00:00:00'),(8,1,'2025-08-20 00:00:00','0000-00-00 00:00:00','2025-07-15 00:00:00'),(9,2,'2025-09-05 00:00:00','0000-00-00 00:00:00','2025-08-01 00:00:00'),(10,2,'2025-10-12 00:00:00','0000-00-00 00:00:00','2025-09-10 00:00:00');
/*!40000 ALTER TABLE `fechascrucero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fechasprecios`
--

DROP TABLE IF EXISTS `fechasprecios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fechasprecios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDCrucero` int(11) NOT NULL,
  `FechaInicio` datetime NOT NULL,
  `FechaLimitePago` datetime NOT NULL,
  `IDHabitacion` int(11) NOT NULL,
  `PrecioPorPersona` float NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDCrucero` (`IDCrucero`),
  KEY `IDHabitacion` (`IDHabitacion`),
  CONSTRAINT `fechasprecios_ibfk_1` FOREIGN KEY (`IDCrucero`) REFERENCES `cruceros` (`ID`),
  CONSTRAINT `fechasprecios_ibfk_2` FOREIGN KEY (`IDHabitacion`) REFERENCES `habitaciones` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fechasprecios`
--

LOCK TABLES `fechasprecios` WRITE;
/*!40000 ALTER TABLE `fechasprecios` DISABLE KEYS */;
INSERT INTO `fechasprecios` VALUES (1,1,'2025-11-05 00:00:00','2025-10-20 23:59:59',2,520),(2,1,'2025-12-15 00:00:00','2025-11-30 23:59:59',3,530),(3,1,'2026-01-20 00:00:00','2026-01-05 23:59:59',4,540),(4,1,'2026-02-10 00:00:00','2026-01-25 23:59:59',5,550),(5,1,'2026-03-05 00:00:00','2026-02-20 23:59:59',5,560),(6,2,'2025-11-10 00:00:00','2025-10-25 23:59:59',1,620),(7,2,'2025-12-20 00:00:00','2025-12-05 23:59:59',2,630),(8,2,'2026-01-25 00:00:00','2026-01-10 23:59:59',3,640),(9,2,'2026-02-15 00:00:00','2026-02-01 23:59:59',4,650),(10,2,'2026-03-10 00:00:00','2026-02-25 23:59:59',5,660),(11,3,'2025-11-15 00:00:00','2025-11-01 23:59:59',2,720),(12,3,'2025-12-25 00:00:00','2025-12-10 23:59:59',3,730),(13,3,'2026-01-30 00:00:00','2026-01-15 23:59:59',4,740),(14,3,'2026-02-20 00:00:00','2026-02-05 23:59:59',5,750),(15,3,'2026-03-15 00:00:00','2026-03-01 23:59:59',5,760),(16,4,'2025-11-20 00:00:00','2025-11-05 23:59:59',1,550),(17,4,'2025-12-30 00:00:00','2025-12-15 23:59:59',2,570),(18,4,'2026-02-05 00:00:00','2026-01-20 23:59:59',3,590),(19,4,'2026-03-01 00:00:00','2026-02-15 23:59:59',4,610),(20,4,'2026-04-10 00:00:00','2026-03-25 23:59:59',5,630),(21,5,'2025-11-25 00:00:00','2025-11-10 23:59:59',2,670),(22,5,'2025-12-05 00:00:00','2025-11-20 23:59:59',3,680),(23,5,'2026-01-10 00:00:00','2025-12-25 23:59:59',4,690),(24,5,'2026-02-01 00:00:00','2026-01-15 23:59:59',5,700),(25,5,'2026-03-20 00:00:00','2026-03-05 23:59:59',5,710);
/*!40000 ALTER TABLE `fechasprecios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fechasprecioshabitaciones`
--

DROP TABLE IF EXISTS `fechasprecioshabitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fechasprecioshabitaciones` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDFechaCrucero` int(11) NOT NULL,
  `IDHabitacion` int(11) NOT NULL,
  `PrecioPorPersona` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDFechaCrucero` (`IDFechaCrucero`),
  KEY `IDHabitacion` (`IDHabitacion`),
  CONSTRAINT `fechasprecioshabitaciones_ibfk_1` FOREIGN KEY (`IDFechaCrucero`) REFERENCES `fechascrucero` (`ID`),
  CONSTRAINT `fechasprecioshabitaciones_ibfk_2` FOREIGN KEY (`IDHabitacion`) REFERENCES `habitaciones` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fechasprecioshabitaciones`
--

LOCK TABLES `fechasprecioshabitaciones` WRITE;
/*!40000 ALTER TABLE `fechasprecioshabitaciones` DISABLE KEYS */;
INSERT INTO `fechasprecioshabitaciones` VALUES (13,1,1,1500.00),(14,1,2,800.00),(15,1,3,1100.00),(16,2,1,1600.00),(17,2,2,850.00),(18,2,3,1150.00),(19,3,1,1550.00),(20,3,2,820.00),(21,3,3,1120.00);
/*!40000 ALTER TABLE `fechasprecioshabitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitaciones`
--

DROP TABLE IF EXISTS `habitaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitaciones` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Descripcion` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MinHuespedes` int(11) NOT NULL,
  `MaxHuespedes` int(11) NOT NULL,
  `Tamano` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Nombre` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitaciones`
--

LOCK TABLES `habitaciones` WRITE;
/*!40000 ALTER TABLE `habitaciones` DISABLE KEYS */;
INSERT INTO `habitaciones` VALUES (1,'Suite Presidencial','Habitación de lujo con balcón y vista al mar.',1,4,'50m²'),(2,'Cabina Familiar','Espacio amplio ideal para familias.',2,6,'40m²'),(3,'Cabina Individual','Perfecta para un solo viajero.',1,1,'20m²'),(4,'Cabina Doble','Comodidad para parejas con todas las amenidades.',1,2,'30m²'),(5,'Cabina Económica','Opción asequible con espacio compacto.',1,2,'15m²');
/*!40000 ALTER TABLE `habitaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitacionesbarco`
--

DROP TABLE IF EXISTS `habitacionesbarco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitacionesbarco` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDBarco` int(11) NOT NULL,
  `IDHabitacion` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDBarco` (`IDBarco`),
  KEY `IDHabitacion` (`IDHabitacion`),
  CONSTRAINT `habitacionesbarco_ibfk_1` FOREIGN KEY (`IDBarco`) REFERENCES `barcos` (`ID`),
  CONSTRAINT `habitacionesbarco_ibfk_2` FOREIGN KEY (`IDHabitacion`) REFERENCES `habitaciones` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitacionesbarco`
--

LOCK TABLES `habitacionesbarco` WRITE;
/*!40000 ALTER TABLE `habitacionesbarco` DISABLE KEYS */;
INSERT INTO `habitacionesbarco` VALUES (1,1,1,10),(2,1,2,15),(3,2,3,20),(4,3,4,25),(5,4,5,30);
/*!40000 ALTER TABLE `habitacionesbarco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `huespedes`
--

DROP TABLE IF EXISTS `huespedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `huespedes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDReserva` int(11) NOT NULL,
  `Nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Apellido` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Edad` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDReserva` (`IDReserva`),
  CONSTRAINT `huespedes_ibfk_1` FOREIGN KEY (`IDReserva`) REFERENCES `reservas` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `huespedes`
--

LOCK TABLES `huespedes` WRITE;
/*!40000 ALTER TABLE `huespedes` DISABLE KEYS */;
/*!40000 ALTER TABLE `huespedes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itinerario`
--

DROP TABLE IF EXISTS `itinerario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itinerario` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDCrucero` int(11) NOT NULL,
  `IDPuerto` int(11) NOT NULL,
  `Descripcion` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDCrucero` (`IDCrucero`),
  KEY `IDPuerto` (`IDPuerto`),
  CONSTRAINT `itinerario_ibfk_1` FOREIGN KEY (`IDCrucero`) REFERENCES `cruceros` (`ID`),
  CONSTRAINT `itinerario_ibfk_2` FOREIGN KEY (`IDPuerto`) REFERENCES `puertos` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itinerario`
--

LOCK TABLES `itinerario` WRITE;
/*!40000 ALTER TABLE `itinerario` DISABLE KEYS */;
INSERT INTO `itinerario` VALUES (1,1,6,'Salida programada a las 15:00 horas'),(2,1,7,'Llegada a las 08:00 horas, salida a las 18:00 horas'),(3,1,8,'Llegada a las 09:00 horas, salida a las 17:00 horas'),(4,2,9,'Salida programada a las 16:00 horas'),(5,2,10,'Llegada a las 10:00 horas, salida a las 20:00 horas'),(6,3,6,'Salida programada a las 15:00 horas'),(7,3,8,'Llegada a las 09:00 horas, salida a las 17:00 horas'),(8,4,6,'Salida programada a las 15:00 horas'),(9,4,10,'Llegada a las 09:00 horas, salida a las 17:00 horas'),(10,5,7,'Salida programada a las 15:00 horas'),(11,5,8,'Llegada a las 09:00 horas, salida a las 17:00 horas');
/*!40000 ALTER TABLE `itinerario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificaciones` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuario` int(11) NOT NULL,
  `Mensaje` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Fecha` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `IDUsuario` (`IDUsuario`),
  CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuarios` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificaciones`
--

LOCK TABLES `notificaciones` WRITE;
/*!40000 ALTER TABLE `notificaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDReserva` int(11) NOT NULL,
  `Monto` float NOT NULL,
  `TipoPago` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `FechaPago` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`ID`),
  KEY `IDReserva` (`IDReserva`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`IDReserva`) REFERENCES `reservas` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puertos`
--

DROP TABLE IF EXISTS `puertos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puertos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Pais` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `IDDestino` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDDestino` (`IDDestino`),
  CONSTRAINT `puertos_ibfk_1` FOREIGN KEY (`IDDestino`) REFERENCES `destinos` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puertos`
--

LOCK TABLES `puertos` WRITE;
/*!40000 ALTER TABLE `puertos` DISABLE KEYS */;
INSERT INTO `puertos` VALUES (6,'Puerto de Miami','Estados Unidos',1),(7,'Puerto de Cozumel','México',2),(8,'Puerto de Nassau','Bahamas',3),(9,'Puerto de Barcelona','España',4),(10,'Puerto de Marsella','Francia',5);
/*!40000 ALTER TABLE `puertos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuario` int(11) NOT NULL,
  `IDCrucero` int(11) NOT NULL,
  `IDFechaCrucero` int(11) NOT NULL,
  `FechaReserva` datetime DEFAULT current_timestamp(),
  `CantidadTotalHabitaciones` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDUsuario` (`IDUsuario`),
  KEY `IDCrucero` (`IDCrucero`),
  KEY `IDFechaCrucero` (`IDFechaCrucero`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`IDUsuario`) REFERENCES `usuarios` (`ID`),
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`IDCrucero`) REFERENCES `cruceros` (`ID`),
  CONSTRAINT `reservas_ibfk_3` FOREIGN KEY (`IDFechaCrucero`) REFERENCES `fechascrucero` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (6,1,1,1,'2025-03-03 21:04:43',2),(7,1,1,1,'2025-03-03 21:06:53',2),(8,2,2,2,'2025-03-03 21:06:53',3),(9,3,3,3,'2025-03-03 21:06:53',1),(10,4,4,4,'2025-03-03 21:06:53',4),(11,5,5,5,'2025-03-03 21:06:53',2);
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservascomplementos`
--

DROP TABLE IF EXISTS `reservascomplementos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservascomplementos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDReserva` int(11) NOT NULL,
  `IDComplemento` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDReserva` (`IDReserva`),
  KEY `IDComplemento` (`IDComplemento`),
  CONSTRAINT `reservascomplementos_ibfk_1` FOREIGN KEY (`IDReserva`) REFERENCES `reservas` (`ID`),
  CONSTRAINT `reservascomplementos_ibfk_2` FOREIGN KEY (`IDComplemento`) REFERENCES `complementos` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservascomplementos`
--

LOCK TABLES `reservascomplementos` WRITE;
/*!40000 ALTER TABLE `reservascomplementos` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservascomplementos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Telefono` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `CorreoElectronico` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `FechaNacimiento` datetime NOT NULL,
  `Pais` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Contrasena` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Rol` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `CorreoElectronico` (`CorreoElectronico`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juan Pérez','123456789','juan.perez@email.com','1985-06-15 00:00:00','Costa Rica','contraseña123','Cliente'),(2,'María Gómez','987654321','maria.gomez@email.com','1990-09-21 00:00:00','México','segura456','Cliente'),(3,'Carlos Ramírez','456123789','carlos.ramirez@email.com','1982-12-05 00:00:00','España','clave789','Cliente'),(4,'Ana Torres','321654987','ana.torres@email.com','1995-03-10 00:00:00','Argentina','pass1234','Cliente'),(5,'Luis Fernández','789321456','luis.fernandez@email.com','1988-07-25 00:00:00','Chile','password567','Cliente');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'proyectoisw613'
--

--
-- Dumping routines for database 'proyectoisw613'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-10 21:04:56
