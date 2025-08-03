🚀 SpaceX Frontend (React + AWS Fargate + GitHub Actions)

Este proyecto implementa una interfaz web desarrollada con React + TypeScript + Bootstrap para visualizar lanzamientos de SpaceX, consumiendo la API implementada en AWS Lambda. El despliegue en producción se realiza automáticamente mediante GitHub Actions sobre AWS ECS Fargate.
🧰 Tecnologías utilizadas

    React 18 + TypeScript
    Bootstrap 5
    Docker + Nginx
    Amazon ECS (Fargate)
    Amazon ECR
    GitHub Actions

📁 Estructura del proyecto

├── public/
├── src/
├── Dockerfile
├── task-definition-template.json  # Plantilla para ECS Fargate
├── .github/workflows/deploy.yml  # CI/CD con GitHub Actions
├── package.json
└── README.md

💻 Ejecución local
1. Clonar el repositorio

```bash
git clone https://github.com/20Duban/spacex-frontend.git
cd spacex-frontend
```

2. Instalar dependencias
```bash
npm install
```

3. Ejecutar localmente
```bash
npm run start
```

🐳 Ejecutar localmente con Docker
1. Construir la imagen

```bash
docker build -t spacex-frontend .
```

2. Ejecutar el contenedor
```bash
docker run -d -p 80:80 spacex-frontend
```

Abrir en el navegador:
👉 http://localhost
☁️ Despliegue en AWS (Producción)
✅ Arquitectura

    ECS Fargate: despliegue del contenedor sin gestionar servidores.
    ECR: almacenamiento de imágenes Docker.
    GitHub Actions: CI/CD automatizado.
    Nginx: servidor web para los archivos estáticos de React.

🔹 1. Crear el Cluster ECS (manualmente)

Este es el primer paso para ejecutar tu frontend en AWS ECS Fargate.
🧭 Pasos para crear el cluster spacex-cluster:

    Inicia sesión en la consola de AWS y ve al servicio ECS:
    👉 https://console.aws.amazon.com/ecs

    En el menú izquierdo, selecciona “Clusters”.
    Haz clic en el botón “Create Cluster”.
    Selecciona la opción “Networking only” (AWS Fargate) → Haz clic en Next.
    Rellena el formulario:

Campo	Valor
Cluster name	spacex-cluster
Default VPC/Subnets	(puedes usar las predeterminadas)
Container Insights	(opcional)

    Haz clic en Create.

✅ Ahora tendrás un cluster vacío llamado spacex-cluster, listo para recibir servicios y tareas Fargate.
🔹 2. Crear el rol de ejecución ECS

Nombre: ecsTaskExecutionRole

Trust relationship:
```json
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "ecs-tasks.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Permisos necesarios:

    AmazonECSTaskExecutionRolePolicy
    AmazonEC2ContainerRegistryReadOnly

🔹 3. Crear el servicio ECS

    Ir a ECS → Clusters → spacex-cluster
    Click en “Create service”
    Configura:

        Launch type: FARGATE
        Task Definition: spacex-frontend-task
        Service name: spacex-frontend-service
        Number of tasks: 1
        Cluster: spacex-cluster



🔹 4. Configurar el Security Group

Permitir tráfico entrante:
Puerto	Protocolo	Origen	Descripción
80	TCP	0.0.0.0/0	HTTP (IPv4 público)
80	TCP	::/0	HTTP (IPv6 público)
443	TCP	0.0.0.0/0	HTTPS (opcional)
443	TCP	::/0	HTTPS (opcional)

🔄 CI/CD con GitHub Actions

📦 Secrets necesarios en el repositorio
Nombre	Descripción
AWS_ACCESS_KEY_ID	Access Key IAM con permisos
AWS_SECRET_ACCESS_KEY	Secret Key IAM
AWS_REGION	us-east-1

🔁 ¿Qué hace el pipeline?

Cada vez que haces push a master:

    Instala dependencias.
    Construye la imagen Docker.
    Sube la imagen a Amazon ECR.
    Actualiza la definición de tarea ECS.
    Despliega la nueva versión en ECS Fargate.

🌍 Ver la aplicación en producción

Una vez desplegado, puedes acceder desde la IP pública o Load Balancer DNS asignado al servicio ECS.

Ejemplo:
👉 http://xx.xxx.xxx.xx

(Recuerda tener puertos abiertos en el Security Group).


✍️ Autor
  Duban Velazco
  Software Engineer
  GitHub https://github.com/20Duban
  LinkedIn https://www.linkedin.com/in/duban-velazco-30b18420a/
  Correo: micuentaduban@gmail.com
