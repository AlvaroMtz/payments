Para añadir una pasarela nueva:

- Añadir el api key al archivo .env
- Crear el adaptador con los métodos necesarios
- Crear el proveedor en base de datos

**¡¡ IMPORTANTE: MANTENER LOS NOMBRES PARA LA API KEY Y EL ADAPTADOR, EL MAPEO EN selectPaymentGateway.ts ES AUTOMÁTICO !!**

  
## Explicación
He seguido una arquitectura hexagonal para poder desacoplar lo máximo posible la aplicación y que sea sencillo añadir nuevos proveedores.

Siguiendo esta arquitectura, lo primero ha sido modelar el dominio, para lo cual he creado Payment.ts como PaymentProvider.ts con algunas de las características que podrían tener en una pasarela de pago real.

  
Después de tener claro este punto, he pasado a crear el Port teniendo en cuenta que tiene que ser fácil añadir nuevos proveedores. Para ello he establecido algunas funciones básicas y otras que son optativas (como partialReimburse()).

  A partir de aquí el camino ha sido un poco más movido. Primero cree dos diagramas (al principio pensé en dos casos de uso, Payments y Providers) para las funciones básicas que iba a tener que hacer la aplicación. Con esto en mente, diseñé dos casos de uso:

- Payments: con las funciones Process(), Refund() y PartialReimburse().
- Providers: con las funciones Creation(), Enable() y Disable().

  

Una vez tenía este camino claro, pasé a crear los adaptadores, en este caso dos, PaymentGatewayOne y PaymentGatewayTwo. La diferencia entre ambos es que el primero implementa PartialReimburse() y el segundo no. Fuera de este detalle, no hacen nada más. La idea es que se implemente la lógica según las necesidades externass (Stripe, Paypal...).

  Con todo esto, empecé a crear las rutas básicas para poder probar la API.

  Una vez tenía todo funcionando empecé a desacoplar los endpoints, cada controller un archivo y para casa caso de uso un router. Con esto decidí crear dentro de la carpeta infraestruture una carpeta para el protocolo http dentro de la cual diferenciaría los casos de uso.

- payment:
	- PaymentPartialReimburseController
	- PaymentProcessController
	- PaymentRefundController
	- paymentRoutes


- provider:
	- ProviderCreateController
	- ProviderDisableController
	- ProviderEnableController
	- providerRoutes

De esta manera la capa de infraestructura quedaría bastante desacoplada. Del mismo modo, decidí desacoplar la capa de servicios en sus diferentes casos de uso:

- paymentService:
	- PaymentPartialReimburse
	- PaymentProcessService
	- PaymentRefundService

- providerService:
	- ProviderCreationService
	- ProviderCreationService
	- ProviderCreationService

  

La idea con esto es poder crear/modificar nuevos casos de uso fácilmente sin que afecte al resto de lógica de la aplicación.

## Diagramas

### Payment

#### payment/process
```mermaid
sequenceDiagram
/process ->> processController: process a Payment
processController->>processService: send data to the service
processService->> repository: is gateway enable?
repository->> processService: true/false
processService-->> /process: if disable, return error
processService->> processPayment: if enable, process payment
processService->> /process: return confirmation

Note right of processService: check that the <br/> method exists <br/> for that gateway. <br/>If no exists,<br/> return an error
```
#### payment/refund
```mermaid
sequenceDiagram
/refund->> processController: process a Payment
refundController->>refundService: send data to the service
refundService->> repository: is gateway enable?
repository->> refundService: true/false
refundService-->> /refund: if disable, return error
refundService->> refundPayment: if enable, process refund
refundService->> /refund: return confirmation

Note right of refundService: check that the <br/> method exists <br/> for that gateway. <br/>If no exists,<br/> return an error
```
#### payment/partial-refund
```mermaid
sequenceDiagram
/partial-refund->> partialRefundController: process a Payment
partialRefundController->>partialRefundService: send data to the service
partialRefundService->> repository: is gateway enable?
repository->> partialRefundService: true/false
partialRefundService-->> /partial-refund: if disable, return error
partialRefundService->> partialRefundPayment: if enable, process partial refund
partialRefundService->> /partial-refund: return confirmation

Note right of partialRefundService: check that the <br/> method exists <br/> for that gateway. <br/>If no exists,<br/> return an error
```

### Provider

#### provider/enable
```mermaid
sequenceDiagram
/enable->> enableController: process a Payment
enableController->>enableService: send data to the service
enableService->> repository: Does this provider exist?
repository->> enableService: true/false
enableService-->> /enable: if false, return error
enableService->> repository: if true, process update
enableService->> /enable: return confirmation
```
#### provider/disable
```mermaid
sequenceDiagram
/disable->> disableController: process a Payment
disableController->>disableService: send data to the service
disableService->> repository: Does this provider exist?
repository->> disableService: true/false
disableService-->> /disable: if false, return error
disableService->> repository: if true, process update
disableService->> /disable: return confirmation
```

## Algunas posibles mejoras

 - Crear un factory para los errores: de este modo tenemos centralizados todos los errores. Además, creamos una mayor consistencia en la API ya que todos tendrían el mismo formato. Esto sería un ejemplo muy básico en javascript:
```js:
const createErrorFactory = function (name, httpStatusCode = 500) { 
	return  class  BusinessError  extends  Error { 
		constructor (message) { 
		super(message);
		this.name = name;
		this.httpStatusCode = 
		httpStatusCode; 
		} 
	};
};
```

 - Crear un factory de respuestas success: de este modo tenemos mayor consistencia en todas las respuestas de la API (algo parecido a lo de arriba que siempre devuelva los mismos campos)
 - En vez de añadir/quitar las api keys del archivo .env podríamos usar un proveedor externo
 - Añadir tests