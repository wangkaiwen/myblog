/*
SQLyog Enterprise v12.09 (64 bit)
MySQL - 5.7.17 : Database - bolg
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `text` */

DROP TABLE IF EXISTS `text`;

CREATE TABLE `text` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `ctime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

/*Data for the table `text` */

insert  into `text`(`id`,`user`,`text`,`ctime`) values (8,'123','21312','2016-12-29 19:00:37'),(9,'1111','EQEQWE','2016-12-29 19:01:17'),(10,'myron','1','2016-12-30 14:51:28'),(11,'myron','啊打完','2016-12-30 14:51:44'),(12,'myron','玩玩','2016-12-30 14:52:12'),(13,'myron','我','2016-12-30 14:53:39'),(14,'myron','321312','2016-12-30 15:01:50'),(15,'myron','11','2016-12-30 15:06:23'),(16,'myron','11','2016-12-30 15:08:42'),(17,'myron','2222','2016-12-30 15:08:54'),(18,'myron','111','2016-12-30 17:46:11'),(19,'myron','dawdawdaw','2016-12-30 17:46:24'),(20,'myron','22222222222','2016-12-30 17:49:36'),(21,'myron','1111','2016-12-30 18:24:10'),(22,'myron','aaaaaaa','2016-12-30 18:24:23'),(23,'myron','a','2016-12-30 18:25:34'),(24,'myron','a','2016-12-30 18:25:42'),(25,'myron','z','2016-12-30 18:25:53'),(26,'myron','a','2016-12-30 18:25:59'),(27,'myron','aa','2016-12-30 18:30:51'),(28,'myron','大洼大洼大\n风飞沙','2016-12-31 09:33:31'),(29,'myron','是我大洼大洼大洼大洼大如果是如果代人受过','2016-12-31 14:39:32'),(30,'myron','3123213213213','2016-12-31 14:42:52'),(31,'myron','大洼大武当哇','2016-12-31 14:44:15'),(32,'myron','两个人的顾客让大家感到快乐人','2016-12-31 14:47:32'),(33,'myron','31231231','2016-12-31 16:42:29'),(34,'myron','我是脉轮','2016-12-31 16:46:33'),(35,'myron','不,我是麦伦','2016-12-31 16:47:45'),(36,'myron','最后我是徐山奇','2016-12-31 16:48:26'),(37,'myron','3123213213143243242','2016-12-31 16:52:10'),(38,'myron','低洼地垃圾啊洛克菲勒看见了可根据俄老公','2016-12-31 17:59:07'),(39,'myron','额企鹅委屈额为我去额我去','2016-12-31 18:00:53'),(40,'myron','423额温柔个地方规范的规定','2016-12-31 18:02:38'),(41,'myron','大娃娃的哇','2016-12-31 18:03:22'),(42,'myron','dwadwadwddawdaw','2016-12-31 18:22:07'),(43,'myron','455345644646','2017-01-03 09:47:23'),(44,'aaaa','大洼大洼大洼大洼','2017-02-06 14:43:13');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`password`) values (1,'myron','4QrcOUm6Wau+VuBX8g+IPg=='),(2,'kevin','ICy5YqxZB1uWSwcVLSNLcA=='),(3,'aaa','aY1RoZ2KEhzlgUmde3AWaA=='),(4,'222','aY1RoZ2KEhzlgUmde3AWaA=='),(5,'321','aY1RoZ2KEhzlgUmde3AWaA=='),(6,'12312','aY1RoZ2KEhzlgUmde3AWaA=='),(7,'111','aY1RoZ2KEhzlgUmde3AWaA=='),(8,'333','MQ3Lv0zOYvdioqqhSNVWvQ=='),(9,'123','ICy5YqxZB1uWSwcVLSNLcA=='),(10,'1111','tZxnvxlqR1gZHkL3ZnDOug=='),(11,'aaaa','QSS8CpM1wn8IbyS6IHpJEg==');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
