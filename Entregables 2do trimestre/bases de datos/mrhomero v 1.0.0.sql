-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mrhomero.cp84e8ay06n5.us-east-2.rds.amazonaws.com
-- Tiempo de generación: 30-08-2024 a las 01:47:37
-- Versión del servidor: 8.0.35
-- Versión de PHP: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mrhomero`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int NOT NULL,
  `cat_nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `cat_foto` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `cat_nom`, `cat_foto`) VALUES
(1, 'Hamburguesas', 'hamburguesa.jpg'),
(2, 'Choriperro', 'choriperro.jpg'),
(3, 'Salchipapa', 'salchipapa.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int NOT NULL,
  `pro_nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pro_desp` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pro_precio` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pro_foto` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pro_puntos` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `id_categoria` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `pro_nom`, `pro_desp`, `pro_precio`, `pro_foto`, `pro_puntos`, `id_categoria`) VALUES
(4, 'Hamburguesa sencilla', 'Hamburguesa de carne 65 grs, lechuga, cebolla, tomate, papa triturada y salsas de la casa.', '6000', 'hamburguesasencilla.jpg', '5', 1),
(5, 'Choriperro sencillo', 'Pan, chorizo de cerdo, queso, papas chip, cebolla y salsas de la casa.', '6900', 'choriperrosencillo.jpg', '10', 2),
(6, 'Salchipapa sencilla', 'Papa francesa 200 gr, salchicha zenu long, papas chip y salsas de la casa.', '6900', 'salchipapasencilla.jpg', '6', 3),
(7, 'Salchipapa especial', '12345', '5600', 'salchipapaespecial.jpg', '15', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recompensas`
--

CREATE TABLE `recompensas` (
  `id_recomp` int NOT NULL,
  `recompensa` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `recomp_num_puntos` int NOT NULL,
  `recomp_foto` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recompensas`
--

INSERT INTO `recompensas` (`id_recomp`, `recompensa`, `recomp_num_puntos`, `recomp_foto`) VALUES
(1, 'Llavero', 20, 'llavero.jpg'),
(2, 'Peluche', 30, 'peluche.jpg'),
(3, 'Sticker', 5, 'sticker.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recompensas_obt`
--

CREATE TABLE `recompensas_obt` (
  `id_recomp_obt` int NOT NULL,
  `id_recomp` int NOT NULL,
  `id_user` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int NOT NULL,
  `rol` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `rol`) VALUES
(1, 'Administrador'),
(2, 'Empleado'),
(3, 'Cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_user` int NOT NULL,
  `user_nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_apels` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_puntos` int NOT NULL,
  `user_foto` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_pass` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_reset_code` varchar(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_reset_code_expiration` datetime DEFAULT NULL,
  `id_rol` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_user`, `user_nom`, `user_apels`, `user_email`, `user_tel`, `user_puntos`, `user_foto`, `user_pass`, `user_reset_code`, `user_reset_code_expiration`, `id_rol`) VALUES
(1, 'Dilan Santiago', 'López Romero', 'dilanfantas@gmail.com', NULL, 0, NULL, '$2a$10$m0KXVb3vaFPSni77YzOBxeAdGw82ISHT830HPgIV379M.b4tvqMk6', NULL, NULL, 3),
(2, 'DILAN', 'LOPEZ', 'dilanfantas1101@gmail.com', NULL, 0, NULL, '$2a$10$T68OAPXrGVLEuLEuDP6ERONYJAVju8e.iuWJttpJfOtH.Ob3kqMmK', '663073', '2024-08-27 16:22:45', 3),
(3, 'Martin', 'Moya', 'misterlee272006@gmail.com', NULL, 0, NULL, '$2a$10$0Q7ZZdveYuPc0Xp.heyL1OZ/NtPetmVP.o970xFxVmhpVFZrz3ZkS', '920317', '2024-08-26 19:59:35', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int NOT NULL,
  `id_producto` int NOT NULL,
  `venta_fecha` datetime NOT NULL,
  `id_user` int NOT NULL,
  `venta_total` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `id_producto`, `venta_fecha`, `id_user`, `venta_total`) VALUES
(2, 6, '2024-07-03 04:23:12', 3, 6900),
(3, 5, '2024-07-12 05:31:13', 2, 6900),
(4, 5, '2024-07-17 00:00:00', 2, 6900);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `categoria` (`id_categoria`);

--
-- Indices de la tabla `recompensas`
--
ALTER TABLE `recompensas`
  ADD PRIMARY KEY (`id_recomp`);

--
-- Indices de la tabla `recompensas_obt`
--
ALTER TABLE `recompensas_obt`
  ADD PRIMARY KEY (`id_recomp_obt`),
  ADD KEY `recompensa` (`id_recomp`),
  ADD KEY `usuario_recompensa` (`id_user`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `rol` (`id_rol`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD KEY `producto` (`id_producto`),
  ADD KEY `usuario` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `recompensas`
--
ALTER TABLE `recompensas`
  MODIFY `id_recomp` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `recompensas_obt`
--
ALTER TABLE `recompensas_obt`
  MODIFY `id_recomp_obt` int NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `recompensas_obt`
--
ALTER TABLE `recompensas_obt`
  ADD CONSTRAINT `recompensa` FOREIGN KEY (`id_recomp`) REFERENCES `recompensas` (`id_recomp`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_recompensa` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
