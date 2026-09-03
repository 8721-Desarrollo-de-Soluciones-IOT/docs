# Capítulo I: Introducción

## 1.1. Startup Profile

### 1.1.1. Descripción de la Startup
Innova Carty es una empresa emergente orientada a la innovación tecnológica en el sector *retail*. Nuestra misión es transformar la experiencia de compra en establecimientos físicos mediante la integración de sistemas IoT, Edge Computing y pasarelas de pago digitales. Buscamos eliminar las fricciones tradicionales en el proceso de compra, como las largas colas en caja y la falta de control en tiempo real sobre el presupuesto del consumidor, dotando a los carritos de supermercado de capacidades autónomas, analíticas y de seguridad.

### 1.1.2. Perfiles de integrantes del equipo
* **Díaz Fiestas, Jorge Luis (U20231D534) - Ingeniería de Software:** Fullstack Developer e IA Automation Specialist. Con experiencia en arquitecturas distribuidas, desarrollo frontend/backend (React, TypeScript, NestJS, Python) y automatización. En el proyecto lidera el diseño del *Edge API*, la integración del microcontrolador ESP32 y la sincronización con la nube.
* *(Apellidos y Nombres, Código, Carrera)* - *(Breve resumen de rol y aportes técnicos en el equipo)*.

---

## 1.2. Solution Profile

### 1.2.1. Antecedentes y problemática
Para entender el contexto del problema, aplicamos la técnica de análisis de las 5 'W's y 2 'H's:
* **Who (Quién):** Clientes de supermercados de consumo masivo y administradores de operaciones de tiendas *retail*.
* **What (Qué):** Pérdida de tiempo en filas de pago tradicionales, desconocimiento del monto acumulado de compra durante el recorrido y riesgo de salida de mercancía sin registrar pago.
* **Where (Dónde):** Hipermercados y supermercados físicos con alta concurrencia de clientes.
* **When (Cuándo):** En horarios de alta demanda (fines de semana, quincenas y fechas festivas), donde los tiempos de espera superan el tiempo de selección de productos.
* **Why (Why):** Los sistemas actuales de cobro son centralizados y secuenciales, y los clientes carecen de una herramienta de fiscalización de presupuesto en tiempo real mientras llenan su canasta.
* **How (Cómo):** El usuario se entera del costo total solo al llegar a la caja, lo que genera rechazos de pagos de última hora, mientras que el local sufre de mermas y cuellos de botella operativos.
* **How Much (Cuánto):** Incremento en las tasas de abandono de carritos y una reducción en la satisfacción neta del cliente (CSAT).

### 1.2.2. Lean UX Process

#### 1.2.2.1. Lean UX Problem Statements
> The current state of retail shopping has focused mainly on traditional checkout lanes, manual barcode scanning, and reactive inventory control. What existing products/services fail to address is the lack of real-time budget tracking during the shopping trip and the elimination of checkout friction through smart on-cart payments. Our product/service will address this gap by transforming standard shopping carts into IoT-enabled smart units with local edge validation, instant QR payment generation, and geofencing security. Our initial focus will be frequent supermarket shoppers looking for speed and cost control. We'll know we are successful when we see a 30% reduction in checkout times and zero unverified exit incidents.

#### 1.2.2.2. Lean UX Assumptions
* **Business Assumptions:** Los supermercados están dispuestos a modernizar su flota de carritos si esto reduce los costos operativos de las cajas registradoras y acelera la rotación de clientes.
* **Business Outcome Assumptions:** Incremento en la retención de clientes y aumento del margen de ganancia por la optimización del tiempo en tienda.
* **User Assumptions:** Los clientes de los segmentos objetivo están familiarizados con los pagos digitales móviles (Yape, Plin, tarjetas) y valoran la autonomía en sus compras.
* **User Outcome and Benefit Assumptions:** El usuario desea conocer exactamente cuánto está gastando antes de pagar para evitar sorpresas en caja.
* **Feature Assumptions:** Un lector RFID integrado agilizará el registro de productos; una celda de carga evitará robos por pesaje inconsistente; una pantalla adaptada mostrará los QR de pago instantáneo.

#### 1.2.2.3. Lean UX Hypothesis Statements
* We believe we will achieve higher customer satisfaction and faster throughput if frequent shoppers attain real-time budget tracking and self-checkout capabilities with our IoT Smart Cart equipped with RFID scanning and Yape/Plin integration.

#### 1.2.2.4. Lean UX Canvas


---

## 1.3. Segmentos objetivo
1. **Comprador Moderno / Consumidor Final:** Jóvenes y adultos entre 20 y 50 años que manejan presupuestos ajustados, usan billeteras digitales de forma cotidiana y buscan optimizar su tiempo en el supermercado.
2. **Administrador de Tienda / Operaciones:** Personal del supermercado encargado de supervisar el inventario, la seguridad del perímetro y el flujo de los carritos en el establecimiento.
