SpaceX Frontend
🚀 Descripción

Este proyecto es una interfaz web desarrollada con React + TypeScript + Bootstrap para visualizar lanzamientos espaciales utilizando datos de la API de SpaceX. La aplicación se despliega automáticamente en AWS ECS Fargate utilizando un pipeline CI/CD con GitHub Actions.

1. Clonar el repositorio

git clone https://github.com/20Duban/spacex-frontend.git
cd spacex-frontend

2. Instalar dependencias

npm install

3. Ejecutar la app

npm run start

☁️ Despliegue en AWS (producción)
✅ Arquitectura

    AWS ECS (Fargate) para desplegar el frontend.

    AWS ECR para almacenar las imágenes Docker.

    GitHub Actions para CI/CD automatizado.

    Nginx sirve los archivos estáticos construidos de React.

⚙️ Requisitos en AWS
🔹 1. Crear un cluster ECS (una sola vez)

aws ecs create-cluster --cluster-name spacex-cluster --region us-east-1


🔹 2. Crear el rol de ejecución

Nombre del rol: ecsTaskExecutionRole

{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}

✅ Permisos adjuntos al rol:

    AmazonECSTaskExecutionRolePolicy
    AmazonEC2ContainerRegistryReadOnly

🔹 3. Configurar el Security Group

Permitir tráfico entrante en los puertos:
Puerto	Protocolo	Origen	Descripción
80	TCP	0.0.0.0/0	HTTP público
80	TCP	::/0	IPv6 público


🔄 CI/CD automático con GitHub Actions

Cada vez que se haces un push a master, se dispara el flujo de CI/CD:

    Instala dependencias.

    Construye la imagen Docker.

    Sube la imagen a ECR.

    Actualiza la definición de tarea.

    Despliega a ECS Fargate.


Asegúrate de tener las siguientes secrets en GitHub:
    Nombre	Valor
    AWS_ACCESS_KEY_ID	Tu access key
    AWS_SECRET_ACCESS_KEY	Tu secret key
    AWS_REGION	us-east-1

