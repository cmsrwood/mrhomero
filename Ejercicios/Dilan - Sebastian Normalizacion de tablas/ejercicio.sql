-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-05-2024 a las 00:18:46
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ejercicio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `Cod_Cliente` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_empleado`
--

CREATE TABLE `cliente_empleado` (
  `ID` int(11) NOT NULL,
  `Cod_Empleado` int(11) NOT NULL,
  `Cod_Cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_factura`
--

CREATE TABLE `detalle_factura` (
  `Cod_Detalle` int(11) NOT NULL,
  `Cod_Factura` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Valor` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dtl_factura_producto`
--

CREATE TABLE `dtl_factura_producto` (
  `ID` int(11) NOT NULL,
  `Cod_Detalle` int(11) NOT NULL,
  `Cod_Producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `Cod_Empleado` int(11) NOT NULL,
  `Salario` decimal(65,0) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_grupo`
--

CREATE TABLE `empleado_grupo` (
  `ID` int(11) NOT NULL,
  `Cod_Empleado` int(11) NOT NULL,
  `Cod_Grupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `Cod_Factura` int(11) NOT NULL,
  `Tipo` varchar(255) NOT NULL,
  `Fecha` datetime NOT NULL,
  `Valor` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_cliente`
--

CREATE TABLE `factura_cliente` (
  `ID` int(11) NOT NULL,
  `Cod_Factura` int(11) NOT NULL,
  `Cod_Cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `Cod_Grupo` int(11) NOT NULL,
  `Descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `material`
--

CREATE TABLE `material` (
  `Cod_Material` int(11) NOT NULL,
  `Tipo_Material` varchar(255) NOT NULL,
  `Descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `Cod_Referencia` int(11) NOT NULL,
  `Marca` varchar(255) NOT NULL,
  `Descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_material`
--

CREATE TABLE `producto_material` (
  `ID` int(11) NOT NULL,
  `Cod_Referencia` int(11) NOT NULL,
  `Cod_Material` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `Cod_Proveedor` int(11) NOT NULL,
  `Razon_social` varchar(255) NOT NULL,
  `Direccion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor_producto`
--

CREATE TABLE `proveedor_producto` (
  `ID` int(11) NOT NULL,
  `Cod_Proveedor` int(11) NOT NULL,
  `Cod_Producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`Cod_Cliente`);

--
-- Indices de la tabla `cliente_empleado`
--
ALTER TABLE `cliente_empleado`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Codigo empleado - cliente_empleado` (`Cod_Empleado`),
  ADD KEY `Codigo Cliente - cliente_empleado` (`Cod_Cliente`);

--
-- Indices de la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  ADD PRIMARY KEY (`Cod_Detalle`),
  ADD KEY `Codigo factura` (`Cod_Factura`);

--
-- Indices de la tabla `dtl_factura_producto`
--
ALTER TABLE `dtl_factura_producto`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Codigo detalle` (`Cod_Detalle`),
  ADD KEY `Codigo producto` (`Cod_Producto`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`Cod_Empleado`);

--
-- Indices de la tabla `empleado_grupo`
--
ALTER TABLE `empleado_grupo`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Codigo empleado - empleado_grupo` (`Cod_Empleado`),
  ADD KEY `Codgo grupo - empleado_grupo` (`Cod_Grupo`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`Cod_Factura`);

--
-- Indices de la tabla `factura_cliente`
--
ALTER TABLE `factura_cliente`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Codigo Factura - factura_cliente` (`Cod_Factura`),
  ADD KEY `Codigo Cliente - factura_cliente` (`Cod_Cliente`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`Cod_Grupo`);

--
-- Indices de la tabla `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`Cod_Material`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`Cod_Referencia`);

--
-- Indices de la tabla `producto_material`
--
ALTER TABLE `producto_material`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`Cod_Proveedor`);

--
-- Indices de la tabla `proveedor_producto`
--
ALTER TABLE `proveedor_producto`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Codigo proveedor` (`Cod_Proveedor`),
  ADD KEY `Codigo producto - proveedor` (`Cod_Producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `Cod_Cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cliente_empleado`
--
ALTER TABLE `cliente_empleado`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  MODIFY `Cod_Detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `dtl_factura_producto`
--
ALTER TABLE `dtl_factura_producto`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `Cod_Empleado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleado_grupo`
--
ALTER TABLE `empleado_grupo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `Cod_Factura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `factura_cliente`
--
ALTER TABLE `factura_cliente`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `Cod_Grupo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `material`
--
ALTER TABLE `material`
  MODIFY `Cod_Material` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `Cod_Referencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto_material`
--
ALTER TABLE `producto_material`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `Cod_Proveedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedor_producto`
--
ALTER TABLE `proveedor_producto`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente_empleado`
--
ALTER TABLE `cliente_empleado`
  ADD CONSTRAINT `Codigo Cliente - cliente_empleado` FOREIGN KEY (`Cod_Cliente`) REFERENCES `cliente` (`Cod_Cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Codigo empleado - cliente_empleado` FOREIGN KEY (`Cod_Empleado`) REFERENCES `empleado` (`Cod_Empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  ADD CONSTRAINT `Codigo factura` FOREIGN KEY (`Cod_Factura`) REFERENCES `facturas` (`Cod_Factura`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `dtl_factura_producto`
--
ALTER TABLE `dtl_factura_producto`
  ADD CONSTRAINT `Codigo detalle` FOREIGN KEY (`Cod_Detalle`) REFERENCES `detalle_factura` (`Cod_Detalle`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Codigo producto` FOREIGN KEY (`Cod_Producto`) REFERENCES `productos` (`Cod_Referencia`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleado_grupo`
--
ALTER TABLE `empleado_grupo`
  ADD CONSTRAINT `Codgo grupo - empleado_grupo` FOREIGN KEY (`Cod_Grupo`) REFERENCES `grupo` (`Cod_Grupo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Codigo empleado - empleado_grupo` FOREIGN KEY (`Cod_Empleado`) REFERENCES `empleado` (`Cod_Empleado`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `factura_cliente`
--
ALTER TABLE `factura_cliente`
  ADD CONSTRAINT `Codigo Cliente - factura_cliente` FOREIGN KEY (`Cod_Cliente`) REFERENCES `cliente` (`Cod_Cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Codigo Factura - factura_cliente` FOREIGN KEY (`Cod_Factura`) REFERENCES `facturas` (`Cod_Factura`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proveedor_producto`
--
ALTER TABLE `proveedor_producto`
  ADD CONSTRAINT `Codigo producto - proveedor` FOREIGN KEY (`Cod_Producto`) REFERENCES `productos` (`Cod_Referencia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Codigo proveedor` FOREIGN KEY (`Cod_Proveedor`) REFERENCES `proveedor` (`Cod_Proveedor`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
